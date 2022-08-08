import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { DeliveryMethod } from 'src/app/models/DeliveryMethod';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-delivery-method-form',
  templateUrl: './delivery-method-form.component.html',
  styleUrls: ['./delivery-method-form.component.css']
})
export class DeliveryMethodFormComponent implements OnInit {
  formGroupDeliveryMethod!: FormGroup;
  deliveryMethod!: DeliveryMethod;
  deliveryMethods : DeliveryMethod [] = [];
  brands : Brand [] = [];
  deliveryMethodId!: string;
  @Output() deliveryMethodNewOut = new EventEmitter();
  constructor(private ecommerceService : EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.buildformGroupDeliveryMethod();
    this.getDeliveryMethods();
    this.getBrands();
  }

  getDeliveryMethods(){
    this.ecommerceService.get('DeliveryMethod?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.deliveryMethods = response as DeliveryMethod[];
    });
  }
  
  getBrands(){
    this.ecommerceService.get('Brand?sort=Name&order=Asc&offset=0').subscribe(response =>{
      this.brands = response as Brand[];
    })
  }

  addDeliveryMethod(deliveryMethod: DeliveryMethod){
    this.ecommerceService.post('DeliveryMethod',this.formGroupDeliveryMethod.getRawValue()).subscribe(response =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Método de Entrega Agregado con Éxito!`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/delivery-methods']);
      this.deliveryMethodNewOut.emit(deliveryMethod);
    });
  }
   
  //Reactive Form, Validators and getters of Fields
  buildformGroupDeliveryMethod(){
    this.deliveryMethodId = this.route.snapshot.paramMap.get('id')!;
    if(!this.deliveryMethodId){
      this.formGroupDeliveryMethod = this.formBuilder.group({
        name: [null,[Validators.required]]
      });
    }else{
      this.getDeliveryMethod(this.deliveryMethodId);
    }
  }

  get nameField() {
    return this.formGroupDeliveryMethod.get('name');
  }
  get imageUrlField() {
    return this.formGroupDeliveryMethod.get('imageUrl');
  }
  get descriptionField() {
    return this.formGroupDeliveryMethod.get('description');
  }
  get stockField() {
    return this.formGroupDeliveryMethod.get('stock');
  }
  get priceField() {
    return this.formGroupDeliveryMethod.get('price');
  }
  get deliveryMethodIdField() {
    return this.formGroupDeliveryMethod.get('deliveryMethodId');
  }
  get brandIdField() {
    return this.formGroupDeliveryMethod.get('brandId');
  }
  
  onSubmit(event : Event){
    event.preventDefault();
    if(this.deliveryMethodId != null ){
      this.updateDeliveryMethod();
    }else{
      if(this.formGroupDeliveryMethod.valid){
        this.addDeliveryMethod(this.formGroupDeliveryMethod.value);
      }
    }
  }

  getDeliveryMethod(id: string){
    this.ecommerceService.get(`DeliveryMethod/${id}`).subscribe(
      response =>{
        this.deliveryMethod = response as DeliveryMethod;
        this.formGroupDeliveryMethod = this.formBuilder.group({
          id: [this.deliveryMethod.id,[Validators.required]],
          name: [this.deliveryMethod.name,[Validators.required]]
        });
      }
    )
  }

  updateDeliveryMethod(){
    this.ecommerceService.put(`DeliveryMethod`,this.formGroupDeliveryMethod.getRawValue()).subscribe(
      response=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Método de Entrega Actualizado con Éxito!`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/delivery-methods']);
      }
    );
  }
}

