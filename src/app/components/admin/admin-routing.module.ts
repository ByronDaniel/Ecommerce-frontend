import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/authGuard.service';
import { AdminComponent } from '../../components/admin/admin.component';
import { BrandAdminComponent } from '../../components/admin/brand-admin/brand-admin.component';
import { ProductAdminComponent } from '../../components/admin/product-admin/product-admin.component';
import { ProductFormComponent } from '../../components/admin/product-admin/product-form/product-form.component';
import { ProductInfoComponent } from '../user/products/product-info/product-info.component';

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'products', component: ProductAdminComponent},
  { path: 'products/edit/:id', component: ProductFormComponent},
  { path: 'products/create', component: ProductFormComponent},
  { path: 'brands', component: BrandAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
