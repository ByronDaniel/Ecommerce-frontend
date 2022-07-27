import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  products : IProduct[] = [];
  productTypeSelected: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  productsOut(products : IProduct[]){
    this.products = products;
  }
  productTypeSelectedOut(name: string){
    this.productTypeSelected = name;
  }
}
