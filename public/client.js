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

    function enableNoSleep() {
        noSleep.enable();
        document.removeEventListener("touchstart", enableNoSleep, false);
    }

    // Prevents input from having injected markup
    function cleanInput(input) {
        return $("<div/>").text(input).text();
    }

    // Username setzen
    function setUsername() {
        //console.log('hier');

        username = cleanInput(dialog.querySelector('.Username').value.trim());
        //console.log(username);

        // If the username is valid
        if (username) {
            //$loginPage.fadeOut();
            //$chatPage.show();
            //$loginPage.off("click");
            //$currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit("add user", username);
        }
    }

    $usernameWeiter.on("click", function() {
        setUsername();
    });

    document.addEventListener("touchstart", enableNoSleep, false);
});
