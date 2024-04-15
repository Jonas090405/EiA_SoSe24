// Name: Jonas Gissler     
// Matrikel: 275577
// Quellen: Jonas Bausch, ChatGPT

document.addEventListener('DOMContentLoaded', function () {
    // Das blaue span-Element für die Mausposition
    let spanElement = document.createElement('div');
    spanElement.classList.add('spanelementcontainer');
    document.body.appendChild(spanElement);

    // Eventlistener für die Mausbewegung
    document.addEventListener('mousemove', function (event) {
        // Position des span-Elements entsprechend der Cursorposition aktualisieren
        spanElement.style.left = `${event.clientX + 10}px`; // Verschiebe das Element um 10px nach rechts
        spanElement.style.top = `${event.clientY + 10}px`; // Verschiebe das Element um 10px nach unten

        // Zeige die X- und Y-Koordinaten sowie das aktuelle Element an
        spanElement.innerHTML = `X: ${event.clientX}, Y: ${event.clientY}, Element: ${(event.target as HTMLElement).tagName}`;
    });

    // Eventlistener für Klickereignis
    document.addEventListener('click', function (event) {
        logEventDetails(event);
    });

    // Eventlistener für Tastendruckereignis
    document.addEventListener('keyup', function (event) {
        logEventDetails(event);
    });
});

function logEventDetails(event: Event) {
    // Extrahiere Ereignisdetails
    let eventType = event.type;
    let target = (event.target as HTMLElement).tagName;
    
    // Array für alle Eltern-Elemente (bis zum document)
    let parentElements = [];
    let currentElement = event.target as HTMLElement | null;
    while (currentElement) {
        parentElements.push(currentElement);
        if (currentElement.tagName.toLowerCase() === 'html') break; // Anhalten, wenn das <html>-Element erreicht ist
        currentElement = currentElement.parentElement;
    }

    // Logge die Ereignisdetails in der Konsole
    console.log(`Event Type: ${eventType}`);
    console.log(`Target: ${target}`);
    console.log("currenttarget:");
    for (let i = parentElements.length - 1; i >= 0; i--) {
        console.log(parentElements[i].tagName);
    }
    console.log(`Event:`, event);
}


    // Eventlistener für Tastendruckereignis
    document.addEventListener('keyup', (event) => {
        logEventDetails(event);
        

        // Überprüfe, ob die Taste "e" gedrückt wurde
        if (event.key === 'e') {
            // Zufällige Farben generieren
            let randomColor = getRandomColor();
            let randomBackgroundColor = getRandomColor();

            // Ändere die Farbe der h1-Überschrift und des Hintergrunds
            let h1Element = document.querySelector('h1');
            if (h1Element) {
                h1Element.style.color = randomColor; // Farbe der Überschrift ändern
                document.body.style.backgroundColor = randomBackgroundColor; // Hintergrundfarbe ändern
            }
        }
    });
//Funktion um random Farbe für h1 und den background zu generieren
    function getRandomColor(): string {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        console.log(r,g,b);
        
        return `rgb(${r}, ${g}, ${b})`;

        
    }
    


