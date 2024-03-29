"use strict";
//Aufgabe <L01_RandomPoem>
//Jonas Gissler
//Matrikelnummer: 275577
//Datum: 29.03.24
//Quellen: Jonas Bausch, Albert Wirz, ChatGPT
var RandomVers;
(function (RandomVers) {
    // Arrays für Subjekte, Verben und Objekten
    RandomVers.Subjekte = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    RandomVers.Verben = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    RandomVers.Objekte = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript", "Red Bull"];
    // Funktion getVers
    function getVers() {
        let Vers = ""; // Variable für den Vers
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjekt = (Math.random() * RandomVers.Subjekte.length);
        let randomVerb = (Math.random() * RandomVers.Verben.length);
        let randomObjekt = (Math.random() * RandomVers.Objekte.length);
        // Zusammenstellen des Verses
        Vers += RandomVers.Subjekte.splice(randomSubjekt, 1)[0];
        Vers += " " + RandomVers.Verben.splice(randomVerb, 1)[0];
        Vers += " " + RandomVers.Objekte.splice(randomObjekt, 1)[0];
        return Vers;
    }
    RandomVers.getVers = getVers;
})(RandomVers || (RandomVers = {}));
// For-Schleife 
for (let i = RandomVers.Subjekte.length; i >= 1; i--) {
    console.log(i);
    let Vers = RandomVers.getVers();
    console.log(Vers);
}
//# sourceMappingURL=index.js.map