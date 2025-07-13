import { Component } from '@angular/core';
import { CartItem, CartListInstance, Categoria, CategoriaListInstance, Producto, ProductoListInstance } from '../../models/Model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public datosList: Producto[] = []
  public categorias: Categoria[] = []

  ngOnInit(): void {
      const datos = ProductoListInstance.getAll()
      if (datos) {
        try {
          this.datosList = [...datos];
        } catch (error) {
          console.error('Error listado de productos:', error)
          this.datosList = []
        }
      }

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

  onSeleccionar(event: Event) {
    const valorSeleccionado = (event.target as HTMLSelectElement).value
    const datos = ProductoListInstance.getAllByCategoria(parseInt(valorSeleccionado))
      if (datos) {
        try {
          this.datosList = [...datos];
        } catch (error) {
          console.error('Error listado de productos:', error)
          this.datosList = []
        }
      }
  }

  handleAddCart(id: number) {
      let producto = ProductoListInstance.getById(id)
      if (producto && producto.stock > 0) {
          let cart = new CartItem(0, producto, 1)
          CartListInstance.add(cart)
          producto.stock--
          ProductoListInstance.update(producto)
          
          const datos = ProductoListInstance.getAll()
          if (datos) {
            try {
              this.datosList = [...datos];
            } catch (error) {
              console.error('Error listado de productos:', error)
              this.datosList = []
            }
          }
      } else {
          alert(`El libro "${producto.nombre || 'XXX'}" no disponible!!`)
      }
  }

  fnGetDisponibilidad(stock: number): string {
    console.log(stock)
    if (stock > 0) return "card"
    else return "card card-red"
  }

}