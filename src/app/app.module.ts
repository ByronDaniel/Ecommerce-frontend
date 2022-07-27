import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/user/products/products.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductTypesComponent } from './components/user/product-types/product-types.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { ProductInfoComponent } from './components/user/products/product-info/product-info.component';
import { MyCartComponent } from './components/user/my-cart/my-cart.component';
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
    MyCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
