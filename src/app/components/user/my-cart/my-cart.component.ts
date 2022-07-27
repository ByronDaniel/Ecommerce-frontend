import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryMethods } from 'src/app/models/IDeliveryMethod';
import { IOrderShow } from 'src/app/models/IOrderShow';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  orderId: string = '';
  order!: IOrderShow;
  deliveryMethodId: string = "";
  deliveryMethods: IDeliveryMethods[] = [];
  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId')!;
    this.getDeliveryMethods();
    this.getOrder();
  }
  
  getDeliveryMethods(){
    this.httpService.get('DeliveryMethod?sort=Name&order=Asc&offset=0').subscribe(
      response=>{
        this.deliveryMethods = response as IDeliveryMethods[];
      }
    )
  }
  getOrder(){
    if(this.orderId != null || this.orderId != undefined){
      this.httpService.get(`Order/Show/${this.orderId}`).subscribe(response=>{
        this.order = response as IOrderShow;
        console.log(this.order);
      });
    }else{
      console.log('No existen productos agregados a la orden');
    }
  }

  cancelOrder(){
    this.httpService.put(`Order/Cancel/${this.orderId}`).subscribe(response=>{
      localStorage.removeItem('orderId');
      this.router.navigate([''], { relativeTo: this.route });
    });
  }

  payOrder(){
    this.httpService.put(`Order/Pay/${this.orderId}/DeliveryMethod/${this.deliveryMethodId}`).subscribe(response=>{
      console.log('pagado');
      localStorage.removeItem('orderId');
      this.router.navigate([''], { relativeTo: this.route });
    });
  }
}
