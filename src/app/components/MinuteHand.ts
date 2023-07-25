import p5 from "p5";

class MinuteHand {
    draw(p: p5, minuteAngle: number, r: number) {
        p.push();
        p.rotate(p.radians(minuteAngle));
        p.stroke('black');
        p.strokeWeight(3);
        p.line(0, 0, r * 0.3, 0);
        p.pop();
    }
}

export default MinuteHand