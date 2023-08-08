import { Component } from '@angular/core';
import { Category, CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [MessageService]
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService
    , private router: Router
    , private messageService: MessageService) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  categorySelectHandler(category: Category) {
    this.router.navigate(['category', category.id, 'edit']);
  }

  categoryDeleteHandler(category: Category) {
    this.categoryService.delete(category.id as number).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
      this.loadCategories();
    })
  }

  addCategoryHandler() {
    this.router.navigate(['category']);
  }

  goToProductsHandler() {
    this.router.navigate(['products']);
  }

}
