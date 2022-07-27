import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryMethods } from 'src/app/models/IDeliveryMethod';
import { IOrderShow } from 'src/app/models/IOrderShow';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

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
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No hay productos agregados',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/products']);
    }
  }

  cancelOrder(){
    Swal.fire({
      title: 'Estás seguro de cancelar la orden?',
      text: "No podras recuperarla",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Mantener Orden',
      confirmButtonText: 'Cancelar Orden'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.put(`Order/Cancel/${this.orderId}`).subscribe(response=>{
          localStorage.removeItem('orderId');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Orden Cancelada',
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['/products']);
        });
      }
    });
  }

  payOrder(){
    Swal.fire({
      title: 'Pago Total',
      text: `$${this.order.totalPrice}`,
      icon: 'success',
      confirmButtonColor: '#5BB318',
      cancelButtonColor: '#D61C4E',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Regresar',
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.httpService.put(`Order/Pay/${this.orderId}/DeliveryMethod/${this.deliveryMethodId}`).subscribe(response=>{
          console.log('pagado');
      localStorage.removeItem('orderId');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada',
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(['/products']);
    });
  }
});
  }
}
