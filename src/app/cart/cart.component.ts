// final project
import { ProductsService } from './../requests/products.service';
import { Component } from '@angular/core';
import { CartService } from '../requests/cart.service';
import { Product } from '../interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: number[] = [];
  cart!: { id: number; amount: number }[];
  productsDetail!: Product;
  totalPrice: number = 0;
  cartProducts: { data: Product; amount: number }[] = [];
  loaded: boolean = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.cartService.getCart().subscribe((data) => {
      this.cartItems = data;
      this.cart = this.convertCartItemsToCart(this.cartItems);
    });

    for (let i = 0; i < this.cart.length; i++) {
      let productId = this.cart[i].id.toString();
      this.productsService.getProductDetail(productId).subscribe((data) => {
        this.productsDetail = data;
        this.cartProducts.push({ data: data, amount: this.cart[i].amount });
        this.calculateTotalPrice();
      });
    }
    this.loaded = true;
  }

  convertCartItemsToCart(
    cartItems: number[]
  ): { id: number; amount: number }[] {
    const itemCount: { [key: number]: number } = {};

    cartItems.forEach((id) => {
      if (itemCount[id]) {
        itemCount[id]++;
      } else {
        itemCount[id] = 1;
      }
    });

    return Object.keys(itemCount).map((id) => ({
      id: +id,
      amount: itemCount[+id],
    }));
  }

  increAmount(product: { data: Product; amount: number }) {
    if (product.amount < product.data.stock) {
      product.amount += 1;
      this.cartItems.push(product.data.id);
      this.cartService.updateCart(this.cartItems);
      this.totalPrice += product.data.price;
    }
  }

  decreAmount(product: { data: Product; amount: number }) {
    if (product.amount > 1) {
      product.amount -= 1;
      let index = this.cartItems.indexOf(product.data.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.cartService.updateCart(this.cartItems);
        this.totalPrice -= product.data.price;
      }
    }
  }

  removeItem(product: { data: Product; amount: number }) {
    this.cartItems = this.cartItems.filter((item) => item !== product.data.id);
    this.cartService.updateCart(this.cartItems);
    this.cartProducts = this.cartProducts.filter(
      (p) => p.data.id !== product.data.id
    );
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartProducts.reduce(
      (total, product) => total + product.data.price * product.amount,
      0
    );
    this.totalPrice = parseFloat(this.totalPrice.toFixed(1));
  }

  // trackBy function to optimize *ngFor
  trackByProduct(index: number, product: { data: Product; amount: number }) {
    return product.data.id;
  }
}
