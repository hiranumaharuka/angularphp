import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  public url = environment.web_api_url_base;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Products[]> {
    return this.http
      .get<Products[]>(this.url + 'view.php')
      .pipe(map((data) => data));
  }

  getProductDetails(id): Observable<Products> {
    return this.http
      .get<Products>(this.url + 'view_one.php?id=' + id)
      .pipe(map((product) => product));
  }

  createProduct(data) {
    return this.http
      .post(this.url + 'create.php', data)
      .pipe(map((response) => response));
  }

  updateProduct(data) {
    return this.http
      .post(this.url + 'update.php', data)
      .pipe(map((response) => response));
  }

  deleteProduct(id) {
    return this.http
      .get(this.url + 'delete.php?id=' + id)
      .pipe(map((response) => response));
  }
}
