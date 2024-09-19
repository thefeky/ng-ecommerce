import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path:"",
    component: ProductsComponent,
    title: 'Products'
  },
  {
    path:'login',
    component : LoginComponent,
    title: 'Login',
    // canActivate : [authGuard]
  },
  {
    path :'register',
    component : RegisterComponent,
    title:'Register',
    // canActivate : [authGuard]
  },
  {
    path:'cart',
    component:CartComponent,
    title:'Cart',
    // canActivate : [authGuard]
  },
  {
    path:'product-detail/:id',
    component:ProductDetailsComponent,
    title:'Product Details',

  },
  {
    path:'**',
    component : NotFoundComponent
  }
];
