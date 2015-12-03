(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileEmail = document.querySelector('#profile-email') || null;
   var displayName = document.querySelector('#display-name');
   var appUrl = window.location.origin;
   var apiUrl = appUrl + '/api/:id';
   var ajaxFunctions = {
      ready: function ready (fn) {
         if (typeof fn !== 'function') {
            return;
         }

         if (document.readyState === 'complete') {
            return fn();
         }

         document.addEventListener('DOMContentLoaded', fn, false);
      },
      ajaxRequest: function ajaxRequest (method, url, callback) {
         var xmlhttp = new XMLHttpRequest();

         xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
               callback(xmlhttp.response);
            }
         };

         xmlhttp.open(method, url, true);
         xmlhttp.send();
      }
   };


   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      updateHtmlElement(userObject, displayName, 'displayName');

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');
      }

      if (profileEmail !== null) {
         updateHtmlElement(userObject, profileEmail, 'email');
      }
   }));
})();
