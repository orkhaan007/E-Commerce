import { Product } from "../components/product";

export class Server {
  public static async getAllProducts(): Promise<Product[]> {
    const response = await fetch("http://localhost:3000/all-products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  }

  public static async getProductsByType(type: string): Promise<Product[]> {
    const response = await fetch("http://localhost:3000/all-products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.filter(
      (product: Product) =>
        product.type.trim().toLocaleLowerCase() ==
        type.trim().toLocaleLowerCase()
    );
  }
}