"use strict";
// Name: Jonas Gissler
// Matrikel: 275577
// Quelle: ChatGPT
// Canvas-Element aus dem DOM auswählen
let canvas = document.querySelector("canvas");
// RenderingContext des Canvas-Elements anfordern und speichern
let crc2 = canvas.getContext("2d");
// Funktion zum Setzen der Canvas-Größe auf die Größe des Browserfensters
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// Funktion zum Generieren einer zufälligen Farbe
function getRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
}
// Funktion zum Zeichnen einer zufälligen geometrischen Form mit Farbverlauf
function drawRandomShape() {
    // Zufällige Form wählen
    let shapeType = Math.floor(Math.random() * 6);
    // Zufällige Position und Größe generieren
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 100 + 20;
    // Zufällige Farben für den Farbverlauf wählen
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    // Farbverlauf erstellen
    let gradient = crc2.createLinearGradient(x, y, x + size, y + size);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    // Form zeichnen
    crc2.beginPath();
    switch (shapeType) {
        case 0:
            // Rechteck mit Farbverlauf
            crc2.fillStyle = gradient;
            crc2.fillRect(x, y, size, size);
            break;
        case 1:
            // Kreis mit Farbverlauf
            crc2.fillStyle = gradient;
            crc2.arc(x, y, size / 2, 0, 2 * Math.PI);
            crc2.fill();
            break;
        case 2:
            // Dreieck mit Farbverlauf
            crc2.fillStyle = gradient;
            crc2.moveTo(x, y);
            crc2.lineTo(x + size, y);
            crc2.lineTo(x + size / 2, y + size);
            crc2.closePath();
            crc2.fill();
            break;
        case 3:
            // Linie mit Farbverlauf
            crc2.strokeStyle = gradient;
            crc2.lineWidth = Math.random() * 5;
            crc2.beginPath();
            crc2.moveTo(x, y);
            crc2.lineTo(x + size, y + size);
            crc2.stroke();
            break;
        case 4:
            // Ellipse mit Farbverlauf
            crc2.fillStyle = gradient;
            crc2.ellipse(x, y, size, size / 2, Math.random() * Math.PI, 0, 2 * Math.PI);
            crc2.fill();
            break;
        case 5:
            // Polygon mit Farbverlauf
            crc2.fillStyle = gradient;
            crc2.beginPath();
            let numSides = Math.floor(Math.random() * 6) + 3; // Zufällige Anzahl von Seiten zwischen 3 und 8
            let angle = Math.PI * 2 / numSides;
            for (let i = 0; i < numSides; i++) {
                let px = x + size * Math.cos(i * angle);
                let py = y + size * Math.sin(i * angle);
                crc2.lineTo(px, py);
            }
            crc2.closePath();
            crc2.fill();
            break;
        default:
            break;
    }
}
// Funktion zum Zeichnen der Formen nach dem Laden der Seite
function drawShapesAfterLoad() {
    // Anzahl der Formen, die gezeichnet werden sollen
    const numShapes = 550;
    // Schleife zum Zeichnen der Formen
    for (let i = 0; i < numShapes; i++) {
        drawRandomShape();
    }
}
// Canvas-Größe beim Laden der Seite und bei Änderungen der Fenstergröße anpassen
window.addEventListener('load', () => {
    resizeCanvas();
    drawShapesAfterLoad(); // Zeichne die Formen, nachdem das Canvas geladen wurde
});
window.addEventListener('resize', resizeCanvas);
//# sourceMappingURL=skript.js.map