import { Component, Input } from '@angular/core';
import { Product } from '../interface/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../requests/products.service';
import { CartService } from '../requests/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input() id!: string;
  productsDetail!: Product;
  cartItems: number[] = [];
  amount: number = 1;
  faStar = faStar;
  stars = [1, 2, 3, 4, 5]; // Stars array for rating

  constructor(
    private productService: ProductsService,
    private cart: CartService
  ) {}

  ngOnInit() {
    this.productService.getProductDetail(this.id).subscribe((data) => {
      this.productsDetail = data;
      this.cart.getCart().subscribe((data) => (this.cartItems = data));
    });
  }

  increAmount() {
    this.amount += 1;
  }

  decreAmount() {
    this.amount -= 1;
  }

  addToCart(id: number) {
    if (this.amount > 0) {
      for (let i = 0; i < this.amount; i++) {
        this.cartItems.push(id);
      }
    }
    this.cart.updateCart(this.cartItems);
  }
}
