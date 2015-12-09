'use strict';

(function () {
   var addButton = $('.btn-add');
   var deleteButton = $('.btn-delete');
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

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePosts));

   $(addButton).click(function () {
    ajaxFunctions.ajaxRequest('POST', apiUrl + "/up", function () {
       ajaxFunctions.ajaxRequest('GET', apiUrl + "/up", updatePosts);
    });
   });
   $(deleteButton).click(function () {
      ajaxFunctions.ajaxRequest('POST', apiUrl + "/down", function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl + "/down", updatePosts);
      });
   });
})();
