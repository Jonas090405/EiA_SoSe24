namespace X27_Yc {
    interface Vector2D {
        a: number;
        b: number;
    }

    window.addEventListener("load", LdFn);
    let c2d: CanvasRenderingContext2D;
    let L: number = 0.46;

    function LdFn(_event: Event): void {
        let cv: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!cv)
            return;
        c2d = <CanvasRenderingContext2D>cv.getContext("2d");

        cv.width = window.innerWidth;
        cv.height = window.innerHeight;

        let hz: number = c2d.canvas.height * L;

        BckDrw();
        SnDrw({ a: 300, b: 75 });
        CldDrw({ a: 500, b: 125 }, { a: 250, b: 75 });
        MntDrw({ a: 0, b: hz }, 75, 200, "lightgrey", "grey");
        MntDrw({ a: 0, b: hz }, 50, 150, "lightgrey", "grey");
        TrDrw();
        TrBlsmDrw();
        LkDrw();
        RdDrw();
        HsDrw();
        BlsmDrw();
        DckDrw();
    }

    function BckDrw(): void {
        console.log("Background");

        let g: CanvasGradient = c2d.createLinearGradient(0, 0, 0, c2d.canvas.height);
        g.addColorStop(0, "lightblue");
        g.addColorStop(1, "blue");

        c2d.fillStyle = g;
        c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    }

    function SnDrw(_ps: Vector2D): void {
        console.log("Sun", _ps);

        let r1: number = 50;
        let r2: number = 150;
        let g: CanvasGradient = c2d.createRadialGradient(0, 0, r1, 0, 0, r2);

        g.addColorStop(0, "yellow");
        g.addColorStop(1, "rgba(223, 131, 226, 0)");

        c2d.save();
        c2d.translate(_ps.a, _ps.b);
        c2d.fillStyle = g;
        c2d.arc(0, 0, r2, 0, 2 * Math.PI);
        c2d.fill();
        c2d.restore();
    }

    function CldDrw(_ps: Vector2D, _sz: Vector2D): void {
        console.log("Cloud", _ps, _sz);

        let n: number = 20;
        let r: number = 50;
        let p: Path2D = new Path2D();
        let g: CanvasGradient = c2d.createRadialGradient(0, 0, 0, 0, 0, r);

        p.arc(0, 0, r, 0, 2 * Math.PI);
        g.addColorStop(0, "lightgrey");
        g.addColorStop(1, "rgba(240, 227, 240, 0)");

        c2d.save();
        c2d.translate(_ps.a, _ps.b);
        c2d.fillStyle = g;

        for (let i: number = 0; i < n; i++) {
            c2d.save();
            let x: number = (Math.random() - 0.5) * _sz.a;
            let y: number = - (Math.random() * _sz.b);
            c2d.translate(x, y);
            c2d.fill(p);
            c2d.restore();
        }
        c2d.restore();
    }

    function x (_ps: Vector2D, _wb: number, _wf: number): void {
       
    }

    function MntDrw(_ps: Vector2D, _mn: number, _mx: number, _cl: string, _ch: string): void {
        console.log("Mountains");
        let smin: number = 50;
        let smax: number = 150;
        let x: number = 0;

        c2d.save();
        c2d.translate(_ps.a, _ps.b);

        c2d.beginPath();
        c2d.moveTo(0, 0);
        c2d.lineTo(0, -_mx);

        do {
            x += smin + Math.random() * (smax - smin);
            let y: number = -_mn - Math.random() * (_mx - _mn);

            c2d.lineTo(x, y);
        } while (x < c2d.canvas.width);

        c2d.lineTo(x, 0);
        c2d.closePath();

        let g: CanvasGradient = c2d.createLinearGradient(0, 0, 0, -_mx);
        g.addColorStop(0, _cl);
        g.addColorStop(0.5, _ch);

        c2d.fillStyle = g;
        c2d.fill();

        c2d.restore();
    }

    function TrDrw(): void {
        console.log("Baum malen");
    }

    function TrBlsmDrw(): void {
        console.log("Baumblüten malen");
    }

    function LkDrw(): void {
        console.log("Baumblüten malen");
    }

    function RdDrw(): void {
        console.log("Schilfrohr malen");
    }

    function HsDrw(): void {
        console.log("Haus malen");
    }

    function BlsmDrw(): void {
        console.log("Blumen malen");
    }

    function DckDrw(): void {
        console.log("Ente malen");
    }
}
