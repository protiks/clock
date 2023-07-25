import p5 from "p5";

class PrayerTimeLine {
    draw(p: p5, r: number, prayerTime: Date, angle: number) {
        const prayerMinutes = prayerTime.getMinutes();

        const hours = prayerTime.getHours();
        const hourAngle = p.map(
            21 % 12,
            0,
            12,
            0,
            360
        );
        p.push();
        p.rotate(p.radians(angle));
        p.stroke('red');
        p.strokeWeight(22);
        p.line(r * 0.3, 0, r * 0.4, 0);
        p.pop();
    }
}

export default PrayerTimeLine;
