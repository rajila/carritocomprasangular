import { Component } from '@angular/core';
import { Main } from '../utils/Main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  public identity: boolean = true;

  title = 'carritocomprasangular';

  ngOnInit(): void {
    // Inicializamos los datos
    new Main().init()
  }
}
