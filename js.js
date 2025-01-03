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
     * Hides or shows discount-related elements.
     * @param {boolean} isTrue - Whether to hide the discounts.
     */
    function hideAllDiscounts(isTrue) {
        noSale.forEach(item => {
            let normal_price = item.querySelectorAll(".price");
            let price_after_discount = item.querySelectorAll(".price-after-discount")
            let discount_percent = item.querySelectorAll(".discount")

            if (isTrue) {
                price_after_discount.forEach(item => item.classList.toggle("hide"));
                discount_percent.forEach(item => item.classList.add("hide"));
                normal_price.forEach(item => item.classList.toggle("apply-discount"));
            }
        })
    }

    /**
     * Edits the price of items and applies discounts.
     * @param {NodeList} item - The list of items to edit.
     * @param {string} oldPrice - The original price.
     * @param {string} newPrice - The new discounted price.
     * @param {boolean} applyChanges - Whether to apply the changes.
     */
    function editItemPrice(item, oldPrice, newPrice, applyChanges) {
        item.forEach(item => {
            const elements = {
                defaultPrice: item.querySelector(".price"),
                discountedPrice: item.querySelector(".price-after-discount"),
                discountPercent: item.querySelector(".discount"),
                freeShippingTag: item.querySelector(".special-tag-freeShipping"),
                bigSaleTag: item.querySelector(".special-tag-bigSale"),
                trendingTag: item.querySelector(".special-tag-trending"),
                topSellerTag: item.querySelector(".special-tag-topSeller"),
                doubleTag: item.querySelector(".special-tag-freeShipping.special-tag-topSeller"),
                
            };
           
            const tagMappings = {
                freeShippingTag: 'FREE SHIPPING',
                trendingTag: 'TRENDING',
                bigSaleTag: 'SALE',
                topSellerTag: "TOP SELLER"
                
               
            };
            
            Object.entries(tagMappings).forEach(([key, value]) => {
                if(elements[key]) {
                    elements[key].textContent = value;
                }
            })
            
            if (applyChanges) {
                let final = calculateNewPrice(oldPrice, newPrice);
                elements.defaultPrice.textContent = formatCurrency(oldPrice)
                elements.discountedPrice.textContent = formatCurrency(newPrice);
                elements.discountPercent.textContent = final.toString() + "%"
            }
        });
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

    let noSale = document.querySelectorAll(".noSale");
    let saleItem = document.querySelectorAll(".editable");

    hideAllDiscounts(true)
    editItemPrice(saleItem, "2340", "1259", true);
})
