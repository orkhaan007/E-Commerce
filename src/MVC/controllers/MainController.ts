import { Product } from "./../../ts/components/product";
import { MainModel } from "../models/MainModel";
import { MainView } from "../views/MainView";

export class MainController {
  model: MainModel;
  view: MainView;

  constructor(model: MainModel, view: MainView) {
    this.model = model;
    this.view = view;

    setTimeout(() => {
      this.view.writeElementsToSubscribeSection(this.model.products);
    }, 100);

    this.view.bindGetProductsByType(this.getProductsByType.bind(this));
    this.view.bindFilterProductsBy(this.sortProductsBy.bind(this));
    this.view.bindAddProductToCart(this.addProductToCart.bind(this));
  }

  private async getProductsByType(type: string): Promise<void> {
    await this.model.setAllProductsByType(type);
    await this.view.writeElementsToSubscribeSection(this.model.products);
  }

  private async sortProductsBy(filter: string): Promise<void> {
    this.model.sortProducts(filter as keyof Product);
    await this.view.writeElementsToSubscribeSection(this.model.products);
  }

  private async addProductToCart(product: Product): Promise<void> {
    await this.model.addProductToCart(product);
  }
}
