import { NgxIndexedDBService } from "ngx-indexed-db";
import { Observable } from "rxjs";

export class BaseService<T> {

    storeName: string = '';

    constructor(public dbService: NgxIndexedDBService) { 
      }

    add(data: T) {
        this.dbService
      .add(this.storeName, data)
      .subscribe();
      }

      update(data: T) {
        return this.dbService.update(this.storeName, data);
      }
    
      getAll(): Observable<T[]> {
        return this.dbService.getAll<T>(this.storeName);
      }
    
      refresh() {
        this.dbService.clear(this.storeName).subscribe();
      }

      getById(id: number): Observable<T> {
        return this.dbService.getByKey(this.storeName, Number(id));
      }

      delete(id: number) {
        return this.dbService.delete(this.storeName, Number(id));
      }

}