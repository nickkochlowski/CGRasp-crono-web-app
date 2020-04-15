
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


app.use(express.static('public'))


app.get('/', function(req, res){
  res.sendFile('/home/pi/pantallaCGRasp/public/control.html');
});

app.get('/1', function(req, res){
  res.sendFile('/home/pi/pantallaCGRasp/public/cronometro1_dia.html');
});

app.get('/2', function(req, res){
  res.sendFile('/home/pi/pantallaCGRasp/public/cronometro2_dia.html');
});

app.get('/3', function(req, res){
  res.sendFile('/home/pi/pantallaCGRasp/public/cronometro3_dia.html');
});

app.get('/4', function(req, res){
  res.sendFile('/home/pi/pantallaCGRasp/public/cronometro4_dia.html');
});

/*
app.get('/', function(req, res){
  res.sendFile('C:/Users/lenovo/Desktop/pantallaCGR/public/control.html');
});

app.get('/1', function(req, res){
  res.sendFile('C:/Users/lenovo/Desktop/pantallaCGR/public/cronometro1_dia.html');
});

app.get('/2', function(req, res){
  res.sendFile('C:/Users/lenovo/Desktop/pantallaCGR/public/cronometro2_dia.html');
});

app.get('/3', function(req, res){
  res.sendFile('C:/Users/lenovo/Desktop/pantallaCGR/public/cronometro3_dia.html');
});

app.get('/4', function(req, res){
  res.sendFile('C:/Users/lenovo/Desktop/pantallaCGR/public/cronometro4_dia.html');
});
*/


var savePilotos1;
var tempPiloto1;
var saveInicio1;
var tempInicio1;
var tempDia1;
var tempSliderval1;

var savePilotos2;
var tempPiloto2;
var saveInicio2;
var tempInicio2;
var tempDia2;
var tempSliderval2;

var savePilotos3;
var tempPiloto3;
var saveInicio3;
var tempInicio3;
var tempDia3;
var tempSliderval3;

var savePilotos4;
var tempPiloto4;
var saveInicio4;
var tempInicio4;
var tempDia4;
var tempSliderval4;

var modo = 0;

var availableTagsData;


io.sockets.on('connection', function (socket) {


        tempSliderval1 = fs.readFileSync('saveInfo/sliderval1.txt').toString();
        tempPiloto1 = fs.readFileSync('saveInfo/pilotos1.txt').toString();
        saveInicio1 = fs.readFileSync('saveInfo/inicio1.txt').toString().split("+");
        tempInicio1 = saveInicio1[0];
        tempDia1 = saveInicio1[1];

        tempSliderval2 = fs.readFileSync('saveInfo/sliderval2.txt').toString();
        tempPiloto2 = fs.readFileSync('saveInfo/pilotos2.txt').toString();
        saveInicio2 = fs.readFileSync('saveInfo/inicio2.txt').toString().split("+");
        tempInicio2 = saveInicio2[0];
        tempDia2 = saveInicio2[1];
       
        tempSliderval3 = fs.readFileSync('saveInfo/sliderval3.txt').toString();
        tempPiloto3 = fs.readFileSync('saveInfo/pilotos3.txt').toString();
        saveInicio3 = fs.readFileSync('saveInfo/inicio3.txt').toString().split("+");
        tempInicio3 = saveInicio3[0];
        tempDia3 = saveInicio3[1];
        
        tempSliderval4 = fs.readFileSync('saveInfo/sliderval4.txt').toString();
        tempPiloto4 = fs.readFileSync('saveInfo/pilotos4.txt').toString();
        saveInicio4 = fs.readFileSync('saveInfo/inicio4.txt').toString().split("+");
        tempInicio4 = saveInicio4[0];
        tempDia4 = saveInicio4[1];

        availableTagsData = fs.readFileSync('saveInfo/availableTags.txt').toString();
        console.log(availableTagsData)


        socket.emit('message', { 

            piloto1: tempPiloto1, 
            sliderval1: tempSliderval1, 
            inicio1: tempInicio1, 
            dia1: tempDia1, 

            piloto2: tempPiloto2, 
            sliderval2: tempSliderval2, 
            inicio2: tempInicio2, 
            dia2: tempDia2,

            piloto3: tempPiloto3, 
            sliderval3: tempSliderval3, 
            inicio3: tempInicio3, 
            dia3: tempDia3,

            piloto4: tempPiloto4, 
            sliderval4: tempSliderval4, 
            inicio4: tempInicio4, 
            dia4: tempDia4,

            modo: modo,

            availableTagsData: availableTagsData
        });



    socket.on('inicio1', function (inicio1) {
        socket.broadcast.emit('inicio1', inicio1);
        fs.writeFile('saveInfo/inicio1.txt', inicio1.inicio1 + "+" + inicio1.dia1, function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Tiempo de inicio guardado.');
      });
    });  

    socket.on('inicio2', function (inicio2) {
        socket.broadcast.emit('inicio2', inicio2);
        fs.writeFile('saveInfo/inicio2.txt', inicio2.inicio2 + "+" + inicio2.dia2, function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Tiempo de inicio guardado.');
      });
    });  

    socket.on('inicio3', function (inicio3) {
        socket.broadcast.emit('inicio3', inicio3);
        fs.writeFile('saveInfo/inicio3.txt', inicio3.inicio3 + "+" + inicio3.dia3, function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Tiempo de inicio guardado.');
      });
    });  

    socket.on('inicio4', function (inicio4) {
        socket.broadcast.emit('inicio4', inicio4);
        fs.writeFile('saveInfo/inicio4.txt', inicio4.inicio4 + "+" + inicio4.dia4, function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Tiempo de inicio guardado.');
      });
    }); 
      


      
    socket.on('sliderval1', function (sliderval1) {
        socket.broadcast.emit('sliderval1', sliderval1);
        fs.writeFile('saveInfo/sliderval1.txt', sliderval1, function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Duracion de servicio guardado.');
      });
    }); 

    socket.on('sliderval2', function (sliderval2) {
        socket.broadcast.emit('sliderval2', sliderval2);
        fs.writeFile('saveInfo/sliderval2.txt', sliderval2, function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Duracion de servicio guardado.');
      });
    }); 

    socket.on('sliderval3', function (sliderval3) {
        socket.broadcast.emit('sliderval3', sliderval3);
        fs.writeFile('saveInfo/sliderval3.txt', sliderval3, function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Duracion de servicio guardado.');
      });
    }); 

    socket.on('sliderval4', function (sliderval4) {
        socket.broadcast.emit('sliderval4', sliderval4);
        fs.writeFile('saveInfo/sliderval4.txt', sliderval4, function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Duracion de servicio guardado.');
      });
    });




    socket.on('currentTime', function (currentTime) {
        socket.broadcast.emit('currentTime', currentTime);
        console.log("CurrentTime sent.")
    });




    socket.on('pilotos1', function (data) {
        socket.broadcast.emit('pilotos1', data);
        fs.writeFile('saveInfo/pilotos1.txt', data, function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Piloto guardado.');
      });
    }); 

    socket.on('pilotos2', function (data) {
        socket.broadcast.emit('pilotos2', data);
        fs.writeFile('saveInfo/pilotos2.txt', data, function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Piloto guardado.');
      });
    }); 

    socket.on('pilotos3', function (data) {
        socket.broadcast.emit('pilotos3', data);
        fs.writeFile('saveInfo/pilotos3.txt', data, function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Piloto guardado.');
      });
    }); 

    socket.on('pilotos4', function (data) {
        socket.broadcast.emit('pilotos4', data);
        fs.writeFile('saveInfo/pilotos4.txt', data, function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Piloto guardado.');
      });
    }); 
    



    socket.on('toggleClock1', function (toggleClock1) {
        socket.broadcast.emit('toggleClock1', toggleClock1);
    }); 

    socket.on('toggleClock2', function (toggleClock2) {
        socket.broadcast.emit('toggleClock2', toggleClock2);
    }); 

    socket.on('toggleClock3', function (toggleClock3) {
        socket.broadcast.emit('toggleClock3', toggleClock3);
    }); 

    socket.on('toggleClock4', function (toggleClock4) {
        socket.broadcast.emit('toggleClock4', toggleClock4);
    }); 



    socket.on('togglePiloto1', function (togglePiloto1) {
        socket.broadcast.emit('togglePiloto1', togglePiloto1);
    }); 

    socket.on('togglePiloto2', function (togglePiloto2) {
        socket.broadcast.emit('togglePiloto2', togglePiloto2);
    }); 

    socket.on('togglePiloto3', function (togglePiloto3) {
        socket.broadcast.emit('togglePiloto3', togglePiloto3);
    }); 

    socket.on('togglePiloto4', function (togglePiloto4) {
        socket.broadcast.emit('togglePiloto4', togglePiloto4);
    }); 




    socket.on('toggleLogo1', function (toggleLogo1) {
        socket.broadcast.emit('toggleLogo1', toggleLogo1);
    }); 

    socket.on('toggleLogo2', function (toggleLogo2) {
        socket.broadcast.emit('toggleLogo2', toggleLogo2);
    }); 

    socket.on('toggleLogo3', function (toggleLogo3) {
        socket.broadcast.emit('toggleLogo3', toggleLogo3);
    }); 

    socket.on('toggleLogo4', function (toggleLogo4) {
        socket.broadcast.emit('toggleLogo4', toggleLogo4);
    }); 




    socket.on('mostrarProg', function (mostrarProg) {
        socket.broadcast.emit('mostrarProg', "mostrarProg");
    });

    socket.on('esconderProg', function (esconderProg) {
        socket.broadcast.emit('esconderProg', "esconderProg");
    });




    socket.on('toggleNight', function (stateNight) {
            modo = 1;
            socket.broadcast.emit('toggleNight', stateNight);
    });

    socket.on('toggleDay', function (toggleDay) {
            modo = 0;
            socket.broadcast.emit('toggleDay', toggleDay);
    }); 
 



    socket.on('reset1', function (reset1) {
        fs.writeFile('saveInfo/pilotos1.txt', "Nombre Piloto", function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Piloto reset.');
      });
        fs.writeFile('saveInfo/sliderval1.txt', 30, function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Duracion de servicio reset.');
      });
        fs.writeFile('saveInfo/inicio1.txt', "12:34" + "+" + "0", function (err) {
        if (err) throw err;
        console.log('Pantalla 1 - Tiempo de inicio reset.');
      });
        socket.broadcast.emit('reset1', reset1);
    }); 

    socket.on('reset2', function (reset2) {
        fs.writeFile('saveInfo/pilotos2.txt', "Nombre Piloto", function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Piloto reset.');
      });
        fs.writeFile('saveInfo/sliderval2.txt', 30, function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Duracion de servicio reset.');
      });
        fs.writeFile('saveInfo/inicio2.txt', "12:34" + "+" + "0", function (err) {
        if (err) throw err;
        console.log('Pantalla 2 - Tiempo de inicio reset.');
      });
        socket.broadcast.emit('reset2', reset2);
    }); 

    socket.on('reset3', function (reset3) {
        fs.writeFile('saveInfo/pilotos3.txt', "Nombre Piloto", function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Piloto reset.');
      });
        fs.writeFile('saveInfo/sliderval3.txt', 30, function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Duracion de servicio reset.');
      });
        fs.writeFile('saveInfo/inicio3.txt', "12:34" + "+" + "0", function (err) {
        if (err) throw err;
        console.log('Pantalla 3 - Tiempo de inicio reset.');
      });
        socket.broadcast.emit('reset3', reset3);
    }); 

    socket.on('reset4', function (reset4) {

        fs.writeFile('saveInfo/pilotos4.txt', "Nombre Piloto", function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Piloto reset.');
      });
        fs.writeFile('saveInfo/sliderval4.txt', 30, function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Duracion de servicio reset.');
      });
        fs.writeFile('saveInfo/inicio4.txt', "12:34" + "+" + "0", function (err) {
        if (err) throw err;
        console.log('Pantalla 4 - Tiempo de inicio reset.');
      });
        socket.broadcast.emit('reset4', reset4);
    }); 




    socket.on('allCrono', function (allCrono) {
        socket.broadcast.emit('allCrono', "allCrono");
    }); 

    socket.on('allPiloto', function (allPiloto) {
        socket.broadcast.emit('allPiloto', "allPiloto");
    }); 

    socket.on('allLogo', function (allLogo) {
        socket.broadcast.emit('allLogo', "allLogo");
    }); 


    socket.on('changeAfterTime', function (changeAfterTime) {
        console.log(changeAfterTime);
        socket.broadcast.emit('changeAfterTime', changeAfterTime);
    }); 




    socket.on('i1', function (i1) {
        socket.broadcast.emit('i1', i1);
        console.log(i1);
    }); 

    socket.on('i2', function (i2) {
        socket.broadcast.emit('i2', i2);
        console.log(i2);
    }); 

    socket.on('i3', function (i3) {
        socket.broadcast.emit('i3', i3);
        console.log(i3);
    }); 

    socket.on('i4', function (i4) {
        socket.broadcast.emit('i4', i4);
        console.log(i4);
    }); 



    socket.on('availableTags', function (availableTags) {
        fs.writeFile('saveInfo/availableTags.txt', availableTags, function (err) {
        if (err) throw err;
        console.log('Available Tags recorded.');
        });
    }); 

});




http.listen(8080,'0.0.0.0', function() {
  console.log('listening on *:8080');
});