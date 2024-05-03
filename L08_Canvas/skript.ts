// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT


// Canvas-Element aus dem DOM auswählen
let canvas: HTMLCanvasElement = document.querySelector("canvas")!;

// RenderingContext des Canvas-Elements anfordern und speichern
let crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;

// Funktion zum Setzen der Canvas-Größe auf die Größe des Browserfensters
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Funktion zum Generieren einer zufälligen Farbe
function getRandomColor(): string {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
}

// Funktion zum Generieren eines zufälligen Farbverlaufs mit drei Farben
function getRandomGradient(): CanvasGradient {
    let color1: string = getRandomColor();
    let color2: string = getRandomColor();
    let color3: string = getRandomColor();

    let gradient = crc2.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1, color3);

    return gradient;
}

// Funktion zum Zeichnen zufällig gekrümmter Linien mit variabler Dicke und Farbverlauf
function drawRandomCurvedLines() {
    // Zufällige Start- und Endpunkte generieren
    let startX: number = Math.random() * canvas.width;
    let startY: number = Math.random() * canvas.height;
    let endX: number = Math.random() * canvas.width;
    let endY: number = Math.random() * canvas.height;

    // Zufällige Steuerpunkte für die Bézierkurve generieren
    let controlX1: number = Math.random() * canvas.width;
    let controlY1: number = Math.random() * canvas.height;
    let controlX2: number = Math.random() * canvas.width;
    let controlY2: number = Math.random() * canvas.height;

    // Zufällige Linienbreite generieren
    let lineWidth: number = Math.random() * 10 + 1;

    // Zufälligen Farbverlauf für die Linie generieren
    let lineGradient = getRandomGradient();

    // Linienstil setzen
    crc2.strokeStyle = lineGradient;
    crc2.lineWidth = lineWidth;
    crc2.lineCap = "round"; // Runde Enden für die Linien

    // Linie zeichnen
    crc2.beginPath();
    crc2.moveTo(startX, startY);
    crc2.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    crc2.stroke();
}

// Funktion zum Zeichnen der Linien nach dem Laden der Seite
function drawLinesAfterLoad() {
    // Anzahl der Linien, die gezeichnet werden sollen
    const numLines: number = 87;

    // Schleife zum Zeichnen der Linien
    for (let i = 0; i < numLines; i++) {
        drawRandomCurvedLines();
    }
}

// Canvas-Größe beim Laden der Seite und bei Änderungen der Fenstergröße anpassen
window.addEventListener('load', () => {
    resizeCanvas();
    drawLinesAfterLoad(); // Zeichne die Linien, nachdem das Canvas geladen wurde
});

window.addEventListener('resize', resizeCanvas);
