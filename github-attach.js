var button;
var comments = document.getElementsByClassName('comment');
for (var commentIndex = 0; commentIndex < comments.length; commentIndex++) {
    addUploadButton(comments[commentIndex], 'minibutton');
}
var newComment = document.getElementsByClassName('timeline-new-comment')[0];
addUploadButton(newComment, 'button');

function addUploadButton(commentDiv, buttonClass) {
    var buttonContainer;
    var formActions = commentDiv.getElementsByClassName('form-actions')[0];
    if (!formActions) {
        return;
    }
    button = document.createElement("input");
    button.type = "button";
    button.value = "Upload File...";
    button.setAttribute("class", buttonClass);
    button.addEventListener("click", function() {
        alert("Clicked");
    });
    buttonContainer = formActions.getElementsByTagName('button')[0].parentNode;
    buttonContainer.insertBefore(button, buttonContainer.firstChild);
}
