// ========================
// Navbar toggle (for small screen)
// ========================
const nav = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// ========================
// Cart + Wishlist Sidebars
// ========================
const cartIcon = document.querySelector(".icon");
const cartCountSpan = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistSidebar = document.getElementById("wishlist-sidebar");
const closeWishlistBtn = document.getElementById("close-wishlist");
const wishlistItemsList = document.getElementById("wishlist-items");
const wishlistCountSpan = document.getElementById("wishlist-count");

// ========================
// State (with LocalStorage)
// ========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ========================
// Toast function
// ========================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast " + type + " show";

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ========================
// Cart UI Update
// ========================
function updateCartUI() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">🗑️</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartCountSpan.textContent = cart.length;
  cartTotalEl.textContent = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item from cart
window.removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartUI();
  showToast("❌ Item removed from Cart", "error");
};

// ========================
// Wishlist UI Update
// ========================
function updateWishlistUI() {
  wishlistItemsList.innerHTML = "";
  wishlist.forEach((name, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${name}
      <button onclick="removeFromWishlist(${index})">🗑️</button>
    `;
    wishlistItemsList.appendChild(li);
  });

  wishlistCountSpan.textContent = wishlist.length;
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Remove from wishlist
window.removeFromWishlist = (index) => {
  const name = wishlist[index];
  wishlist.splice(index, 1);
  updateWishlistUI();
  showToast(`❌ ${name} removed from Wishlist`, "error");
};

// ========================
// Product Data
// ========================
const products = [
  {
    name: "Flex Tripod",
    price: 50.48,
    rating: 4.5,
    reviews: 458,
    img: "./images/tripod.png",
  },
  {
    name: "Microphone",
    price: 120.25,
    rating: 4.6,
    reviews: 419,
    img: "./images/microphone.png",
  },
  {
    name: "Airbuds",
    price: 100.0,
    rating: 4.6,
    reviews: 455,
    img: "./images/airbuds.png",
  },
  {
    name: "Drone",
    price: 980.25,
    rating: 4.6,
    reviews: 450,
    img: "./images/drone.png",
  },
];

// ========================
// Render Products
// ========================
function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <button class="wishlist-btn" data-index="${index}">❤</button>
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)}</p>
      <div class="stars">⭐ ${p.rating} (${p.reviews})</div>
      <p class="delivery">Express protection possible!</p>
      <button class="add-cart" data-index="${index}">🛒 Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  attachWishlistEvents();
  attachCartEvents();
}

// ========================
// Attach Events
// ========================
function attachWishlistEvents() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const product = products[btn.dataset.index];
      if (!wishlist.includes(product.name)) {
        wishlist.push(product.name);
        updateWishlistUI();
        showToast(`✅ ${product.name} added to Wishlist`, "success");
        btn.classList.add("active");
      } else {
        showToast(`⚠️ ${product.name} already in Wishlist`, "warning");
      }
    });
  });
}

function attachCartEvents() {
  document.querySelectorAll(".add-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = products[btn.dataset.index];
      cart.push(product);
      updateCartUI();
      showToast(`🛒 ${product.name} added to Cart`, "success");
    });
  });
}

// ========================
// Sidebar Open/Close
// ========================
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

wishlistBtn.addEventListener("click", () => {
  wishlistSidebar.classList.add("active");
});
closeWishlistBtn.addEventListener("click", () => {
  wishlistSidebar.classList.remove("active");
});

// ========================
// Init
// ========================
renderProducts();
updateCartUI();
updateWishlistUI();
