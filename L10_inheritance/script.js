"use strict";
// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT
var CreativeArt;
(function (CreativeArt) {
    class AnimatedObject {
        position;
        velocity;
        size;
        constructor(position, velocity, size) {
            this.position = position;
            this.velocity = velocity;
            this.size = size;
        }
    }
    class Fly extends AnimatedObject {
        constructor(position, velocity, size) {
            super(position, velocity, size);
        }
        draw(context) {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
            context.fillStyle = "black";
            context.fill();
            context.closePath();
        }
        move(canvasWidth, canvasHeight) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            if (this.position.x <= 0 || this.position.x >= canvasWidth) {
                this.velocity.x *= -1;
            }
            if (this.position.y <= 0 || this.position.y >= canvasHeight) {
                this.velocity.y *= -1;
            }
        }
    }
    class Duck extends AnimatedObject {
        type;
        angle;
        constructor(position, velocity, size, type, angle) {
            super(position, velocity, size);
            this.type = type;
            this.angle = angle;
        }
        draw(context) {
            const bodyWidth = 40;
            const bodyHeight = 30;
            const headRadius = 12;
            let bodyGradient = context.createLinearGradient(this.position.x - bodyWidth / 2, this.position.y - bodyHeight / 2, this.position.x + bodyWidth / 2, this.position.y + bodyHeight / 2);
            bodyGradient.addColorStop(0, this.type === "mallard" ? "#006400" : "#FFD700");
            bodyGradient.addColorStop(1, this.type === "mallard" ? "#32CD32" : "#FFA500");
            context.fillStyle = bodyGradient;
            context.beginPath();
            context.ellipse(this.position.x, this.position.y, bodyWidth / 2, bodyHeight / 2, 0, 0, 2 * Math.PI);
            context.fill();
            let headGradient = context.createRadialGradient(this.position.x + bodyWidth / 2, this.position.y, 0, this.position.x + bodyWidth / 2, this.position.y, headRadius);
            headGradient.addColorStop(0, this.type === "mallard" ? "#4B0082" : "#FFFF00");
            headGradient.addColorStop(1, this.type === "mallard" ? "#8A2BE2" : "#FFD700");
            context.fillStyle = headGradient;
            context.beginPath();
            context.arc(this.position.x + bodyWidth / 2 + headRadius / 2, this.position.y, headRadius, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = this.type === "mallard" ? "#FFA500" : "#000000";
            context.beginPath();
            context.moveTo(this.position.x + bodyWidth / 2 + headRadius / 2 + headRadius, this.position.y);
            context.lineTo(this.position.x + bodyWidth / 2 + headRadius / 2 + headRadius * 2, this.position.y - 5);
            context.lineTo(this.position.x + bodyWidth / 2 + headRadius / 2 + headRadius, this.position.y + 5);
            context.closePath();
            context.fill();
            context.fillStyle = "black";
            context.beginPath();
            context.arc(this.position.x + bodyWidth / 2 + headRadius / 2 + headRadius / 4, this.position.y - headRadius / 4, headRadius / 5, 0, Math.PI * 2);
            context.fill();
        }
        move(canvasWidth, canvasHeight) {
            const marginX = 50;
            const marginY = 20;
            const lakeCenter = { x: canvasWidth / 2, y: canvasHeight * 0.46 + 150 };
            const lakeWidth = 400;
            const lakeHeight = 100;
            const a = lakeWidth / 2 - marginX;
            const b = lakeHeight / 2 - marginY;
            this.angle += 0.05;
            this.position.x = lakeCenter.x + a * Math.cos(this.angle);
            this.position.y = lakeCenter.y + b * Math.sin(this.angle);
        }
    }
    let canvas;
    let canvasContext;
    let animatedObjects = [];
    let backgroundCanvas;
    let backgroundContext;
    window.addEventListener("load", startDrawing);
    function startDrawing(event) {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvasContext = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let horizon = canvasContext.canvas.height * 0.46;
        backgroundCanvas = document.createElement("canvas");
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        backgroundContext = backgroundCanvas.getContext("2d");
        drawBackground();
        canvasContext.drawImage(backgroundCanvas, 0, 0);
        createDucks(5, { x: canvas.width / 2, y: horizon + 150 }, 400, 100);
        createFlies(10, { x: 0, y: 0 }, { x: canvas.width, y: canvas.height });
        setInterval(() => {
            moveObjects();
            redrawScene();
        }, 100);
    }
    function drawBackground() {
        let horizon = backgroundContext.canvas.height * 0.46;
        drawSky(backgroundContext);
        drawSun(backgroundContext, { x: 300, y: 75 });
        drawClouds(backgroundContext, { x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains(backgroundContext, { x: 0, y: horizon }, 75, 200, "lightgrey", "grey");
        drawMountains(backgroundContext, { x: 0, y: horizon }, 50, 150, "lightgrey", "grey");
        drawGrass(backgroundContext, { x: 0, y: horizon }, backgroundCanvas.width, backgroundCanvas.height - horizon, "green");
        drawLake(backgroundContext, { x: backgroundCanvas.width / 2, y: horizon + 150 }, 400, 100, "blue");
    }
    function drawSky(context) {
        console.log("Background");
        let gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "blue");
        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    function drawSun(context, position) {
        console.log("Sun", position);
        let r1 = 50;
        let r2 = 150;
        let gradient = context.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "rgba(223, 131, 226, 0)");
        context.save();
        context.translate(position.x, position.y);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(0, 0, r2, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
    function drawClouds(context, position, size) {
        console.log("Cloud", position, size);
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = context.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "lightgrey");
        gradient.addColorStop(1, "rgba(240, 227, 240, 0)");
        context.save();
        context.translate(position.x, position.y);
        context.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            context.save();
            let x = (Math.random() - 0.5) * size.x;
            let y = -(Math.random() * size.y);
            context.translate(x, y);
            context.fill(particle);
            context.restore();
        }
        context.restore();
    }
    function drawMountains(context, position, min, max, colorLow, colorHigh) {
        console.log("Mountains");
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        context.save();
        context.translate(position.x, position.y);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -min - Math.random() * (max - min);
            context.lineTo(x, y);
        } while (x < context.canvas.width);
        context.lineTo(x, 0);
        context.closePath();
        let gradient = context.createLinearGradient(0, 0, 0, -max);
        gradient.addColorStop(0, colorLow);
        gradient.addColorStop(0.5, colorHigh);
        context.fillStyle = gradient;
        context.fill();
        context.restore();
    }
    function drawGrass(context, position, width, height, color) {
        console.log("Grass", position);
        let gradient = context.createLinearGradient(0, position.y + height, 0, position.y);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "lightgreen");
        context.fillStyle = gradient;
        context.fillRect(position.x, position.y, width, height);
    }
    function drawLake(context, center, width, height, color) {
        console.log("Lake", center, width, height);
        context.beginPath();
        context.ellipse(center.x, center.y + height / 2, width / 2, height / 2 + 50, 0, 0, 2 * Math.PI);
        let gradient = context.createRadialGradient(center.x, center.y + height / 2, 0, center.x, center.y + height / 2, height + 50);
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.6)");
        gradient.addColorStop(1, color);
        context.fillStyle = gradient;
        context.fill();
    }
    function createDucks(count, center, width, height) {
        console.log("Ducks");
        const marginX = 50;
        const marginY = 20;
        const a = width / 2 - marginX;
        const b = height / 2 - marginY;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const x = center.x + a * Math.cos(angle);
            const y = center.y + b * Math.sin(angle);
            const type = Math.random() < 0.5 ? "mallard" : "yellow";
            animatedObjects.push(new Duck({ x, y }, { x: 0, y: 0 }, 0, type, angle));
        }
    }
    function createFlies(count, minPosition, maxPosition) {
        for (let i = 0; i < count; i++) {
            let position = {
                x: Math.random() * (maxPosition.x - minPosition.x) + minPosition.x,
                y: Math.random() * (maxPosition.y - minPosition.y) + minPosition.y
            };
            let velocity = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
            let size = Math.random() * 5 + 2;
            animatedObjects.push(new Fly(position, velocity, size));
        }
    }
    function moveObjects() {
        animatedObjects.forEach(object => {
            object.move(canvas.width, canvas.height);
        });
    }
    function redrawScene() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(backgroundCanvas, 0, 0);
        animatedObjects.forEach(object => {
            object.draw(canvasContext);
        });
    }
})(CreativeArt || (CreativeArt = {}));
//# sourceMappingURL=script.js.map