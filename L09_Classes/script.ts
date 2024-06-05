// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT

namespace CreativeArt {
    interface TwoDVector {
        x: number;
        y: number;
    }

    class Fly {
        position: TwoDVector;
        velocity: TwoDVector;
        size: number;

        constructor(position: TwoDVector, velocity: TwoDVector, size: number) {
            this.position = position;
            this.velocity = velocity;
            this.size = size;
        }

        move(canvas: HTMLCanvasElement): void {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            if (this.position.x <= 0 || this.position.x >= canvas.width) {
                this.velocity.x *= -1;
            }
            if (this.position.y <= 0 || this.position.y >= canvas.height) {
                this.velocity.y *= -1;
            }
        }

        draw(context: CanvasRenderingContext2D): void {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
            context.fillStyle = "black";
            context.fill();
            context.closePath();
        }
    }

    class Duck {
        position: TwoDVector;
        type: "mallard" | "yellow";
        angle: number;

        constructor(position: TwoDVector, type: "mallard" | "yellow", angle: number) {
            this.position = position;
            this.type = type;
            this.angle = angle;
        }

        move(lakeCenter: TwoDVector, a: number, b: number): void {
            this.angle += 0.05;
            this.position.x = lakeCenter.x + a * Math.cos(this.angle);
            this.position.y = lakeCenter.y + b * Math.sin(this.angle);
        }

        draw(context: CanvasRenderingContext2D): void {
            const bodyWidth: number = 40;
            const bodyHeight: number = 30;
            const headRadius: number = 12;

            let bodyGradient: CanvasGradient = context.createLinearGradient(this.position.x - bodyWidth / 2, this.position.y - bodyHeight / 2, this.position.x + bodyWidth / 2, this.position.y + bodyHeight / 2);
            bodyGradient.addColorStop(0, this.type === "mallard" ? "#006400" : "#FFD700");
            bodyGradient.addColorStop(1, this.type === "mallard" ? "#32CD32" : "#FFA500");
            context.fillStyle = bodyGradient;
            context.beginPath();
            context.ellipse(this.position.x, this.position.y, bodyWidth / 2, bodyHeight / 2, 0, 0, 2 * Math.PI);
            context.fill();

            let headGradient: CanvasGradient = context.createRadialGradient(this.position.x + bodyWidth / 2, this.position.y, 0, this.position.x + bodyWidth / 2, this.position.y, headRadius);
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
    }

    class Scene {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        backgroundCanvas: HTMLCanvasElement;
        backgroundContext: CanvasRenderingContext2D;
        line: number = 0.46;
        ducks: Duck[] = [];
        flies: Fly[] = [];

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.context = <CanvasRenderingContext2D>canvas.getContext("2d");

            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.backgroundCanvas = document.createElement("canvas");
            this.backgroundCanvas.width = this.canvas.width;
            this.backgroundCanvas.height = this.canvas.height;
            this.backgroundContext = <CanvasRenderingContext2D>this.backgroundCanvas.getContext("2d");

            this.drawBackground();
            this.context.drawImage(this.backgroundCanvas, 0, 0);

            this.drawDucks(5, { x: this.canvas.width / 2, y: this.canvas.height * this.line + 150 }, 400, 100);
            this.createFlies(10, { x: 0, y: 0 }, { x: this.canvas.width, y: this.canvas.height });

            setInterval(() => {
                this.moveDucks();
                this.moveFlies();
                this.redrawScene();
            }, 100);
        }

        drawBackground(): void {
            let horizon: number = this.backgroundContext.canvas.height * this.line;
            this.drawSky();
            this.drawSun({ x: 300, y: 75 });
            this.drawClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
            this.drawMountains({ x: 0, y: horizon }, 75, 200, "lightgrey", "grey");
            this.drawMountains({ x: 0, y: horizon }, 50, 150, "lightgrey", "grey");
            this.drawGrass({ x: 0, y: horizon }, this.backgroundCanvas.width, this.backgroundCanvas.height - horizon, "green");
            this.drawLake({ x: this.backgroundCanvas.width / 2, y: horizon + 150 }, 400, 100, "blue");
        }

        drawSky(): void {
            let gradient: CanvasGradient = this.backgroundContext.createLinearGradient(0, 0, 0, this.backgroundContext.canvas.height);
            gradient.addColorStop(0, "lightblue");
            gradient.addColorStop(1, "blue");

            this.backgroundContext.fillStyle = gradient;
            this.backgroundContext.fillRect(0, 0, this.backgroundContext.canvas.width, this.backgroundContext.canvas.height);
        }

        drawSun(position: TwoDVector): void {
            let r1: number = 50;
            let r2: number = 150;
            let gradient: CanvasGradient = this.backgroundContext.createRadialGradient(0, 0, r1, 0, 0, r2);

            gradient.addColorStop(0, "yellow");
            gradient.addColorStop(1, "rgba(223, 131, 226, 0)");

            this.backgroundContext.save();
            this.backgroundContext.translate(position.x, position.y);
            this.backgroundContext.fillStyle = gradient;
            this.backgroundContext.beginPath();
            this.backgroundContext.arc(0, 0, r2, 0, 2 * Math.PI);
            this.backgroundContext.fill();
            this.backgroundContext.restore();
        }

        drawClouds(position: TwoDVector, size: TwoDVector): void {
            let nParticles: number = 20;
            let radiusParticle: number = 50;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = this.backgroundContext.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "lightgrey");
            gradient.addColorStop(1, "rgba(240, 227, 240, 0)");

            this.backgroundContext.save();
            this.backgroundContext.translate(position.x, position.y);
            this.backgroundContext.fillStyle = gradient;

            for (let drawn: number = 0; drawn < nParticles; drawn++) {
                this.backgroundContext.save();
                let x: number = (Math.random() - 0.5) * size.x;
                let y: number = - (Math.random() * size.y);
                this.backgroundContext.translate(x, y);
                this.backgroundContext.fill(particle);
                this.backgroundContext.restore();
            }
            this.backgroundContext.restore();
        }

        drawMountains(position: TwoDVector, min: number, max: number, colorLow: string, colorHigh: string): void {
            let stepMin: number = 50;
            let stepMax: number = 150;
            let x: number = 0;

            this.backgroundContext.save();
            this.backgroundContext.translate(position.x, position.y);

            this.backgroundContext.beginPath();
            this.backgroundContext.moveTo(0, 0);
            this.backgroundContext.lineTo(0, -max);

            do {
                x += stepMin + Math.random() * (stepMax - stepMin);
                let y: number = -min - Math.random() * (max - min);

                this.backgroundContext.lineTo(x, y);
            } while (x < this.backgroundContext.canvas.width);

            this.backgroundContext.lineTo(x, 0);
            this.backgroundContext.closePath();

            let gradient: CanvasGradient = this.backgroundContext.createLinearGradient(0, 0, 0, -max);
            gradient.addColorStop(0, colorLow);
            gradient.addColorStop(0.5, colorHigh);

            this.backgroundContext.fillStyle = gradient;
            this.backgroundContext.fill();

            this.backgroundContext.restore();
        }

        drawGrass(position: TwoDVector, width: number, height: number, color: string): void {
            let gradient: CanvasGradient = this.backgroundContext.createLinearGradient(0, position.y + height, 0, position.y);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, "lightgreen");

            this.backgroundContext.fillStyle = gradient;
            this.backgroundContext.fillRect(position.x, position.y, width, height);
        }

        drawLake(center: TwoDVector, width: number, height: number, color: string): void {
            this.backgroundContext.beginPath();
            this.backgroundContext.ellipse(center.x, center.y + height / 2, width / 2, height / 2 + 50, 0, 0, 2 * Math.PI);
            
            let gradient: CanvasGradient = this.backgroundContext.createRadialGradient(center.x, center.y + height / 2, 0, center.x, center.y + height / 2, height + 50);
            gradient.addColorStop(0, "rgba(0, 0, 255, 0.6)");
            gradient.addColorStop(1, color);
        
            this.backgroundContext.fillStyle = gradient;
            this.backgroundContext.fill();
        }

        drawDucks(count: number, center: TwoDVector, width: number, height: number): void {
            const marginX = 50;
            const marginY = 20;
            const a = width / 2 - marginX;
            const b = height / 2 - marginY;

            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const x = center.x + a * Math.cos(angle);
                const y = center.y + b * Math.sin(angle);

                this.ducks.push(new Duck({ x, y }, Math.random() < 0.5 ? "mallard" : "yellow", angle));
            }
        }

        createFlies(count: number, minPosition: TwoDVector, maxPosition: TwoDVector): void {
            for (let i = 0; i < count; i++) {
                let position: TwoDVector = {
                    x: Math.random() * (maxPosition.x - minPosition.x) + minPosition.x,
                    y: Math.random() * (maxPosition.y - minPosition.y) + minPosition.y
                };
                let velocity: TwoDVector = {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                };
                let size: number = Math.random() * 5 + 2;
                this.flies.push(new Fly(position, velocity, size));
            }
        }

        moveDucks(): void {
            const marginX = 50;
            const marginY = 20;
            const lakeCenter: TwoDVector = { x: this.canvas.width / 2, y: this.canvas.height * this.line + 150 };
            const lakeWidth: number = 400;
            const lakeHeight: number = 100;
            const a = lakeWidth / 2 - marginX;
            const b = lakeHeight / 2 - marginY;

            this.ducks.forEach((duck) => {
                duck.move(lakeCenter, a, b);
            });
        }

        moveFlies(): void {
            this.flies.forEach((fly) => {
                fly.move(this.canvas);
            });
        }

        redrawScene(): void {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.backgroundCanvas, 0, 0);

            this.ducks.forEach((duck) => {
                duck.draw(this.context);
            });

            this.flies.forEach((fly) => {
                fly.draw(this.context);
            });
        }
    }

    window.addEventListener("load", () => {
        const canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (canvas) {
            new Scene(canvas);
        }
    });
}
