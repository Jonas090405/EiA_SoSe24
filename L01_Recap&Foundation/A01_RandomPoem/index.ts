//Aufgabe <L01_RandomPoem>
//Jonas Gissler
//Matrikelnummer: 275577
//Datum: 29.03.24
//Quellen: Jonas Bausch, Albert Wirz, ChatGPT

namespace RandomVers {
    // Arrays für Subjekte, Verben und Objekten
    export let Subjekte: string[] = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    export let Verben: string[] = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    export let Objekte: string[] = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript","Red Bull"];
    
    // Funktion getVers
    export function getVers(): string {
        let Vers: string = ""; // Variable für den Vers
        
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjekt: number = (Math.random() * Subjekte.length);
        let randomVerb: number = (Math.random() * Verben.length);
        let randomObjekt: number = (Math.random() * Objekte.length);
        
        // Zusammenstellen des Verses
        Vers += Subjekte.splice(randomSubjekt, 1)[0];
        Vers += " " + Verben.splice(randomVerb, 1)[0];
        Vers += " " + Objekte.splice(randomObjekt, 1)[0];
        
        return Vers;
    } 
}

// For-Schleife 
for (let i = RandomVers.Subjekte.length; i >= 1; i--) {
    console.log(i);
    let Vers = RandomVers.getVers();
    console.log(Vers);
}
