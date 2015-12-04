(function () {
   var profileId = $('#profile-id') || null;
   var profileUsername = $('#profile-username') || null;
   var profileEmail = $('#profile-email') || null;
   var profileDate = $('#profile-date') || null;
   var profileAvatar = $('#profile-avatar') || null;
   var profilePosts = $("#posts") || null;
   var navAvatar = $(".avatar-sm")[0] || null;
   var navUnauth = $(".unauth") || null;
   var navAuth = $(".auth") || null;
   var navUser = $("#nav-user") || null;
   var apiUrl = appUrl + '/api/:id';
   navUnauth.each(function(a) { $(navUnauth[a]).css("display", "block") });
   navAuth.each(function(a) { $(navAuth[a]).css("display", "none") });
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      if (navAvatar) $(navAvatar).prop("src", userObject.profile.picture);
      if (userObject.profile.name) {
        $(navUser).html($(navUser).html() + userObject.profile.name);
        navUnauth.each(function(a) { $(navUnauth[a]).css("display", "none") });
        navAuth.each(function(a) { $(navAuth[a]).css("display", "block") });
      }
      if (profileUsername) $(profileUsername).text(userObject.profile.name);
      if (profileEmail) $(profileEmail).text("Email: " + userObject.email);
      if (profileDate) $(profileDate).text("Join Date: " + new Date(userObject.joinDate).toDateString());
      if (profileAvatar) $(profileAvatar).prop("src", userObject.profile.picture);
      if (profilePosts) {
        userObject.posts.forEach(function(post) {
          $(profilePosts).append("<div class='post'><h3>" + post.content.title + "</h3></div>");
        });
      }
   }));
})();
