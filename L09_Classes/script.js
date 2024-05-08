"use strict";
// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT
var CreativeArt;
(function (CreativeArt) {
    window.addEventListener("load", startDrawing);
    let canvasContext;
    let line = 0.46;
    function startDrawing(event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvasContext = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let horizon = canvasContext.canvas.height * line;
        drawSky();
        drawSun({ x: 300, y: 75 });
        drawClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains({ x: 0, y: horizon }, 75, 200, "lightgrey", "grey");
        drawMountains({ x: 0, y: horizon }, 50, 150, "lightgrey", "grey");
    }
    function drawSky() {
        console.log("Background");
        let gradient = canvasContext.createLinearGradient(0, 0, 0, canvasContext.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "blue");
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    }
    function drawSun(position) {
        console.log("Sun", position);
        let r1 = 50;
        let r2 = 150;
        let gradient = canvasContext.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "rgba(223, 131, 226, 0)");
        canvasContext.save();
        canvasContext.translate(position.x, position.y);
        canvasContext.fillStyle = gradient;
        canvasContext.arc(0, 0, r2, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.restore();
    }
    function drawClouds(position, size) {
        console.log("Cloud", position, size);
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = canvasContext.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "lightgrey");
        gradient.addColorStop(1, "rgba(240, 227, 240, 0)");
        canvasContext.save();
        canvasContext.translate(position.x, position.y);
        canvasContext.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            canvasContext.save();
            let x = (Math.random() - 0.5) * size.x;
            let y = -(Math.random() * size.y);
            canvasContext.translate(x, y);
            canvasContext.fill(particle);
            canvasContext.restore();
        }
        canvasContext.restore();
    }
    function drawMountains(position, min, max, colorLow, colorHigh) {
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        canvasContext.save();
        canvasContext.translate(position.x, position.y);
        canvasContext.beginPath();
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(0, -max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -min - Math.random() * (max - min);
            canvasContext.lineTo(x, y);
        } while (x < canvasContext.canvas.width);
        canvasContext.lineTo(x, 0);
        canvasContext.closePath();
        let gradient = canvasContext.createLinearGradient(0, 0, 0, -max);
        gradient.addColorStop(0, colorLow);
        gradient.addColorStop(0.5, colorHigh);
        canvasContext.fillStyle = gradient;
        canvasContext.fill();
        canvasContext.restore();
    }
})(CreativeArt || (CreativeArt = {}));
//# sourceMappingURL=script.js.map