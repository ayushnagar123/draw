window.addEventListener('load', () => {
    console.log('loaded')
    const canvas = document.getElementById("canvas");
    const rect = document.getElementById("rect");
    const tool = document.getElementById("tool");
    const line = document.getElementById("line");
    const nav = document.getElementById("nav");
    const ellipse = document.getElementById("ellipse");
    const width = document.getElementById("width");
    const height = document.getElementById("height");
    const erase = document.getElementById("erase");
    const size = document.querySelectorAll(".size");
    const context = canvas.getContext("2d")
    canvas.height = window.innerHeight - nav.height;
    canvas.width = window.innerWidth;
    // context.moveTo(nav.style.height, 0)

    let painting = false
    setLine()
    setBgColor()

    function setBgColor() {
        canvas.style.backgroundColor = "#ffffff"
    }

    function startPosition(e) {
        painting = true;
        if (mode == "rect") {

            setRect()
            drawRect(e);
        } else if (mode == "ellipse") {
            tool.innerText = "Ellipse Tool"
            setEllipse()
            drawEllipse(e);
        } else if (mode == "line") {
            tool.innerText = "Line Tool"
            setLine()
            drawLine(e);
        } else if (mode == "erase") {
            tool.innerText = "Erase Tool"
            setErase()
            eraseTool(e);
        }
    }

    function finishPosition() {
        painting = false;
        context.beginPath();
    }

    function hideSizes() {
        size.forEach(element => {
            element.style.display = "none"
        })
    };

    function dipSizes() {
        size.forEach(element => {
            element.style.display = "inline-block"
        })
    }

    function setErase() {
        tool.innerHTML = "Eraser Tool"
        mode = "erase";
        dipSizes();
    }

    function setRect() {
        tool.innerHTML = "Rectangle Tool"
        mode = "rect";
        dipSizes();
    }

    function setLine() {
        tool.innerHTML = "Line Tool"
        mode = "line"
        hideSizes();
    }

    function setEllipse() {
        tool.innerHTML = "Ellipse Tool"
        mode = "ellipse"
        dipSizes();
    }

    function draw(e) {
        if (!painting) return;
        if (mode == "line") {
            drawLine(e)
        } else if (mode == "rect") {
            drawRect(e)
        } else if (mode == "ellipse") {
            drawEllipse(e)
        } else if (mode == "erase") {
            eraseTool(e)
        }
    }

    function drawEllipse(e) {

        context.beginPath();
        context.ellipse(e.clientX, e.clientY, width.value, height.value, 0, 0, 2 * Math.PI)
        context.fillStyle = document.getElementById("color").value;
        context.fill();
        context.closePath();
    }

    function eraseTool(e) {
        context.lineWidth = document.getElementById("stroke").value;
        context.lineCap = "round";
        context.lineTo(e.clientX, e.clientY);
        context.strokeStyle = "#ffffff"
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    function drawRect(e) {
        context.beginPath();
        context.fillStyle = document.getElementById("color").value
        context.strokeStyle = document.getElementById("color").value
        context.fillRect(e.clientX, e.clientY, width.value, height.value)
    }

    function drawLine(e) {
        context.lineWidth = document.getElementById("stroke").value;
        context.lineCap = "round";
        context.lineTo(e.clientX, e.clientY);
        context.strokeStyle = document.getElementById("color").value
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mousemove', draw);
    rect.addEventListener('click', setRect);
    line.addEventListener('click', setLine);
    ellipse.addEventListener('click', setEllipse);
    erase.addEventListener('click', setErase);
    // bgcolor.addEventListener('change', setBgColor);
})

window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d")
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

window.addEventListener('resize', () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d")
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})