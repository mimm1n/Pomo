const toggler = document.querySelector(".toggler-btn");
toggler.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

$(document).ready(function() {

  if(window.location.href.indexOf('#staticBackdrop') != -1) {
    $('#staticBackdrop').modal('show')}
})