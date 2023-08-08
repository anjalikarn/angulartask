import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BaseService } from './base.service';

export interface Product {
  id?: number;
  name: string;
  categoryId: number;
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  override storeName: string = 'product';

  constructor(dbService: NgxIndexedDBService) { 
    super(dbService);
  }


}
