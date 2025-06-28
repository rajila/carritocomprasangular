import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
 	{path: 'productos', component: ProductoComponent},
 	{path: 'categorias', component: CategoriaComponent},
	{path: '**', component: HomeComponent} //cuando una ruta no exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
