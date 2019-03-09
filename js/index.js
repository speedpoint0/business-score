window.addEventListener("load", function() {
  document.getElementById('company-name-form').addEventListener("submit", function(e) {
    e.preventDefault(); // before the code
    /* do what you want with the form */
    document.getElementById('data-output').innerHTML = document.getElementById('first_name').value;
  })
});
