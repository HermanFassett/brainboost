'use strict';

(function () {
   var upButton = $('#btn-up');
   var downButton = $('#btn-down');
   var deleteButton = $('#btn-delete');
   var commentButton = $('#btn-comment');
   var commentText = $('#txt-comment');
   var voteNbr = $('#vote-nbr');
   var apiUrl = window.location.href;

   function updatePosts(data) {
      var votes = JSON.parse(data);
      $(voteNbr).text(votes.up-votes.down);
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Type');
      data.addColumn('number', 'Votes');
      data.addRows([
        ['Upvotes', votes.up],
        ['Downvotes', votes.down]
      ]);
      var options = {
        'height': 300
      };
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
   }
   function updateComments(data) {
     var comment = JSON.parse(data);
     console.log(comment);
     $("#commentsBox").html("<div>" +
                            "<h5>" + comment.comment + "</h5>" +
                            "<h6>~" + comment.author + "<p class='text-muted text-right'>" + new Date(comment.date).toDateString() +
                            "</p></h6>" +
                            "</div>" +
                            $("#commentsBox").html());
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts));

   $(upButton).click(function () {
    ajaxFunctions.ajaxRequest('POST', apiUrl + "/up", function () {
       ajaxFunctions.ajaxRequest('GET', apiUrl + "/up", updatePosts);
    });
   });
   $(downButton).click(function () {
      ajaxFunctions.ajaxRequest('POST', apiUrl + "/down", function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl + "/down", updatePosts);
      });
   });
   $(commentButton).click(function() {
     ajaxFunctions.ajaxRequest('POST', apiUrl + "/comment/" + $(commentText).val(), function () {
        ajaxFunctions.ajaxRequest('GET', apiUrl + "/comment/" + $(commentText).val(), updateComments);
     });
   });
   $(deleteButton).click(function() {
     window.location.assign(apiUrl + "/delete/post");
   });
})();
