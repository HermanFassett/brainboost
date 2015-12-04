'use strict';

(function () {
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileEmail = document.querySelector('#profile-email') || null;
   var profileDate = document.querySelector('#profile-date') || null;
   var profileAvatar = document.querySelector('#profile-avatar') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      if (profileUsername) $(profileUsername).text(userObject.profile.name);
      if (profileEmail) $(profileEmail).text("Email: " + userObject.email);
      if (profileDate) $(profileDate).text("Join Date: " + new Date(userObject.joinDate).getFullYear());
      if (profileAvatar) $(profileAvatar).prop("src", userObject.profile.picture);
   }));
})();
