document.addEventListener("DOMContentLoaded", () => {

    class CartManager {

        constructor() {
        }

        counter = 0

        addToCart(badge, badgeCounter) {
            this.counter++
            badge.classList.add('show-shopping-cart-badge');
            badgeCounter.textContent = this.counter.toString();
        }


    }

    // Handles UI interaction
    class UiManager {
        #cartBadge
        #cartBadgeCounter
        #addToCartButton;

        constructor({cart, cartManager, card}) {
            this.cart = cart;
            this.cartManager = cartManager;
            this.card = card;

            this.#cartBadge = this.cart.querySelector(".cart-badge")
            this.#cartBadgeCounter = this.cart.querySelector(".badge-counter")
            this.#addToCartButton = this.card.querySelector("#addToCartButton")
            this.#bindEvents()
        }

        #bindEvents() {
            this.#addToCartButton.addEventListener("click", () => {
                this.cartManager.addToCart(this.#cartBadge, this.#cartBadgeCounter)
            })
        }
    }

    class Formatter {
        constructor() {
        }

        static formatCurrency(amount, currencyCode = 'USD', locale = 'en-US', decimalPlaces = 2) {
            const formatter = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
            return formatter.format(amount);
        }

        static removeCurrencyFormatting(str) {
            return str.replace(/[$,]/g, '');
        }
    }

    let cardA = document.querySelector('#CardA');
    new UiManager({
        cart: document.querySelector('.shopping-cart'),
        cartManager: new CartManager(),
        card: document.querySelector('#cardA'),
    });

});

