$(document).ready(function () {
  

  var resp = $.ajax({type: "GET", url: "/weather_data", async: false}).responseText;

  var arr = JSON.parse(resp);

  $('.weather').mouseover(function () {

    var town = $(this).attr("xlink:title");
    
    var temp = arr.find(x => x.town == town).temp;
    var text = arr.find(x => x.town == town).text;
    $('.weather').attr('data-original-title', town[0].toUpperCase()+town.slice(1));
    $('.weather').attr('data-content', "<div><li style=\"list-style: none\"><ul><b>Temperature</b>: " + temp +"</ul><ul style=\"list-style: none\"><b>Condition</b>: " + text +"</ul></li></div>");
    $('.weather').popover();
  });

});




