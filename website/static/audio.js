window.addEventListener("load", () => {
  // (PART A) GET BGM
  const bgm = document.getElementById("bgm");

  // (PART B) AUTOPLAY NOT ALLOWED - SHOW "PLAY BUTTON"
  if (bgm.paused) {
    // (B1) GET "PLAY BUTTON"
    let play = document.getElementById("play");

    // (B2) CLICK TO PLAY
    play.onclick(); {
    console.log("working")
      bgm.play();
    };
  }
});


// 

// $( document ).ready(function() {
//     $('.dropdown-menu li').click(function(){
//            var color = $(this).data("color");
   
//            $("#box").css('background-color',color);
//            });
//    });