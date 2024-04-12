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


