$(document).ready(function(){
  var $usernameWeiter = $(".usernameWeiter");
  var $usernameInput = $(".usernameInput");
  var $inputMessage = $(".inputMessage");
  var $loginPage = $(".login.page");
  var $chatPage = $(".chat.page");
  var socket = io.connect();
  var noSleep = new NoSleep();

  function enableNoSleep() {
    noSleep.enable();
    document.removeEventListener("touchstart", enableNoSleep, false);
  }

  socket.on("chat", function (data) {
    var zeit = new Date(data.zeit);
    $("#content").append(
        $("<li></li>").append(
            // Uhrzeit
            $("<span>").text("[" +
                (zeit.getHours() < 10 ? "0" + zeit.getHours() : zeit.getHours())
                + ":" +
                (zeit.getMinutes() < 10 ? "0" + zeit.getMinutes() : zeit.getMinutes())
                + "] "
            ),
            // Name
            $("<b>").text(typeof(data.name) !== "undefined" ? data.name + ": " : ""),
            // Text
            $("<span>").text(data.text))
    );
    // nach unten scrollen
    $("body").scrollTop($("body")[0].scrollHeight);
  });

  function senden(){
	  // Eingabefelder auslesen
    var name = $("#name").val();
    var text = $("#text").val();

	  // Socket senden
    socket.emit("chat", { name: name, text: text });

    // Text-Eingabe leeren
    $("#text").val("");
  }
  // bei einem Klick
  $("#senden").click(senden);
  // oder mit der Enter-Taste
  $("#text").keypress(function (e) {
  	if (e.which === 13) {
      senden();
  	}
  });


  $usernameWeiter.on("click", function() {
    setUsername();
  });

  // Username setzen
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off("click");
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit("add user", username);
    }
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $("<div/>").text(input).text();
  }

  document.addEventListener("touchstart", enableNoSleep, false);

});
