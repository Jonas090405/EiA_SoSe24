"use strict";
var X27_Yc;
(function (X27_Yc) {
    window.addEventListener("load", LdFn);
    let c2d;
    let L = 0.46;
    function LdFn(_event) {
        let cv = document.querySelector("canvas");
        if (!cv)
            return;
        c2d = cv.getContext("2d");
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        let hz = c2d.canvas.height * L;
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
    function BckDrw() {
        console.log("Background");
        let g = c2d.createLinearGradient(0, 0, 0, c2d.canvas.height);
        g.addColorStop(0, "lightblue");
        g.addColorStop(1, "blue");
        c2d.fillStyle = g;
        c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    }
    function SnDrw(_ps) {
        console.log("Sun", _ps);
        let r1 = 50;
        let r2 = 150;
        let g = c2d.createRadialGradient(0, 0, r1, 0, 0, r2);
        g.addColorStop(0, "yellow");
        g.addColorStop(1, "rgba(223, 131, 226, 0)");
        c2d.save();
        c2d.translate(_ps.a, _ps.b);
        c2d.fillStyle = g;
        c2d.arc(0, 0, r2, 0, 2 * Math.PI);
        c2d.fill();
        c2d.restore();
    }
    function CldDrw(_ps, _sz) {
        console.log("Cloud", _ps, _sz);
        let n = 20;
        let r = 50;
        let p = new Path2D();
        let g = c2d.createRadialGradient(0, 0, 0, 0, 0, r);
        p.arc(0, 0, r, 0, 2 * Math.PI);
        g.addColorStop(0, "lightgrey");
        g.addColorStop(1, "rgba(240, 227, 240, 0)");
        c2d.save();
        c2d.translate(_ps.a, _ps.b);
        c2d.fillStyle = g;
        for (let i = 0; i < n; i++) {
            c2d.save();
            let x = (Math.random() - 0.5) * _sz.a;
            let y = -(Math.random() * _sz.b);
            c2d.translate(x, y);
            c2d.fill(p);
            c2d.restore();
        }
        c2d.restore();
    }
    function x(_ps, _wb, _wf) {
    }
    function MntDrw(_ps, _mn, _mx, _cl, _ch) {
        console.log("Mountains");
        let smin = 50;
        let smax = 150;
        let x = 0;
        c2d.save();
        c2d.translate(_ps.a, _ps.b);
        c2d.beginPath();
        c2d.moveTo(0, 0);
        c2d.lineTo(0, -_mx);
        do {
            x += smin + Math.random() * (smax - smin);
            let y = -_mn - Math.random() * (_mx - _mn);
            c2d.lineTo(x, y);
        } while (x < c2d.canvas.width);
        c2d.lineTo(x, 0);
        c2d.closePath();
        let g = c2d.createLinearGradient(0, 0, 0, -_mx);
        g.addColorStop(0, _cl);
        g.addColorStop(0.5, _ch);
        c2d.fillStyle = g;
        c2d.fill();
        c2d.restore();
    }
    function TrDrw() {
        console.log("Baum malen");
    }
    function TrBlsmDrw() {
        console.log("Baumblüten malen");
    }
    function LkDrw() {
        console.log("Baumblüten malen");
    }
    function RdDrw() {
        console.log("Schilfrohr malen");
    }
    function HsDrw() {
        console.log("Haus malen");
    }
    function BlsmDrw() {
        console.log("Blumen malen");
    }
    function DckDrw() {
        console.log("Ente malen");
    }
})(X27_Yc || (X27_Yc = {}));
//# sourceMappingURL=main.js.map