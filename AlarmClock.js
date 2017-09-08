/**
* Alarm Clock
*/
function AlarmClock() {
  var alarms = [];
  var clock;
  this.init = function() {
    clock = setInterval(updateCurTime, 1000);
    document.getElementById('addAlarmBtn').addEventListener('click', handleAddAlarm);
    document.querySelector("input[name='hour']").addEventListener('input', checkInputIsValid);
    document.querySelector("input[name='minute']").addEventListener('input', checkInputIsValid);
    document.querySelector("input[name='second']").addEventListener('input', checkInputIsValid);
    updateCurTime();
  }
  /**
  * Alarm Object: stores the time of alarm the user set up
  */
  function Alarm (timeString) {
    this.timeString = timeString;
    this.index = alarms.length;
    //add a row in the alarms list
    this.addToDom = function() {
      var newTr = document.createElement("tr");
      newTr.classList.add('success');
      newTr.classList.add('alarmNum' + alarms.length);
      newTr.innerHTML = '<td><span class="glyphicon glyphicon-time" aria-hidden="true"></span></td><td>'+ timeString +'</td><td>Active</td>';
      document.getElementById('alarmsTable').appendChild(newTr);
      return this;
    }
    //deActivate the alarms at the list (row background turn to grey)
    this.deActivate = function(){
      var element = document.getElementsByClassName('alarmNum' + this.index)[0];
      element.innerHTML = '<td><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span></td><td>'+ timeString +'</td><td>Went off</td>';
      element.classList.remove('success');
      element.classList.add('active');//to add a grey back ground
      element.classList.add('text-muted');
      //remove from alarms
      alarms.splice(this.index, 1);
    }

  }
  var updateCurTime = function() {
    var curTimeObj = new Date();
    var curTimeString = getTimeString(curTimeObj.getHours(), curTimeObj.getMinutes(), curTimeObj.getSeconds());
    document.getElementById('curTime').innerHTML = curTimeString;
    for(var i = 0; i < alarms.length; i++) {
      let alarm = alarms[i];
      if (alarm.timeString === curTimeString) {
        //alert('Your alarm clock ' + alarm.timeString + ' goes off!!');
        var audio = new Audio('analog-watch-alarm.mp3');
        audio.play();
        alarm.deActivate();
      }
    }
  }
  var getTimeString = function(hr, min, sec) {
    return ('0' + hr).slice(-2) + ':' +
            ('0' + min).slice(-2) + ':' +
            ('0' + sec).slice(-2);
  }
  var handleAddAlarm = function(e) {
    e.preventDefault();
    var setHour = parseInt(document.querySelector("input[name='hour']").value);
    var setMinute = parseInt(document.querySelector("input[name='minute']").value);
    var setSecond = parseInt(document.querySelector("input[name='second']").value);

    var timeString = getTimeString(setHour, setMinute, setSecond);
    alarms.push(new Alarm(timeString).addToDom());
    document.getElementById('addAlarmBtn').disabled = false;

  }
  var checkInputIsValid = function() {
    var setHour = document.querySelector("input[name='hour']").value;
    var setMinute = document.querySelector("input[name='minute']").value;
    var setSecond = document.querySelector("input[name='second']").value;
    if (validateHour(setHour) && validateMinSec(setMinute) && validateMinSec(setSecond)) {
      document.getElementById('addAlarmBtn').disabled = false;
      document.getElementById('warningMsg').innerHTML = '';
    }
    else {
      document.getElementById('warningMsg').innerHTML = 'Input must be integer';
      document.getElementById('addAlarmBtn').disabled = true;
    }
  }
  var validateHour = function(str) {
    if(str == '' || isNaN(str)) return false;
    var n = Number(str);
    return Number.isInteger(n) && n >= 0 && n <= 24;
  }
  var validateMinSec = function(str) {
    if(str == '' || isNaN(str)) return false;
    var n = Number(str);
    return Number.isInteger(n) && n >= 0 && n <= 60;
  }
}
var myAlarmSystem = new AlarmClock();
myAlarmSystem.init();
