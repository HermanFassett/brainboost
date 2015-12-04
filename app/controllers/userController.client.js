'use strict';
var username = "!";
(function () {
   var profileId = $('#profile-id') || null;
   var profileUsername = $('#profile-username') || null;
   var profileEmail = $('#profile-email') || null;
   var profileDate = $('#profile-date') || null;
   var profileAvatar = $('#profile-avatar') || null;
   var navAvatar = $(".avatar-sm")[0] || null;
   var navUnauth = $(".unauth") || null;
   var navAuth = $(".auth") || null;
   var navUser = $("#nav-user") || null;
   var apiUrl = appUrl + '/api/:id';

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      if (userObject.profile.name) {
        $(navUser).text($(navUser).html() + userObject.profile.name);
        navUnauth.each(function(a) { $(a).hide() });
        navAuth.each(function(a) { $(a).show() });
      }
      else {
        navUnauth.each(function(a) { $(a).show() });
        navAuth.each(function(a) { $(a).hide() });
      }
      if (navAvatar) $(navAvatar).prop("src", userObject.profile.picture);
      if (profileUsername) $(profileUsername).text(userObject.profile.name);
      if (profileEmail) $(profileEmail).text("Email: " + userObject.email);
      if (profileDate) $(profileDate).text("Join Date: " + new Date(userObject.joinDate).toDateString());
      if (profileAvatar) $(profileAvatar).prop("src", userObject.profile.picture);
   }));
})();
