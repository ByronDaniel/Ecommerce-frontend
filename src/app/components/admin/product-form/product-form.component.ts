import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand } from 'src/app/models/IBrand';
import { IProduct } from 'src/app/models/IProduct';
import { IProductType } from 'src/app/models/IProductType';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productTypes : IProductType [] = [];
  brands : IBrand [] = [];
  productNew : IProduct = {
    name: "",
    description: "",
    imageUrl: "",
    stock:0,
    price:0,
    productTypeId:"",
    brandId:""
  };
  @Output() productNewOut = new EventEmitter();
  constructor(private httpService : HttpService) { 
  }

  ngOnInit(): void {
    this.getProductTypes();
    this.getBrands();
  }

  getProductTypes(){
    this.httpService.get('ProductType?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.productTypes = response as IProductType[];
    });
  }

  getBrands(){
    this.httpService.get('Brand?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.brands = response as IBrand[];
    })
  }

  addProduct(){
    this.httpService.post('Product',this.productNew).subscribe(response =>{
      this.httpService.get(`Brand/${this.productNew.brandId}`).subscribe((response)=>{
        let brand = response as IBrand;
        this.productNew.brand = brand.name;
      })
      this.productNewOut.emit(this.productNew);
    });
  }
}
