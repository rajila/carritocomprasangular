import { Component } from '@angular/core';
import { CartListInstance, Categoria, CategoriaListInstance, Producto, ProductoListInstance } from '../../models/Model';
import { UtilInstance } from '../../utils/Util';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  public datosList: Producto[] = []
  public showForm: boolean = false
  public categorias: Categoria[] = []

    
    public id: number = 0
    public codigo: string = ''
    public nombre: string = ''
    public idCategoria: number = 0
    public precio: number = 0
    public stock: number = 0
    public imagenB64: string = ''
    public imagenFile: File | null = null
    public descripcion: string = ''
  
    constructor() {}
    
    ngOnInit(): void {
      this.loadData()

      const datosCat = CategoriaListInstance.getAll()
      if (datosCat) {
        try {
          this.categorias = [...datosCat];
        } catch (error) {
          console.error('Error listado de categorias:', error)
          this.datosList = []
        }
      }
    }
  
    loadData(): void {
      const datos = ProductoListInstance.getAll()
      if (datos) {
        try {
          this.datosList = [...datos];
        } catch (error) {
          console.error('Error listado de categorias:', error)
          this.datosList = []
        }
      }
    }
  
    fnShowForm(): void {
      this.showForm = true
    }
  
    fnEdit(eId: number): void {
      let data = ProductoListInstance.getById(eId)
      if (data) {
      
        this.id = eId
        this.codigo = data.codigo
        this.nombre = data.nombre
        this.idCategoria = data.idCategoria
        this.precio = data.precio
        this.stock = data.stock
        this.imagenB64 = data.imagen
        this.imagenFile = null
        this.descripcion = data.descripcion


        this.showForm = true
      }
    }
  
    fnHideForm(): void {
      this.showForm = false
      this.nombre = ""
      this.id = 0
      this.codigo = ''
      this.nombre = ''
      this.idCategoria = 0
      this.precio = 0
      this.stock = 0
      this.imagenB64 = ''
      this.imagenFile = null
      this.descripcion = ''
    }
  
    async handleGuardar(){
      let isOk = await this.isValid()
        if (isOk) {
            // let categoria = new Producto(this.id, this.nombre)
            
            // if (this.id > 0) {
            //     ProductoListInstance.update(categoria)
            // }else {
            //     ProductoListInstance.add(categoria)
            // }

            let _imagenB64 = ""
            try{
                _imagenB64 = await UtilInstance.FileToUrlBase64(this.imagenFile)
                if (_imagenB64.trim() === "") {
                    _imagenB64 = this.imagenB64
                }
            }catch(e) {
                _imagenB64 = this.imagenB64
            }

            let producto = new Producto(this.id, this.codigo, this.nombre, _imagenB64, this.descripcion, this.precio, this.stock, this.idCategoria)

            if (this.id > 0) {
                ProductoListInstance.update(producto)
            }else {
                ProductoListInstance.add(producto)
            }
  
            this.nombre = ""
            this.id = 0
            this.codigo = ''
            this.nombre = ''
            this.idCategoria = 0
            this.precio = 0
            this.stock = 0
            this.imagenB64 = ''
            this.imagenFile = null
            this.descripcion = ''
            this.showForm = false
  
            this.loadData()
            
        } else {
            alert("Error, verifique todos los campos!!")
        }
      }
    
      async isValid(): Promise<boolean> {
        let _imagenB64 = "existe"
        try{
            if ( this.id > 0 ) {
                _imagenB64 = "existe"
            } else {
                _imagenB64 = await UtilInstance.FileToUrlBase64(this.imagenFile)
            }
        }catch(e) {
            console.log(e)
        }

        let result = true
        if (this.nombre.trim() === "") {
            result = false
        }
        if (_imagenB64.trim() === "") {
            result = false
        }
        if (this.descripcion.trim() === "") {
            result = false
        }
        if (this.idCategoria <= 0) {
            result = false
        }

        if (this.precio<=0) {
            result = false
        }

        if (this.stock<=0) {
            result = false
        }
        
        return result
      }
  
       handleDelete(eId: number) {
        let data = ProductoListInstance.getById(eId)
        if (data) {
            ProductoListInstance.deleteById(eId)
            this.loadData()
        }else {
            alert("error al eliminar producto")
        }
      }

      fnGetNameCategoria(eId: number): string {
        let data = CategoriaListInstance.getById(eId)
        if (data) { return data.nombre }
        return ""
      }

      onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        this.imagenFile = input.files[0];
        console.log('Archivo seleccionado:', this.imagenFile);
      }
    }

    fnOnCart(eId: number): boolean{
      let enCarrito = CartListInstance.getByProductoId(eId)
      console.log('encarrito', enCarrito)
      if (enCarrito) return false
      else return true
    }

}
