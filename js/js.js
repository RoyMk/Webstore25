if (localStorage.getItem("innerHTML")) {
    document.querySelector(".main-content").innerHTML = localStorage.getItem("innerHTML");
}

document.addEventListener("DOMContentLoaded", () => {
    class CartStorage {
        static KEY = "CartQtyCounter";
        static BADGE_CLASS = "show-shopping-cart-badge";

        static getQuantity() {
            return parseInt(localStorage.getItem(this.KEY) || "0");
        }

        static setQuantity(value) {
            localStorage.setItem(this.KEY, value.toString());
        }
    }

    class CartManager {
        constructor(uiManager) {
            this.uiManager = uiManager;
            this.quantity = CartStorage.getQuantity();
            this.updateUI();
        }

        addItem() {
            this.quantity++;
            CartStorage.setQuantity(this.quantity);
            this.updateUI();
        }

        removeItem() {
            if (this.quantity > 0) {
                this.quantity--;
                CartStorage.setQuantity(this.quantity);
                console.log("Item removed. New quantity:", this.quantity);
                this.updateUI();
            }
        }

        updateUI() {
            const badge = this.uiManager.getCartBadge();
            const counter = this.uiManager.getCartCounter();
            let cartPageCounterQty = this.uiManager.getCartPageCounter();

            if(cartPageCounterQty) {
                cartPageCounterQty.textContent = `(${this.quantity})`;
            }

            if (badge && counter) {

                if (this.quantity > 0) {
                    badge.classList.add(CartStorage.BADGE_CLASS);
                    counter.textContent = this.quantity.toString();

                } else {
                    badge.classList.remove(CartStorage.BADGE_CLASS);
                    counter.textContent = "";
                }

            }

            console.log("UI updated. Current quantity:", this.quantity);

        }

    }

    class UIManager {
        #cartBadge;
        #cartCounter;
        #addToCartButton;
        #removeFromCartButton;
        #cartPageCounter

        constructor({cart, card, cartPage}) {
            this.cart = cart;
            this.card = card;
            this.cartPage = cartPage;
            this.#cartBadge = this.cart?.querySelector(".cart-badge");
            this.#cartCounter = this.cart?.querySelector(".badge-counter");
            this.#addToCartButton = this.card?.querySelector("#addToCartButton");
            this.#removeFromCartButton = this.cartPage?.querySelector("#removeItemFromCartButton");
            this.#cartPageCounter = document.querySelector(".cart-page-counter")

        }

        initializeCartManager(cartManager) {
            this.cartManager = cartManager;
            this.#bindEvents();
        }

        #bindEvents() {
            if (this.#addToCartButton) {
                this.#addToCartButton.addEventListener("click", () => {
                    this.cartManager.addItem();
                });
            }

            if (this.#removeFromCartButton) {
                this.#removeFromCartButton.addEventListener("click", () => {
                    this.cartManager.removeItem();
                });
            }
        }

        getCartBadge() {
            return this.#cartBadge;
        }

        getCartCounter() {
            return this.#cartCounter;
        }
        getCartPageCounter(){
            return this.#cartPageCounter;
        }
    }


    // Initialization
    const uiManager = new UIManager({
        cart: document.querySelector('.shopping-cart'),
        card: document.querySelector('#cardA'),
        cartPage: document.querySelector('#cardACartPage'),
    });
    const cartManager = new CartManager(uiManager);
    uiManager.initializeCartManager(cartManager);


});



// class CurrencyFormatter {
//     static format(amount, currencyCode = 'USD', locale = 'en-US', decimalPlaces = 2) {
//         const formatter = new Intl.NumberFormat(locale, {
//             style: 'currency',
//             currency: currencyCode,
//             minimumFractionDigits: decimalPlaces,
//             maximumFractionDigits: decimalPlaces
//         });
//         return formatter.format(amount);
//     }
//
//     static unformat(str) {
//         return str.replace(/[$,]/g, '');
//     }
// }