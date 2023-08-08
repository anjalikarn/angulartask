import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category, CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService]
})
export class CategoryComponent {
  catformGroup: FormGroup;
  categoryId: number = -1;

  constructor(private categoryService: CategoryService
    , private route: ActivatedRoute
    , private messageService: MessageService
    , private router: Router) {
    const params = this.route?.snapshot?.params;
    this.categoryId = params && params['id'];

    this.catformGroup = new FormGroup({
      name: new FormControl<string | null>(null)
  });
  }

  ngOnInit() {
    if (this.categoryId > 0) {
      this.categoryService.getById(this.categoryId).subscribe((category: Category) => {
        this.catformGroup.patchValue(category);
      })
    }
  }

  addCat() {
    const value = this.catformGroup.value;

    if (this.categoryId > 0) {
      value.id = Number(this.categoryId);
      this.categoryService.update(value).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
        this.goToCategories();
      });
    } else {
      this.categoryService.add(value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully' });
      this.goToCategories();
    }
  }

  goToCategories() {
    setTimeout(() => {
      this.router.navigate(['categories']);
    }, 300)
  }
}
