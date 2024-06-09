import { Cart } from "./../../ts/components/cart";
import { Product } from "./../../ts/components/product";

import { LocalStorage } from "../../ts/api/LocalStorage,";
import { Server } from "../../ts/api/Request";

export class MainModel {
  public products!: Product[];
  public productsInCart: Cart[];
  constructor() {
    this.productsInCart = LocalStorage.readAllProductsFromLocalStorage();

    Server.getAllProducts().then((value) => {
      this.products = value;
    });
  }

  public async addProductToCart(product: Product): Promise<void> {
    LocalStorage.writeProductToCart(product);
    this.productsInCart = LocalStorage.readAllProductsFromLocalStorage();
  }

  public async setAllProductsByType(type: string): Promise<void> {
    if (type.trim() == "All Products") {
      const data = await Server.getAllProducts();
      this.products = data;
    } else {
      const data = await Server.getProductsByType(type);
      this.products = data;
    }
  }

  public priceToNumber(price: string): number {
    return parseFloat(price.replace("$", ""));
  }

  public async sortProducts(criterion: keyof Product): Promise<void> {
    this.products = this.products.slice().sort((a, b) => {
      let aValue = a[criterion];
      let bValue = b[criterion];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });
  } 
}
