const toggler = document.querySelector(".toggler");

toggler.addEventListener("click", (e) => {
   e.currentTarget.classList.toggle("active");
});
