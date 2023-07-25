import p5 from "p5";

class HourHand {
    private static STROKE_COLOR = [255, 0, 0]; // RGB color (red)
    private static STROKE_WEIGHT = 8;
    private static HAND_LENGTH_RATIO = 0.2;

    /**
     * Draw the hour hand of the clock.
     *
     * @param {p5} p - The p5.js instance.
     * @param {number} hourAngle - The angle (in degrees) of the hour hand.
     * @param {number} r - The radius of the clock.
     */

    draw(p: p5, hourAngle: number, r: number) {
        p.push();
        p.rotate(p.radians(hourAngle));
        p.stroke(HourHand.STROKE_COLOR[0], HourHand.STROKE_COLOR[1], HourHand.STROKE_COLOR[2]);
        p.stroke('black')
        p.strokeWeight(HourHand.STROKE_WEIGHT);
        p.line(0, 0, r * HourHand.HAND_LENGTH_RATIO, 0);
        p.pop();
    }
}

export default HourHand