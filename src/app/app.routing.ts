import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { ProductFormComponent } from './components/admin/product-admin/product-form/product-form.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuardService } from './auth/authGuard.service';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch:'full' },
    {path:'', children:[
        { path: 'products', component: UserComponent},
        { path: 'my-cart', component: MyCartComponent },
        { path: 'product/:id', component: ProductInfoComponent },
        { path: 'admin', component: AdminComponent},
        { path: 'admin/products', component: ProductAdminComponent},
        { path: 'admin/products/edit/:id', component: ProductFormComponent},
        { path: 'admin/products/create', component: ProductFormComponent},
        { path: 'admin/brands', component: BrandAdminComponent}
    ],canActivate: [AuthGuardService]}
];