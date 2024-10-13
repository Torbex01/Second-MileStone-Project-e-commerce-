// Initial cart state
let cartItems = [];

// Function to handle adding items to the cart
function addItemToCart(name, price, quantity) {
    const itemIndex = cartItems.findIndex(item => item.name === name);
    
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += quantity;
        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }
    } else if (quantity > 0) {
        cartItems.push({ name, price, quantity });
    }

    updateCartList();
}

// Function to update the cart list and display elements
function updateCartList() {
    const cartList = document.querySelector(".my-cart p");
    cartList.innerHTML = ''; // Clear the current cart list

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const newItem = document.createElement("div");
            newItem.innerHTML = `${item.name} @ ${item.quantity} x $${item.price.toFixed(2)}`;
            cartList.appendChild(newItem);
        });

        document.querySelector(".my-cart img").style.display = "none";
        document.querySelector("#confirm-button").style.display = "block";
        document.querySelector(".total-amount").style.display = "flex";
        document.querySelector(".carbon-notice").style.display = "flex";
    } else {
        cartList.innerHTML = "Your added items will appear here";
        document.querySelector(".my-cart img").style.display = "block";
        document.querySelector("#confirm-button").style.display = "none";
        document.querySelector(".total-amount").style.display = "none";
        document.querySelector(".carbon-notice").style.display = "none";
    }

    document.querySelector("h1 span").innerText = cartItems.length;

    updateTotalAmount();
}

// Function to update the total amount
function updateTotalAmount() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById("total-value").innerText = `$${total.toFixed(2)}`;
}

// Function to reset the cart
function resetCart() {
    cartItems = [];

    document.querySelector(".my-cart p").innerHTML = "Your added items will appear here";
    document.querySelector("h1 span").innerText = "0";
    document.querySelector(".my-cart img").style.display = "block";
    document.querySelector("#confirm-button").style.display = "none";
    document.querySelector(".total-amount").style.display = "none";
    document.querySelector(".carbon-notice").style.display = "none";

    // Reset all quantity containers back to "Add to cart" button state
    document.querySelectorAll('.quantity-container').forEach(container => {
        container.style.display = 'none';
        const cartButton = container.parentElement.querySelector('.cart-button');
        cartButton.style.display = 'flex'; // Ensure Add to Cart button displays correctly
    });
}

// Add event listener to each "Add to cart" button
document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', function () {
        const menuItem = this.parentElement;
        const name = menuItem.querySelector('.dessert-name').innerText;
        const price = parseFloat(menuItem.querySelector('.dessert-price span').innerText);
        const quantity = 1;

        const quantityContainer = menuItem.querySelector('.quantity-container');
        quantityContainer.style.display = 'flex'; // Display the quantity container as flex for layout
        this.style.display = 'none'; // Hide the Add to Cart button

        addItemToCart(name, price, quantity);
    });
});

// Add event listener to Confirm Order button
document.querySelector("#confirm-button").addEventListener("click", function() {
    alert("Order confirmed!");
    resetCart();
});

// Add event listeners for increment and decrement buttons
document.querySelectorAll('.increment-button').forEach(button => {
    button.addEventListener('click', function () {
        const menuItem = this.parentElement.parentElement;
        const name = menuItem.querySelector('.dessert-name').innerText;
        const price = parseFloat(menuItem.querySelector('.dessert-price span').innerText);

        const quantityElement = this.previousElementSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity += 1;
        quantityElement.innerText = quantity;

        addItemToCart(name, price, 1);
    });
});

document.querySelectorAll('.decrement-button').forEach(button => {
    button.addEventListener('click', function () {
        const menuItem = this.parentElement.parentElement;
        const name = menuItem.querySelector('.dessert-name').innerText;
        const price = parseFloat(menuItem.querySelector('.dessert-price span').innerText);

        const quantityElement = this.nextElementSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity -= 1;

        if (quantity <= 0) {
            this.parentElement.style.display = 'none';
            const cartButton = menuItem.querySelector('.cart-button');
            cartButton.style.display = 'flex'; // Restore the Add to Cart button as flex to maintain layout

            addItemToCart(name, price, -1);
        } else {
            quantityElement.innerText = quantity;
            addItemToCart(name, price, -1);
        }
    });
});
