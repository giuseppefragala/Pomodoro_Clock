$(document).ready(function(){

  var canRun = false;
  var round = 0;
  var time_value_current_stored = 0;
  var time_value_stored = 0;
  var tic_stored = 0;
  var filling_color_stored = 0;
  var stored_action = "session";
  
  var break_length_changed = false;
  var session_length_changed = false;
  
  $(".circle-text-action").html("Session");
  $(".circle-text-value").html("25");
  $("#break-value").html("5");
  $("#session-value").html("25");
  
  function secondsToMinutes(numSeconds){
    var minutes = Math.floor(numSeconds / 60);
    var seconds = numSeconds % 60;
    if(seconds < 10 ){
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
    };
  
  function fill_circle(time_value, action){
    var filling_circle = "";
    var filling_color = "";
    var tic = "";
    var time_value_current = 0;
    
    
    
    if(round === 0){
      stored_action = action;

      if(action === "session"){
        filling_color = "#7da10e"; 
      }else if (action === "break"){
        filling_color = "#ff4444";       
      }
      filling_color_stored = filling_color;
      time_value_current = 100;    
      $("#circle-fill").css('background', 'linear-gradient(#333 ' + time_value_current + '%,' + filling_color + ' ' + time_value_current + '%)');      
      //time_value = time_value * 60;
      $(".circle-text-value").html(time_value); 
      
      time_value = time_value * 60;
      tic = 100 / time_value;
      tic_stored = tic;      
      
      round = 1;
    }else{
      action = stored_action;
      time_value_current = time_value_current_stored;
      time_value = time_value_stored;
      tic = tic_stored;
      filling_color = filling_color_stored;
    }
    
    if(action === "session"){
      $(".circle-text-action").html("Session");
    }else{
      $(".circle-text-action").html("Break!");      
    }  
      
    filling_circle = setInterval(function(){
   
    if(canRun){      
              time_value_current -= tic;
              time_value_current_stored = time_value_current;
              $("#circle-fill").css('background', 'linear-gradient(#333 ' + time_value_current + '%,' + filling_color + ' ' + time_value_current + '%)');
            time_value--; 
            $(".circle-text-value").html(secondsToMinutes(time_value));

            time_value_stored = time_value;
              if(parseInt(time_value) < 0){
                  clearInterval(filling_circle);
                  round = 0;
                  if(action === "session"){
                     action = "break"
                     fill_circle($("#break-value").html(), "break");          
                  }else{
                     fill_circle($("#session-value").html(), "session") ;           
                  }

              }
          }else{
            clearInterval(filling_circle);        
          }      
       }, 1000)
  };
    
  
  $('#circle-fill').on('click', function() { 
    if(canRun){
      canRun = false;
    }else{
      canRun = true;
      
      if( session_length_changed && ( stored_action === "session" ) ){
          round = 0;
          fill_circle($("#session-value").html(), "session");
          session_length_changed = false;          
      }else if( break_length_changed && stored_action === "break" ){
                round = 0;
                fill_circle($("#break-value").html(), "break");
                break_length_changed = false;           
      }else if(stored_action === "session"){
                  fill_circle($("#session-value").html(), "session");  
      }else if(stored_action === "break"){
                  fill_circle($("#break-value").html(), "break");               
               }

    }    
  });
  
  
  
$("#break-min-sign").click(function() {
  if(!canRun && round === 1){
    $("#break-value").html($("#break-value").html()*1 - 1 || 1);
    if(stored_action === "break"){
      $(".circle-text-value").html($("#break-value").html());
      break_length_changed = true;
    }
  }
});

$("#break-plus-sign").click(function() {
  if(!canRun && round === 1){
    $("#break-value").html($("#break-value").html()*1 + 1 || 1);
    if(stored_action === "break"){
      $(".circle-text-value").html($("#break-value").html());
      break_length_changed = true;
    }
  }
});

$("#session-min-sign").click(function() { 
  if(!canRun && round === 1){
    $("#session-value").html($("#session-value").html()*1 - 1 || 1);
    if(stored_action === "session"){    
      $(".circle-text-value").html($("#session-value").html());
      session_length_changed = true;
    }
  }
});

$("#session-plus-sign").click(function() {
  if(!canRun && round === 1){
    $("#session-value").html($("#session-value").html()*1 + 1 || 1);
    if(stored_action === "session"){    
      $(".circle-text-value").html($("#session-value").html());
      session_length_changed = true;
    }
  }
});  
  
$("#reset-button").click(function() {
  location.reload(true);  
});    
  
});