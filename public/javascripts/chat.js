var socket = io();


$("#target").submit(function (event) {
    event.preventDefault();
    console.log('yay');
    var message = $('#message').val();

    alert("Handler for .submit() called.");
    //socket.emit('message', message)
});