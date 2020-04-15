# CGRasp-crono-web-app
Web application for mobile to set chronometer and timers for mechanics at service park.

	--> node_modules (modules/libraries included)
		--> express (simple web application framework)
		--> socket.io (communication and data transfer between web clients y server)

	--> public
		--> fonts
		--> dist
		--> img (logos CGR)

		--> control.html (control page)
		--> cronometro1_dia.html (monitor 1)
		--> cronometro2_dia.html (monitor 2)
		--> cronometro3_dia.html (monitor 3)
		--> cronometro4_dia.html (monitor 4)

		--> css
			--> custom.css (custom colors, fonts, sizes, etc.)
			--> ...

		--> js
			--> scriptsControl.js 
			--> scriptsPantallas1.js 
			--> scriptsPantallas2.js
			--> scriptsPantallas3.js
			--> scriptsPantallas4.js 
		
	--> saveInfo (save app info)
    		--> availableTags.txt (auto-complete pilot list)
    		--> inicio1.txt	(start time for monitor 1)
		--> piloto1.txt (pilot names for monitor 1)
		--> ...

	--> package.json

	--> servidor.js (node.js host server)
