"use strict";
var RandomVers;
(function (RandomVers) {
    // Arrays für Subjekte, Verben und Objekten
    RandomVers.Subjekte = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    RandomVers.Verben = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    RandomVers.Objekte = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript", "Red Bull"];
    // Funktion getVers
    function getVers(_subjekt, _verben, _objekte) {
        let Vers = ""; // Variable für den Vers
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjekt = Math.floor(Math.random() * _subjekt.length);
        let randomVerb = Math.floor(Math.random() * _verben.length);
        let randomObjekt = Math.floor(Math.random() * _objekte.length);
        // Zusammenstellen des Verses
        Vers += _subjekt[randomSubjekt];
        Vers += " " + _verben[randomVerb];
        Vers += " " + _objekte[randomObjekt];
        return Vers;
    }
    RandomVers.getVers = getVers;
    // For-Schleife 
    for (let i = RandomVers.Subjekte.length; i > 0; i--) {
        console.log(i);
        let Vers = getVers(RandomVers.Subjekte.slice(), RandomVers.Verben.slice(), RandomVers.Objekte.slice());
        console.log(Vers);
    }
})(RandomVers || (RandomVers = {}));
//# sourceMappingURL=index.js.map