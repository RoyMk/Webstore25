document.addEventListener("DOMContentLoaded", () => 
{
    let noSale = document.querySelectorAll(".noSale");
    let saleItem = document.querySelectorAll(".editable");
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

    function calculateDiscountedPrice(originalPrice, discountPercentage) {
        // Calculate the discount amount
        const discountAmount = (discountPercentage / 100) * originalPrice;

        // Calculate the price after discount
        return originalPrice - discountAmount;
    }

    function removeCurrencyFormatting(str) {
        return str.replace(/[$,]/g, '');
    }

    
    
    let cardA = document.getElementById("cardA");


    /**
        Gets the specified element and its relevant children, it then calculates the discount off the original
     price and updates the ui with that value.
     */
    function elementGrabber(element) {
        const [price,discount,discountedPrice] = element.querySelectorAll(".price, .discount, .discounted-price");
        if(discount.textContent){
            discountedPrice.textContent = formatCurrency(calculateDiscountedPrice(removeCurrencyFormatting(price.textContent),
                discount.textContent.replace("%","")));
        }
     
        
    }
    elementGrabber(document.getElementById("cardA"));
    elementGrabber(document.getElementById("cardB"));

    
    
    
    
    
  


})
