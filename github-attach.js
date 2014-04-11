//TODO: Do nothing if the user is not signed in to Github!

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
    uploadInput.addEventListener('change', function(event) {
        //TODO: Move authentication to extension configuration
        chrome.runtime.sendMessage({Action: "GetToken"}, function(response)
        {
            var file = event.target.files[0];

            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
              var contentType = file.type || 'application/octet-stream';
              var base64Data = btoa(reader.result);
            
                var fileData = {
                    Data: base64Data,
                    Type: contentType,
                    Name: file.name
                    };
                chrome.runtime.sendMessage({Action: "UploadFile", File: fileData}, function(response) {
                    commentTextArea.value = response.Result;
                  });
            };
        });
        /* var comment = 'Implement file upload (' + uploadInput.value + ')';
        commentTextArea.value = commentTextArea.value ? commentTextArea.value + '\n' + comment : comment; */
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

function get(url, callback) {
    var x = new XMLHttpRequest();
    x.onload = x.onerror = function() { callback(x.responseText); };
    x.open('GET', url);
    x.send();
}