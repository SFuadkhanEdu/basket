const basket = document.querySelector(".basket")
Object.keys(localStorage).forEach((key)=>{
        let is_found = false;
        const x = JSON.parse(localStorage.getItem(key))
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
        count.textContent = x.count;
        count.classList.add("count");
      
        const btn_box = document.createElement("div")
        btn_box.classList.add("btn_box")
        const plus_btn = document.createElement("button")
        plus_btn.textContent = "+";
        plus_btn.addEventListener("click",()=>{
          const price_per_item = parseFloat(price.textContent) / parseInt(count.textContent);
          count.textContent = parseInt(count.textContent) + 1;
          price.textContent = price_per_item * parseInt(count.textContent) 
          const obj = {
            title:x.title,
            image:x.image,
            price:parseFloat(x.price) * parseInt(count.textContent),
            count:parseInt(count.textContent),
          }
          localStorage.setItem(JSON.stringify(parseInt(key)),JSON.stringify(obj))
        })
        const minus_btn = document.createElement("button")
        minus_btn.addEventListener("click",function(){
          
          if (parseInt(count.textContent) == 1) {
              this.parentElement.parentElement.remove();
              localStorage.removeItem(key)
          }
          const price_per_item = parseFloat(price.textContent) / parseInt(count.textContent);
          count.textContent = parseInt(count.textContent) - 1;
          price.textContent = price_per_item * parseInt(count.textContent) 
          const obj = {
            title:x.title,
            image:x.image,
            price:parseFloat(x.price) * parseInt(count.textContent),
            count:parseInt(count.textContent),
          }
          localStorage.setItem(JSON.stringify(parseInt(key)),JSON.stringify(obj))
        })
        minus_btn.textContent = "-";
        btn_box.appendChild(plus_btn);
        btn_box.appendChild(minus_btn);
        new_card2.appendChild(img);
        new_card2.appendChild(title);
        new_card2.appendChild(price);
        new_card2.appendChild(count);
        new_card2.appendChild(btn_box)
        new_card2.setAttribute("id", x.id);
        basket.appendChild(new_card2);
        const obj = {
          title:x.title,
          image:x.image,
          price:x.price,
          count:x.count
        }
        // localStorage.setItem(JSON.stringify(x.id),JSON.stringify(obj))
      
})

function set_locale_storage(id,obj) {
    localStorage.setItem(id,obj);
}