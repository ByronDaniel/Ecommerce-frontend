import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { IProductType } from 'src/app/models/IProductType';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.css']
})
export class ProductTypesComponent implements OnInit {
  productTypes: IProductType[] = [];
  products: IProduct[] = []
  productTypeSelected: string = "";
  searchProduct : string = "";
  @Output() productsOut  = new EventEmitter<IProduct[]>();
  @Output() productTypeSelectedOut  = new EventEmitter<string>();
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes(){
    this.httpService.get('ProductType?sort=Name&order=Asc&limit=5&offset=0').subscribe((response)=>{
      this.productTypes = response as IProductType[];
      this.getProducts(this.productTypes[0]);
    });
  }
  
  getProducts(productType: IProductType){
    this.httpService.get(`Product?search=${productType.id}&sort=Name&order=Asc&limit=5&offset=0`).subscribe((response)=>{
      this.products = response as IProduct[];
      this.productTypeSelected = productType.name;
      this.productTypeSelectedOut.emit(productType.name);
      this.productsOut.emit(this.products);
    });
  }
  
  searchProducts(){
    if(this.searchProduct != ""){
      this.httpService.get(`Product?search=${this.searchProduct}&sort=Name&order=Asc&limit=5&offset=0`).subscribe((response)=>{
        this.products = response as IProduct[];
        this.productTypeSelected = `Busqueda: ${this.searchProduct}`;
        this.productTypeSelectedOut.emit(this.productTypeSelected);
        this.productsOut.emit(this.products);
      });
    }else{
      this.getProductTypes();
    }
  }
}
