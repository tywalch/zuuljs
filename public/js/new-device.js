var a = document.getElementById("particleDeviceSelection");
var c = document.getElementById("particleDeviceNameStripper");
a.onblur = (function() {
    c.value = document.getElementById("particleDeviceSelection").selectedOptions[0].text;
});