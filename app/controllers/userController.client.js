'use strict';

(function () {
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileEmail = document.querySelector('#profile-email') || null;
   var profileDate = document.querySelector('#profile-date') || null;
   var profileAvatar = document.querySelector('#profile-avatar') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty, pre, post) {
      element.innerHTML = data[userProperty];
   }
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      // updateHtmlElement(userObject, displayName, 'displayName');
      // if (profileId !== null) {
      //    updateHtmlElement(userObject, profileId, 'id');
      // }
      if (profileUsername !== null) {
         updateHtmlElement(userObject.profile, profileUsername, 'name');
      }
      if (profileEmail !== null) {
         updateHtmlElement(userObject, profileEmail, 'email', "Email: ");
      }
      if (profileDate) updateHtmlElement(userObject, profileDate, 'joinDate', 'Join Date: ');
      if (profileAvatar) $(profileAvatar).prop("src", userObject.profile.picture);
   }));
})();
