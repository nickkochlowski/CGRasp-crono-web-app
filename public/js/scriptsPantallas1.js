//var socket = io.connect('http://192.168.1.97:8080');
//var socket = io.connect('http://172.16.52.251:8080');
//var socket = io.connect('http://192.168.0.16:8080');
//var socket = io.connect('http://192.168.0.26:8080');
//var socket = io.connect('http://192.168.0.24:8080');
var socket = io.connect('http://172.24.1.1:8080');




var actualTime;
var actualTimeState = 0;

var startTime1;
var recStartTime1;
var startTime1State = 0;

var stateDia1;
var endTime1;
var cronometro1;

var h = 00;
var m = 00;
var s = 00;

var flashTime1 = 180000;
var flashing1 = 0;

var crono1H = 0;
var crono1M = 0;
var crono1S = 0;

var state11 = 0;
var state12 = 0;

var duracionMillis1 = 0;
var duracion1State = 0;
var toggleClockState1 = 0;

var i1 = 0;
var passState1 = 0;

var stateNight1 = 0;

var changeAfterDurationMillis = 600000;
var changeAfterTimeOption = 0;

$("#overtime").fadeOut(0);
$("#saver1").hide();
$("#logo1").hide();
$(".progWidth").hide();


blackColor();

socket.on('reset1', function() {
    location.reload();
    passState1 = 0;
    flashing1 = 0;
    state12 = 0;
    $('#mostrarProg1').attr('aria-valuenow', 0).css('width',"0%");
    blackColor();
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
        passState1 = 0;
        state12 = 0;
    })

function myStartFunction(){
    if (state11 == 0){
        myVar = setInterval(function(){ myTimer() }, 1000);
        state11 = 1; 
    }
}

function myTimer() {

    actualTime.setSeconds(actualTime.getSeconds()+1);
    document.getElementById("actualTime").innerHTML = makeMeTwoDigits(actualTime.getHours()) + ":" + makeMeTwoDigits(actualTime.getMinutes()) + ":" + makeMeTwoDigits(actualTime.getSeconds());    

    if(actualTimeState == 1 && startTime1State == 1 && duracion1State == 1){
        if(actualTime.getTime() <= startTime1.getTime()){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis1);
            $("#overtime").fadeOut();
            blackColor();

        }else if(actualTime.getTime() <= (startTime1.getTime() + duracionMillis1)){
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds((startTime1.getTime() + duracionMillis1) - actualTime.getTime());
            $("#overtime").fadeOut();
            $("#mostrarProg1").removeClass("progress-bar-danger");
            $("#mostrarProg1").addClass("progress-bar-info");
            i1++;
            if(i1>=3){
                var calc = Math.round((((actualTime.getTime() - startTime1.getTime())) / duracionMillis1)*100);
                var tempi1 = calc + "%";
                if(calc<=99){
                    $('#mostrarProg1').attr('aria-valuenow', calc).css('width',tempi1);
                }
                i1 = 0;
                blackColor();
                socket.emit('i1', calc);
                
            }
            if (flashing1 == 0 && ((startTime1.getTime() + duracionMillis1) - actualTime.getTime()) <= flashTime1){
                myVar2 = setInterval(function(){ flashColor() }, 750);
                flashing1 = 1;
            }

        }else{
            document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(actualTime.getTime() - (startTime1.getTime() + duracionMillis1));
            redColor();
            clearInterval(myVar2);
            if(passState1==0){
                passState1 = 1;
                $("#overtime").fadeIn(2000);
                socket.emit('i1', "Servicio Terminado!");
                var tempi1 = "100%";
                $('#mostrarProg1').attr('aria-valuenow', 100).css('width',tempi1);
                $("#mostrarProg1").removeClass("progress-bar-info");
                $("#mostrarProg1").addClass("progress-bar-danger");
                document.getElementById("mostrarProg1").innerHTML = "Servicio Terminado!";
                flashing1 = 0;
                passState1 = 1;
                state12 = 0;
            }
            if((actualTime.getTime() - (startTime1.getTime() + duracionMillis1)) >= changeAfterDurationMillis && (actualTime.getTime() - (startTime1.getTime() + duracionMillis1)) <= (changeAfterDurationMillis + 10000) && changeAfterDurationMillis!=0){
                changeAfterTimeOptionFunction(changeAfterTimeOption);
            }
        }
    }else{
        document.getElementById("demo").innerHTML = millisToMinutesAndSeconds(duracionMillis1);
        if(state12==0){
            $("#overtime").fadeOut();
            socket.emit('i1', 0);
            state12 = 1;
        }
    }
}


socket.on('pilotos1', function(piloto1) {
    document.getElementById("piloto1").innerHTML = piloto1;
    document.getElementById("piloto11").innerHTML = piloto1;
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

socket.on('inicio1', function(data) {
    recStartTime1 = data.inicio1.split(":");
    stateDia1 = data.dia1;
    startTime1 = new Date(actualTime);
    startTime1.setHours(recStartTime1[0]);
    startTime1.setMinutes(recStartTime1[1]);
    startTime1.setSeconds(0);
    startTime1State = 1;
    if(stateDia1==1){
        startTime1.setDate(startTime1.getDate() + 1);
    }
    inicio1Ready = 1;
    document.getElementById("startTime1").innerHTML = makeMeTwoDigits(startTime1.getHours()) + ":" + makeMeTwoDigits(startTime1.getMinutes()) + ":" + makeMeTwoDigits(startTime1.getSeconds());
    passState1 = 0;
})


socket.on('sliderval1', function(sliderval1) {
    duracionMillis1 = sliderval1 * 60 * 1000;
    duracion1State = 1;
    passState1 = 0;

})

socket.on('toggleClock1', function(toggleClock1) {
        $("#saver1").hide();
        $("#logo1").hide();
        $("#clock1").show();
})

socket.on('togglePiloto1', function(togglePiloto1) {
        $("#clock1").hide();
        $("#logo1").hide();
        $("#saver1").show();
})

socket.on('toggleLogo1', function(toggleLogo1) {
        $("#saver1").hide();
        $("#clock1").hide();
        $("#logo1").show();
})



socket.on('toggleNight', function (toggleNight) {
    $(document.body).addClass("bg-black");
    $("#midsection1").addClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr.svg";
    document.getElementById("cgrsvg").src = "img/cgr.svg";
    blackColor();
})

socket.on('toggleDay', function (toggleDay) {
    $(document.body).removeClass("bg-black");
    $("#midsection1").removeClass("bg-gray");
    document.getElementById("startLogo").src = "img/cgr_inv.svg";
    document.getElementById("cgrsvg").src = "img/cgr_inv.svg";
    blackColor();
})


socket.on('allCrono', function (allCrono) {
        $("#saver1").hide();
        $("#logo1").hide();
        $("#clock1").show();
}); 

socket.on('allPiloto', function (allPiloto) {
        $("#clock1").hide();
        $("#logo1").hide();
        $("#saver1").show();
}); 

socket.on('allLogo', function (allLogo) {
        $("#saver1").hide();
        $("#clock1").hide();
        $("#logo1").show();
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
        $("#clock1").hide();
        $("#logo1").hide();
        $("#saver1").show();
    }else if(n==1){
        $("#clock1").hide();
        $("#saver1").hide();
        $("#logo1").show();
    }
}