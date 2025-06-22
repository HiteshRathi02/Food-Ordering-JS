let open = document.querySelector(".open");
let close = document.querySelector(".close");
let side_bar = document.querySelector(".side-bar");

open.addEventListener("click",function(){
    close.style.display = 'block';
    side_bar.style.display = "flex";
})

close.addEventListener("click",function(){
    close.style.display = 'none';
    side_bar.style.display = "none";
})


const url =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

window.addEventListener("load", function () {
  let cardSection = document.querySelector(".card-section");

  async function getMenu() {
    const res = await fetch(url);
    const data = await res.json();
    data.map((items) => {
      cardSection.innerHTML += `
      <div class="card">
          <img src=${items.imgSrc} alt=${items.name} class="card-main-img">
          <div class="card-content">
              <div class="card-start-content">
                <p class="food-name">${items.name}</p>
                <p class="cost">$${items.price}/-</p>
              </div>
              <div class="card-end-content">
                <img src="img/Group 4.png" alt="">
              </div>
          </div>
      </div>
      `;
    });
  }
  getMenu();

  function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vegBurgers = [
          { name: "McAloo Tikki Burger", price: 3.49 },
          { name: "Veg Maharaja Mac", price: 5.99 }, 
          { name: "McVeggie", price: 4.99 }, 
          { name: "Crispy Veg Burger", price: 3.99 }, 
          { name: "BK Veggie Burger", price: 5.49 }, 
          { name: "Plant-Based Whopper", price: 6.79 }, 
          { name: "Paneer Royale Burger", price: 5.29 }, 
          { name: "Spicy Bean Burger", price: 4.79 }, 
          { name: "Green Delight Burger", price: 5.19 }, 
          { name: "Chickpea Power Burger", price: 5.89 }, 
        ];

        const randomBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * vegBurgers.length);
          randomBurgers.push(vegBurgers[randomIndex]);
        }

        resolve(randomBurgers);
      }, 2500);
    });
  }

  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let orderStatus = { order_status: true, paid: false };
        resolve(orderStatus);
      }, 1500);
    });
  }

  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let paidStatus = { order_status: true, paid: true };
        resolve(paidStatus);
      }, 1000);
    });
  }

  function thankyou(paymentStatus) {
    if (!paymentStatus.paid) {
      alert('Payment not completed. Please try again.');
      return;
    }
    alert('thankyou for eating with us today!');
  }

  async function main() {
    const order = await takeOrder();
    console.log("Your Order:", order);

    const orderStatus = await orderPrep();
    console.log("Order Preparation Status:", orderStatus);

    const paymentStatus = await payOrder();
    console.log("Payment Status:", paymentStatus);

    thankyou(paymentStatus);
  }

  main();
});
