'use strict';

(function () {
   var addButton = $('.btn-add');
   var deleteButton = $('.btn-delete');
   var voteNbr = $('#vote-nbr');
   var apiUrl = window.location.href;

   function updatePosts(data) {
      var votes = JSON.parse(data);
      $(voteNbr).text(votes);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts));

   addButton.click(function () {
      ajaxFunctions.ajaxRequest('POST', apiUrl + "/up", function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl + "/up", updatePosts);
      });
   });
   deleteButton.click(function () {
      ajaxFunctions.ajaxRequest('POST', apiUrl + "/down", function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl + "/down", updatePosts);
      });
   });
})();
