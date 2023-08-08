import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category, CategoryService } from '../services/category.service';
import { Product, ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService]
})
export class ProductComponent {
  formGroup: FormGroup;
  categories: Category[] = [];
  productId: number = -1;

  constructor(private categoryService: CategoryService
    , private productService: ProductService
    , private route: ActivatedRoute
    , private messageService: MessageService
    , private router: Router) {
    const params = this.route?.snapshot?.params;
    this.productId = params && params['id'];

    this.formGroup = new FormGroup({
      name: new FormControl<string | null>(null),
      price: new FormControl<number | null>(null),
      categoryId: new FormControl<number | null>(null)
  });
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
    if (this.productId > 0) {
      this.productService.getById(this.productId).subscribe((product: Product) => {
        if (product) {
          this.categoryService.getById(product.categoryId).subscribe((category: Category) => {
            product.categoryId = category as any;
            this.formGroup.patchValue(product);
          })
        }
      })
    }
  }

  submitClickHandler() {
    const value = this.formGroup.value;
    value.categoryId = value.categoryId.id;

    if (this.productId > 0) {
      value.id = Number(this.productId);
      this.productService.update(value).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
        this.goToProducts();
      });
    } else {
      this.productService.add(value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
      this.goToProducts();
    }
  }

  goToProducts() {
    setTimeout(() => {
      this.router.navigate(['products']);
    }, 300);
  }

}
