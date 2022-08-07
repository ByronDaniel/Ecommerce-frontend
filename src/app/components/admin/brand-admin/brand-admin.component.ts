import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/Brand';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.css']
})
export class BrandAdminComponent implements OnInit {
  brands: Brand[] = [];
  constructor(private ecommerceService: EcommerceService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    let params = new HttpParams()
    .set('limit','5')
    // .set('sort','Name')
    // .set('order','Asc')
    .set('offset','0');

    this.ecommerceService.get('Brand',params).subscribe(brands => {
      this.brands = brands as Brand[];
    },error=>{
      console.log('etnro',error);
    });
  }

}
