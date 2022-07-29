import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeliveryMethods } from 'src/app/models/IDeliveryMethod';
import { IOrderShow } from 'src/app/models/IOrderShow';
import { IProduct } from 'src/app/models/IProduct';
import { OrderProduct } from 'src/app/models/OrderProduct';
import { OrderProductQuantity } from 'src/app/models/OrderProductQuantity';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  orderId: string = '';
  stock: number [] = [];
  order!: IOrderShow;
  deliveryMethodId: string = "";
  deliveryMethods: IDeliveryMethods[] = [];
  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId')!;
    this.getOrder();
    this.getDeliveryMethods();
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
        if(this.order.orderProducts.length == 0){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No hay productos agregados',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/products']);
        }else{
          this.order.orderProducts.forEach(product => {
            this.stock = [];
            for (let i = 1; i <= product.stock + product.productQuantity; i++) {
              this.stock.push(i);
            }
            product.stockArray = this.stock;
          });
        }
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
    if(this.deliveryMethodId != ""){

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
}else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Seleccione método de entrega',
    showConfirmButton: false,
    timer: 1000
  });
}
  }

  removeProduct(product: OrderProduct){
    let orderId = localStorage.getItem('orderId');
    this.httpService.delete(`Order/${orderId}/Product/${product.productId}`).subscribe(
      response =>{
        this.getOrder();
      }
    )
  }

  updateQuantity(product: OrderProduct,quantity: string){
    let orderId = localStorage.getItem('orderId');
    let OrderProductQuantity : OrderProductQuantity = {
      productId: product.productId,
      productQuantity : parseInt(quantity)
    }
    this.httpService.put(`Order/${orderId}/Product`,OrderProductQuantity).subscribe(response=>{
      this.getOrder();
    })
  }
}
