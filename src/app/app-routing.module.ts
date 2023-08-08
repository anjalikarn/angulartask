import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from 'src/feature/category-list/category-list.component';
import { CategoryComponent } from 'src/feature/category/category.component';
import { FeatureModule } from 'src/feature/feature.module';
import { ProductListComponent } from 'src/feature/product-list/product-list.component';
import { ProductComponent } from 'src/feature/product/product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoryListComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'category/:id/edit',
    component: CategoryComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/:id/edit',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeatureModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
