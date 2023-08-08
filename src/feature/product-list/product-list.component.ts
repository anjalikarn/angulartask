import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [MessageService]
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(private productService: ProductService
    , private router: Router
    , private messageService: MessageService) {

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(products => this.products = products);
  }

  productSelectHandler(product: Product) {
    this.router.navigate(['product', product.id, 'edit']);
  }

  productDeleteHandler(product: Product) {
    this.productService.delete(product.id as number).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
      this.loadProducts();
    })
  }

  addProductHandler() {
    this.router.navigate(['product']);
  }

  goToCategoriesHandler() {
    this.router.navigate(['categories']);
  }

}
