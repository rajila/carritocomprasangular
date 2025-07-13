class Constants {
    INIT_DATA_LBL = "INIT_DATA"
    // Control de categoras
    CATEGORIA_LIST_LBL = "CATEGORIA_LIST"
    CATEGORIA_LIST_DIM_LBL = "CATEGORIA_LIST_DIM"
    // Control de productoss
    PRODUCTO_LIST_LBL = "PRODUCTO_LIST"
    PRODUCTO_LIST_DIM_LBL = "PRODUCTO_LIST_DIM"
    // Control de carrito
    CART_LIST_LBL = "CART_LIST"
    CART_LIST_DIM_LBL = "CART_LIST_DIM"

    // Login
    LOGIN = "LOGIN"
}

export const ConstantsInstance = new Constants()
Object.freeze(ConstantsInstance)

class LocalStorageCustom {
    getList(key: string){
        const valor: string = localStorage.getItem(key) || ''
        return valor !== '' ? JSON.parse(valor) : []
    }

    getDim(key : string){
        const valor: string = localStorage.getItem(key) || ''
        return valor !== '' ? parseInt(valor) : 1
    }

    getInit(key : string){
        const valor: string = localStorage.getItem(key) || ''
        return valor !== '' ? parseInt(valor) : 'N'
    }

    setData(key: string, data: any){
        localStorage.setItem(key, data)
    }

    getLogin(key: string){
        const valor: string = localStorage.getItem(key) || ''
        return valor !== '' ? valor.trim() : 'N'
    }
}

export const LocalStorageCustomInstance = new LocalStorageCustom()
Object.freeze(LocalStorageCustomInstance)