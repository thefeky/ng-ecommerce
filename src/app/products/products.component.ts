import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../requests/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsData: any[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.productService
      .getProductList()
      .subscribe((data: { products: any[] }) => {
        this.productsData = data.products;
      });
  }
}
