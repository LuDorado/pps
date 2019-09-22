
function iniciar(){
    var output = document.getElementById('salida');

    var canvas = document.getElementById('lienzo');
    var ctx = canvas.getContext('2d');
    var cw = canvas.width;
      cx = cw / 2;
    var ch = canvas.height;
      cy = ch / 2;

    var arrastrar = false;
    var dx, dy;

    var rad = (Math.PI / 180);
    var R = 200; // el radio de la trayectoria circular
    var m = {
      x: cx + R,
      y: cy,
      a: 5
    }; // inicia el ratón

    output.style.top = (cy) + "px";
    output.style.left = (cx) + "px";

    ctx.strokeStyle = "#555";
    ctx.fillStyle = "#e18728";

  var centro = {
	  x: cx,
	  y: cy
	};



    function Pelota() {
        this.r = 10;
        this.a = 0 * rad;
        this.x = cx + R * Math.cos(this.a);
        this.y = cy + R * Math.sin(this.a);
        this.color = "#6ab150";
    }

    Pelota.prototype.dibujar = function() {
        // dibuja la pelotacw
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        //cambia el estilo del cursor si el ratón esta encima
        //de la pelota
        if (ctx.isPointInPath(m.x, m.y)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
        ctx. restore();
    }

    Pelota.prototype.arrastrar = function(m) {
        // calcula las nuevas coordenadas de la pelota
        this.a = m.a;
        this.x = centro.x + R * Math.cos(this.a);
        this.y = centro.y + R * Math.sin(this.a);

    }

    function dibujarFondo() {
        // x axis
        ctx.beginPath();
        ctx.moveTo(260, 20);
        ctx.lineTo(260, 500);
        ctx.strokeStyle = "burlywood";
        ctx.closePath();
        ctx.stroke();
        // Arrows
        ctx.beginPath();
        ctx.moveTo(255, 500);
        ctx.lineTo(265, 500);
        ctx.lineTo(260, 510);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(255, 20);
        ctx.lineTo(265, 20);
        ctx.lineTo(260, 10);
        ctx.closePath();
        ctx.fill();

        // y axis
        ctx.beginPath();
        ctx.moveTo(20, 260);
        ctx.lineTo(500, 260);
        ctx.strokeStyle = "burlywood";
        ctx.closePath();
        ctx.stroke();
        // Arrows
        ctx.beginPath();
        ctx.moveTo(500, 255);
        ctx.lineTo(500, 265);
        ctx.lineTo(510, 260);
        ctx.strokeStyle = "lightgrey";
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(20, 255);
        ctx.lineTo(20, 265);
        ctx.lineTo(10, 260);
        ctx.strokeStyle = "beige";
        ctx.fill();
        ctx.closePath();
    }

    function dibujarTrayectoria() {
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 2 * Math.PI);
        ctx.strokeStyle = "lightgreen";
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    function drawHandle(m) {

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.closePath();
        pelota.dibujar();

        ctx.beginPath();
        ctx.moveTo(cx, m.y);
        ctx.strokeStyle = "darkviolet";
        ctx.lineWidth = 4;
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(m.x,cy);
        ctx.strokeStyle = "brown";
        ctx.lineWidth = 4;
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.closePath();
    }

// dibuja una nueva pelota
    var pelota = new Pelota();

    function showAngle() {
        document.getElementById("angle").value = -((m.a * 180) / Math.PI);
    }

    function Animacion() {
        elId = window.requestAnimationFrame(Animacion);
        if (arrastrar) {
            dibujarFondo();
            dibujarTrayectoria();
            drawHandle(m);
            pelota.arrastrar(m);
            let angle = -((m.a * 180) / Math.PI);
            output.innerHTML = parseInt(angle)+ "\u00B0";
            output.style.top = (m.y - 50) + "px";
            output.style.left = (m.x - 30) + "px";

        }
        // limpia el canvas
        ctx.clearRect(0, 0, cw, ch);
        //dibuja la pelota
        dibujarFondo();
        dibujarTrayectoria();
        drawHandle(m);
        pelota.dibujar();

        function positionUser(){
           var grad = document.getElementById('angle').value;
           m.a = grad*rad;
           m.x = centro.x + R * Math.cos(grad *rad);
           m.y = centro.y + R * Math.sin(grad * rad);
           dibujarTrayectoria();
           ctx.beginPath();
           ctx.moveTo(xUser,cy);
           ctx.strokeStyle = "blue";
           ctx.lineWidth = 4;
           ctx.lineTo(xUser,yUser);
           ctx.closePath();
           ctx.stroke();
           pelota.dibujar();
            /*
           ctx.strokeStyle = "green";
           ctx.lineWidth = 3;
           ctx.beginPath();
           ctx.arc(xUser, yUser, this.r, 0, 2 * Math.PI);
           ctx.fill(); */
       }

    }
    Animacion();

    //EVENTOS

    canvas.addEventListener("mousedown", function(evt) {
        m = oMousePos(canvas, evt);
        ctx.clearRect(0, 0, cw, ch);
        // porque no hacemos clic en el centro de la pelota
        // tenemos que calcular la distancia entre el centro y el ratón
        dx = pelota.x - m.x;
        dy = pelota.y - m.y;
        dibujarTrayectoria();
        drawHandle(m);
        showAngle();
        pelota.dibujar();
        // Si hemos hecho clic en la pelota, podemos arrastrar
        if (ctx.isPointInPath(m.x, m.y)) {
            arrastrar = true;
        }
    }, false);

	// detecta la posición del ratón, cuando el ratón pasa por encima del canvas (on "mousemove",):
	canvas.addEventListener("mousemove", function(evt) {
    if (arrastrar) {
      ctx.clearRect(0, 0, cw, ch);
      dibujarTrayectoria();
      drawHandle(m);
      showAngle();
      pelota.dibujar();
      m = oMousePos(canvas, evt);
      var dx = (m.x - centro.x);
      var dy = (m.y - centro.y);
      m.a = Math.atan2(dy, dx);
    }
	}, false);

    canvas.addEventListener("mouseup", function(evt) {
        arrastrar = false;
        ctx.clearRect(0, 0, cw, ch);
        dibujarTrayectoria();
        drawHandle(m);
        showAngle();
        pelota.dibujar();
    }, false);

    canvas.addEventListener("mouseout", function(evt) {
        arrastrar = false;
        showAngle();
        //ctx.clearRect(0, 0, cw, ch);
        //dibujarTrayectoria();
        //drawHandle(m);
        //pelota.dibujar();
    }, false);

    window.addEventListener("load", function() {
        dibujarTrayectoria();
        drawHandle(m);
        showAngle();
        pelota.dibujar();
    }, false);

    function oMousePos(canvas, evt) { // detecta la posición del ratón
        var ClientRect = canvas.getBoundingClientRect();
        return { //objeto
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        }
    }

}
function getSine(){
    //var sineOut = document.getElementById('sineRt');
    var grad = document.getElementById('angle').value;
    grad = grad * (Math.PI/180);
    //let sineValue =
    document.getElementById("sineRt").innerHTML = parseFloat(Math.sin(grad)).toFixed(4); //sineValue;
}
function getCosine(){
    let grad = document.getElementById('angle').value;
    grad = grad * (Math.PI/180);
    let cosValue = Math.cos(grad);
    document.getElementById('cosRt').innerHTML = parseFloat(Math.cos(grad)).toFixed(4);//cosValue);
}
window.addEventListener("load", iniciar, false);
