import { Product } from "../components/product";
import { Cart } from "../components/cart";

export class LocalStorage {
  public static writeProductToCart(product: Product) {
    let index = this.searchProductByFullname(product.fullname);
    const products = this.readAllProductsFromLocalStorage();
    if (index != -1) {
      products[index].count += 1;
    } else {
      products.unshift({ product: product, count: 1 });
    }
    localStorage.setItem("products", JSON.stringify(products));
  }

  public static readAllProductsFromLocalStorage(): Cart[] {
    const productsJson: string = localStorage.getItem("products") as string;
    if (
      productsJson == "" ||
      productsJson == undefined ||
      productsJson == null
    ) {
      return [];
    }
    return JSON.parse(productsJson) as Cart[];
  }

  public static searchProductByFullname(fullname: string): number {
    const products = this.readAllProductsFromLocalStorage();

    for (let i = 0; i < products.length; i++) {
      if (products[i].product.fullname === fullname) {
        return i;
      }
    }
    return -1;
  }

  public static getTotalCost(): number {
    const products = this.readAllProductsFromLocalStorage();
    let totalCost = 0;
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      totalCost += element.product.price * element.count;
    }
    console.log(totalCost);
    return totalCost;
  }

  public static increaseProductCount(index: number): void {
    const products = this.readAllProductsFromLocalStorage();
    products[index].count += 1;
    localStorage.setItem("products", JSON.stringify(products));
  }

  public static decreaseProductCount(index: number): void {
    const products = this.readAllProductsFromLocalStorage();
    if (products[index].count == 1) {
      products.splice(index, 1);
    } else {
      products[index].count -= 1;
    }
    localStorage.setItem("products", JSON.stringify(products));
  }

  public static removeProductFromLocalStorage(index: number): void {
    const products = this.readAllProductsFromLocalStorage();
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
  public static getCountOfProducts(): number {
    const products = this.readAllProductsFromLocalStorage();
    let count = 0;
    products.forEach((p) => {
      count += p.count;
    });
    return count;
  }
}