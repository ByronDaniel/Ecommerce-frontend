import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { UserComponent } from './components/user/user.component';

const appRoutes = [
    { path: '', component: UserComponent},
    { path: 'product/:id', component: ProductInfoComponent },
    { path: 'my-cart', component: MyCartComponent },
    { path: 'admin', component: AdminComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
