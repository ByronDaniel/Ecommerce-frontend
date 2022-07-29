import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/user/products/products.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductTypesComponent } from './components/user/product-types/product-types.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { ProductFormComponent } from './components/admin/product-admin/product-form/product-form.component';
import { ProductListComponent } from './components/admin/product-admin/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ProductTypesComponent,
    UserComponent,
    AdminComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductInfoComponent,
    MyCartComponent,
    LoginComponent,
    ProductAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
