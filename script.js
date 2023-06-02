const products = [
    {
      id: 1,
      title: "Teléfono inteligente",
      category: "electronics",
      price: 200000
    },
    {
      id: 2,
      title: "Camiseta",
      category: "clothing",
      price: 10000
    },
    {
      id: 3,
      title: "Silla de escritorio",
      category: "furniture",
      price: 150000
    },
    // Agrega más productos de ejemplo aquí
  ];
  
  function filterProducts(category, maxPrice) {
    let filteredProducts = products;
  
    if (category !== "all") {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
  
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
  
    return filteredProducts;
  }
  
  function displayProducts(filteredProducts) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
  
    filteredProducts.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
  
      const imageElement = document.createElement("img");
      imageElement.src = `images/${product.id}.jpg`;
      productElement.appendChild(imageElement);
  
      const titleElement = document.createElement("h3");
      titleElement.classList.add("product-title");
      titleElement.textContent = product.title;
      productElement.appendChild(titleElement);
  
      const priceElement = document.createElement("div");
      priceElement.classList.add("product-price");
      priceElement.textContent = `$${product.price}`;
      productElement.appendChild(priceElement);
  
      const addToCartButton = document.createElement("button");
      addToCartButton.classList.add("add-to-cart");
      addToCartButton.textContent = "Agregar al carrito";
      addToCartButton.addEventListener("click", () => {
        addToCart(product);
      });
      productElement.appendChild(addToCartButton);
  
      productsContainer.appendChild(productElement);
    });
  }
  
  function addToCart(product) {
    const cartItems = document.getElementsByClassName("cart-item");
    const totalPriceElement = document.getElementById("total-price");
  
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.textContent = product.title;
  
    const totalPrice = Array.from(cartItems).reduce((total, item) => {
      return total + products.find(p => p.title === item.textContent).price;
    }, product.price);
  
    totalPriceElement.textContent = `Total: $${totalPrice}`;
  
    document.body.appendChild(cartItem);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
  
    categoryFilter.addEventListener("change", () => {
      const category = categoryFilter.value;
      const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : null;
      const filteredProducts = filterProducts(category, maxPrice);
      displayProducts(filteredProducts);
    });
  
    priceFilter.addEventListener("input", () => {
      const category = categoryFilter.value;
      const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : null;
      const filteredProducts = filterProducts(category, maxPrice);
      displayProducts(filteredProducts);
    });
  
    displayProducts(products);
  });
  