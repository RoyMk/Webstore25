document.addEventListener("DOMContentLoaded", () => {


    let currentPrice = document.querySelector('.price');
    let currentPriceCopy = currentPrice.textContent;
    // addToCartButton - buttonHomepage
    // shopping-cart - cart parent
    // cart-badge  - amount of items in cart
    class CartManager {
        constructor(cart) {
            this.cart = cart;


        }

        getCart() {
            return this.cart.querySelector(".shopping-cart")

        }

        addToCart() {

        }

    }


    class Calculator {
        constructor() {
        }
    }

    class UIManager {

        #addItemToCartButton;

        constructor(productCard) {
            this.productCard = productCard;
            this.#getAddToCartButton()

        }



        getCardPrice() {
            const getProductPrice = this.productCard.querySelector(".price").textContent;
        }
        #getAddToCartButton() {
            this.#addItemToCartButton =  this.productCard.querySelector(".add-to-cart-button")
            this.#addItemToCartButton.addEventListener("click", () => {
                alert("Added to cart");
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

    let uiManager = new UIManager(document.getElementById('cardA'));



    let cartManager = new CartManager(document.querySelector('.shopping-cart'));



});

