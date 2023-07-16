import p5 from "p5";

const drawClock = (p: p5, centerX: number, centerY: number) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = p.map(hours % 12, 0, 12, 0, 360);
    const minuteAngle = p.map(minutes, 0, 60, 0, 360);
    const secondAngle = seconds * 6;

    let r = p.width * 0.5;

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255);
    p.ellipse(centerX, centerY, r);

    p.push();
    p.rotate(p.radians(hourAngle));
    p.stroke(255, 0, 0);
    p.strokeWeight(4);
    p.line(0, 0, r * 0.2, 0);
    p.pop();

    p.push();
    p.rotate(p.radians(minuteAngle));
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    p.line(0, 0, r * 0.3, 0);
    p.pop();

    p.push();
    p.rotate(p.radians(secondAngle));
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.line(0, 0, r * 0.4, 0);
    p.pop();
}

export default drawClock