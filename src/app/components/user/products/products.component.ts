import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() productsIn : IProduct[] = [];
  @Input() productTypeSelectedIn : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
