//var socket = io.connect('http://192.168.1.97:8080');
//var socket = io.connect('http://172.16.52.251:8080');
//var socket = io.connect('http://192.168.0.16:8080');
//var socket = io.connect('http://192.168.0.26:8080');
//var socket = io.connect('http://192.168.0.24:8080');
var socket = io.connect('http://172.24.1.1:8080');




var actualTime;
var actualTimeState = 0;

var startTime4;
var recStartTime4;
var startTime4State = 0;

var stateDia4;
var endTime4;
var cronometro4;

var h = 00;
var m = 00;
var s = 00;

var flashTime4 = 180000;
var flashing4 = 0;

var crono4H = 0;
var crono4M = 0;
var crono4S = 0;

var state41 = 0;
var state42 = 0;

var duracionMillis4 = 0;
var duracion4State = 0;
var toggleClockState4 = 0;

var i4 = 0;
var passState4 = 0;

var stateNight4 = 0;

var changeAfterDurationMillis = 600000;
var changeAfterTimeOption = 0;

$("#overtime").fadeOut(0);
$("#saver4").hide();
$("#logo4").hide();
$(".progWidth").hide();


blackColor();

socket.on('reset4', function() {
    location.reload();
    passState4 = 0;
    flashing4 = 0;
    state42 = 0;
    blackColor();
    $('#mostrarProg4').attr('aria-valuenow', 0).css('width',"0%");
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
        passState4 = 0;
        state42 = 0;
    })

function myStartFunction(){
    if (state41 == 0){
        myVar = setInterval(function(){ myTimer() }, 1000);
        state41 = 1; 
    }
}

function myTimer() {

    actualTime.setSeconds(actualTime.getSeconds()+1);
    document.getElementById("actualTime").innerHTML = makeMeTwoDigits(actualTime.getHours()) + ":" + makeMeTwoDigits(actualTime.getMinutes()) + ":" + makeMeTwoDigits(actualTime.getSeconds());    

    if(actualTimeState == 1 && startTime4State == 1 && duracion4State == 1){
        if(actualTime.getTime() <= startTime4.getTime()){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis4);
            $("#overtime").fadeOut();
            blackColor();

        }else if(actualTime.getTime() <= (startTime4.getTime() + duracionMillis4)){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds((startTime4.getTime() + duracionMillis4) - actualTime.getTime());
            $("#overtime").fadeOut();
            $("#mostrarProg4").removeClass("progress-bar-danger");
            $("#mostrarProg4").addClass("progress-bar-info");
            i4++;
            if(i4>=3){
                var calc = Math.round((((actualTime.getTime() - startTime4.getTime())) / duracionMillis4)*100);
                var tempi4 = calc + "%";
                if(calc<=99){
                    $('#mostrarProg4').attr('aria-valuenow', calc).css('width',tempi4);
                }
                i4 = 0;
                blackColor();
                socket.emit('i4', calc);

            }
            if (flashing4 == 0 && ((startTime4.getTime() + duracionMillis4) - actualTime.getTime()) <= flashTime4){
                myVar2 = setInterval(function(){ flashColor() }, 750);
                flashing4 = 1;
            }

        }else{
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(actualTime.getTime() - (startTime4.getTime() + duracionMillis4));
            redColor();
            clearInterval(myVar2);
            if(passState4==0){
                passState4 = 1;
                $("#overtime").fadeIn(2000);
                socket.emit('i4', "Servicio Terminado!");
                var tempi4 = "100%";
                $('#mostrarProg4').attr('aria-valuenow', 100).css('width',tempi4);
                $("#mostrarProg4").removeClass("progress-bar-info");
                $("#mostrarProg4").addClass("progress-bar-danger");
                document.getElementById("mostrarProg4").innerHTML = "Servicio Terminado!";
                flashing4 = 0;
                passState4 = 1;
                state42 = 0;
            }
            if((actualTime.getTime() - (startTime4.getTime() + duracionMillis4)) >= changeAfterDurationMillis && (actualTime.getTime() - (startTime4.getTime() + duracionMillis4)) <= (changeAfterDurationMillis + 10000) && changeAfterDurationMillis!=0){
                changeAfterTimeOptionFunction(changeAfterTimeOption);
            }
        }
    }else{
        document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis4);
        if(state42==0){
            $("#overtime").fadeOut();
            socket.emit('i4', 0);
            state42 = 1;
        }
    }
}


socket.on('pilotos4', function(piloto4) {
    document.getElementById("piloto4").innerHTML = piloto4;
    document.getElementById("piloto44").innerHTML = piloto4;
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

socket.on('inicio4', function(data) {
    recStartTime4 = data.inicio4.split(":");
    stateDia4 = data.dia4;
    startTime4 = new Date(actualTime);
    startTime4.setHours(recStartTime4[0]);
    startTime4.setMinutes(recStartTime4[1]);
    startTime4.setSeconds(0);
    startTime4State = 1;
    if(stateDia4==1){
        startTime4.setDate(startTime4.getDate() + 1);
    }
    inicio4Ready = 1;
    document.getElementById("startTime4").innerHTML = makeMeTwoDigits(startTime4.getHours()) + ":" + makeMeTwoDigits(startTime4.getMinutes()) + ":" + makeMeTwoDigits(startTime4.getSeconds());
    passState4 = 0;
})


socket.on('sliderval4', function(sliderval4) {
    duracionMillis4 = sliderval4 * 60 * 1000;
    duracion4State = 1;
    passState4 = 0;
})

socket.on('toggleClock4', function(toggleClock4) {
        $("#saver4").hide();
        $("#logo4").hide();
        $("#clock4").show();
})

socket.on('togglePiloto4', function(togglePiloto4) {
        $("#clock4").hide();
        $("#logo4").hide();
        $("#saver4").show();
})

socket.on('toggleLogo4', function(toggleLogo4) {
        $("#saver4").hide();
        $("#clock4").hide();
        $("#logo4").show();
})



socket.on('toggleNight', function (toggleNight) {
    $(document.body).addClass("bg-black");
    $("#midsection4").addClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr.svg";
    document.getElementById("cgrsvg").src = "img/cgr.svg";
    blackColor();
})

socket.on('toggleDay', function (toggleDay) {
    $(document.body).removeClass("bg-black");
    $("#midsection4").removeClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr_inv.svg";
    document.getElementById("cgrsvg").src = "img/cgr_inv.svg";
    blackColor();
})

socket.on('allCrono', function (allCrono) {
        $("#saver4").hide();
        $("#logo4").hide();
        $("#clock4").show();
}); 

socket.on('allPiloto', function (allPiloto) {
        $("#clock4").hide();
        $("#logo4").hide();
        $("#saver4").show();
}); 

socket.on('allLogo', function (allLogo) {
        $("#saver4").hide();
        $("#clock4").hide();
        $("#logo4").show();
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
        $("#clock4").hide();
        $("#logo4").hide();
        $("#saver4").show();
    }else if(n==1){
        $("#clock4").hide();
        $("#saver4").hide();
        $("#logo4").show();
    }
}