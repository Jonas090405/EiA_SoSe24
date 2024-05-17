// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT

namespace CreativeArt {
    interface TwoDVector {
        x: number;
        y: number;
    }

    interface Fly {
        position: TwoDVector;
        velocity: TwoDVector;
        size: number;
    }

    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;
    let line: number = 0.46;
    let ducks: { position: TwoDVector, type: "mallard" | "yellow", angle: number }[] = [];
    let flies: Fly[] = [];
    let backgroundCanvas: HTMLCanvasElement;
    let backgroundContext: CanvasRenderingContext2D;

    window.addEventListener("load", startDrawing);

    function startDrawing(event: Event): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        canvasContext = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let horizon: number = canvasContext.canvas.height * line;

        // Erstelle ein Hintergrund-Canvas und zeichne Berge und Wolken darauf
        backgroundCanvas = document.createElement("canvas");
        backgroundCanvas.width = canvas.width;
        backgroundCanvas.height = canvas.height;
        backgroundContext = <CanvasRenderingContext2D>backgroundCanvas.getContext("2d");
        drawBackground();

        // Lade das Hintergrundbild in den Canvas
        canvasContext.drawImage(backgroundCanvas, 0, 0);

        // Erstelle Enten
        drawDucks(5, { x: canvas.width / 2, y: horizon + 150 }, 400, 100);

        // Erstelle Fliegen
        createFlies(10, { x: 0, y: 0 }, { x: canvas.width, y: canvas.height });

        // Starte die Animation der Enten und Fliegen
        setInterval(() => {
            moveDucks();
            moveFlies();
        }, 100);
    }

    function drawBackground(): void {
        let horizon: number = backgroundContext.canvas.height * line;
        drawSky(backgroundContext);
        drawSun(backgroundContext, { x: 300, y: 75 });
        drawClouds(backgroundContext, { x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains(backgroundContext, { x: 0, y: horizon }, 75, 200, "lightgrey", "grey");
        drawMountains(backgroundContext, { x: 0, y: horizon }, 50, 150, "lightgrey", "grey");
        drawGrass(backgroundContext, { x: 0, y: horizon }, backgroundCanvas.width, backgroundCanvas.height - horizon, "green");
        drawLake(backgroundContext, { x: backgroundCanvas.width / 2, y: horizon + 150 }, 400, 100, "blue");
    }

    function drawSky(context: CanvasRenderingContext2D): void {
        console.log("Background");

        let gradient: CanvasGradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(1, "blue");

        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function drawSun(context: CanvasRenderingContext2D, position: TwoDVector): void {
        console.log("Sun", position);

        let r1: number = 50;
        let r2: number = 150;
        let gradient: CanvasGradient = context.createRadialGradient(0, 0, r1, 0, 0, r2);

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

    function drawClouds(context: CanvasRenderingContext2D, position: TwoDVector, size: TwoDVector): void {
        console.log("Cloud", position, size);

        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = context.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "lightgrey");
        gradient.addColorStop(1, "rgba(240, 227, 240, 0)");

        context.save();
        context.translate(position.x, position.y);
        context.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            context.save();
            let x: number = (Math.random() - 0.5) * size.x;
            let y: number = - (Math.random() * size.y);
            context.translate(x, y);
            context.fill(particle);
            context.restore();
        }
        context.restore();
    }

    function drawMountains(context: CanvasRenderingContext2D, position: TwoDVector, min: number, max: number, colorLow: string, colorHigh: string): void {
        console.log("Mountains");
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        context.save();
        context.translate(position.x, position.y);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -min - Math.random() * (max - min);

            context.lineTo(x, y);
        } while (x < context.canvas.width);

        context.lineTo(x, 0);
        context.closePath();

        let gradient: CanvasGradient = context.createLinearGradient(0, 0, 0, -max);
        gradient.addColorStop(0, colorLow);
        gradient.addColorStop(0.5, colorHigh);

        context.fillStyle = gradient;
        context.fill();

        context.restore();
    }

    function drawGrass(context: CanvasRenderingContext2D, position: TwoDVector, width: number, height: number, color: string): void {
        console.log("Grass", position);

        let gradient: CanvasGradient = context.createLinearGradient(0, position.y + height, 0, position.y);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "lightgreen");

        context.fillStyle = gradient;
        context.fillRect(position.x, position.y, width, height);
    }

    function drawLake(context: CanvasRenderingContext2D, center: TwoDVector, width: number, height: number, color: string): void {
        console.log("Lake", center, width, height);
    
        context.beginPath();
        context.ellipse(center.x, center.y + height / 2, width / 2, height / 2 + 50, 0, 0, 2 * Math.PI);
        
        let gradient: CanvasGradient = context.createRadialGradient(center.x, center.y + height / 2, 0, center.x, center.y + height / 2, height + 50);
        gradient.addColorStop(0, "rgba(0, 0, 255, 0.6)");
        gradient.addColorStop(1, color);
    
        context.fillStyle = gradient;
        context.fill();
    }

    function drawDucks(count: number, center: TwoDVector, width: number, height: number): void {
        console.log("Ducks");
    
        const marginX = 50; // Margin to keep ducks away from the ellipse border
        const marginY = 20; // Margin to keep ducks away from the ellipse border
    
        const a = width / 2 - marginX; // Semimajor axis
        const b = height / 2 - marginY; // Semiminor axis
    
        for (let i = 0; i < count; i++) {
            // Generate random angle
            const angle = Math.random() * Math.PI * 2;
    
            // Calculate position within ellipse
            const x = center.x + a * Math.cos(angle);
            const y = center.y + b * Math.sin(angle);
    
            // Push duck object to array
            ducks.push({ position: { x, y }, type: Math.random() < 0.5 ? "mallard" : "yellow", angle });
        }
    }
    
    function drawDuck(context: CanvasRenderingContext2D, position: TwoDVector, type: "mallard" | "yellow"): void {
        const bodyWidth: number = 40;
        const bodyHeight: number = 30;
        const headRadius: number = 12;
    
        // Draw body
        let bodyGradient: CanvasGradient = context.createLinearGradient(position.x - bodyWidth / 2, position.y - bodyHeight / 2, position.x + bodyWidth / 2, position.y + bodyHeight / 2);
        bodyGradient.addColorStop(0, type === "mallard" ? "#006400" : "#FFD700"); // Green for mallard, Gold for yellow
        bodyGradient.addColorStop(1, type === "mallard" ? "#32CD32" : "#FFA500"); // LimeGreen for mallard, Orange for yellow
        context.fillStyle = bodyGradient;
        context.beginPath();
        context.ellipse(position.x, position.y, bodyWidth / 2, bodyHeight / 2, 0, 0, 2 * Math.PI);
        context.fill();
    
        // Draw head
        let headGradient: CanvasGradient = context.createRadialGradient(position.x + bodyWidth / 2, position.y, 0, position.x + bodyWidth / 2, position.y, headRadius);
        headGradient.addColorStop(0, type === "mallard" ? "#4B0082" : "#FFFF00"); // Indigo for mallard, Yellow for yellow
        headGradient.addColorStop(1, type === "mallard" ? "#8A2BE2" : "#FFD700"); // BlueViolet for mallard, Gold for yellow
        context.fillStyle = headGradient;
        context.beginPath();
        context.arc(position.x + bodyWidth / 2 + headRadius / 2, position.y, headRadius, 0, Math.PI * 2);
        context.fill();
    
        // Draw beak
        context.fillStyle = type === "mallard" ? "#FFA500" : "#000000"; // Orange for mallard, Black for yellow
        context.beginPath();
        context.moveTo(position.x + bodyWidth / 2 + headRadius / 2 + headRadius, position.y);
        context.lineTo(position.x + bodyWidth / 2 + headRadius / 2 + headRadius * 2, position.y - 5);
        context.lineTo(position.x + bodyWidth / 2 + headRadius / 2 + headRadius, position.y + 5);
        context.closePath();
        context.fill();
    
        // Draw eye
        context.fillStyle = "black";
        context.beginPath();
        context.arc(position.x + bodyWidth / 2 + headRadius / 2 + headRadius / 4, position.y - headRadius / 4, headRadius / 5, 0, Math.PI * 2);
        context.fill();
    }

    function moveDucks(): void {
        const marginX = 50; // Margin to keep ducks away from the ellipse border
        const marginY = 20; // Margin to keep ducks away from the ellipse border

        const lakeCenter: TwoDVector = { x: canvas.width / 2, y: canvas.height * line + 150 };
        const lakeWidth: number = 400;
        const lakeHeight: number = 100;
        const a = lakeWidth / 2 - marginX; // Semimajor axis
        const b = lakeHeight / 2 - marginY; // Semiminor axis

        ducks.forEach((duck, index) => {
            // Update duck angle to simulate swimming motion
            ducks[index].angle += 0.05; // Increase the angle slowly

            // Calculate new position within ellipse using sinusoidal motion
            const x = lakeCenter.x + a * Math.cos(duck.angle);
            const y = lakeCenter.y + b * Math.sin(duck.angle);

            // Update duck position
            ducks[index].position = { x, y };
        });

        redrawScene();
    }

    function createFlies(count: number, minPosition: TwoDVector, maxPosition: TwoDVector): void {
        for (let i = 0; i < count; i++) {
            let position: TwoDVector = {
                x: Math.random() * (maxPosition.x - minPosition.x) + minPosition.x,
                y: Math.random() * (maxPosition.y - minPosition.y) + minPosition.y
            };
            let velocity: TwoDVector = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
            let size: number = Math.random() * 5 + 2; // Zufällige Größe zwischen 2 und 7
            flies.push({ position, velocity, size });
        }
    }

    function moveFlies(): void {
        flies.forEach((fly, index) => {
            // Aktualisiere die Position basierend auf der Geschwindigkeit
            flies[index].position.x += flies[index].velocity.x;
            flies[index].position.y += flies[index].velocity.y;

            // Überprüfe, ob die Fliege den Bildschirmrand erreicht hat, und ändere die Richtung
            if (flies[index].position.x <= 0 || flies[index].position.x >= canvas.width) {
                flies[index].velocity.x *= -1; // Ändere die Richtung in der x-Achse
            }
            if (flies[index].position.y <= 0 || flies[index].position.y >= canvas.height) {
                flies[index].velocity.y *= -1; // Ändere die Richtung in der y-Achse
            }
        });

        redrawScene();
    }

    function drawFlies(): void {
        flies.forEach((fly) => {
            canvasContext.beginPath();
            canvasContext.arc(fly.position.x, fly.position.y, fly.size, 0, Math.PI * 2);
            canvasContext.fillStyle = "black";
            canvasContext.fill();
            canvasContext.closePath();
        });
    }

    function redrawScene(): void {
        // Löschen des aktuellen Inhalts der Leinwand
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Neu zeichnen des Hintergrunds
        canvasContext.drawImage(backgroundCanvas, 0, 0);

        // Zeichnen der Enten
        ducks.forEach((duck) => {
            drawDuck(canvasContext, duck.position, duck.type);
        });

        // Zeichnen der Fliegen
        drawFlies();
    }
}
