//Aufgabe <L01_RandomPoem>
//Jonas Gissler
//Matrikel: 275577
//Datum: 
//Quellen: Jonas Bausch, Albert Wirz

namespace RandomVers {
    // Arrays für Subjekte, Verben und Objekten
    export let Subjekte: string[] = ["Robin", "Albert", "Tarik", "Kevin", "Joe", "Robert"];
    export let Verben: string[] = ["erfindet", "liebt", "hasst", "studiert", "mag", "braucht"];
    export let Objekte: string[] = ["Ideen", "Essen", "Mathe", "Cannabis", "TypeScript",];
    
    // Funktion getVers
    export function getVers(): string {
        let Vers: string = ""; // Variable für den Vers
        
        // Zufällige Subjekte, Verben und Objekte
        let randomSubjektIndex: number = (Math.random() * Subjekte.length);
        let randomVerbIndex: number = (Math.random() * Verben.length);
        let randomObjektIndex: number = (Math.random() * Objekte.length);
        
        // Zusammenstellen des Verses
        Vers += Subjekte.splice(randomSubjektIndex, 1)[0];
        Vers += " " + Verben.splice(randomVerbIndex, 1)[0];
        Vers += " " + Objekte.splice(randomObjektIndex, 1)[0];
        
        return Vers;
    } 
}

// For-Schleife
for (let i = RandomVers.Subjekte.length; i >= 1; i--) {
    console.log(i);
    let Vers = RandomVers.getVers();
    console.log(Vers);
}
