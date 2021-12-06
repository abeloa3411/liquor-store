const liqours = [
  {
    id: 1,
    title: "Captain Morgan 750ml",
    category: "whiskey",
    img: "./images/whiskey1.png",
    price: 850.0,
  },
  {
    id: 2,
    title: "Hennesy 750ml",
    category: "congac",
    img: "./images/congac.png",
    price: 4450.0,
  },
  {
    id: 3,
    title: "Gilbeys gin 750ml",
    category: "gin",
    img: "./images/gin.png",
    price: 1200.0,
  },
  {
    id: 4,
    title: "Black and White 750ml",
    category: "whiskey",
    img: "./images/whiskey2.png",
    price: 1150.0,
  },
  {
    id: 5,
    title: "White Cap Can 500ml",
    category: "beer",
    img: "./images/beer1.png",
    price: 190.0,
  },
  {
    id: 6,
    title: "Hunter's Choice 750ml",
    category: "whiskey",
    img: "./images/whiskey4.png",
    price: 850.0,
  },
  {
    id: 7,
    title: "Guiness Can 500ml",
    category: "beer",
    img: "./images/beer3.png",
    price: 200.0,
  },
  {
    id: 8,
    title: "4th street",
    category: "wine",
    img: "./images/wine.png",
    price: 850.0,
  },
  {
    id: 9,
    title: "Jack Daniels",
    category: "whiskey",
    img: "./images/whiskey3.png",
    price: 4550.0,
  },
  {
    id: 10,
    title: "Viceroy 1ltr",
    category: "brandy",
    img: "./images/brandy.png",
    price: 5000.0,
  },
  {
    id: 11,
    title: "Smirnoff Vodka 750ml",
    category: "vodka",
    img: "./images/vodka1.png",
    price: 1400.0,
  },
  {
    id: 12,
    title: "Tusker Lite",
    category: "beer",
    img: "./images/beer4.png",
    price: 250.0,
  },
  {
    id: 13,
    title: "Pilsner",
    category: "beer",
    img: "./images/beer7.png",
    price: 200.0,
  },
  {
    id: 14,
    title: "Kibao Vodka 750ml",
    category: "vodka",
    img: "./images/vodka2.png",
    price: 850.0,
  },
];

const cardsContainer = document.querySelector(".cards-container");
const buttonContainer = document.querySelector(".button-container");
const textInput = document.querySelector(".text-input");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal-close-btn");

window.addEventListener("DOMContentLoaded", () => {
  loadItems(liqours);
  loadBtns();
  addToCart();
  showModal();
});

// window.addEventListener("scroll", () => {
//   const nav = document.getElementById("fixed-nav");
//   if (window.scrollY > 80) {
//     nav.classList.add("fixed-nav");
//   } else {
//     nav.classList.remove("fixed-nav");
//   }
// });

textInput.addEventListener("keyup", searchItem);

document.getElementById("date").innerHTML = new Date().getFullYear();

function loadItems(drinks) {
  const articles = drinks
    .map((drink) => {
      const { img, title, price } = drink;
      return `
        <article class="card">
          <picture>
            <img src="${img}" alt="" />
          </picture>  
            <div class="info">
              <p class="title"><strong>${title}</strong></p>
              <p class="Price"><strong>Ksh ${price}</strong></p>
            </div>
            <div class="btn-container">
                <button class="quick-shop">Quick Shop</button>
                <button id="cart-btn" class="add-to-cart">Add to cart</button>
            </div>
            <p id="msg"></p>
        </article>
    `;
    })
    .join("");

  cardsContainer.innerHTML = articles;
}

function loadBtns() {
  const buttons = liqours.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const mappedBtns = buttons
    .map((btn) => {
      return `<button class="btn" data-name="${btn}">${btn}</button>`;
    })
    .join("");

  buttonContainer.innerHTML = mappedBtns;

  const Btns = document.querySelectorAll(".btn");
  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const title = e.target.dataset.name;
      const filteredDrinks = liqours.filter((liqour) => {
        if (title === liqour.category) {
          return liqour;
        }
      });

      if (title === "all") {
        loadItems(liqours);
      } else {
        loadItems(filteredDrinks);
      }
    });
  });
}

function searchItem(e) {
  let searchValue = e.target.value;

  const searchResults = liqours.filter((item) => {
    let itemTitle = item.title;
    if (itemTitle.toLowerCase().trim().indexOf(searchValue) > -1) {
      return item;
    }
  });

  loadItems(searchResults);
}

(function displayCart() {
  const cart = document.querySelector(".cart");
  const cartBtn = document.querySelector(".cart-btn");
  const closeBtn = document.querySelector(".close-cart");
  const cartOverlay = document.querySelector(".cart-overlay");

  cartBtn.addEventListener("click", () => {
    cart.classList.add("showCart");
    cartOverlay.classList.add("transparentBcg");
  });

  closeBtn.addEventListener("click", () => {
    cart.classList.remove("showCart");
    cartOverlay.classList.remove("transparentBcg");
  });
})();

function showModal() {
  const quickShop = document.querySelectorAll(".quick-shop");
  quickShop.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("modal-show");
    });
  });
}

function addToCart() {
  const addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let item = e.target;

      if (item.classList.contains("add-to-cart")) {
        let parent =
          item.parentElement.previousElementSibling.previousElementSibling
            .children[0].src;

        let pos = parent.indexOf("images");

        let imgPath = parent.slice(pos);

        let cartObj = {};

        cartObj.img = imgPath;

        let name =
          item.parentElement.previousElementSibling.children[0].children[0]
            .textContent;

        cartObj.name = name;

        let price =
          item.parentElement.previousElementSibling.children[1].children[0]
            .textContent;
        let finalPrice = price.slice(4);

        cartObj.price = finalPrice;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${cartObj.img}" alt="" class="cart-img" />
            <div class="cart-info">
              <p>${cartObj.name}</p>
              <span>Ksh</span>
              <span id="cart-item-price" class="cart-item-price">${cartObj.price}</span>
            </div>
            <a href="#">
              <i class="fas fa-trash"></i>
            </a>
        `;

        const cart = document.querySelector(".cart");
        const cartTotal = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, cartTotal);
        alert("item added to cart");
        calculateTotals();
        cartItem.addEventListener("click", deleteItems);
      }
    });
  });
}

function calculateTotals() {
  let total = [];

  const price = document.querySelectorAll("#cart-item-price");

  price.forEach((item) => {
    total.push(parseFloat(item.textContent));
  });
  const totalMoney = total.reduce((values, item) => {
    return (values += item);
  }, 0);

  document.querySelector("#items-count").innerHTML = total.length;
  document.querySelector(".cart-total").innerHTML = `Ksh ${totalMoney.toFixed(
    2
  )}`;
}

function deleteItems(e) {
  const item = e.target;
  if (item.classList.contains("fa-trash")) {
    let parent = item.parentElement.parentElement;
    parent.remove();
    calculateTotals();
  }
}
