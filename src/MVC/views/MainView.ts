import { LocalStorage } from "./../../ts/api/LocalStorage,";
import { Cart } from "./../../ts/components/cart";
import { Product } from "../../ts/components/product";

export class MainView {
  private body: HTMLBodyElement;
  private main!: HTMLElement;
  private getProductsByType: (type: string) => Promise<void>;
  private filterProductsBy: (filterParam: string) => Promise<void>;
  private addProductToCart: (product: Product) => Promise<void>;

  public async writeElementsToSubscribeSection(
    products: Product[]
  ): Promise<void> {
    const subscribe__list: HTMLElement = document.querySelector(
      ".products__products"
    ) as HTMLElement;
  
    subscribe__list.innerHTML = "";
    products.forEach(async (p) => {
    const isHot = p.IsHot ? "hot" : "";
    const saleInfo = isHot ? "hot" : p.discounted_price ? "" : "";
    const priceDisplay = p.discounted_price
      ? `<p class='product__price product__price--discounted'>$${p.discounted_price}</p><p class='product__price product__price--original'>$${p.price}</p>`
      : `<p class='product__price'>$${p.price}</p>`;

    const item = `
      <li class='product'>
        <i class="bi bi-plus-square-fill product__add-cart"></i>
        <p class='product__isHot'>${saleInfo}</p>
        <img class='product__image' src='${p.path}'>
        <h4 class='product__fullname'>${p.fullname}</h4>
        <div class='product__type-price'>
          <p class='product__type'>${p.type}</p>
          ${priceDisplay}
        </div>
      </li>
    `;

    subscribe__list.insertAdjacentHTML("beforeend", item);
  });
  
    const addCartButtons = document.querySelectorAll(".product__add-cart");
    addCartButtons.forEach(async (button) => {
      button.addEventListener("click", async () => {
        const parent: HTMLLIElement = button.parentElement as HTMLLIElement;
  
        const img = parent.children[2] as HTMLImageElement;
        const src = img.src;
  
        const h4 = parent.children[3] as HTMLHeadingElement;
        const fullName: string = h4.textContent as string;
  
        const div = parent.children[4] as HTMLDivElement;
  
        const type: string = (div.firstElementChild as HTMLParagraphElement)
          .textContent as string;
        let price: string = (div.lastElementChild as HTMLParagraphElement)
          .textContent as string;
  
        price = price.replace("$", "");
  
        const newProduct: Product = {
          type: type,
          price: parseFloat(price),
          path: src,
          fullname: fullName,
          discounted_price: null,
          IsHot: ""
        };
  
        await this.addProductToCart(newProduct);
      });
    });
  }

  constructor() {
    this.getProductsByType = async () => {};
    this.filterProductsBy = async () => {};
    this.addProductToCart = async () => {};
    this.body = document.querySelector("body") as HTMLBodyElement;
    this.addHTML();
  }

  public async addHTML(): Promise<void> {
    await this.addHeader();
    await this.addEventForAccount();
    await this.addEventForCart();
    await this.addMain();
    await this.addHeroSection();
    await this.addExploreSection();
    await this.addproductsSection();
    await this.addEventsToproductsSection();
    await this.addZaraSection();
    await this.addProductsDiscountsSection();
    await this.addFooterLinks();
    await this.addFooter();
  }

  private async addHeader(): Promise<void> {
    const header: HTMLElement = document.createElement("header") as HTMLElement;
    header.className = "header";

    const insideOfHeader: string = `
    <div class='header__container'>
    <i class="bi bi-search"></i>
        <div class='header__logo-container'>
            <div class='header__logo'>
                <img src='./src/assets/images/Header/LogoParticle.png'>
                <h3 class='header__text'>coral</h3>
                <img src='./src/assets/images/Header/LogoParticle.png'>
            </div>
        </div>
        <div class='header__account-shopping'>
          <a id='account-link' href=#><i class="bi bi-person-fill"></i> Account</a>
          <a id='cart-link' href=#><i class="bi bi-bag-dash-fill"></i> Cart<span id='count-of-proudcts-in-cart'></span></a>
        </div>
    </div>

    <div class='header__links'>
       <a class='header__link' href=#>Jewelry & Accessories</a>
       <a class='header__link' href=#>Clothing & Shoes</a>
       <a class='header__link' href=#>Home & Living</a>
       <a class='header__link' href=#>Wedding & Party</a>
       <a class='header__link' href=#>Toys & Entertainment</a>
       <a class='header__link' href=#>Art & Collectibles</a>
       <a class='header__link' href=#>Craft Supplies & Tools</a>
    </div>`;
    header.insertAdjacentHTML("beforeend", insideOfHeader);

    this.body.append(header);
}

  async addMain(): Promise<void> {
    this.main = document.createElement("main") as HTMLElement;
    this.body.append(this.main);
  }

  private async addHeroSection(): Promise<void> {
    const heroSection: HTMLElement = document.createElement("section");
    heroSection.className = "hero";

    const insideHero: string = `
    <div class='hero__container'>
      <div class='hero__embed-container'>
        <h1 class='hero__header'>collections</h1>
        <pre class='hero__paragraph'>you can explore ans shop many different collection

from various barands here.</pre>
        <button class='hero__button'><i class="bi bi-bag-dash-fill"></i> shop now</button>
      </div>
      <img src='./src/assets/images/Header/Hero.png'>
      </div>
      <img class='hero__image i1' src='./src/assets/images/Header/Leaf.png'>
      <img class='hero__image i2' src='./src/assets/images/Header/Leaf2.png'>
    `;

    heroSection.insertAdjacentHTML("beforeend", insideHero);

    this.main.append(heroSection);
  }

  private async addExploreSection(): Promise<void> {
    const exploreSection: HTMLElement = document.createElement("section");

    exploreSection.className = "explore";

    const insideExplore: string = `
    <ul class='explore__icon-list'>
      <img src='./src/assets/images/Brands/Brands.png'>
      <img src='./src/assets/images/Brands/Brands2.png'>
      <img src='./src/assets/images/Brands/Brands3.png'>
      <img src='./src/assets/images/Brands/Brands4.png'>
      <img src='./src/assets/images/Brands/Brands5.png'>
      </ul>
      <ul class='explore__clothings'>
        <img width='648px' src='./src/assets/images/Explore/Explore.png'>
        <p class='explore__rotated-text'>Explore new and popular styles</p>
        <ul class='explore__clothings-small'>
          <img width='312px' src='./src/assets/images/Explore/Explore2.png'>
          <img width='312px' src='./src/assets/images/Explore/Explore3.png'>
          <img width='312px' src='./src/assets/images/Explore/Explore4.png'>
          <img width='312px' src='./src/assets/images/Explore/Explore5.png'>
        </ul>
      </ul>
        `;

    exploreSection.insertAdjacentHTML("beforeend", insideExplore);
    this.main.append(exploreSection);
  }

  private async addproductsSection(): Promise<void> {
    const productsSection: HTMLElement = document.createElement("section");
    productsSection.className = "products";

    const insideproductsSection: string = `
      <h2 class='products__header'>Or subscribe to the newsletter</h2>
      <div class='products__links-filter'>
        <ul class='products__links'>
          <li>
            <a class='products__link all-p' href="#" data-category="all">All Products</a>
          </li>
          <li>
            <a class='products__link' href="#" data-category="tshirt">T-Shirt</a>
          </li>
          <li>
            <a class='products__link' href="#" data-category="jacket">Jacket</a>
          </li>
          <li>
            <a class='products__link' href="#" data-category="shoes">Shoes</a>
          </li>
        </ul>
        <select class='products__filter'>
          <option value='filter'>Filter</option>
          <option value='price'>Price</option>
          <option value='fullname'>Fullname</option>
          <option value='type'>Type</option>
        </select>
      </div>
      <ul class='products__products'>
      </ul>`;

    productsSection.insertAdjacentHTML("beforeend", insideproductsSection);
    this.main.append(productsSection);

    const categoryLinks = productsSection.querySelectorAll('.products__link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            categoryLinks.forEach(link => link.classList.remove('selected'));
            (event.currentTarget as HTMLElement).classList.add('selected');
        });
    });
}

  private async addZaraSection(): Promise<void> {
    const zaraSection: HTMLElement = document.createElement("section");

    zaraSection.className = "zara";

    const zaraItems: string = `
      <img class='zara__bg' src='./src/assets/images/Banner/Background.png'>
      <img class='zara__logo' src='./src/assets/images/Banner/ZaraGrey.png'>
      <img class='zara__logo2' src='./src/assets/images/Banner/Zara.png'>
      <div class='zara__container'>
        <pre class='zara__text'>
Lustrous yet understated. The new evening
wear collection exclusively offered at the
reopened Giorgio Armani boutique in Los
Angeles.</pre>
        <button class='zara__button'>see collection</button>
      </div>
    `;

    zaraSection.insertAdjacentHTML("beforeend", zaraItems);

    this.main.append(zaraSection);
  }

  private async addProductsDiscountsSection(): Promise<void> {
    const productsDiscountsSection: HTMLElement =
      document.createElement("section");

    productsDiscountsSection.className = "products-discounts";

    const productsDiscountsInnerHtml: string = `
    <h2 class='products-discounts__header1'>Follow products and discounts on Instagram</h2>
    <ul class='products-discounts__images'>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post2.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post3.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post4.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post5.png'></li>
      <li><img class='products-discounts__img' src='./src/assets/images/Instagram/Post6.png'></li>
    </ul>
    <h2 class='products-discounts__header2'>Or subscribe to the newsletter</h2>
    <form class='products-discounts__form'>
      <input class='products-discounts__email' placeholder='Email address...'>
      <button class='products-discounts__button'>SUBMIT</button>
    </form>
    `;

    productsDiscountsSection.insertAdjacentHTML(
      "beforeend",
      productsDiscountsInnerHtml
    );

    this.main.append(productsDiscountsSection);
  }

  private async addFooterLinks(): Promise<void> {
    const footerLinksSection: HTMLElement = document.createElement("section");
  
    footerLinksSection.className = "footer-links";
  
    const footerLinksInnerHtml: string = `
    <ul class='footer-links__list'>
      <div class='footer-links__left-footer'>
        <div class='footer-links__header'>
          <img class='footer-links__img' src='./src/assets/images/Header/LogoParticle.png'>
          <p>coral</p>
          <img class='footer-links__img' src='./src/assets/images/Header/LogoParticle.png'>
        </div>
        <pre class='footer-links__paragraph'>
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua
        </pre>
        <div class='footer-links__social-media'>
          <i class="bi bi-facebook social-link-icon"></i>
          <i class="bi bi-twitter social-link-icon"></i>
          <i class="bi bi-linkedin social-link-icon"></i>
          <i class="bi bi-instagram social-link-icon"></i>
        </div>
      </div>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>catalog</li>
        <li class='footer-menu__item'>Necklaces</li>
        <li class='footer-menu__item'>Hoodies</li>
        <li class='footer-menu__item'>Jewelry Box</li>
        <li class='footer-menu__item'>t-shirt</li>
        <li class='footer-menu__item'>Jacket</li>
      </ul>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>about us</li>
        <li class='footer-menu__item'>Our Producers</li>
        <li class='footer-menu__item'>Sitemap</li>
        <li class='footer-menu__item'>FAQ</li>
        <li class='footer-menu__item'>About Us</li>
        <li class='footer-menu__item'>Terms & Conditions</li>
      </ul>
      <ul class='footer-menu'>
        <li class='footer-menu__header'>customer services</li>
        <li class='footer-menu__item'>Contact Us</li>
        <li class='footer-menu__item'>Track Your Order</li>
        <li class='footer-menu__item'>Product Care & Repair</li>
        <li class='footer-menu__item'>Book an Appointment</li>
        <li class='footer-menu__item'>Shipping & Returns</li>
      </ul>
    </ul>
    `;
  
    footerLinksSection.insertAdjacentHTML("beforeend", footerLinksInnerHtml);
  
    this.main.append(footerLinksSection);
  }  

  private async addFooter(): Promise<void> {
    const footer: HTMLElement = document.createElement("footer");

    footer.className = "footer";

    const footerInner: string = `
    <p class='footer__text'>© 2022 Coral , Inc.</p>
    <img class='footer__image' src='./src/assets/images/Footer/payments.png'>
    <p class='footer__text'>Scroll To Top<i class="bi bi-arrow-up-short"></i></p>
    `;

    footer.insertAdjacentHTML("beforeend", footerInner);

    this.body.append(footer);
  }

  public async bindGetProductsByType(
    handler: (type: string) => Promise<void>
  ): Promise<void> {
    this.getProductsByType = handler;
  }

  public async bindFilterProductsBy(
    handler: (filterProp: string) => Promise<void>
  ): Promise<void> {
    this.filterProductsBy = handler;
  }

  public async bindAddProductToCart(
    handler: (product: Product) => Promise<void>
  ): Promise<void> {
    this.addProductToCart = handler;
  }

  private async addEventsToproductsSection(): Promise<void> {
    const list: HTMLUListElement = document.querySelector(
      ".products__links"
    ) as HTMLUListElement;
    const links = list.children;
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", (e) => {
        e.preventDefault();
        const element = links[i] as HTMLLIElement;
        this.getProductsByType(element.textContent as string);
      });
    }

    const filterButton: HTMLSelectElement = document.querySelector(
      ".products__filter"
    ) as HTMLSelectElement;
    filterButton.addEventListener("change", (e) => {
      const select: HTMLSelectElement = e.currentTarget as HTMLSelectElement;
      const selectedItemText: string = (
        select.options[select.selectedIndex].textContent as string
      ).toLocaleLowerCase();
      this.filterProductsBy(selectedItemText);
    });
  }

  public async addEventForAccount(): Promise<void> {
    this.body.style.overflow = "auto";

    const accountLink: HTMLAnchorElement = document.querySelector(
        "#account-link"
    ) as HTMLAnchorElement;

    accountLink.addEventListener("click", async (e) => {
        e.preventDefault();

        this.body.style.overflow = "hidden";

        const moduleWindow: HTMLDivElement = document.createElement("div");

        moduleWindow.className = "module-window";

        const content: HTMLDivElement = document.createElement("div");

        content.className = "module-content animate__animated animate__fadeIn";

        const loginContent: string = `
        <i class="bi bi-x-lg"></i>
        <h2 class='module-content__header'>Log in to your account</h2>
        <div class='module-content__icons'>
            <i class="bi bi-facebook module-content__icon"></i>
            <i class="bi bi-twitter module-content__icon"></i>
            <i class="bi bi-google module-content__icon"></i>
            <i class="bi bi-linkedin module-content__icon"></i>
        </div>
        <input id='module-content__email' placeholder='  Email address'>
        <input id='module-content__password' placeholder='  Password'>
        <button class='module-content__button'>log in</button>
        <a class='module-content__forgotpass' href=# id='forgotpass-link'>Forgot password?</a>
        <a class='module-content__signup' href=# id='signup-link'>No account? Sign up</a>
        `;

        content.insertAdjacentHTML("beforeend", loginContent);

        moduleWindow.appendChild(content);

        moduleWindow.addEventListener("click", (e) => {
            if (
                e.target == moduleWindow ||
                (e.target as HTMLElement).tagName == "I"
            ) {
                setTimeout(() => {
                    content.classList.remove("animate__fadeIn");
                    content.classList.add("animate__fadeOutUp");
                }, 0);
                setTimeout(() => {
                    this.body.style.overflow = "auto";
                    moduleWindow.remove();
                }, 1000);
            }
        });

        this.main.append(moduleWindow);

        const switchToSignUp = () => {
            content.innerHTML = `
            <i class="bi bi-x-lg"></i>
            <h2 class='module-content__header'>Sign up for a new account</h2>
            <input id='module-content__name' placeholder='  Full name'>
            <input id='module-content__email' placeholder='  Email address'>
            <input id='module-content__password' placeholder='  Password'>
            <button class='module-content__button'>sign up</button>
            <a class='module-content__login' href=# id='login-link'>Already have an account? Log in</a>
            `;
            addEventListeners();
        };

        const switchToLogin = () => {
            content.innerHTML = loginContent;
            addEventListeners();
        };

        const switchToForgotPassword = () => {
            content.innerHTML = `
            <i class="bi bi-x-lg"></i>
            <h2 class='module-content__header'>Reset your password</h2>
            <input id='module-content__email' placeholder='  Email address'>
            <button class='module-content__button'>Reset password</button>
            <a class='module-content__login' href=# id='login-link'>Remembered? Log in</a>
            `;
            addEventListeners();
        };

        const addEventListeners = () => {
            const signupLink: HTMLAnchorElement = document.querySelector(
                "#signup-link"
            ) as HTMLAnchorElement;
            if (signupLink) {
                signupLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    switchToSignUp();
                });
            }

            const loginLink: HTMLAnchorElement = document.querySelector(
                "#login-link"
            ) as HTMLAnchorElement;
            if (loginLink) {
                loginLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    switchToLogin();
                });
            }

            const forgotPassLink: HTMLAnchorElement = document.querySelector(
                "#forgotpass-link"
            ) as HTMLAnchorElement;
            if (forgotPassLink) {
                forgotPassLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    switchToForgotPassword();
                });
            }
        };

        addEventListeners();
    });
}

public async addEventForCart(): Promise<void> {
  const cartLink: HTMLAnchorElement = document.querySelector(
      "#cart-link"
  ) as HTMLAnchorElement;

  cartLink.addEventListener("click", async (e) => {
      e.preventDefault();

      this.body.style.overflow = "hidden";

      const cartWindow: HTMLDivElement = document.createElement("div");

      cartWindow.className = "module-window";

      const cartContent: HTMLDivElement = document.createElement("div");

      cartContent.className = "cart-content";

      const insideCart: string = `
      <div class='cart-content'>
       <div class='cart-content__c1'>
        <div class='cart-content__logo'>
            <img src='./src/assets/images/Header/LogoParticle.png'>
            <h3 class='cart-content__paragraph'>coral</h3>
            <img src='./src/assets/images/Header/LogoParticle.png'>
        </div>
        <i class='bi bi-x-lg cart-content__close'></i>
       </div>
       <ul class='cart-content__products'>
       </ul>
       <div class='cart-content__footer'>
          <p class='cart-content__ordernote'>Add Order Note</p>
          <p class='cart-content__shipping'>Shipping & taxes calculated at checkout</p>
          <button class='cart-content__btn'>Checkout - $<span class='cart-content__totalcost'></span></button>
       </div>
      </div>
      `;

      cartContent.insertAdjacentHTML("beforeend", insideCart);

      cartContent.className =
          "cart-content animate__animated animate__slideInRight";

      cartWindow.append(cartContent);

      cartWindow.addEventListener("click", (e) => {
          if (
              e.target == cartWindow ||
              (e.target as HTMLElement).tagName == "I"
          ) {
              setTimeout(() => {
                  cartContent.classList.remove("animate__slideInRight");
                  cartContent.classList.add("animate__slideOutRight");
              }, 0);
              setTimeout(() => {
                  this.body.style.overflow = "auto";
                  cartWindow.remove();
              }, 1000);
          }
      });

      this.main.append(cartWindow);

      await this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
  });
}

public async updateCartView(cart: Cart[]) {
  const totalCost: HTMLSpanElement = document.querySelector(
    ".cart-content__totalcost"
  ) as HTMLSpanElement;

  let sum = 0;

  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].count * cart[i].product.price;
  }

  totalCost.textContent = LocalStorage.getTotalCost().toFixed(2).toString();

  const listOfProducts: HTMLUListElement = document.querySelector(
    ".cart-content__products"
  ) as HTMLUListElement;
  listOfProducts.innerHTML = "";
  cart.forEach((c, index) => {
    const i = `
  <li class='cart-content__product'>
    <img src='${c.product.path}' class='cart-content__product-image'>
    <div class='cart-content__product-info'>
      <p class='cart-content__product-name'>${c.product.fullname}</p>
      <p class='cart-content__product-price'>$${c.product.price}</p>
      <div class='cart-content__increase-decrease-remove'>
        <div class='cart-content__increase-decrease'>
          <b id='d${index}' class="bi bi-dash"></b>
          <p class='cart-content__count'>${c.count}</p>
          <b id='i${index}' class="bi bi-plus"></b>
        </div>
        <a id='r${index}' class='cart-content__remove' href=#><i class="bi bi-trash3-fill"></i></a>
     </div>
    </div>
 </li>`;
    listOfProducts.insertAdjacentHTML("beforeend", i);

    const removeLink = document.querySelector(`#r${index}`);
    const increaseBtn = document.querySelector(`#i${index}`);
    const decreaseBtn = document.querySelector(`#d${index}`);

    removeLink?.addEventListener("click", (e) => {
      e.preventDefault();
      LocalStorage.removeProductFromLocalStorage(index);
      this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      e.stopPropagation();
    });

    increaseBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      LocalStorage.increaseProductCount(index);
      this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      e.stopPropagation();
    });

    decreaseBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      LocalStorage.decreaseProductCount(index);
      this.updateCartView(LocalStorage.readAllProductsFromLocalStorage());
      e.stopPropagation();
    });
  });

  function closeMenu() {
    const menu = document.querySelector(".cart-menu");
    menu?.classList.remove("open");
  }

  document.addEventListener("click", (e) => {
    const menu = document.querySelector(".cart-menu");
    const isClickInsideMenu = menu?.contains(e.target as Node);
    if (!isClickInsideMenu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}
}