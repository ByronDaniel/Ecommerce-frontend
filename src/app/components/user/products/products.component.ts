import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  products : Product[] = [];
  productTypeSelected: string = "";

  productsOut(products : Product[]){
    this.products = products;
  }
  productTypeSelectedOut(name: string){
    this.productTypeSelected = name;
  }
}
