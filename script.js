// ========================
// Navbar toggle (for small screen)
// ========================
const nav = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// ========================
// "See More" button functionality
// ========================
const seeMoreBtn = document.querySelector(".see-more a");
const productGrid = document.querySelector(".product-grid");

seeMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();

  productGrid.appendChild(newCard);
});

// ========================
// Cart system with sidebar + localStorage
// ========================
const cartIcon = document.querySelector(".icon");
const cartCountSpan = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update UI from storage
function updateCartUI() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeItem(${index})">🗑️</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartCountSpan.textContent = cart.length;
  cartTotalEl.textContent = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item from cart
window.removeItem = function (index) {
  cart.splice(index, 1);
  updateCartUI();
};

// Add products to cart when clicking on product-card
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.querySelector("h3").textContent;
    const price = parseFloat(
      card.querySelector(".price").textContent.replace("$", "")
    );
    cart.push({ name, price });
    updateCartUI();
  });
});

// Open cart sidebar
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
});

// Close cart sidebar
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Load on page start
updateCartUI();

// ========== Wishlist Sidebar ==========
const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistSidebar = document.getElementById("wishlist-sidebar");
const closeWishlistBtn = document.getElementById("close-wishlist");
const wishlistItemsList = document.getElementById("wishlist-items");

// ==========================
// Wishlist state
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Update Wishlist UI
function updateWishlistUI() {
  const wishlistItemsList = document.getElementById("wishlist-items");
  const wishlistCountSpan = document.getElementById("wishlist-count");

  wishlistItemsList.innerHTML = "";
  wishlist.forEach((name, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${name}
      <button onclick="removeWishlist(${index})">🗑️</button>
    `;
    wishlistItemsList.appendChild(li);
  });

  wishlistCountSpan.textContent = wishlist.length;
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Remove from wishlist
window.removeWishlist = (i) => {
  wishlist.splice(i, 1);
  updateWishlistUI();
};

// Card Love Icon → Add to Wishlist
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // যেন card click এর সাথে clash না হয়
    const card = e.target.closest(".product-card");
    const name = card.querySelector("h3").textContent;

    if (!wishlist.includes(name)) {
      wishlist.push(name);
      updateWishlistUI();
      alert(`❤️ ${name} added to Wishlist!`);
    } else {
      alert(`⚠️ ${name} is already in Wishlist`);
    }
  });
});

// Init
updateWishlistUI();

// Card Love Icon → Add to Wishlist with animation
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // card click block
    const card = e.target.closest(".product-card");
    const name = card.querySelector("h3").textContent;

    if (!wishlist.includes(name)) {
      wishlist.push(name);
      updateWishlistUI();

      // Animation add
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 500);
    } else {
      alert(`⚠️ ${name} is already in Wishlist`);
    }
  });
});

// Toast function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // 2 sec later hide
}

// Wishlist এ add করলে toast দেখাও
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = e.target.closest(".product-card");
    const name = card.querySelector("h3").textContent;

    if (!wishlist.includes(name)) {
      wishlist.push(name);
      updateWishlistUI();
      showToast(`✅ ${name} added to Wishlist!`);

      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 500);
    } else {
      showToast(`⚠️ ${name} is already in Wishlist`);
    }
  });
});
