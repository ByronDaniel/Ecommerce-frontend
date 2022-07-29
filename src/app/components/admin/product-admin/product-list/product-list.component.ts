import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.httpService.get('Product?limit=3&offset=0&sort=Name&order=asc').subscribe(response=>{
      this.products = response as IProduct [];
    });
  }

  deleteProduct(productId: string){
    this.httpService.delete(`Product/${productId}`).subscribe(response => {
      this.products = this.products.filter(product => product.id != productId);
    })
  }

  productNewOut(product: IProduct){
    this.products.push(product);
  }
}
