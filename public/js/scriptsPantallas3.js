//var socket = io.connect('http://192.168.1.97:8080');
//var socket = io.connect('http://172.16.52.251:8080');
//var socket = io.connect('http://192.168.0.16:8080');
//var socket = io.connect('http://192.168.0.26:8080');
//var socket = io.connect('http://192.168.0.24:8080');
var socket = io.connect('http://172.24.1.1:8080');




var actualTime;
var actualTimeState = 0;

var startTime3;
var recStartTime3;
var startTime3State = 0;

var stateDia3;
var endTime3;
var cronometro3;

var h = 00;
var m = 00;
var s = 00;

var flashTime3 = 180000;
var flashing3 = 0;

var crono3H = 0;
var crono3M = 0;
var crono3S = 0;

var state31 = 0;
var state32 = 0;

var duracionMillis3 = 0;
var duracion3State = 0;
var toggleClockState3 = 0;

var i3 = 0;
var passState3 = 0;

var stateNight3 = 0;

var changeAfterDurationMillis = 600000;
var changeAfterTimeOption = 0;

$("#overtime").fadeOut(0);
$("#saver3").hide();
$("#logo3").hide();
$(".progWidth").hide();


blackColor();

socket.on('reset3', function() {
    location.reload();
    passState3 = 0;
    flashing3 = 0;
    state32 = 0;
    blackColor();
    $('#mostrarProg3').attr('aria-valuenow', 0).css('width',"0%");
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
        document.getElementById("actualDate").innerHTML = day + "/" + month + "/" + year;        myStartFunction();
        passState3 = 0;
        state32 = 0;
    })

function myStartFunction(){
    if (state31 == 0){
        myVar = setInterval(function(){ myTimer() }, 1000);
        state31 = 1; 
    }
}

function myTimer() {

    actualTime.setSeconds(actualTime.getSeconds()+1);
    document.getElementById("actualTime").innerHTML = makeMeTwoDigits(actualTime.getHours()) + ":" + makeMeTwoDigits(actualTime.getMinutes()) + ":" + makeMeTwoDigits(actualTime.getSeconds());    

    if(actualTimeState == 1 && startTime3State == 1 && duracion3State == 1){
        if(actualTime.getTime() <= startTime3.getTime()){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis3);
            $("#overtime").fadeOut();
            blackColor();

        }else if(actualTime.getTime() <= (startTime3.getTime() + duracionMillis3)){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds((startTime3.getTime() + duracionMillis3) - actualTime.getTime());
            $("#overtime").fadeOut();
            $("#mostrarProg3").removeClass("progress-bar-danger");
            $("#mostrarProg3").addClass("progress-bar-info");
            i3++;
            if(i3>=3){
                var calc = Math.round((((actualTime.getTime() - startTime3.getTime())) / duracionMillis3)*100);
                var tempi3 = calc + "%";
                if(calc<=99){
                    $('#mostrarProg3').attr('aria-valuenow', calc).css('width',tempi3);
                }
                i3 = 0;
                blackColor();
                socket.emit('i3', calc);

            }
            if (flashing3 == 0 && ((startTime3.getTime() + duracionMillis3) - actualTime.getTime()) <= flashTime3){
                myVar2 = setInterval(function(){ flashColor() }, 750);
                flashing3 = 1;
            }

        }else{
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(actualTime.getTime() - (startTime3.getTime() + duracionMillis3));
            redColor();
            clearInterval(myVar2);
            if(passState3==0){
                passState3 = 1;
                $("#overtime").fadeIn(2000);
                socket.emit('i3', "Servicio Terminado!");
                var tempi3 = "100%";
                $('#mostrarProg3').attr('aria-valuenow', 100).css('width',tempi3);
                $("#mostrarProg3").removeClass("progress-bar-info");
                $("#mostrarProg3").addClass("progress-bar-danger");
                document.getElementById("mostrarProg3").innerHTML = "Servicio Terminado!";
                flashing3 = 0;
                passState3 = 1;
                state32 = 0;
            }
            if((actualTime.getTime() - (startTime3.getTime() + duracionMillis3)) >= changeAfterDurationMillis && (actualTime.getTime() - (startTime3.getTime() + duracionMillis3)) <= (changeAfterDurationMillis + 10000) && changeAfterDurationMillis!=0){
                changeAfterTimeOptionFunction(changeAfterTimeOption);
            }
        }
    }else{
        document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis3);
        if(state32==0){
            $("#overtime").fadeOut();
            socket.emit('i3', 0);
            state32 = 1;
        }
    }
}


socket.on('pilotos3', function(piloto3) {
    document.getElementById("piloto3").innerHTML = piloto3;
    document.getElementById("piloto33").innerHTML = piloto3;
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

socket.on('inicio3', function(data) {
    recStartTime3 = data.inicio3.split(":");
    stateDia3 = data.dia3;
    startTime3 = new Date(actualTime);
    startTime3.setHours(recStartTime3[0]);
    startTime3.setMinutes(recStartTime3[1]);
    startTime3.setSeconds(0);
    startTime3State = 1;
    if(stateDia3==1){
        startTime3.setDate(startTime3.getDate() + 1);
    }
    inicio3Ready = 1;
    document.getElementById("startTime3").innerHTML = makeMeTwoDigits(startTime3.getHours()) + ":" + makeMeTwoDigits(startTime3.getMinutes()) + ":" + makeMeTwoDigits(startTime3.getSeconds());
    passState3 = 0;
})


socket.on('sliderval3', function(sliderval3) {
    duracionMillis3 = sliderval3 * 60 * 1000;
    duracion3State = 1;
    passState3 = 0;
})

socket.on('toggleClock3', function(toggleClock3) {
        $("#saver3").hide();
        $("#logo3").hide();
        $("#clock3").show();
})

socket.on('togglePiloto3', function(togglePiloto3) {
        $("#clock3").hide();
        $("#logo3").hide();
        $("#saver3").show();
})

socket.on('toggleLogo3', function(toggleLogo3) {
        $("#saver3").hide();
        $("#clock3").hide();
        $("#logo3").show();
})



socket.on('toggleNight', function (toggleNight) {
    $(document.body).addClass("bg-black");
    $("#midsection3").addClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr.svg";
    document.getElementById("cgrsvg").src = "img/cgr.svg";
    blackColor();
})

socket.on('toggleDay', function (toggleDay) {
    $(document.body).removeClass("bg-black");
    $("#midsection3").removeClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr_inv.svg";
    document.getElementById("cgrsvg").src = "img/cgr_inv.svg";
    blackColor();
})

socket.on('allCrono', function (allCrono) {
        $("#saver3").hide();
        $("#logo3").hide();
        $("#clock3").show();
}); 

socket.on('allPiloto', function (allPiloto) {
        $("#clock3").hide();
        $("#logo3").hide();
        $("#saver3").show();
}); 

socket.on('allLogo', function (allLogo) {
        $("#saver3").hide();
        $("#clock3").hide();
        $("#logo3").show();
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
        $("#clock3").hide();
        $("#logo3").hide();
        $("#saver3").show();
    }else if(n==1){
        $("#clock3").hide();
        $("#saver3").hide();
        $("#logo3").show();
    }
}