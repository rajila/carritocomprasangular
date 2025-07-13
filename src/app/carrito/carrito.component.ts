import { Component } from '@angular/core';
import { CartItem, CartListInstance, ProductoListInstance } from '../../models/Model';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  public datosList: CartItem[] = []
  public total: number = 0

  ngOnInit(): void {
      this.loadData()
    }
  
  loadData(): void {
    const datos = CartListInstance.getAll()
    if (datos) {
      try {
        this.datosList = [...datos];
        this.total = this.datosList.reduce((acum, actual) => acum + actual.total, 0)
      } catch (error) {
        console.error('Error listado de categorias:', error)
        this.datosList = []
      }
    }
  }

  handleDeleteCart(eId: number) {
      let producto = ProductoListInstance.getById(eId)
      if (producto) {
          CartListInstance.deleteByProductoId(eId)
          this.loadData()
      } else {
          alert(`Error al eliminar producto de carrito`)
      }
  }

  handlePagar(): void {
      CartListInstance.vaciarLista()
      window.location.href="/"
  }

}
