import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {path : "products-list",component:ProductsListComponent},
  {path : "add-product",component:AddProductComponent},
  {path : "edit-product/:id",component:EditProductComponent},

  {path : "",redirectTo:"products-list", pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
