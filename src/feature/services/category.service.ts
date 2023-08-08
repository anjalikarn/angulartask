import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BaseService } from './base.service';

export interface Category {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  override storeName: string = 'category';

  constructor(dbService: NgxIndexedDBService) { 
    super(dbService);
  }


}
