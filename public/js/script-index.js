$(document).ready(function() {
  var socket = io.connect("/");
  socket.on('connected', function () {
    console.log('connected!');
  });

  socket.on('disconnect', function () {
    console.log('disconnected!');
  });

  var deviceStatusUpdate = (function() {
    var displayStatus = (function(data) {
      var deviceListener;
      if (data.publicDeviceId) deviceListener = $('.' + data.publicDeviceId);
      else if (data.publicKeyId) {
        deviceListener = $('.' + data.publicKeyId);
        var deviceAccessButton = $('.' + data.publicKeyId + '-access');
      }
      else return;
      if (data.success === true && data.currentStatus === false) {
        deviceListener.removeClass('fa-circle-o-notch fa-spin text-success text-warning text-black').addClass('text-danger fa-times');
      } else if (data.success === true && data.currentStatus === true) {
        deviceListener.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-black').addClass('text-success fa-circle');
      } else if (data.keyStatus === 'Expired') {
        deviceListener.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-black').addClass('text-warning fa-ban');
        deviceAccessButton.removeClass('btn-primary').addClass('btn-warning btn-disable').removeAttr("href").html('Expired <i class="fa fa-ban" aria-hidden="true"></i>').attr('data-original-title','Expired Key!');
      } else if (data.keyStatus === 'Locked') {
        deviceListener.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-success').addClass('text-black fa-clock-o');
        deviceAccessButton.removeClass('btn-primary').addClass('btn-black btn-disable').removeAttr("href").html('Locked <i class="fa fa-clock-o" aria-hidden="true"></i>').attr('data-original-title','Next Access: ' + data.accessTimeStart);
      } else {
        deviceListener.removeClass('fa-circle-o-notch fa-spin text-danger text-black text-success').addClass('text-warning fa-exclamation-circle')
      }
    });

    var receiveUpdate = (function(data) {
      displayStatus(data);
    });

    return {
      receiveUpdate: receiveUpdate
    }
  })();

  var currentDeviceStatus = (function(i, el) {
    var publicDeviceId = $(el).children('.publicDeviceId').text();
    var publicKeyId = $(el).children('.publicKeyId').text();
    if (publicDeviceId !== "") {
      socket.emit('subscribe-device', publicDeviceId);
    }
    if (publicKeyId !== "") {
      socket.emit('subscribe-key', publicKeyId);
    }
  });

  $('tr').each(currentDeviceStatus);
  socket.on('deviceStatusUpdate', deviceStatusUpdate.receiveUpdate);
  socket.on('keyStatusUpdate', deviceStatusUpdate.receiveUpdate);

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
});


/*
 $(document).ready(function() {
 $('tr').each(function(i, el) {
 var device = $(el).children('.publicDeviceId').text();
 if (device !== "") {
 $.ajax({
 url: "device/status/" + device,
 success: function (data) {
 if (data.deviceConnected === false) {
 $("."+device).removeClass('text-default').removeClass('text-success').addClass('text-danger');
 } else {
 $("."+device).removeClass('text-default').removeClass('text-danger').addClass('text-success');
 }
 },
 error: function () {
 //alert('device issues');
 }
 });
 }
 });
 });
 */