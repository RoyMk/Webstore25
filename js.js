document.addEventListener("DOMContentLoaded", () => {


    // discount hide
    // apply discount remove from origin price
    // price after discount hide
    let isSaleTag = document.querySelectorAll(".sale");
    function hideAllDiscounts(isTrue) {

        isSaleTag.forEach(item => {

            let normal_price = item.querySelectorAll(".price");
            let price_after_discount = item.querySelectorAll(".price-after-discount")
            let discount_percent = item.querySelectorAll(".discount")



            if (isTrue) {

                price_after_discount.forEach(item => item.classList.toggle("hide"));
                discount_percent.forEach(item => item.classList.toggle("hide"));
                normal_price.forEach(item => item.classList.toggle("apply-discount"));

            }
        })
    }
    hideAllDiscounts()

    function editItemPrice(item, oldPrice, newPrice, discount, applyChanges) {
        item.forEach(element => {
            let default_price = element.querySelector(".price");
            let discounted_price = element.querySelector(".price-after-discount");
            let discount_percent_amount = element.querySelector(".discount");
    
            if (applyChanges) {

                default_price.textContent = oldPrice; // e.g., "$900"
                discounted_price.textContent = newPrice; // e.g., "$450"
                discount_percent_amount.textContent = discount; // e.g., "-5%"
                
            }
        });
    }
    
    // Example call
    let fitem = document.querySelectorAll(".editable");
    editItemPrice(fitem, "$300", "$450", "-35%", true);
    
})
