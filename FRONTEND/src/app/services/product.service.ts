import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers : new HttpHeaders({
    'content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : ProductModel[];
  product! : ProductModel;
  categories : CategoryModel[];
  category! : CategoryModel;
   apiURL : string = "http://localhost:8080/api";

  constructor(private http : HttpClient){
  this.categories =  []
    this.products= [ ];
  }

  productList(){
    return this.http.get<ProductModel[]>(this.apiURL+"/products",httpOptions);
  }
  addProduct(newProduct : ProductModel){
     return this.http.post<ProductModel[]>(this.apiURL+"/products/save",newProduct,httpOptions);
    //this.products.push(newProduct);
  }
  deleteProduct(product : ProductModel){
    const index = this.products.indexOf(product,0);
    this.products.splice(index,1);
  }
  editProduct(id : number){
    this.product =  this.products.find( p => p.idProduct == id)!;
    return this.product;
  }
  updateProduct(product : ProductModel){
    this.deleteProduct(product);
    this.addProduct(product);
    this.sortProduct();
  }

  sortProduct(){
    this.products.sort(
      (x,y)=>(x.idProduct! > y.idProduct! ? 1 : -1)
    );
  }
  
  CategoriesList(){
    return this.http.get<CategoryModel[]>(this.apiURL+"/categories",httpOptions);
  }
  editCategory(id : number){
    this.category =  this.categories.find( c => c.idCategory == id)!;
    return this.category;
  }

}
