const container = document.querySelector(".card_container");
const basket = document.querySelector(".basket");
const object = [];
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        const object = [];
        data.forEach(product => {
            object.push(product);
        });
        console.log("Object populated inside .then:", object);
        object.map((x, key) => {
            createShopCard(x);
          });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    
function add_basket(x) {
  let is_found = false;
  const basket_cards = basket.querySelectorAll(".card");
  basket_cards.forEach((a) => {
    if (a.getAttribute("id") == x.id) {
      const count = a.querySelector(".count");
      const price = a.querySelector(".price");
      const price_per_item =
        parseFloat(price.textContent) / parseInt(count.textContent);
      count.textContent = parseInt(count.textContent) + 1;
      price.textContent = (
        price_per_item * parseInt(count.textContent)
      ).toFixed(2);
      console.log(count.textContent);
      is_found = true;
    }
  });
  if (is_found) {
    return;
  }

  const new_card2 = document.createElement("div");
  new_card2.classList.add("card");

  const img = document.createElement("img");
  img.src = x.image;

  const title = document.createElement("h2");
  title.textContent = x.title;

  const price = document.createElement("p");
  price.textContent = parseFloat(x.price);
  price.classList.add("price");

  const count = document.createElement("p");
  count.textContent = 1;
  count.classList.add("count");

  const btn_box = document.createElement("div");
  btn_box.classList.add("btn_box");

  const plus_btn = document.createElement("button");
  plus_btn.textContent = "+";
  plus_btn.addEventListener("click", () => {
    const price_per_item =
      parseFloat(price.textContent) / parseInt(count.textContent);
    count.textContent = parseInt(count.textContent) + 1;
    price.textContent = price_per_item * parseInt(count.textContent);
    const obj = {
      title: x.title,
      image: x.image,
      price: x.price,
      count: parseInt(count.textContent),
    };
    localStorage.setItem(JSON.stringify(x.id), JSON.stringify(obj));
});
const minus_btn = document.createElement("button");
minus_btn.textContent = "-";
  minus_btn.addEventListener("click", function () {
    if (parseInt(count.textContent) == 1) {
      this.parentElement.parentElement.remove();
      localStorage.removeItem(x.id);
      return
    }
    const price_per_item =
      parseFloat(price.textContent) / parseInt(count.textContent);
    count.textContent = parseInt(count.textContent) - 1;
    price.textContent = price_per_item * parseInt(count.textContent);
    const obj = {
      title: x.title,
      image: x.image,
      price: x.price,
      count: parseInt(count.textContent),
    };
    localStorage.setItem(JSON.stringify(x.id), JSON.stringify(obj));
  });
  btn_box.appendChild(plus_btn);
  btn_box.appendChild(minus_btn);
  new_card2.appendChild(img);
  new_card2.appendChild(title);
  new_card2.appendChild(price);
  new_card2.appendChild(count);
  new_card2.appendChild(btn_box);
  new_card2.setAttribute("id", x.id);
  basket.appendChild(new_card2);
  const obj = {
    title: x.title,
    image: x.image,
    price: parseFloat(x.price) * parseInt(count.textContent),
    count: parseInt(count.textContent),
  };
  localStorage.setItem(JSON.stringify(x.id), JSON.stringify(obj));
}
function remove_basket(x) {
    localStorage.removeItem(x.id);
}
function createShopCard(x) {
  const new_card = document.createElement("div");
  new_card.classList.add("card");

  const img = document.createElement("img");
  img.src = x.image;

  const title = document.createElement("h2");
  title.textContent = x.title;

  const desc = document.createElement("p");
  desc.textContent = x.description;

  const price = document.createElement("p");
  price.textContent = x.price;
  price.classList.add("price");

  const button = document.createElement("button");
  button.classList.add("card_btn");
  button.setAttribute("id", "card_btn_" + x.id);

  if (localStorage.getItem(x.id)) {
    button.textContent = "REMOVE";
} else {
    button.textContent = "ADD";
}
button.addEventListener("click", () => {
    if (localStorage.getItem(x.id)) {
        remove_basket(x);
        button.textContent = "ADD"
    } else {
        add_basket(x);
        button.textContent = "REMOVE"
    }
});

  new_card.setAttribute("id", x.id);
  new_card.appendChild(img);
  new_card.appendChild(title);
  new_card.appendChild(desc);
  new_card.appendChild(price);
  new_card.appendChild(button);
  container.appendChild(new_card);
}
