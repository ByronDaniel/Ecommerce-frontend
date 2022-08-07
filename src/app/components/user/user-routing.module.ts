import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from '../../components/user/my-cart/my-cart.component';
import { ProductInfoComponent } from '../../components/user/products/product-info/product-info.component';
import { UserComponent } from '../../components/user/user.component';
import { AuthGuardService } from '../../auth/authGuard.service';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: '', component: UserComponent, children:[
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductInfoComponent },
      { path: 'my-cart', component: MyCartComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
