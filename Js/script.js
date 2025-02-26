// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping bag
const shoppingBag = document.querySelector(".shopping-bag");
document.querySelector("#shopping-bag-button").onclick = (e) => {
  shoppingBag.classList.toggle("active");
  e.preventDefault();
};

// Pastikan elemen ada sebelum diakses
document.addEventListener("DOMContentLoaded", () => {
  const shoppingBag = document.querySelector(".shopping-bag");
  const shoppingBagButton = document.querySelector("#shopping-bag-button");

  if (shoppingBagButton) {
    shoppingBagButton.addEventListener("click", (e) => {
      shoppingBag.classList.toggle("active");
      e.preventDefault();
    });
  }

  document.addEventListener("click", function (e) {
    if (
      shoppingBagButton &&
      shoppingBag &&
      !shoppingBagButton.contains(e.target) &&
      !shoppingBag.contains(e.target)
    ) {
      shoppingBag.classList.remove("active");
    }
  });
});

// Klik di luar elemen
const hamburger = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sbg = document.querySelector("#shopping-bag-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sbg.contains(e.target) && !shoppingBag.contains(e.target)) {
    shoppingBag.classList.remove("active");
  }
});

// Modal Box
const modal = document.getElementById("item-detail-modal");
const closeModal = document.getElementById("close-modal");

// Ambil elemen dalam modal yang akan diubah
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalStars = document.getElementById("modal-stars");
const modalPrice = document.getElementById("modal-price");
const modalOldPrice = document.getElementById("modal-old-price");

// Tambah event listener ke semua tombol "eye"
document.querySelectorAll(".item-detail-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Ambil elemen produk terdekat (bisa dari .menu-card atau .product-card)
    const productCard = btn.closest(".menu-card, .product-card");

    // Ambil data produk dari elemen HTML
    const productImage = productCard.querySelector("img").src;
    const productName =
      productCard.querySelector(".product-title, h3").innerText;
    const productPrice = productCard
      .querySelector(".product-price")
      .childNodes[0].nodeValue.trim();
    const productOldPrice = productCard.querySelector(".old-price")
      ? productCard.querySelector(".old-price").innerText
      : "";

    // Set data ke modal
    modalImage.src = productImage;
    modalTitle.innerText = productName;
    modalDescription.innerText = `Nikmati ${productName} dengan cita rasa terbaik dari bahan pilihan kami!`;
    modalPrice.innerText = productPrice;
    modalOldPrice.innerText = productOldPrice ? `IDR ${productOldPrice}` : "";

    // Update rating bintang (hardcoded)
    modalStars.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      modalStars.innerHTML += '<i data-feather="star" class="star"></i>';
    }

    // Render ulang ikon Feather
    feather.replace();

    // Tampilkan modal
    modal.style.display = "flex";
  });
});

// Tutup modal saat tombol X diklik
closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});

// Tutup modal saat klik di luar modal-container
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let bag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
  const shoppingBag = document.querySelector(".shopping-bag");
  const shoppingBagButton = document.querySelector("#shopping-bag-button");
  const bagContainer = document.querySelector(".shopping-bag .bag-items");
  const totalPriceEl = document.querySelector(".shopping-bag .total-price");
  const cartCountEl = document.querySelector(".cart-count");

  // Fungsi untuk menyimpan shopping bag ke localStorage
  function saveToLocalStorage() {
    localStorage.setItem("shoppingBag", JSON.stringify(bag));
  }

  // Fungsi untuk menambahkan produk ke shopping bag
  function addToBag(product) {
    let existingProduct = bag.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      bag.push({ ...product, quantity: 1 });
    }

    saveToLocalStorage(); // Simpan ke local storage
    updateBagUI();
  }

  // Fungsi untuk mengupdate tampilan shopping bag
  function updateBagUI() {
    bagContainer.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0;

    bag.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;

      let bagItem = document.createElement("div");
      bagItem.classList.add("bag-item");
      bagItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="item-detail">
          <h3>${item.name}</h3>
          <p>Harga: IDR ${item.price.toLocaleString()}</p>
          <p>Jumlah: 
            <button class="qty-btn decrease" data-index="${index}">-</button> 
            <span>${item.quantity}</span> 
            <button class="qty-btn increase" data-index="${index}">+</button>
          </p>
          <button class="remove-btn" data-index="${index}">Hapus</button>
        </div>
      `;

      bagContainer.appendChild(bagItem);
    });

    totalPriceEl.innerHTML = `Total: IDR ${totalPrice.toLocaleString()}`;
    cartCountEl.innerText = totalItems; // Update jumlah item di ikon shopping bag

    // Event listener untuk tombol tambah & kurang jumlah produk
    document.querySelectorAll(".qty-btn.increase").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        bag[index].quantity += 1;
        saveToLocalStorage();
        updateBagUI();
      });
    });

    document.querySelectorAll(".qty-btn.decrease").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        if (bag[index].quantity > 1) {
          bag[index].quantity -= 1;
        } else {
          bag.splice(index, 1); // Hapus produk jika quantity 0
        }
        saveToLocalStorage();
        updateBagUI();
      });
    });

    // Event listener untuk tombol hapus produk dari shopping bag
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        bag.splice(index, 1);
        saveToLocalStorage();
        updateBagUI();
      });
    });
  }

  // Event listener untuk semua tombol "Add to Bag"
  document.querySelectorAll(".shopping-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const productCard = btn.closest(".product-card");

      let product = {
        id: productCard.dataset.id,
        name: productCard.querySelector(".product-title").innerText,
        price: parseInt(
          productCard
            .querySelector(".product-price")
            .textContent.replace(/\D/g, "")
        ),
        img: productCard.querySelector("img").src,
      };

      addToBag(product);

      // Tampilkan shopping bag setelah menambahkan produk
      shoppingBag.classList.add("active");
    });
  });

  // Toggle shopping bag saat ikon shopping bag diklik
  shoppingBagButton.addEventListener("click", (e) => {
    shoppingBag.classList.toggle("active");
    e.preventDefault();
  });

  // Tutup shopping bag saat klik di luar area bag
  document.addEventListener("click", function (e) {
    if (
      !shoppingBagButton.contains(e.target) &&
      !shoppingBag.contains(e.target)
    ) {
      shoppingBag.classList.remove("active");
    }
  });

  // Load shopping bag dari localStorage saat halaman dimuat
  updateBagUI();
});

document.addEventListener("DOMContentLoaded", function () {
  const shoppingBagIcon = document.querySelector(".fa-shopping-bag"); // Ganti sesuai class ikon shopping bag
  const shoppingBagModal = document.querySelector(".shopping-bag");

  if (!shoppingBagIcon || !shoppingBagModal) {
    console.error("Elemen ikon atau modal tidak ditemukan!");
    return;
  }

  const closeModalBtn = document.createElement("button");
  closeModalBtn.innerHTML = "×";
  closeModalBtn.classList.add("close-btn");
  shoppingBagModal.appendChild(closeModalBtn);

  function toggleShoppingBag() {
    shoppingBagModal.classList.toggle("active");
    console.log(
      "Modal toggled:",
      shoppingBagModal.classList.contains("active")
    ); // Cek apakah class active ditambahkan
  }

  shoppingBagIcon.addEventListener("click", toggleShoppingBag);
  closeModalBtn.addEventListener("click", toggleShoppingBag);

  document.addEventListener("click", function (event) {
    if (
      !shoppingBagModal.contains(event.target) &&
      !shoppingBagIcon.contains(event.target)
    ) {
      shoppingBagModal.classList.remove("active");
    }
  });
});
// Ambil elemen modal Shopping Bag
const shoppingBagModal = document.querySelector(".shopping-bag");
const cashoutBtn = document.getElementById("cashout-btn");
const modalOverlay = document.querySelector(".modal-overlay"); // Pastikan ada overlay
const closeModalBtn = document.querySelector(".close-modal"); // Tombol close

// Fungsi untuk membuka modal Cashout tanpa menutup Shopping Cart
cashoutBtn.addEventListener("click", function (event) {
  event.stopPropagation(); // Supaya modal shopping bag tidak ketutup
  document.querySelector(".cashout-modal").classList.add("show"); // Tampilkan modal Cashout
});

// Tambahkan event untuk tombol close modal shopping bag
closeModalBtn.addEventListener("click", function () {
  shoppingBagModal.classList.remove("show");
});

// Pastikan modal shopping bag tetap terbuka kalau pencet tombol di dalamnya
shoppingBagModal.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Tambahkan event untuk klik di luar modal supaya modal bisa tertutup
modalOverlay.addEventListener("click", function () {
  shoppingBagModal.classList.remove("show");
  document.querySelector(".cashout-modal").classList.remove("show"); // Tutup juga modal cashout
});
