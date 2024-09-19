import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../requests/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  cartItems: number[] = [];
  amount: number = 0;
  faStar = faStar;
  stars = [1, 2, 3, 4, 5];

  constructor(private router: Router, private cart: CartService) {}

  ngOnInit() {
    this.cart.getCart().subscribe((data) => (this.cartItems = data));
  }

  redirectToDetails(id: number) {
    this.router.navigate([`/product-detail/${id}`]);
  }

  addToCart(id: number) {
    this.cartItems.push(id);
    this.cart.updateCart(this.cartItems);
    this.amount += 1;
  }
}
