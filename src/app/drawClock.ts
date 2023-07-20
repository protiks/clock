import p5 from "p5";

interface IClock {
    draw(p: p5, currentTime: Date): void;
}

class Clock implements IClock {
    private centerX: number;
    private centerY: number;
    private hourHand: HourHand;
    private minuteHand: MinuteHand;
    private secondHand: SecondHand;

    constructor(_p: p5, centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.hourHand = new HourHand();
        this.minuteHand = new MinuteHand();
        this.secondHand = new SecondHand();
    }

    private static HOURS_PER_DAY = 12;
    private static MINUTES_PER_HOUR = 60;
    private static SECONDS_PER_MINUTE = 60;
    private static DEGREES_PER_CIRCLE = 360;


    draw(p: p5, currentTime: Date) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const hourAngle = p.map(
            hours % Clock.HOURS_PER_DAY + minutes / Clock.MINUTES_PER_HOUR,
            0,
            Clock.HOURS_PER_DAY,
            0,
            Clock.DEGREES_PER_CIRCLE
        );
        const minuteAngle = p.map(minutes, 0, Clock.MINUTES_PER_HOUR, 0, Clock.DEGREES_PER_CIRCLE);
        const targetSecondAngle = seconds * (Clock.DEGREES_PER_CIRCLE / Clock.SECONDS_PER_MINUTE);

        // Handle reverse movement when seconds go from 59 to 0
        if (this.secondHand.previousAngle > targetSecondAngle + 180) {
            this.secondHand.previousAngle = 0;
        }

        // Smoothly interpolate the second hand
        const secondAngle = p.lerp(this.secondHand.previousAngle, targetSecondAngle, 0.1);
        this.secondHand.previousAngle = secondAngle;

        let r: number;
        const aspectRatio = p.width / p.height;

        if (aspectRatio > 1) {
            // Wide screen (landscape)
            r = p.height * 0.95 // You can adjust the multiplier as needed
        } else {
            // Tall screen (portrait) or square
            r = p.width * 0.95 // You can adjust the multiplier as needed
        }

        // Draw the clock elements
        p.fill('white')
        this.drawClockFace(p, r);
        this.hourHand.draw(p, hourAngle, r);
        this.minuteHand.draw(p, minuteAngle, r);

        // Draw the second hand at the edge of the clock
        const secondHandX = r * p.cos(p.radians(secondAngle)) * 0.4;
        const secondHandY = r * p.sin(p.radians(secondAngle)) * 0.4;

        p.fill('lightgrey')
        p.circle(r * p.cos(p.radians(253)) * 0.4, r * p.sin(p.radians(263)) * 0.4, 70)
        p.fill('white')
        p.strokeWeight(0)
        p.circle(r * p.cos(p.radians(253)) * 0.4, r * p.sin(p.radians(263)) * 0.4 - 15, 70)
        this.secondHand.drawNewHand(p, secondAngle, secondHandX, secondHandY);
        console.log(secondAngle)
        p.fill('yellow')
        p.strokeWeight(2)
        p.circle(r * p.cos(p.radians(59)) * 0.4, r * p.sin(p.radians(59)) * 0.4 - 15, 70)


    }

    private drawClockFace(p: p5, r: number) {
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(255);
        p.ellipse(this.centerX, this.centerY, r);

        const numHourMarkers = 12;
        const numMinuteMarkersBetweenHours = 4; // Each hour has 4 markers between large hour markers
        const numMinuteMarkersPerHour = numMinuteMarkersBetweenHours + 1; // Each hour has 5 minute markers (including the large hour marker)
        const numMinuteMarkers = numHourMarkers * numMinuteMarkersPerHour;

        const outerBreakLength = r * 0.5; // Length of the outer end of the 5-minute break markers (touching the edge of the circle)
        const innerBreakLength = r * 0.48; // Length of the inner end of the 5-minute break markers
        const innerBreakLength2 = r * 0.45; // Length of the inner end of the 5-minute break markers

        for (let i = 0; i < numHourMarkers; i++) {
            const hourAngle = p.radians(i * (360 / numHourMarkers));
            const mx1 = this.centerX + outerBreakLength * p.cos(hourAngle);
            const my1 = this.centerY + outerBreakLength * p.sin(hourAngle);
            const mx2 = this.centerX + innerBreakLength2 * p.cos(hourAngle);
            const my2 = this.centerY + innerBreakLength2 * p.sin(hourAngle);
            p.strokeWeight(4)
            p.line(mx1, my1, mx2, my2);

            // Draw minute markers between the large hour markers
            for (let j = 1; j <= numMinuteMarkersBetweenHours; j++) {
                const minuteAngle = p.radians(i * (360 / numHourMarkers) + j * (360 / numMinuteMarkers));
                const mx1 = this.centerX + outerBreakLength * p.cos(minuteAngle);
                const my1 = this.centerY + outerBreakLength * p.sin(minuteAngle);
                const mx2 = this.centerX + innerBreakLength * p.cos(minuteAngle);
                const my2 = this.centerY + innerBreakLength * p.sin(minuteAngle);

                p.strokeWeight(2)
                p.line(mx1, my1, mx2, my2);
            }
        }
    }
}


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

class MinuteHand {
    draw(p: p5, minuteAngle: number, r: number) {
        p.push();
        p.rotate(p.radians(minuteAngle));
        // p.stroke(0, 0, 255);
        p.stroke('black');
        p.strokeWeight(3);
        p.line(0, 0, r * 0.3, 0);
        p.pop();
    }
}

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

export default Clock;
