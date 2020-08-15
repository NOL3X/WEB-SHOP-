if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var obrisiStavke = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < obrisiStavke.length; i++) {
        var button = obrisiStavke[i];
        button.addEventListener("click", removeCartItem);
    }
    var kolicina = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < kolicina.length; i++) {
        var input = kolicina[i];
        input.addEventListener("change", quantityChanged);
    }

    var dodajUkorpu = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < dodajUkorpu.length; i++) {
        var button = dodajUkorpu[i];
        button.addEventListener("click", addCartClicked);
    }
    document
        .getElementsByClassName("btn-purchase")[0]
        .addEventListener("click", narucivanje);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemCart(title, price, imageSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Ovaj proizvod je dodat u korpu");
            return;
        }
    }

    var cartRowContents = `
          <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
              <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
        .getElementsByClassName("btn-danger")[0]
        .addEventListener("click", removeCartItem);
    cartRow
        .getElementsByClassName("cart-quantity-input")[0]
        .addEventListener("change", quantityChanged);
}

function narucivanje() {
    alert("Hvala sto ste narucili proizvod!");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");

    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var kolicina = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var kolicinaIznos = kolicina.value;
        total = total + price * kolicinaIznos;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
        "€" + total;
}

var openlink = document.querySelector(".open-form");
var closelink = document.querySelector(".close-form");
var form = document.querySelector("form.mainform");
var phoneLogin = form.querySelector(".inp-phone");
var mailLogin = form.querySelector(".inp-mail");
var phoneStorage = localStorage.getItem("phoneLogin");

openlink.addEventListener("click", function(event) {
    event.preventDefault();
    form.classList.toggle("mainform-show");
    if (form.classList.contains("login-popup-error")) {
        form.classList.remove("login-popup-error");
    };
    if (phoneStorage) {
        phoneLogin.value = phoneStorage;
        mailLogin.focus();
    } else {
        phoneLogin.focus();
    }
});

closelink.addEventListener("click", function(event) {
    event.preventDefault();
    form.classList.remove("mainform-show");
});

form.addEventListener("submit", function(event) {
    if (form.classList.contains("login-popup-error")) {
        form.classList.remove("login-popup-error");
    }
    if (!phoneLogin.value || !mailLogin.value) {
        event.preventDefault();
        form.classList.add("login-popup-error");
    } else {
        localStorage.setItem("phoneLogin", phoneLogin.value);
    };
});