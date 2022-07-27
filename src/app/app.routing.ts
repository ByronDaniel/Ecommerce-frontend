import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { UserComponent } from './components/user/user.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'products', component: UserComponent},
    { path: 'my-cart', component: MyCartComponent },
    { path: 'product/:id', component: ProductInfoComponent },
    { path: 'admin', component: AdminComponent }
];