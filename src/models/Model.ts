import { ConstantsInstance, LocalStorageCustomInstance } from "../utils/Global"

export class Categoria{
    public nroproductos: number = 0
	constructor(
		public id: number,
		public nombre: string
	){}
}

export class Producto {
    constructor(
		public id: number, 
		public codigo: string, 
		public nombre: string, 
		public imagen: string, 
		public descripcion: string, 
		public precio: number, 
		public stock: number, 
		public idCategoria: number){
    }
}

export class CartItem {
    constructor(
		public id: number,
		public producto: Producto, 
		public cantidad: number, 
		public total: number = 0){
    }
}

class CategoriaList {
    KEY_LIST = ConstantsInstance.CATEGORIA_LIST_LBL
    KEY_DIM = ConstantsInstance.CATEGORIA_LIST_DIM_LBL
    
    getAll() {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [ ...dataList ].map(el => {
            let dataCat = ProductoListInstance.getAllByCategoria(el.id)
            if (dataCat) el.nroproductos = dataCat.length
            return el
        })
    }

    add(eData: Categoria) {
        let data = this.getById(eData.id)
        if (data === null) {
            let _dim = LocalStorageCustomInstance.getDim(this.KEY_DIM)
            eData.id = _dim
            _dim++
            LocalStorageCustomInstance.setData(this.KEY_DIM, _dim)
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            dataList.push(eData)
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    update(eData: Categoria) {
        let data = this.getById(eData.id)
        if (data !== null) {
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            let d = dataList.filter((el: Categoria) => el.id === eData.id)[0]
            d.nombre = eData.nombre
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    getById(eId: number){
        eId = isNaN(parseInt(`${eId}`)) ? -1 : parseInt(`${eId}`)
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [...dataList].filter(el => el.id === eId)[0] || null
    }

    deleteById(eId: number) {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        dataList = dataList.filter((el:Categoria) => el.id !== eId)
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
    }
}

class ProductoList {
    KEY_LIST = ConstantsInstance.PRODUCTO_LIST_LBL
    KEY_DIM = ConstantsInstance.PRODUCTO_LIST_DIM_LBL
    
    getAll() {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [ ...dataList ].map(el => {
            let dataCat = CategoriaListInstance.getById(el.idCategoria || 0)
            if (dataCat) el.categoria = dataCat.nombre
            return el
        })
    }

    add(eData: Producto) {
        let data = this.getById(eData.id)
        if (data === null) {
            let _dim = LocalStorageCustomInstance.getDim(this.KEY_DIM)
            eData.id = _dim
            eData.codigo = `PROD-${eData.id}`
            _dim++
            LocalStorageCustomInstance.setData(this.KEY_DIM, _dim)
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            dataList.push(eData)
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    update(eData: Producto) {
        let data = this.getById(eData.id)
        if (data !== null) {
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            let d = dataList.filter((el:Producto) => el.id === eData.id)[0]
            d.nombre = eData.nombre
            d.imagen = eData.imagen
            d.descripcion = eData.descripcion
            d.precio = eData.precio
            d.stock = eData.stock
            d.idCategoria = eData.idCategoria
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    getById(eId: number){
        eId = isNaN(parseInt(`${eId}`)) ? -1 : parseInt(`${eId}`)
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [...dataList].filter(el => el.id === eId)[0] || null
    }

    deleteById(eId: number) {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        dataList = dataList.filter((el: Producto) => el.id !== eId)
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
    }

    getAllByCategoria(eCategoriaId = 0) {
        let result = this.getAll()
        return [ ...result ].filter(el => el.idCategoria === eCategoriaId || eCategoriaId === 0)
    }
}

class CartList {
    KEY_LIST = ConstantsInstance.CART_LIST_LBL
    KEY_DIM = ConstantsInstance.CART_LIST_DIM_LBL
    
    getAll() {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [ ...dataList ]
    }

    add(eData: CartItem) {
        let data = this.getByProductoId(eData.producto.id)
        if (data === null) {
            let _dim = LocalStorageCustomInstance.getDim(this.KEY_DIM)
            eData.id = _dim
            _dim++
            LocalStorageCustomInstance.setData(this.KEY_DIM, _dim)
            let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
            eData.total += eData.producto.precio
            dataList.push(eData)
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }else {
            let dataList = [ ...LocalStorageCustomInstance.getList(this.KEY_LIST) ]
            let d = dataList.filter(el => el.producto.id === eData.producto.id)[0]
            d.cantidad++
            d.total += eData.producto.precio
            LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
        }
    }

    getByProductoId(eId: number){
        eId = isNaN(parseInt(`${eId}`)) ? -1 : parseInt(`${eId}`)
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        return [...dataList].filter(el => el.producto.id === eId)[0] || null
    }

    deleteById(eId: number) {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        dataList = dataList.filter((el: CartItem) => el.id !== eId)
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
    }

    deleteByProductoId(eId: number) {
        let dataList = LocalStorageCustomInstance.getList(this.KEY_LIST)
        let d = dataList.filter((el: CartItem) => el.producto.id === eId)[0]
        d.cantidad--
        d.total -= d.producto.precio
        // Actualizamos stock
        let dataListP = ProductoListInstance.getAll()
        let _p = dataListP.filter(el => el.id === eId)[0]
        if (_p) {
            _p.stock++
            ProductoListInstance.update(_p)
        }
        // Se elimina elemento de carrito si cantidad = CERO
        if (d.cantidad <= 0 ){
            dataList = dataList.filter((el: CartItem) => el.producto.id !== eId)
        }
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify(dataList))
    }

    vaciarLista() {
        LocalStorageCustomInstance.setData(this.KEY_LIST, JSON.stringify([]))
    }
}

export const ProductoListInstance = new ProductoList()
Object.freeze(ProductoListInstance)

export const CategoriaListInstance = new CategoriaList()
Object.freeze(CategoriaListInstance)

export const CartListInstance = new CartList()
Object.freeze(CartListInstance)