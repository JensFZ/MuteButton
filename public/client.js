$(document).ready(function(){
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    dialog.showModal();
    /*    showModalButton.addEventListener('click', function() {
    });
    */
    dialog.querySelector('.close').addEventListener('click', function() {
        setUsername();
        dialog.close();
    });

    var $usernameWeiter = $(".usernameWeiter");
    var $inputMessage   = $(".inputMessage");
    var $loginPage      = $(".login.page");
    var $chatPage       = $(".chat.page");
    var socket          = io.connect();
    var noSleep         = new NoSleep();

    // Diese Funktion verhindert das abschalten des Displays
    function enableNoSleep() {
        noSleep.enable();
        document.removeEventListener("touchstart", enableNoSleep, false);
    }

    function disableNoSleep() {
        noSleep.disable();
        document.addEventListener("touchstart", enableNoSleep, false);
    }

    // den Inhalt des Elementes auslesen
    function cleanInput(input) {
        return $("<div/>").text(input).text();
    }

    // Username setzen
    function setUsername() {
        username = cleanInput(dialog.querySelector('.Username').value.trim());

        // Prüfen, ob ein Benutzername angegeben wurde
        if (username) {
            // Sende den Benutzernamen an den Server
            socket.emit("add user", username);
        }
    }

    $usernameWeiter.on("click", function() {
        setUsername();
    });

    document.addEventListener("touchstart", enableNoSleep, false);
});
