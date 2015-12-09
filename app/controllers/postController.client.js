'use strict';

(function () {
   var addButton = $('.btn-add');
   var deleteButton = $('.btn-delete');
   var clickNbr = $('#click-nbr');
   var boosts = $("#boosts") || null;
   var apiUrl = window.location.href + '/1';

   function updatePosts(data) {
     console.log(data);
      var postsObject = JSON.parse(data);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts));

   addButton.click(function () {
      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts);
      });
   });
})();
