function iniciar() {
    var canvas = document.getElementById("c");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");
    var points = [];
    var x, y;
    var angle = 0;
    var r = 100;
    var leftMargin = 10;
    var speed = 0.02;
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "white";

    function draw() {
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(r + leftMargin, canvas.height/2, r, 0, Math.PI*2, true);
        ctx.stroke();

        x = (-Math.cos(angle) * r )+ r + leftMargin;
        y = (-Math.sin(angle) * r )+ canvas.height/2;
        points.push(y); // Ticking bomb, it just grows...
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2, true);
        ctx.fill();
        for(var xx = 0; xx < points.length; ++xx) {
            ctx.lineTo(r * 2 + leftMargin +xx, points[points.length-xx]);
        }
        ctx.stroke();

        angle += speed;
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);


    var speedSlider = document.getElementById("speedSlider");
    speedSlider.step = 0.001;
    speedSlider.min = 0.001;
    speedSlider.max = 0.3;
    speedSlider.value = speed;
    speedSlider.addEventListener("change", function () {
        speed = parseFloat(this.value);
    });

    var radiusSlider = document.getElementById("radiusSlider");
    radiusSlider.max = 300;
    radiusSlider.value = r;
    radiusSlider.addEventListener("change", function () {
        r = parseInt(this.value);
    });

    function resize () {
        if(canvas.width != window.innerWidth) {
            canvas.width = window.innerWidth;
        }
        if(canvas.height != window.innerHeight) {
            canvas.height = window.innerHeight;
        }
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    var debouncedResize = debounce(resize, 250);

    window.addEventListener("resize", debouncedResize, false);

}

window.addEventListener("load", iniciar, false);