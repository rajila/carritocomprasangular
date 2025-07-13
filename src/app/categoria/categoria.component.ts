import { Component } from '@angular/core';
import { Categoria, CategoriaListInstance } from '../../models/Model';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  public datosList: Categoria[] = []
  public showForm: boolean = false
  public id: number = 0
  public nombre: string = ''

  constructor() {}
  
  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    const datos = CategoriaListInstance.getAll()
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
    let data = CategoriaListInstance.getById(eId)
    if (data) {
      this.nombre = data.nombre
      this.id = eId
       this.showForm = true
    }
  }

  fnHideForm(): void {
    this.showForm = false
    this.nombre = ""
    this.id = 0
  }

  handleGuardar(): void{
      if (this.isValid()) {
          let categoria = new Categoria(this.id, this.nombre)
          
          if (this.id > 0) {
              CategoriaListInstance.update(categoria)
          }else {
              CategoriaListInstance.add(categoria)
          }

          this.nombre = ""
          this.id = 0
          this.showForm = false

          this.loadData()
          
      } else {
          alert("Error, verifique todos los campos!!")
      }
    }
  
    isValid(): boolean {
        let result = true
        if (this.nombre.trim() === "") {
            result = false
        }
        return result
    }

     handleDelete(eId: number) {
      let data = CategoriaListInstance.getById(eId)
      if (data) {
          CategoriaListInstance.deleteById(eId)
          this.loadData()
      }else {
          alert("error al eliminar categoria")
      }
    }
}
