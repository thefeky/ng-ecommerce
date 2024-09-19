import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http : HttpClient) { }
  getProductList(): Observable<any>{
    return this.http.get('https://dummyjson.com/products')
  }
  getProductDetail(id:string): Observable<any>{
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }
  getSpecificProductList(skip:number =0): Observable<any>{
    return this.http.get(`https://dummyjson.com/products?limit=10&skip=${skip}`)
  }
}
