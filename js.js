document.addEventListener("DOMContentLoaded", () => {
    class CartStorage {
        static KEY = "CartQtyCounter";
        static BADGE_CLASS = "show-shopping-cart-badge";

        static getQuantity() {
            return localStorage.getItem(this.KEY);
        }

        static setQuantity(value) {
            localStorage.setItem(this.KEY, value.toString());
        }
    }

    class CartUI {
        constructor() {
            this.badge = document.querySelector(".cart-badge");
            this.counter = document.querySelector(".badge-counter");
        }

        updateDisplay() {
            if (!this.badge || !this.counter) {
                console.warn("Cart UI elements not found");
                return;
            }

            const quantity = CartStorage.getQuantity();

            if (quantity !== null) {
                this.badge.classList.add(CartStorage.BADGE_CLASS);
                this.counter.textContent = quantity;
            } else {
                this.badge.classList.remove(CartStorage.BADGE_CLASS);
                this.counter.textContent = "";
            }
        }
    }

    class CartManager {
        constructor(uiManager) {
            this.uiManager = uiManager;
            this.quantity = parseInt(CartStorage.getQuantity() || "0");
        }

        addItem() {
            this.quantity++;
            CartStorage.setQuantity(this.quantity);
            this.updateUI();
        }

        updateUI() {
            const badge = this.uiManager.getCartBadge();
            const counter = this.uiManager.getCartCounter();

            if (badge && counter) {
                badge.classList.add(CartStorage.BADGE_CLASS);
                counter.textContent = this.quantity.toString();
            }
        }
    }

    class UIManager {
        #cartBadge;
        #cartCounter;
        #addToCartButton;

        constructor({cart, card}) {
            this.cart = cart;
            this.card = card;

            this.#cartBadge = this.cart.querySelector(".cart-badge");
            this.#cartCounter = this.cart.querySelector(".badge-counter");
            this.#addToCartButton = this.card.querySelector("#addToCartButton");
        }

        initializeCartManager(cartManager) {
            this.cartManager = cartManager;
            this.#bindEvents();
        }

        #bindEvents() {
            this.#addToCartButton.addEventListener("click", () => {
                this.cartManager.addItem();
            });
        }

        getCartBadge() {
            return this.#cartBadge;
        }

        getCartCounter() {
            return this.#cartCounter;
        }
    }

    class CurrencyFormatter {
        static format(amount, currencyCode = 'USD', locale = 'en-US', decimalPlaces = 2) {
            const formatter = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
            return formatter.format(amount);
        }

        static unformat(str) {
            return str.replace(/[$,]/g, '');
        }
    }

    // Initialization
    const cartUI = new CartUI();
    cartUI.updateDisplay();

    const uiManager = new UIManager({
        cart: document.querySelector('.shopping-cart'),
        card: document.querySelector('#cardA'),
    });

    const cartManager = new CartManager(uiManager);
    uiManager.initializeCartManager(cartManager);
});
