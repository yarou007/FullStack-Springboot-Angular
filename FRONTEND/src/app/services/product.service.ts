import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';


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

  constructor(private http : HttpClient){
  this.categories =  []
    this.products= [ ];
  }

  productList(){
    return this.http.get<ProductModel[]>(apiURL+"/products",httpOptions);
  }
  addProduct(newProduct : ProductModel){
     return this.http.post<ProductModel[]>(apiURL+"/products/save",newProduct,httpOptions);
    //this.products.push(newProduct);
  }
  deleteProduct(idProduct : number){

     return this.http.delete(apiURL+"/products/"+idProduct);
  }
  editProduct(id : number){   ///products/update
    return this.http.get<ProductModel>(`${apiURL+"/products"}/${id}`);

  }
  updateProduct(product : ProductModel){
   // this.deleteProduct(product);
   // this.addProduct(product);
    return this.http.put<ProductModel>(apiURL+"/products/update",product,httpOptions);
     // this.sortProduct();
  }

  sortProduct(){
    this.products.sort(
      (x,y)=>(x.idProduct! > y.idProduct! ? 1 : -1)
    );
  }
  
  CategoriesList(){
    return this.http.get<CategoryModel[]>(apiURL+"/categories",httpOptions);
  }
  editCategory(id : number){
    this.category =  this.categories.find( c => c.idCategory == id)!;
    return this.category;
  }

}
