// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }
      </style>
      <li class="product">
          <img src="../favicon.io" alt="" width=200>
          <p class="title"></p>
          <p class="price"></p>
          <button onclick="alert('Added to Cart!')">Add to Cart</button>
      </li>
    `;
    super();
    this.root = this.attachShadow({mode: "open"});
    this.root.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    let shadow = this.shadowRoot;
    let nodes = shadow.children;
    let li = nodes[nodes.length - 1];
    let children = li.children;
    if(attrName == "imgsrc"){
      children[0].src = newVal;
    } else if(attrName == "imgalt"){
      children[0].alt = newVal;
    } else if(attrName == "title"){
      children[1].innerHTML = newVal;
    } else if(attrName == "price"){
      children[2].innerHTML = newVal;
    } else if(attrName == "id"){
      let currCart = JSON.parse(localStorage.getItem("cart"));
      let id = newVal;
      if(currCart.includes(id)){
        children[3].innerHTML = "Remove from Cart";
      }
      children[3].onclick = function(){
        currCart = JSON.parse(localStorage.getItem("cart"));
        if(currCart.includes(id)){
          const index = currCart.indexOf(id);
          currCart.splice(index, 1);
          document.getElementById("cart-count").innerHTML = currCart.length;
          this.innerText = "Add to Cart";
        }else{
          currCart.push(id);
          document.getElementById("cart-count").innerHTML = currCart.length;
          this.innerText = "Remove from Cart";
          alert('Added to Cart!');
        }
        localStorage.setItem("cart", JSON.stringify(currCart));
      };
    }
    else{
      return;
    }
  }

  static get observedAttributes() {
    return ["imgsrc", "imgalt", "title", "price", "id"];
  }
  
  set imgsrc(newValue) {
    this.setAttribute("imgsrc", newValue);
  }
  set imgalt(newValue) {
    this.setAttribute("imgalt", newValue);
  }
  set title(newValue) {
    this.setAttribute("title", newValue);
  }
  set price(newValue) {
    this.setAttribute("price", newValue);
  }


}


customElements.define('product-item', ProductItem);