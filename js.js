document.addEventListener("DOMContentLoaded", () => {
    /**
     * Formats a number as currency.
     * @param {string} amount - The amount to format.
     * @param {string} [currencyCode='USD'] - The currency code.
     * @param {string} [locale='en-US'] - The locale to use for formatting.
     * @param {number} [decimalPlaces=2] - The number of decimal places to show.
     * @returns {string} The formatted currency string.
     */
    function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US', decimalPlaces = 2) {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });
        return formatter.format(amount);
    }

    /**
     * Calculates the percentage discount between two prices.
     * @param {string|number} originalPrice - The original price.
     * @param {string|number} newPrice - The new price.
     * @returns {string} The percentage discount, fixed to 2 decimal places.
     */
    function calculateNewPrice(originalPrice, newPrice) {
        let total = (parseFloat(originalPrice) - parseFloat(newPrice)) / parseFloat(originalPrice) * 100;
        console.log(total);
        return total.toFixed(2);
    }

    /**
     * Calculates the discounted price based on original price and discount percentage.
     * @param {string} originalPrice - The original price.
     * @param {string} discountPercentage - The discount percentage.
     * @returns {number} The discounted price.
     */
    function calculateDiscountedPrice(originalPrice, discountPercentage) {
        const discountAmount = (discountPercentage / 100) * originalPrice;
        return originalPrice - discountAmount;
    }

    /**
     * Removes currency formatting from a string.
     * @param {string} str - The string to remove formatting from.
     * @returns {string} The string without currency formatting.
     */
    function removeCurrencyFormatting(str) {
        return str.replace(/[$,]/g, '');
    }

    /**
     * Updates the UI with calculated discount for a given element.
     * @param {HTMLElement} element - The element to update.
     */
    function elementGrabber(element) {
        const [price, discount, discountedPrice] = element.querySelectorAll(".price, .discount, .discounted-price");
        if (discount.textContent) {
            discountedPrice.textContent = formatCurrency(calculateDiscountedPrice(
                removeCurrencyFormatting(price.textContent),
                discount.textContent.replace("%", "")
            ));
        }
    }

    // Apply discounts to specific cards
    elementGrabber(document.getElementById("cardA"));
    elementGrabber(document.getElementById("cardB"));
});
