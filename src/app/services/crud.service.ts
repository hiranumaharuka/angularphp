import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // public url = environment.web_api_url_base;
  public url;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };
  constructor(private http: HttpClient) {}

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error);
      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
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

  createProduct(product) {
    return this.http
      .post(this.url + 'create.php', product, this.httpOptions)
      .pipe(map((response) => response)
      // catchError(this.handleError<any>('createProduct'))
      );
  }

  updateProduct(product: Products) {
    return this.http.post(this.url + 'update.php', product).pipe(
      map((response) => response),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id) {
    return this.http
      .get(this.url + 'delete.php?id=' + id)
      .pipe(map((response) => response));
  }
}
