import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private httpService: EcommerceService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.httpService.get('Product?limit=3&offset=0&sort=Name&order=asc').subscribe(response=>{
      this.products = response as Product [];
    });
  }

  deleteProduct(productId: string){
    this.httpService.delete(`Product/${productId}`).subscribe(response => {
      this.products = this.products.filter(product => product.id != productId);
    })
  }

  productNewOut(product: Product){
    this.products.push(product);
  }
}
