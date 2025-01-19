document.addEventListener("DOMContentLoaded", () => {

    class CartManager {

        #cartBadge
        #cartBadgeCounter
        constructor(cart) {
            this.cart = cart;
            this.#cartBadge = this.cart.querySelector(".cart-badge")
            this.#cartBadgeCounter = this.cart.querySelector(".badge-counter")
            console.log(`Cart Badge: ${this.#cartBadge.outerHTML}`)
            console.log(`cartBadgeCounter: ${this.#cartBadgeCounter.outerHTML}`)

        }

    }


    class UIManager {

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

    let cardA = document.querySelector('#cardA');
    new CartManager(document.querySelector('.shopping-cart'), cardA);

});

