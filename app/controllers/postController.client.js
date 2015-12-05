'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var boosts = $("#boosts") || null;
   var apiUrl = appUrl + '/api/:id/posts';

   function updatePosts (data) {
      var postsObject = JSON.parse(data);
      if (boosts) {
        postsObject.forEach(function(a) {
          "<div class='post-left'>" +
            "<span class='glyphicon glyphicon-plus'>" +
              "<h4>{{boost.votes}}</h4>" +
            "<span class='glyphicon glyphicon-minus'>" +
          "</div>" +
          "<div class='post-right'>" +
            "<span class='glyphicon glyphicon-remove' ng-show='username.username == boost.author.name'>" +
          "</div>" +
          "<h1> "+ a + "</h1><hr>" +
          "<p>{{boost.content.idea}}</p>" +
          "<blockquote>{{boost.author.name}}</blockquote>" +
          "<div class='well'>" +
            "<div class='checkbox'>" +
              "<label><input type='checkbox' ng-model='show' ng-value='true'>Comments</label>" +
            "</div>" +
            "<div class='input-group' ng-show='username.username !== '!' && show'>" +
              "<input type='text' class='form-control' placeholder='Add a comment...'>" +
              "<span class='input-group-btn'>" +
                "<button class='btn btn-default' type='button'>Comment</button>" +
              "</span>" +
            "</div>" +
            "<div ng-repeat='comment in boost.comments | limitTo:10' ng-show='show'>" +
              "<h4>{{comment.comment}}</h4><h6>~{{comment.author}}</h6>" +
            "</div>" +
          "</div>"
        });
      }
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts));

  //  addButton.addEventListener('click', function () {
  //     ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
  //        ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
  //     });
  //  }, false);
   //
  //  deleteButton.addEventListener('click', function () {
  //     ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
  //        ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
  //     });
  //  }, false);
})();
