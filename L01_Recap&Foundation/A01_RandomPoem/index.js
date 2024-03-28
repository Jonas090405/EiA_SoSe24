"use strict";
//Aufgabe <L01_RandomPoem>
//Jonas Gissler
//Matrikel: 275577
//Datum: 
//Quellen: Jonas Bausch, Albert Wirz
var RandomVers;
(function (RandomVers) {
    // Arrays für Subjekte, Verben und Objekten
    RandomVers.Subjekte = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    RandomVers.Verben = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    RandomVers.Objekte = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript",];
    // Funktion getVers
    function getVers() {
        let Vers = ""; // Variable für den Vers
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjektIndex = (Math.random() * RandomVers.Subjekte.length);
        let randomVerbIndex = (Math.random() * RandomVers.Verben.length);
        let randomObjektIndex = (Math.random() * RandomVers.Objekte.length);
        // Zusammenstellen des Verses
        Vers += RandomVers.Subjekte.splice(randomSubjektIndex, 1)[0];
        Vers += " " + RandomVers.Verben.splice(randomVerbIndex, 1)[0];
        Vers += " " + RandomVers.Objekte.splice(randomObjektIndex, 1)[0];
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