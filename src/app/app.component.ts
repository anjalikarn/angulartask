import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CategoryService } from 'src/feature/services/category.service';
import { ProductService } from 'src/feature/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Task';

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.productService.refresh();
    this.categoryService.refresh();

  }
}
