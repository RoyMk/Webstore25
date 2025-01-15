document.addEventListener("DOMContentLoaded", () => {


    let currentPrice = document.querySelector('.price');
    let currentPriceCopy = currentPrice.textContent;

    class CartManager {
        constructor() {

        }




    }



    class Calculator {
        constructor() {
        }
    }

    class UIManager {
        constructor() {
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


});

