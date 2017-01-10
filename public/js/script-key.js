$(document).ready(function() {
  var socket = io.connect("/");
  socket.on('connected', function () {
  });

  socket.on('disconnect', function () {
  });

  var deviceStatusUpdate = (function() {
    var displayStatus = (function(data) {
      var deviceStatusIcon = $('.deviceConnectionIcon');
      if (data.success === true && data.currentStatus === false) {
        deviceStatusIcon.removeClass('fa-circle-o-notch fa-spin text-success text-warning text-black').addClass('text-danger fa-times')
      } else if (data.success === true && data.currentStatus === true && data.keyStatus === 'Active') {
        deviceStatusIcon.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-black').addClass('text-success fa-circle');
      } else if (data.keyStatus === 'Expired') {
        deviceStatusIcon.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-success ').addClass('text-warning fa-ban').attr('data-original-title','Expired Key!');
      } else if (data.keyStatus === 'Locked') {
        deviceStatusIcon.removeClass('fa-circle-o-notch fa-spin text-danger text-warning text-success ').addClass('text-black fa-moon-o').attr('data-original-title','Locked Key!');
      } else {
        deviceStatusIcon.removeClass('fa-circle-o-notch fa-spin text-danger text-black text-success').addClass('text-warning fa-exclamation-circle')
      }
    });

    return {
      displayStatus: displayStatus
    }
  })();

  socket.on('keyStatusUpdate', deviceStatusUpdate.displayStatus);

  var key = $('.deviceConnectionIcon').attr('id');
  socket.emit('subscribe-key', key);

  var invocationFunction = (function() {
    var displayStatus = (function(data) {
      var deviceListener = $('.deviceConnectionIcon');
      var functionListener = $('#listen-' + data.deviceFunctionId);
      if (data.success === true && data.currentStatus === 0) {
        functionListener.removeClass('btn-default').removeClass('btn-success').removeClass('btn-warning').addClass('btn-danger');
      } else if (data.success === true && data.currentStatus === 1) {
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-warning').addClass('btn-success');
      } else if (data.keyStatus === 'Expired') {
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-success').addClass('text-warning').html('Expired <i class="fa fa-ban" aria-hidden="true"></i>').attr('data-original-title','Expired Key!').prop("disabled",true);
        deviceListener.removeClass('fa-circle-o-notch fa-circle fa-spin text-danger text-success text-warning').addClass('text-warning fa-ban');
      } else if (data.keyStatus === 'Locked') {
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-success').addClass('text-black').html('Locked <i class="fa fa-clock-o" aria-hidden="true"></i>').attr('data-original-title','Locked Key!').prop("disabled",true);
        deviceListener.removeClass('fa-circle-o-notch fa-circle fa-spin text-danger text-success text-warning').addClass('text-black fa-clock-o');
      } else {
        functionListener.removeClass('btn-default').removeClass('btn-success').removeClass('btn-danger').addClass('btn-warning');
      }
    });

    var receiveUpdate = (function(data) {
      displayStatus(data);
    });

    var sendUpdate = (function(data) {

      $('#listen-' + data.room).toggleClass("btn-danger btn-success");
      socket.emit(data.functionType, { room: data.room, publicKeyId: data.publicKeyId });
    });

    return {
      receiveUpdate: receiveUpdate,
      sendUpdate: sendUpdate
    }
  })();

  var switchFunction = (function() {
    var returnToDefaultState = (function(data) {
      var functionListener = $('#listen-' + data.deviceFunctionId);
      functionListener.removeClass('btn-default').removeClass('btn-success').removeClass('btn-warning').addClass('btn-danger');
    });

    var displayStatus = (function(data) {
      var deviceListener = $('.deviceConnectionIcon');
      var functionListener = $('#listen-' + data.deviceFunctionId);
      if (data.success === true && data.currentStatus === 0) {
        functionListener.removeClass('btn-default').removeClass('btn-success').removeClass('btn-warning').removeClass('btn-black').addClass('btn-danger');
      } else if (data.success === true && data.currentStatus === 1) {
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-warning').removeClass('btn-black').addClass('btn-success');
      } else if (data.keyStatus === 'Expired') {
        deviceListener.removeClass('fa-circle-o-notch fa-circle fa-spin text-danger text-success text-warning').addClass('text-warning fa-ban');
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-success').addClass('btn-warning btn-disable').removeAttr("href").html('Expired <i class="fa fa-ban" aria-hidden="true"></i>').attr('data-original-title','Expired Key!').prop("disabled",true);
      } else if (data.keyStatus === 'Locked') {
        functionListener.removeClass('btn-default').removeClass('btn-danger').removeClass('btn-success').addClass('btn-black btn-disable').removeAttr("href").html('Locked <i class="fa fa-clock-o" aria-hidden="true"></i>').attr('data-original-title','Locked Key!').prop("disabled",true);
        deviceListener.removeClass('fa-circle-o-notch fa-circle fa-spin text-danger text-success text-warning').addClass('text-black fa-clock-o');
      } else {
        functionListener.removeClass('btn-default').removeClass('btn-success').removeClass('btn-danger').removeClass('btn-black').addClass('btn-warning');
      }
    });

    var receiveUpdate = (function(data) {
      displayStatus(data);
    });

    var sendUpdate = (function(data) {
      //data.instance.toggleClass("btn-danger btn-success");
      $('#listen-' + data.room).toggleClass("btn-danger btn-success");
      socket.emit(data.functionType, { room: data.room, publicKeyId: data.publicKeyId });
    });

    return {
      receiveUpdate: receiveUpdate,
      sendUpdate: sendUpdate
    }
  })();

  var stringFunction = (function() {
    var receiveUpdate = (function(data) {
      var updateTextBox = document.getElementById('listen-' + data.deviceFunctionId);
      if (data.stringFunctionValue) {
        updateTextBox.placeholder = data.stringFunctionValue; //TODO: better notifications
      }
    });

    var sendUpdate = (function(data) {
      var sendText = document.getElementById('listen-' + data.room);
      if (sendText.value) {
        sendText.placeholder = sendText.value;
        socket.emit(functionType, { room: data.room, message: sendText.value, publicKeyId: data.publicKeyId });
        sendText.value = "";
      }
    });

    return {
      receiveUpdate: receiveUpdate,
      sendUpdate: sendUpdate
    }
  })();
  var numericFunction = (function() {
    var receiveUpdate = (function(data) {
      var updateTextBox = document.getElementById('listen-' + data.deviceFunctionId);
      if (data.currentStatus) {
        updateTextBox.placeholder = data.currentStatus; //TODO better notifications
      }
    });

    var sendUpdate = (function(data) {
      var sendText = document.getElementById('listen-' + data.room);
      if (sendText.value) {
        sendText.placeholder = sendText.value;
        socket.emit(functionType, { room: data.room, message: sendText.value, publicKeyId: data.publicKeyId });
        sendText.value = "";
      }
    });

    return {
      receiveUpdate: receiveUpdate,
      sendUpdate: sendUpdate
    }
  })();

  var deviceUpdate = function(data) {
    console.log('received', data);
    if (data.functionType === 'switch') switchFunction.receiveUpdate(data);
    else if (data.functionType === 'string') stringFunction.receiveUpdate(data);
    else if (data.functionType === 'numeric') numericFunction.receiveUpdate(data);
    else if (data.functionType === 'invocation') invocationFunction.receiveUpdate(data);
  };
  socket.on('functionStatusChange', deviceUpdate);
  var sendUpdate = function(event) {
    functionType = event.data.functionType;
    if (functionType === 'switch') switchFunction.sendUpdate(event.data);
    else if (functionType === 'string') stringFunction.sendUpdate(event.data);
    else if (functionType === 'numeric') stringFunction.sendUpdate(event.data);
    else if (functionType === 'invocation') invocationFunction.sendUpdate(event.data);
  };

  $('tr').each(function (i, el) {
    var publicDeviceFunctionId = $(el).children('.publicDeviceFunctionId').text();
    var publicKeyId = $(el).children('.publicKeyId').text();
    var functionType = $(el).children('.function-type').text();
    //var functionType = $(this).prop('className');
    if (publicDeviceFunctionId !== "") {
      socket.emit('subscribe-function', {room: publicDeviceFunctionId, functionType: functionType, publicKeyId: publicKeyId});
    }
    $('.emit-'+publicDeviceFunctionId).on('click', {room: publicDeviceFunctionId, functionType: functionType, publicKeyId: publicKeyId, instance: $( this )}, sendUpdate);
  });
});
