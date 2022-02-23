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
const projectSection = document.querySelector("#projects");

// get projects data from json file
const URL =
   "https://raw.githubusercontent.com/Meqdad-Moradi/portfolio-website/main/data.json";
const getData = async () => {
   try {
      const response = await fetch(URL);
      const data = await response.json();
      renderData(data);
      renderFilterBtns(data);
   } catch (error) {
      console.log(error);
   }
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

   const btns = data
      .reduce(
         (item, value) => {
            if (!item.includes(value.category)) {
               item.push(value.category);
            }
            return item;
         },
         ["all"]
      )
      .map((item) => {
         return `
            <button class="btn" data-id="${item}">${item}</button>`;
      })
      .join("");

   filterBtnsDiv.innerHTML = btns;

   const filterBtns = document.querySelectorAll(".filter-btns .btn");
   setActive(filterBtns, data);
};

// set active class to filter buttons
const setActive = (btns, data) => {
   btns[0].classList.add("active"); // by default ALL-BUTTON is active
   btns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
         const id = e.currentTarget.dataset.id;
         const filterList = data.filter((item) => item.category === id); // filter the projet list by clicking a button

         btns.forEach((btn) => btn.classList.remove("active"));
         e.currentTarget.classList.add("active");

         if (id == "all") {
            renderData(data);
         } else {
            renderData(filterList);
         }
      })
   );
};

window.addEventListener("DOMContentLoaded", getData);
