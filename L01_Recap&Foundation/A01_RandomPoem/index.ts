// Name: Jonas Gissler     
// Matrikel: 275577
// Quellen: Jonas Bausch, ChatGPT

namespace RandomVers {
    // Arrays für Subjekte, Verben und Objekten
    export let Subjekte: string[] = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    export let Verben: string[] = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    export let Objekte: string[] = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript","Red Bull"];
    
    // Funktion getVers
    export function getVers(_subjekt: string[], _verben: string[], _objekte: string[]): string {
        let Vers: string = ""; // Variable für den Vers
        
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjekt: number = Math.floor(Math.random() * _subjekt.length);
        let randomVerb: number = Math.floor(Math.random() * _verben.length);
        let randomObjekt: number = Math.floor(Math.random() * _objekte.length);
        
        // Zusammenstellen des Verses
        Vers += _subjekt[randomSubjekt];
        Vers += " " + _verben[randomVerb];
        Vers += " " + _objekte[randomObjekt];
        
        return Vers;
    } 
    
    // For-Schleife 
    for (let i = Subjekte.length; i > 0; i--) {
        console.log(i);
        let Vers = getVers(Subjekte.slice(), Verben.slice(), Objekte.slice());
        console.log(Vers);
    }
}
