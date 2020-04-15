//var socket = io.connect('http://192.168.1.97:8080');
//var socket = io.connect('http://172.16.52.251:8080');
//var socket = io.connect('http://192.168.0.16:8080');
//var socket = io.connect('http://192.168.0.26:8080');
//var socket = io.connect('http://192.168.0.24:8080');
var socket = io.connect('http://172.24.1.1:8080');




var dia1;
var dia2;
var dia3;
var dia4;

var sliderval1;
var sliderval2;
var sliderval3;
var sliderval4;

var toggleClock1 = 0;
var toggleClock2 = 0;
var toggleClock3 = 0;
var toggleClock4 = 0;

var prueba1;
var prueba2;
var prueba3;
var prueba4;

var stateNight = 0;

var changeAfterTimeLength;
var changeAfterTimeOption;

var availableTags;

socket.on('message', function(data) {
    var preCurrentTime = new Date();
    var currentTime = new Date(preCurrentTime.getTime()-10800000);
    socket.emit('currentTime', currentTime);
    if(!$("#progressBar1").hasClass("progress-bar-striped active")){
        $("#progressBar1").addClass("progress-bar-striped active");
    }
    if(!$("#progressBar2").hasClass("progress-bar-striped active")){
        $("#progressBar2").addClass("progress-bar-striped active");
    }
    if(!$("#progressBar3").hasClass("progress-bar-striped active")){
        $("#progressBar3").addClass("progress-bar-striped active");
    }
    if(!$("#progressBar4").hasClass("progress-bar-striped active")){
        $("#progressBar4").addClass("progress-bar-striped active");
    }

    availableTags = data.availableTagsData.split(",");


      for(var i in availableTags){
        var newButton = '<button type="button" class="list-group-item"></button>';
        $("#autofillPiloto").append(newButton);
        document.getElementById("autofillPiloto").lastChild.innerHTML = availableTags[i];
    }

    document.getElementById("piloto1").value = data.piloto1;
    document.getElementById("sliderval1").value = data.sliderval1;
    document.getElementById("inicio1").value = data.inicio1;
    document.getElementById("sliderBar1").value = data.sliderval1;
    document.getElementById("sumPiloto1").innerHTML = "Piloto: " + data.piloto1;
    document.getElementById("sumDuracion1").innerHTML = "Duracion de Servicio: " + data.sliderval1 + " minutos";
    document.getElementById("sumInicio1").innerHTML = "Hora de Inicio: " + data.inicio1;
    if(data.dia1 == 1){
        document.getElementById("dia1").value = "Mañana";
    }else{
        document.getElementById("dia1").value = "Hoy";
    }

    document.getElementById("piloto2").value = data.piloto2;
    document.getElementById("sliderval2").value = data.sliderval2;
    document.getElementById("inicio2").value = data.inicio2;
    document.getElementById("sliderBar1").value = data.sliderval2;
    document.getElementById("sumPiloto2").innerHTML = "Piloto: " + data.piloto2;
    document.getElementById("sumDuracion2").innerHTML = "Duracion de Servicio: " + data.sliderval2 + " minutos";
    document.getElementById("sumInicio2").innerHTML = "Hora de Inicio: " + data.inicio2;
    if(data.dia2 == 1){
        document.getElementById("dia2").value = "Mañana";
    }else{
        document.getElementById("dia2").value = "Hoy";
    }

    document.getElementById("piloto3").value = data.piloto3;
    document.getElementById("sliderval3").value = data.sliderval3;
    document.getElementById("inicio3").value = data.inicio3;
    document.getElementById("sliderBar1").value = data.sliderval3;
    document.getElementById("sumPiloto3").innerHTML = "Piloto: " + data.piloto3;
    document.getElementById("sumDuracion3").innerHTML = "Duracion de Servicio: " + data.sliderval3 + " minutos";
    document.getElementById("sumInicio3").innerHTML = "Hora de Inicio: " + data.inicio3;
    if(data.dia3 == 1){
        document.getElementById("dia3").value = "Mañana";
    }else{
        document.getElementById("dia3").value = "Hoy";
    }

    document.getElementById("piloto4").value = data.piloto4;
    document.getElementById("sliderval4").value = data.sliderval4;
    document.getElementById("inicio4").value = data.inicio4;
    document.getElementById("sliderBar1").value = data.sliderval4;
    document.getElementById("sumPiloto4").innerHTML = "Piloto: " + data.piloto4;
    document.getElementById("sumDuracion4").innerHTML = "Duracion de Servicio: " + data.sliderval4 + " minutos";
    document.getElementById("sumInicio4").innerHTML = "Hora de Inicio: " + data.inicio4;
    if(data.dia4 == 1){
        document.getElementById("dia4").value = "Mañana";
    }else{
        document.getElementById("dia4").value = "Hoy";
    }

    if(data.modo == 1){
        $(document.body).addClass("bg-black");
        $(".nav").addClass("navAlt");
        document.getElementById("topLogo").src = "img/cgr.svg";
        $(".nav-tabs").addClass("nav-tabsAlt");
        stateNight = 1;
        socket.emit('toggleNight', 'toggleNight'); 
    }else{
        $(document.body).removeClass("bg-black");
        document.getElementById("topLogo").src = "img/cgr_inv.svg";
        stateNight = 0;
        $(".nav").removeClass("navAlt");
        $(".nav-tabs").removeClass("nav-tabsAlt");
        socket.emit('toggleDay', 'toggleDay');   
    }
})


$('#reset1').click(function () {
    document.getElementById("piloto1").value = "Nombre Piloto";
    document.getElementById("sliderval1").value = 30;
    document.getElementById("inicio1").value = "12:34";
    document.getElementById("sliderBar1").value = 30;
    document.getElementById("sumPiloto1").innerHTML = "Piloto: ";
    document.getElementById("sumDuracion1").innerHTML = "Duracion de Servicio: ";
    document.getElementById("sumInicio1").innerHTML = "Hora de Inicio: ";
    $('#progressBar1').attr('aria-valuenow', 0).css('width',"0%");
    socket.emit('reset1', "Reset1");
})

$('#reset2').click(function () {
    document.getElementById("piloto2").value = "Nombre Piloto";
    document.getElementById("sliderval2").value = 30;
    document.getElementById("inicio2").value = "12:34";
    document.getElementById("sliderBar1").value = 30;
    document.getElementById("sumPiloto2").innerHTML = "Piloto: ";
    document.getElementById("sumDuracion2").innerHTML = "Duracion de Servicio: ";
    document.getElementById("sumInicio2").innerHTML = "Hora de Inicio: ";
    $('#progressBar2').attr('aria-valuenow', 0).css('width',"0%");
    socket.emit('reset2', "Reset2");    
})

$('#reset3').click(function () {
    document.getElementById("piloto3").value = "Nombre Piloto";
    document.getElementById("sliderval3").value = 30;
    document.getElementById("inicio3").value = "12:34";
    document.getElementById("sliderBar1").value = 30;
    document.getElementById("sumPiloto3").innerHTML = "Piloto: ";
    document.getElementById("sumDuracion3").innerHTML = "Duracion de Servicio: ";
    document.getElementById("sumInicio3").innerHTML = "Hora de Inicio: ";
    $('#progressBar3').attr('aria-valuenow', 0).css('width',"0%");
    socket.emit('reset3', "Reset3");
})

$('#reset4').click(function () {
    document.getElementById("piloto4").value = "Nombre Piloto";
    document.getElementById("sliderval4").value = 30;
    document.getElementById("inicio4").value = "12:34";
    document.getElementById("sliderBar1").value = 30;
    document.getElementById("sumPiloto4").innerHTML = "Piloto: ";
    document.getElementById("sumDuracion4").innerHTML = "Duracion de Servicio: ";
    document.getElementById("sumInicio4").innerHTML = "Hora de Inicio: ";
    $('#progressBar4').attr('aria-valuenow', 0).css('width',"0%");
    socket.emit('reset4', "Reset4");
})



$('#allCrono').click(function () {
    socket.emit('allCrono', "allCrono");
})

$('#allPiloto').click(function () {
    socket.emit('allPiloto', "allPiloto");
})

$('#allLogo').click(function () {
    socket.emit('allLogo', "allLogo");
})



$('#aceptarChangeAfterTime').click(function () {
    if(document.getElementById("changeAfterTimeLength").value == "1 minuto"){
        changeAfterTimeLength = 1;
    }else if(document.getElementById("changeAfterTimeLength").value == "2 minutos"){
        changeAfterTimeLength = 2;
    }else if(document.getElementById("changeAfterTimeLength").value == "3 minutos"){
        changeAfterTimeLength = 3;
    }else if(document.getElementById("changeAfterTimeLength").value == "5 minutos"){
        changeAfterTimeLength = 5;
    }else if(document.getElementById("changeAfterTimeLength").value == "10 minutos"){
        changeAfterTimeLength = 10;
    }else{
        changeAfterTimeLength = 0;
    }

    if(document.getElementById("changeAfterTimeOption").value == "Logo y Piloto"){
        changeAfterTimeOption = 0;
    }else{
        changeAfterTimeOption = 1;
    }
    
    socket.emit('changeAfterTime', { changeAfterTimeLength: changeAfterTimeLength, changeAfterTimeOption: changeAfterTimeOption });
})


socket.on('i1', function(i1) {
    if(i1>=0 || i1<=100){
    var tempi1 = i1 + "%";
    $('#progressBar1').attr('aria-valuenow', i1).css('width',tempi1);
    if(i1!=0){document.getElementById("progressBar1").innerHTML = i1 + "%";}
    }else{
        var tempi1 = "100%";
        $('#progressBar1').attr('aria-valuenow', 100).css('width',tempi1);
        $("#progressBar1").removeClass("progress-bar-striped active");
        document.getElementById("progressBar1").innerHTML = "Servicio Terminado!";
    }
})

socket.on('i2', function(i2) {
    if(i2>=0 || i2<=100){
    var tempi2 = i2 + "%";
    $('#progressBar2').attr('aria-valuenow', i2).css('width',tempi2);
    document.getElementById("progressBar2").innerHTML = i2 + "%";
    }else{
        var tempi2 = "100%";
        $('#progressBar2').attr('aria-valuenow', 100).css('width',tempi2);
        $("#progressBar2").removeClass("progress-bar-striped active");
        document.getElementById("progressBar2").innerHTML = "Servicio Terminado!";
    }
})

socket.on('i3', function(i3) {
    if(i3>=0 || i3<=100){
    var tempi3 = i3 + "%";
    $('#progressBar3').attr('aria-valuenow', i3).css('width',tempi3);
    document.getElementById("progressBar3").innerHTML = i3 + "%";
    }else{
        var tempi3 = "100%";
        $('#progressBar3').attr('aria-valuenow', 100).css('width',tempi3);
        $("#progressBar3").removeClass("progress-bar-striped active");
        document.getElementById("progressBar3").innerHTML = "Servicio Terminado!";
    }
})

socket.on('i4', function(i4) {
    if(i4>=0 || i4<=100){
    var tempi4 = i4 + "%";
    $('#progressBar4').attr('aria-valuenow', i4).css('width',tempi4);
    document.getElementById("progressBar4").innerHTML = i4 + "%";
    }else{
        var tempi4 = "100%";
        $('#progressBar4').attr('aria-valuenow', 100).css('width',tempi4);
        $("#progressBar4").removeClass("progress-bar-striped active");
        document.getElementById("progressBar4").innerHTML = "Servicio Terminado!";
    }
})



$('#aceptarPilotos1').click(function () {
    socket.emit('pilotos1', document.getElementById("piloto1").value);
    document.getElementById("sumPiloto1").innerHTML = "Piloto: " + document.getElementById("piloto1").value;
})

$('#aceptarPilotos2').click(function () {
    socket.emit('pilotos2', document.getElementById("piloto2").value);
    document.getElementById("sumPiloto2").innerHTML = "Piloto: " + document.getElementById("piloto2").value;
})

$('#aceptarPilotos3').click(function () {
    socket.emit('pilotos3', document.getElementById("piloto3").value);
    document.getElementById("sumPiloto3").innerHTML = "Piloto: " + document.getElementById("piloto3").value;
})

$('#aceptarPilotos4').click(function () {
    socket.emit('pilotos4', document.getElementById("piloto4").value);
    document.getElementById("sumPiloto4").innerHTML = "Piloto: " + document.getElementById("piloto4").value;
})


$('#aceptarSliderval1').click(function () {
    sliderval1 = document.getElementById("sliderval1").value;
    socket.emit('sliderval1', sliderval1);
    document.getElementById("sumDuracion1").innerHTML = "Duracion de Servicio: " + document.getElementById("sliderval1").value + " minutos";
})

$('#aceptarSliderval2').click(function () {
    sliderval2 = document.getElementById("sliderval2").value;
    socket.emit('sliderval2', sliderval2);
    document.getElementById("sumDuracion2").innerHTML = "Duracion de Servicio: " + document.getElementById("sliderval2").value + " minutos";
})

$('#aceptarSliderval3').click(function () {
    sliderval3 = document.getElementById("sliderval3").value;
    socket.emit('sliderval3', sliderval3);
    document.getElementById("sumDuracion3").innerHTML = "Duracion de Servicio: " + document.getElementById("sliderval3").value + " minutos";
})

$('#aceptarSliderval4').click(function () {
    sliderval4 = document.getElementById("sliderval4").value;
    socket.emit('sliderval4', sliderval4);
    document.getElementById("sumDuracion4").innerHTML = "Duracion de Servicio: " + document.getElementById("sliderval4").value + " minutos";
})





$('#toggleClock1').click(function () {
    socket.emit('toggleClock1', toggleClock1);
})

$('#togglePiloto1').click(function () {
    socket.emit('togglePiloto1', togglePiloto1);
})

$('#toggleLogo1').click(function () {
    socket.emit('toggleLogo1', toggleLogo1);
})




$('#toggleClock2').click(function () {
    socket.emit('toggleClock2', toggleClock2);
})

$('#togglePiloto2').click(function () {
    socket.emit('togglePiloto2', togglePiloto2);
})

$('#toggleLogo2').click(function () {
    socket.emit('toggleLogo2', toggleLogo2);
})



$('#toggleClock3').click(function () {
    socket.emit('toggleClock3', toggleClock3);
})

$('#togglePiloto3').click(function () {
    socket.emit('togglePiloto3', togglePiloto3);
})

$('#toggleLogo3').click(function () {
    socket.emit('toggleLogo3', toggleLogo3);
})




$('#toggleClock4').click(function () {
    socket.emit('toggleClock4', toggleClock4);
})

$('#togglePiloto4').click(function () {
    socket.emit('togglePiloto4', togglePiloto4);
})

$('#toggleLogo4').click(function () {
    socket.emit('toggleLogo4', toggleLogo4);
})





$('#toggleDay').click(function () {
    $(document.body).removeClass("bg-black");
    document.getElementById("topLogo").src = "img/cgr_inv.svg";
    stateNight = 0;
    $(".nav").removeClass("navAlt");
    $(".nav-tabs").removeClass("nav-tabsAlt");
    socket.emit('toggleDay', 'toggleDay');    
})

$('#toggleNight').click(function () {
    $(document.body).addClass("bg-black");
    $(".nav").addClass("navAlt");
    document.getElementById("topLogo").src = "img/cgr.svg";
    $(".nav-tabs").addClass("nav-tabsAlt");
    stateNight = 1;
    socket.emit('toggleNight', 'toggleNight');    
})



$('#mostrarProg').click(function () {
    socket.emit('mostrarProg', 'mostrarProg');    
})

$('#esconderProg').click(function () {
    socket.emit('esconderProg', 'esconderProg');    
})




$("#piloto1").click(function() {
    document.getElementById("piloto1").value = "";
});

$("#piloto2").click(function() {
    document.getElementById("piloto2").value = "";
});

$("#piloto3").click(function() {
    document.getElementById("piloto3").value = "";
});

$("#piloto4").click(function() {
    document.getElementById("piloto4").value = "";
});





$('#aceptarInicio1').click(function () {
    inicio1 = document.getElementById("inicio1").value;
    if(document.getElementById("dia1").value == "Hoy"){
        dia1 = 0;
    }else{
        dia1 = 1;
    }
    socket.emit('inicio1', { inicio1: inicio1, dia1: dia1 });
    document.getElementById("sumInicio1").innerHTML = "Hora de Inicio: " + document.getElementById("inicio1").value;
})

$('#aceptarInicio2').click(function () {
    inicio2 = document.getElementById("inicio2").value;
    if(document.getElementById("dia2").value == "Hoy"){
        dia2 = 0;
    }else{
        dia2 = 1;
    }
    socket.emit('inicio2', { inicio2: inicio2, dia2: dia2 });
    document.getElementById("sumInicio2").innerHTML = "Hora de Inicio: " + document.getElementById("inicio2").value;
})

$('#aceptarInicio3').click(function () {
    inicio3 = document.getElementById("inicio3").value;
    if(document.getElementById("dia3").value == "Hoy"){
        dia3 = 0;
    }else{
        dia3 = 1;
    }
    socket.emit('inicio3', { inicio3: inicio3, dia3: dia3 });
    document.getElementById("sumInicio3").innerHTML = "Hora de Inicio: " + document.getElementById("inicio3").value;
})

$('#aceptarInicio4').click(function () {
    inicio4 = document.getElementById("inicio4").value;
    if(document.getElementById("dia4").value == "Hoy"){
        dia4 = 0;
    }else{
        dia4 = 1;
    }
    socket.emit('inicio4', { inicio4: inicio4, dia4: dia4 });
    document.getElementById("sumInicio4").innerHTML = "Hora de Inicio: " + document.getElementById("inicio4").value;
})


$('.clockpicker').clockpicker({
    placement: 'bottom', // clock popover placement
    align: 'left',       // popover arrow align
    donetext: 'Aceptar',     // done button text
    autoclose: false,    // auto close when minute is selected
    vibrate: true        // vibrate the device when dragging clock hand
});



$('#agregarPiloto').click(function () {
    if (document.getElementById("nuevoPiloto").value != "") {
        var newButton = '<button type="button" class="list-group-item"></button>';
        $("#autofillPiloto").append(newButton);
        document.getElementById("autofillPiloto").lastChild.innerHTML = document.getElementById("nuevoPiloto").value;
        availableTags.push(document.getElementById("nuevoPiloto").value);
        document.getElementById("nuevoPiloto").value = "";
        socket.emit('availableTags', availableTags);
    }
})

$("#autofillPiloto").on("click", ".list-group-item", function(){
    $('.list-group-item').removeClass("active");
    $(this).addClass("active");
});


$(function() {
    
                  
$(".autocomplete").autocomplete({
    source: function(request, resolve) {
    resolve(availableTags);
    }
});
});



$('#borrarPiloto').click(function () {
    var toDelete = $("#autofillPiloto").find(".active").html();
    if($("#autofillPiloto").children().length>1){
        for(var i in availableTags){
        if(availableTags[i]==toDelete){
        availableTags.splice(i,1);
        break;
        }
    }
    $("#autofillPiloto").find(".active").remove();

    socket.emit('availableTags', availableTags);
    }
    
})


$(document).ready(function(){
    $(".btn").click(function(){
        $("#myModal").modal('show');
    });
});

