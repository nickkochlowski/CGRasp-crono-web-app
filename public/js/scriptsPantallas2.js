//var socket = io.connect('http://192.168.1.97:8080');
//var socket = io.connect('http://172.16.52.251:8080');
//var socket = io.connect('http://192.168.0.16:8080');
//var socket = io.connect('http://192.168.0.26:8080');
//var socket = io.connect('http://192.168.0.24:8080');
var socket = io.connect('http://172.24.1.1:8080');




var actualTime;
var actualTimeState = 0;

var startTime2;
var recStartTime2;
var startTime2State = 0;

var stateDia2;
var endTime2;
var cronometro2;

var h = 00;
var m = 00;
var s = 00;

var flashTime2 = 180000;
var flashing2 = 0;

var crono2H = 0;
var crono2M = 0;
var crono2S = 0;

var state21 = 0;
var state22 = 0;

var duracionMillis2 = 0;
var duracion2State = 0;
var toggleClockState2 = 0;

var i2 = 0;
var passState2 = 0;

var stateNight2 = 0;

var changeAfterDurationMillis = 600000;
var changeAfterTimeOption = 0;

$("#overtime").fadeOut(0);
$("#saver2").hide();
$("#logo2").hide();
$(".progWidth").hide();


blackColor();

socket.on('reset2', function() {
    location.reload();
    passState2 = 0;
    flashing2 = 0;
    state22 = 0;
    blackColor();
    $('#mostrarProg2').attr('aria-valuenow', 0).css('width',"0%");

})

socket.on('currentTime', function(currentTime) {
        actualTime = new Date(currentTime);
        actualTimeState = 1;
        h = actualTime.getHours();
        m = actualTime.getMinutes();
        s = actualTime.getSeconds();
        var day = actualTime.getDate();
        var month = actualTime.getMonth() + 1;
        var year = actualTime.getFullYear();
        document.getElementById("actualTime").innerHTML = makeMeTwoDigits(h) + ":" + makeMeTwoDigits(m) + ":" + makeMeTwoDigits(s);
        document.getElementById("actualDate").innerHTML = day + "/" + month + "/" + year;
        myStartFunction();
        passState2 = 0;
        state22 = 0;
    })

function myStartFunction(){
    if (state21 == 0){
        myVar = setInterval(function(){ myTimer() }, 1000);
        state21 = 1; 
    }
}

function myTimer() {

    actualTime.setSeconds(actualTime.getSeconds()+1);
    document.getElementById("actualTime").innerHTML = makeMeTwoDigits(actualTime.getHours()) + ":" + makeMeTwoDigits(actualTime.getMinutes()) + ":" + makeMeTwoDigits(actualTime.getSeconds());    

    if(actualTimeState == 1 && startTime2State == 1 && duracion2State == 1){
        if(actualTime.getTime() <= startTime2.getTime()){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis2);
            $("#overtime").fadeOut();
            blackColor();

        }else if(actualTime.getTime() <= (startTime2.getTime() + duracionMillis2)){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds((startTime2.getTime() + duracionMillis2) - actualTime.getTime());
            $("#overtime").fadeOut();
            $("#mostrarProg2").removeClass("progress-bar-danger");
            $("#mostrarProg2").addClass("progress-bar-info");
            i2++;
            if(i2>=3){
                var calc = Math.round((((actualTime.getTime() - startTime2.getTime())) / duracionMillis2)*100);
                var tempi2 = calc + "%";
                if(calc<=99){
                    $('#mostrarProg2').attr('aria-valuenow', calc).css('width',tempi2);
                }
                i2 = 0;
                blackColor();
                socket.emit('i2', calc);

            }
            if (flashing2 == 0 && ((startTime2.getTime() + duracionMillis2) - actualTime.getTime()) <= flashTime2){
                myVar2 = setInterval(function(){ flashColor() }, 750);
                flashing2 = 1;
            }

        }else{
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(actualTime.getTime() - (startTime2.getTime() + duracionMillis2));
            redColor();
            clearInterval(myVar2);
            if(passState2==0){
                passState2 = 1;
                $("#overtime").fadeIn(2000);
                socket.emit('i2', "Servicio Terminado!");
                var tempi2 = "100%";
                $('#mostrarProg2').attr('aria-valuenow', 100).css('width',tempi2);
                $("#mostrarProg2").removeClass("progress-bar-info");
                $("#mostrarProg2").addClass("progress-bar-danger");
                document.getElementById("mostrarProg2").innerHTML = "Servicio Terminado!";
                flashing2 = 0;
                passState2 = 1;
                state22 = 0;
            }
            if((actualTime.getTime() - (startTime2.getTime() + duracionMillis2)) >= changeAfterDurationMillis && (actualTime.getTime() - (startTime2.getTime() + duracionMillis2)) <= (changeAfterDurationMillis + 10000) && changeAfterDurationMillis!=0){
                changeAfterTimeOptionFunction(changeAfterTimeOption);
            }
        }
    }else{
        document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis2);
        if(state22==0){
            $("#overtime").fadeOut();
            socket.emit('i2', 0);
            state22 = 1;
        }
    }
}


socket.on('pilotos2', function(piloto2) {
    document.getElementById("piloto2").innerHTML = piloto2;
    document.getElementById("piloto22").innerHTML = piloto2;
})



socket.on('mostrarProg', function () {
    $(".progWidth").show();
});

socket.on('esconderProg', function () {
    $(".progWidth").hide();
});

socket.on('changeAfterTime', function (data) {
    var changeAfterDurationMillisState = data.changeAfterTimeLength;
    changeAfterTimeOption = data.changeAfterTimeOption;
    if(changeAfterDurationMillisState>=1){
        changeAfterDurationMillis = changeAfterDurationMillisState * 60 * 1000;
    }else{
        changeAfterDurationMillis = 0;
    }
}); 

socket.on('inicio2', function(data) {
    recStartTime2 = data.inicio2.split(":");
    stateDia2 = data.dia2;
    startTime2 = new Date(actualTime);
    startTime2.setHours(recStartTime2[0]);
    startTime2.setMinutes(recStartTime2[1]);
    startTime2.setSeconds(0);
    startTime2State = 1;
    if(stateDia2==1){
        startTime2.setDate(startTime2.getDate() + 1);
    }
    inicio2Ready = 1;
    document.getElementById("startTime2").innerHTML = makeMeTwoDigits(startTime2.getHours()) + ":" + makeMeTwoDigits(startTime2.getMinutes()) + ":" + makeMeTwoDigits(startTime2.getSeconds());
    passState2 = 0;
})


socket.on('sliderval2', function(sliderval2) {
    duracionMillis2 = sliderval2 * 60 * 1000;
    duracion2State = 1;
    passState2 = 0;
})


socket.on('toggleClock2', function(toggleClock2) {
        $("#saver2").hide();
        $("#logo2").hide();
        $("#clock2").show();
})

socket.on('togglePiloto2', function(togglePiloto2) {
        $("#clock2").hide();
        $("#logo2").hide();
        $("#saver2").show();
})

socket.on('toggleLogo2', function(toggleLogo2) {
        $("#saver2").hide();
        $("#clock2").hide();
        $("#logo2").show();
})



socket.on('toggleNight', function (toggleNight) {
    $(document.body).addClass("bg-black");
    $("#midsection2").addClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr.svg";
    document.getElementById("cgrsvg").src = "img/cgr.svg";
    blackColor();
})

socket.on('toggleDay', function (toggleDay) {
    $(document.body).removeClass("bg-black");
    $("#midsection2").removeClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr_inv.svg";
    document.getElementById("cgrsvg").src = "img/cgr_inv.svg";
    blackColor();
})

socket.on('allCrono', function (allCrono) {
        $("#saver2").hide();
        $("#logo2").hide();
        $("#clock2").show();
}); 

socket.on('allPiloto', function (allPiloto) {
        $("#clock2").hide();
        $("#logo2").hide();
        $("#saver2").show();
}); 

socket.on('allLogo', function (allLogo) {
        $("#saver2").hide();
        $("#clock2").hide();
        $("#logo2").show();
}); 



function millisToMinutesAndSeconds(millis) {
  var hours = Math.floor(millis/3600000);
  var minutes = Math.floor((millis % 3600000) / 60000);
  var seconds = Math.floor((millis % 60000) / 1000 + 0.5);

  return (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function blackColor() {
    if($(document.body).hasClass("bg-black")){        
        document.getElementById("demo").style.color = "white";
    }else{
        document.getElementById("demo").style.color = "black";
    }
}

function redColor() {
        document.getElementById("demo").style.color = "red";
}

function flashColor() {
    if (document.getElementById("demo").style.color != "red"){
        document.getElementById("demo").style.color = "red";
    }else{
        if($(document.body).hasClass("bg-black")){        
            document.getElementById("demo").style.color = "white";
        }else{
            document.getElementById("demo").style.color = "black";
        }
    }
}

function makeMeTwoDigits(n){
    return (n < 10 ? "0" : "") + n;
}

function changeAfterTimeOptionFunction(n){
    if(n==0){
        $("#clock2").hide();
        $("#logo2").hide();
        $("#saver2").show();
    }else if(n==1){
        $("#clock2").hide();
        $("#saver2").hide();
        $("#logo2").show();
    }
}