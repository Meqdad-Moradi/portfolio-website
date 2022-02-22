const toggler = document.querySelector(".toggler");
const nav = document.querySelector(".nav");

toggler.addEventListener("click", (e) => {
   e.currentTarget.classList.toggle("active");
   if (toggler.classList.contains("active")) {
      nav.classList.add("active");
   } else {
      nav.classList.remove("active");
   }
});

// work
/// select works elements
const filterBtnsDiv = document.querySelector(".filter-btns");
// const filterBtns = Array.from(filterBtnsDiv.children);
const projectSection = document.querySelector("#projects");

// get projects data from json file
const getData = async () => {
   const response = await fetch("./data.json");
   const data = await response.json();
   renderData(data);
   renderFilterBtns(data);
};

// read data form json file and set card item
const renderData = (data) => {
   projectSection.innerHTML = "";

   const card = data
      .map((item) => {
         const { id, title, image, disc, category } = item;

         return `
            <div class="card">
               <div class="img-box">
                  <img src=${image} alt="about-img" />
                  <div class="card-links">
                     <span><i class="fa-solid fa-eye"></i></span>
                     <span><i class="fa-brands fa-github"></i></span>
                  </div>
               </div>
               <div class="text">
                  <h2>${title}</h2>
                  <p>${disc}</p>
               </div>
            </div>`;
      })
      .join("");

   projectSection.innerHTML = card;
};

// read data form json file and set btns item
const renderFilterBtns = (data) => {
   filterBtnsDiv.innerHTML = "";

   const filteredBtns = data.reduce(
      (item, value) => {
         if (!item.includes(value.category)) {
            item.push(value.category);
         }
         return item;
      },
      ["all"]
   );

   const btns = filteredBtns
      .map((btn) => {
         return `
      <button class="btn">${btn}</button>`;
      })
      .join("");

   filterBtnsDiv.innerHTML = btns;

   const filterBtns = document.querySelectorAll(".filter-btns .btn");
   setActive(filterBtns);
};

// set active class to filter buttons
const setActive = (btns) => {
   // by default all button is active
   btns[0].classList.add("active");

   btns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
         btns.forEach((btn) => btn.classList.remove("active"));
         e.currentTarget.classList.add("active");
      })
   );
};

window.addEventListener("DOMContentLoaded", getData);
