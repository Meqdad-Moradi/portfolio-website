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
