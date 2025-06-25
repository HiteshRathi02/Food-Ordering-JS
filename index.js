// =======================
// Sidebar Toggle Logic
// =======================

const open = document.querySelector(".open");
const close = document.querySelector(".close");
const sideBar = document.querySelector(".side-bar");

open.addEventListener("click", () => {
  close.style.display = "block";
  sideBar.style.display = "flex";
});

close.addEventListener("click", () => {
  close.style.display = "none";
  sideBar.style.display = "none";
});

// =======================
// DOM Content Loaded
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const cardSection = document.querySelector(".card-section");

  // Load Menu from JSON
  function getMenu() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          cardSection.innerHTML += `
            <div class="card">
              <img src="${item.imgSrc}" alt="${item.name}" class="card-main-img" />
              <div class="card-content">
                <div class="card-start-content">
                  <p class="food-name">${item.name}</p>
                  <p class="cost">$${item.price}/-</p>
                </div>
                <div class="card-end-content">
                  <div class="add-btn">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="10" fill="#363A43"/>
                      <path d="M20 10.6666V29.3333" stroke="#878787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.6666 20H29.3333" stroke="#878787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      })
      .catch(error => console.error("Failed to load menu:", error));
  }

  getMenu();

  // =======================
  // Order Handling Functions
  // =======================

  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = [
          { name: "Cheese Burger", price: 5.99 },
          { name: "Veggie Burger", price: 6.49 },
          { name: "Bacon Burger", price: 7.49 },
          { name: "Chicken Burger", price: 6.99 },
          { name: "Mushroom Burger", price: 6.79 },
          { name: "Double Cheese Burger", price: 8.99 },
          { name: "BBQ Burger", price: 7.99 },
          { name: "Fish Burger", price: 7.29 },
          { name: "Turkey Burger", price: 6.49 },
          { name: "Spicy Burger", price: 7.49 }
        ];

        const randomBurgers = [];
        for (let i = 0; i < 3; i++) {
          const index = Math.floor(Math.random() * burgers.length);
          randomBurgers.push(burgers[index]);
        }

        resolve(randomBurgers);
      }, 2500);
    });
  }

  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }

  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }

  function thankyou() {
    alert("Thank you for eating with us today!");
  }

  // =======================
  // Main Order Flow
  // =======================

  function main() {
    takeOrder()
      .then(order => {
        console.log("Your Order:", order);
        return orderPrep();
      })
      .then(orderStatus => {
        console.log("Order Preparation Status:", orderStatus);
        return payOrder();
      })
      .then(payStatus => {
        console.log("Payment Status:", payStatus);
        if (payStatus?.paid) {
          thankyou();
        }
      });
  }

  main();
});

// =======================
// Secondary Hero Function
// =======================

function secondScreen() {
  const hideMainImg = document.querySelector(".main_hero_img");
  hideMainImg.style.display = "none";
}
