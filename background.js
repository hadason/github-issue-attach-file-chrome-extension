chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse)
   {
      if (request.Action === "GetToken")
      {
         chrome.identity.getAuthToken({'interactive': true}, function(token)
         {
            console.log("token:"+token);
            gapi.auth.setToken({
              'access_token': token
            });
            sendResponse({Result: token});
         });
         return true;
      }
      if (request.Action === "UploadFile") 
      {
            gapi.client.load('drive', 'v2', function() {
                insertFile(request.File, function(result) {
                    sendResponse({Result: result.webContentLink});
                });
            });
            return true;
      }
});

/**
* Insert new file.
*
* @param {File} fileData File object to read data from.
* @param {Function} callback Function to call when the request is complete.
*/
function insertFile(fileData, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

          var contentType = fileData.Type;
          var metadata = {
            'title': fileData.Name,
            'mimeType': contentType
          };

          var base64Data = fileData.Data;
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
          if (!callback) {
            callback = function(file) {
              console.log(file)
            };
          }
          request.execute(callback);
        }

      
 function get(url, callback) {
    var x = new XMLHttpRequest();
    x.onload = x.onerror = function() { callback(x.response); };
    x.open('GET', url);
    x.send();
}