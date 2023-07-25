import p5 from "p5";

class SecondHand {
    previousAngle: number;

    constructor() {
        this.previousAngle = 0;
    }

    draw(p5: p5, secondAngle: number, r: number) {
        p5.push();
        p5.rotate(p5.radians(secondAngle));
        p5.stroke('black');
        p5.strokeWeight(2);
        p5.pop();
    }

    drawNewHand(p: p5, secondAngle: number, x: number, y: number) {
        p.push();

        p.stroke('black');
        p.strokeWeight(2);
        p.noFill()
        // p.circle(x, y, 70);
        p.circle(x, y, 90);

        p.pop();
    }
}

export default SecondHand