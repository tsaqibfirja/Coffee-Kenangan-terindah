document.addEventListener("alpine:init", () => {
  Alpine.data("shop", () => ({
    products: [
      {
        id: 1,
        name: "Signature Coffee",
        price: 30000,
        img: "Imeg/Signature-coffee.webp",
        rating: 5,
      },
      {
        id: 2,
        name: "Cold Brew",
        price: 30000,
        img: "Imeg/Clod Brew & Nitro Coffee.webp",
        rating: 4,
      },
      {
        id: 3,
        name: "Manual Brew",
        price: 30000,
        img: "Imeg/Manual-Brew.webp",
        rating: 5,
      },
    ],

    cartItems: [],
    isCartOpen: false,

    // Tambahkan item ke shopping bag
    addToCart(product) {
      let found = this.cartItems.find((item) => item.id === product.id);
      if (found) {
        found.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.updateCartTotal();
    },

    // Menghapus item dari shopping bag
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      this.updateCartTotal();
    },

    // Menghitung jumlah total item dalam shopping bag
    get cartCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    // Menghitung total harga di shopping bag
    get cartTotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // Checkout Function (sementara hanya alert)
    checkout() {
      alert("Checkout berhasil! Total pembayaran: IDR " + this.cartTotal);
    },
  }));
});
