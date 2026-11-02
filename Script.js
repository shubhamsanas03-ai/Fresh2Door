// Fresh2Door Product Data

const productsData = [

    {
        id: 1,
        name: "Fresh Tomato",
        weight: "1 kg",
        price: 32,
        category: "Vegetables",
        emoji: "🍅"
    },

    {
        id: 2,
        name: "Fresh Onion",
        weight: "1 kg",
        price: 42,
        category: "Vegetables",
        emoji: "🧅"
    },

    {
        id: 3,
        name: "Fresh Potato",
        weight: "1 kg",
        price: 35,
        category: "Vegetables",
        emoji: "🥔"
    },

    {
        id: 4,
        name: "Fresh Coriander",
        weight: "1 Bunch",
        price: 15,
        category: "Vegetables",
        emoji: "🌿"
    },

    {
        id: 5,
        name: "Fresh Apple",
        weight: "1 kg",
        price: 120,
        category: "Fruits",
        emoji: "🍎"
    },

    {
        id: 6,
        name: "Fresh Banana",
        weight: "1 Dozen",
        price: 60,
        category: "Fruits",
        emoji: "🍌"
    },

    {
        id: 7,
        name: "Fresh Orange",
        weight: "1 kg",
        price: 90,
        category: "Fruits",
        emoji: "🍊"
    },

    {
        id: 8,
        name: "Amul Taaza Milk",
        weight: "500 ml",
        price: 28,
        category: "Dairy",
        emoji: "🥛"
    },

    {
        id: 9,
        name: "Amul Butter",
        weight: "100 g",
        price: 60,
        category: "Dairy",
        emoji: "🧈"
    },

    {
        id: 10,
        name: "Bread",
        weight: "400 g",
        price: 45,
        category: "Essentials",
        emoji: "🍞"
    },

    {
        id: 11,
        name: "Rice",
        weight: "5 kg",
        price: 350,
        category: "Essentials",
        emoji: "🍚"
    },

    {
        id: 12,
        name: "Wheat Flour",
        weight: "5 kg",
        price: 280,
        category: "Essentials",
        emoji: "🌾"
    }

];


// Cart

let cart = [];


// Display Products

function displayProducts(products) {

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    document.getElementById("productCount").innerText =
        products.length + " products";


    if (products.length === 0) {

        container.innerHTML =
            "<p>No products found 😔</p>";

        return;
    }


    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>

            <h3>${product.name}</h3>

            <p class="weight">
                ${product.weight}
            </p>

            <p class="price">
                ₹${product.price}
            </p>

            <button
                class="add-btn"
                onclick="addToCart(${product.id})">

                + Add to Cart

            </button>

        `;


        container.appendChild(card);

    });

}


// Add Product to Cart

function addToCart(id) {

    const product =
        productsData.find(p => p.id === id);


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();



}


// Update Cart

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    let totalQuantity = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

    });


    cartCount.innerText = totalQuantity;


    displayCart();

}


// Display Cart

function displayCart() {

    const container =
        document.getElementById("cartItems");


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div>
                <strong>${item.emoji} ${item.name}</strong>
                <br>
                ₹${item.price} × ${item.quantity}
            </div>

            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                ${item.quantity}

                <button
                    onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

        `;


        container.appendChild(div);

    });


    document.getElementById("cartTotal").innerText =
        total;

}


// Change Quantity

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


// Open Cart

function openCart() {

    document.getElementById("cartModal")
        .style.display = "block";

}


// Close Cart

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


// Search Products

function searchProducts() {

    const search =
        document.getElementById("searchBox")
        .value
        .toLowerCase();


    const filtered =
        productsData.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

        );


    displayProducts(filtered);

}


// Category Filter

function filterCategory(category) {

    if (category === "All") {

        displayProducts(productsData);

        return;
    }


    const filtered =
        productsData.filter(product =>

            product.category === category

        );


    displayProducts(filtered);

}


// Scroll to Products

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty 🛒");

        return;
    }

    localStorage.setItem(
        "fresh2doorCart",
        JSON.stringify(cart)
    );

    window.location.href = "Checkout.html";
}// ===============================
// Fresh2Door Login / Register
// ===============================

// Register
function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim().toLowerCase();

    const mobile =
        document.getElementById("registerMobile").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("registerMessage");


    // Password check
    if (password !== confirmPassword) {

        message.innerText = "Passwords do not match ❌";
        message.style.color = "red";

        return;
    }


    // Check existing account
    const existingUser =
        JSON.parse(localStorage.getItem("fresh2doorUser"));


    if (existingUser &&
        existingUser.email === email) {

        message.innerText =
            "Account already exists. Please login.";

        message.style.color = "red";

        return;
    }


    // Save user information
    const user = {

        name: name,
        email: email,
        mobile: mobile,
        password: password

    };


    localStorage.setItem(
        "fresh2doorUser",
        JSON.stringify(user)
    );


    message.innerText =
        "Registration successful! ✅";

    message.style.color = "green";


    // Go to Login
    setTimeout(function () {

        window.location.href = "Login.html";

    }, 1000);

}


// Login
function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
        document.getElementById("loginPassword")
        .value;


    const message =
        document.getElementById("loginMessage");


    // Get saved user
    const user =
        JSON.parse(localStorage.getItem("fresh2doorUser"));


    if (!user) {

        message.innerText =
            "No account found. Please register first.";

        message.style.color = "red";

        return;
    }


    // Check login details
    if (email === user.email &&
        password === user.password) {


        // Save login status
        localStorage.setItem(
            "fresh2doorLoggedIn",
            "true"
        );


        localStorage.setItem(
            "fresh2doorCurrentUser",
            JSON.stringify(user)
        );


        message.innerText =
            "Login successful! ✅";

        message.style.color = "green";


        setTimeout(function () {

            window.location.href = "Index.html";

        }, 800);


    } else {

        message.innerText =
            "Invalid email or password ❌";

        message.style.color = "red";

    }

}


// Logout
function logoutUser() {

    localStorage.removeItem(
        "fresh2doorLoggedIn"
    );

    localStorage.removeItem(
        "fresh2doorCurrentUser"
    );

    window.location.href = "Login.html";

}


// Check Login Status
function isUserLoggedIn() {

    return localStorage.getItem(
        "fresh2doorLoggedIn"
    ) === "true";

}


// Get Current User
function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "fresh2doorCurrentUser"
        )
    );

}


// Protect Checkout
function goToCheckout() {

    if (!isUserLoggedIn()) {

        alert(
            "Please login first to continue to checkout 🔐"
        );

        window.location.href = "Login.html";

        return;
    }


    checkout();

}


// Automatically connect Register form
document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            registerUser
        );

    }


    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }

});