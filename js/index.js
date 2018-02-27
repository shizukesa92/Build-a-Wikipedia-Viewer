$(document).ready(function(){
  
  $("input").focus(function() {
    $(this).attr("placeholder", "Type text to begin");
  })

  $("input").focusout(function() {
    $(this).attr("placeholder", "");  
    $(this).val("");
    $("#toAppend").empty();
    $("#toClear").empty();
    $("#toClear").append("Click icon to begin searching</p>");
  })

  function searchWiki(){
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $("input").val() + "&callback=JSON_CALLBACK",
      dataType: "jsonp",
      type: "POST",
      headers: {
      "Api-User-Agent": "Example/1.0"
      },      
      
      success: function(data) {
        $("#toClear").empty();
        $("#toAppend").empty();
        var response = data.query.pages;
       
        for (var i in response){
          html = '<div class="jumbotron" id="jumboTwo"><a href="https://en.wikipedia.org/?curid=' + response[i].pageid + '" target="_blank"><h3>' + response[i].title + '</h3><h2>' + response[i].extract + '</h2></a></div>';
          $("#toAppend").append(html);
        }
     }
    
    });
  
  }
  
  $("input").on("keyup",function(){
    if ($("input").val().length > 0){
      searchWiki();
    } else {
      $("#toAppend").empty();
      $("#toClear").append("Click icon to begin searching</p>");
    }
  });  

});

//Sandbox: https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&format=json&prop=pageimages%7Cextracts&generator=search&exsentences=1&exintro=1&explaintext=1&gsrsearch=abc&gsrnamespace=0&gsrlimit=10&callback=JSON_CALLBACK