//Productos 
const productos = [
    {
        id: 1,
        productName: "☕ Cafe Espresso",
        price: 1000,
        description: "Taza pequeña de café espresso con una crema dorada en la superficie, mostrando su rica intensidad y sabor concentrado", 
        img: "media/Espresso.png"
    },
    {
        id: 2,
        productName: "☕ Cafe Americano",
        price: 1200,
        description: "Taza de café americano con un color marrón oscuro, destacando su sabor suave y equilibrado, ideal para los que prefieren un café menos concentrado.", 
        img: "media/Americano.png"
    },
    {
        id: 3,
        productName: "🧋 Iced Coffe",
        price: 3000,
        description: "Café preparado en caliente y luego enfriado rápidamente, servido sobre hielo y mezclado con leche.", 
        img: "media/IcedCoffee.png"
    },

    {
        id: 4,
        productName: "🍰 Carrot Cake",
        price: 4400,
        description: "Harina integral, zanahoria ralladas, nueces, y endulzada con miel de abeja. Decorada con un glaseado de yogur griego.", 
        img: "media/carrotcake.png"
    },
    {
        id: 5,
        productName: "🌯 Wrap de Vegetales",
        price: 5500,
        description: "Wrap de trigo integral relleno de una mezcla de verduras: lechuga, tomate, zanahoria, pepino y una generosa porción de hummus.", 
        img: "media/Burrito.png"
    },
    {
        id: 6,
        productName: "🥑Avocado Toast",
        price: 5900,
        description: "Tostadas integrales cubiertas con aguacate machacado y huevos poché, sazonadas con sal marina y pimienta negra.", 
        img: "media/Avocadotoast.png"
    },
]

const shopContent = document.getElementById("shopContent");
const cartContent = document.getElementById("cartContent");
const totalPrice = document.getElementById("totalprice");
const totalPayButton = document.getElementById("totalpay");
let cart = [];

productos.forEach((product) => {
    const content = document.createElement("div");
    content.classList.add("category__item");

    //imagen
    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.productName;

    //titulo descripcion y precio
    const title = document.createElement("h3");
    title.textContent = product.productName;

    const price = document.createElement("span");
    price.textContent = `$${product.price}`;

    const description = document.createElement("p");
    description.textContent = product.description;

    // boton de agregar al carrito
    const addButton = document.createElement("button");
    addButton.textContent = "Agregar al carrito";
    addButton.addEventListener("click", () => addToCart(product));

    content.append(img, title, price, description, addButton);
    shopContent.append(content);
});


// Función para agregar productos al carrito
function addToCart(product) {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}
function subtractFromCart(id) {
    const item = cart.find((item) => item.id === id);

    if (item) {
        item.quantity--; 
        if (item.quantity === 0) {
            removeFromCart(id); 
        } else {
            renderCart(); 
        }
    }
}


function renderCart() {
    cartContent.innerHTML = ""; 
    let total = 0;

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart__item");

        cartItem.innerHTML = `
            <button class="remove-btn">✖️</button>
            <h4>${item.productName}</h4>
            <span>Precio: $${item.price * item.quantity}</span>
            <div id="quantity-control">
                <button class="add-btn">➕</button>
                <p class="quantity-text">${item.quantity}</p>
                <button class="subtract-btn">➖</button>
            </div>
        `;

        // Eliminar producto
        const removeButton = cartItem.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => removeFromCart(item.id));

        // Agregar cantidad
        const addQuantityButton = cartItem.querySelector(".add-btn");
        addQuantityButton.addEventListener("click", () => addToCart(item));

        // Botón para restar cantidad
        const subtractQuantityButton = cartItem.querySelector(".subtract-btn");
        subtractQuantityButton.addEventListener("click", () => subtractFromCart(item.id));

        cartContent.append(cartItem);
        total += item.price * item.quantity;
    });

    // Actualizar total 
    totalPrice.textContent = `${total}`;
}

// Eliminar el producto del carrito
function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    renderCart();
}

// Alerta confirmar
totalPayButton.addEventListener("click", () => {
    const total = totalPrice.textContent || "0"; // Obtener el total actual
    alert(`El total de la compra es: $${total} ¡Gracias por su compra!`);
});
