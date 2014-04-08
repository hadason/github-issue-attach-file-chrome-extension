var comments = document.getElementsByClassName('comment');
for (var commentIndex = 0; commentIndex < comments.length; commentIndex++) {
    addUploadButton(comments[commentIndex], 'minibutton');
}
var newComment = document.getElementsByClassName('timeline-new-comment')[0];
addUploadButton(newComment, 'button');

function addUploadButton(commentDiv, buttonClass) {
    var uploadInput;
    var button;
    var buttonContainer;
    var commentTextArea;
    var formActions = commentDiv.getElementsByClassName('form-actions')[0];
    if (!formActions) {
        return;
    }
    buttonContainer = formActions.getElementsByTagName('button')[0].parentNode;
    
    commentTextArea = commentDiv.getElementsByClassName('comment-form-textarea')[0];
    uploadInput = document.createElement("input");
    uploadInput.setAttribute("style", "display:none");
    uploadInput.type = "file";
    uploadInput.addEventListener('change', function() {
        var comment = 'Implement file upload (' + uploadInput.value + ')';
        commentTextArea.value = commentTextArea.value ? commentTextArea.value + '\n' + comment : comment;
    });
    buttonContainer.insertBefore(uploadInput, buttonContainer.firstChild);
    
    button = createUploadButton(buttonClass);
    button.addEventListener("click", function() {
        //TODO: use JQuery
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        uploadInput.dispatchEvent(clickEvent);
    });
    buttonContainer.insertBefore(button, buttonContainer.firstChild);
}

function createUploadButton(buttonClass) {
    button = document.createElement("input");
    button.type = "button";
    button.value = "Upload File...";
    button.setAttribute("class", buttonClass);
    return button;
}
