addEventListener('DOMContentLoaded', () => {
    class TemplateManager {
        #copy;
        #productCard;

        constructor(template) {
            this.template = template;
            this.#copy = null;
            this._id = null;
            this._description = null;
            this._discount = null;
        }

        init() {
            this.#copy = this.template.content.cloneNode(true);
            this.#productCard = this.#copy.querySelector('.product-card');
            // console.log(` Successfully Copied ${this.template.outerHTML}`)

        }

        get id() {
            return this._id;
        }

        get title() {
            return this._title;
        }

        get description() {
            return this._description;
        }

        setInitialDiscount(discount) {
            this._discount = discount;
        }

        setItemDescription(description) {
            this._description = description
        }

        storeSavedHTML() {
            localStorage.setItem("innerHTML", document.querySelector(".main-content").innerHTML);
        }

        setCardId(id) {
            this._id = id;
            this.#productCard.id = this._id;
        }

        pushTemplate() {
            document.querySelector(".main-content").appendChild(this.#copy);
            this.storeSavedHTML();

        }

        setTitle(title) {
            this._title = title;
        }
    }

    class FormHandler {
        #formFields

        constructor() {
            this._keys = null;
        }

        init() {
            this._keys = ["description", "price", "discount"];
            this.#formFields = [
                ...document.getElementsByName("item-description"),
                ...document.getElementsByName("item-price"),
                ...document.getElementsByName("initial-discount")
            ]


        }


        indexFormField() {
            // we use a callback function here to map the keys with the dom element values
            // example. key = "description" value = item which is the dom element ...document.getElementsByName("item-description")
            return this.#formFields.reduce((accumulator, item, index) => {
                accumulator[this._keys[index]] = item.value;
                return accumulator;
            }, {});
        }
    }

    const productForm = document.querySelector(".itemForm")
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        Execute();
    })

    function Execute() {
        let formHandler = new FormHandler();
        let template = new TemplateManager();
        formHandler.init()
        // template.init();

        let s = formHandler.indexFormField()
      

    }

})












