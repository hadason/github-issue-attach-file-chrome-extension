var button = document.createElement("input");
button.type = "button";
button.value = "Upload File...";
button.setAttribute("class", "button");
button.addEventListener("click", function() {
    alert("Clicked");
});
var div = document.getElementById("js-new-comment-form-actions");
div.insertBefore(button, div.firstChild);
