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

        const hourAngle = p.map(hours % Clock.HOURS_PER_DAY, 0, Clock.HOURS_PER_DAY, 0, Clock.DEGREES_PER_CIRCLE);
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
        this.drawClockFace(p, r);
        this.hourHand.draw(p, hourAngle, r);
        this.minuteHand.draw(p, minuteAngle, r);
        this.secondHand.draw(p, secondAngle, r);
    }

    private drawClockFace(p: p5, r: number) {
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(255);
        p.ellipse(this.centerX, this.centerY, r);
    }
}

class HourHand {
    private static STROKE_COLOR = [255, 0, 0]; // RGB color (red)
    private static STROKE_WEIGHT = 4;
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
        p.strokeWeight(HourHand.STROKE_WEIGHT);
        p.line(0, 0, r * HourHand.HAND_LENGTH_RATIO, 0);
        p.pop();
    }
}

class MinuteHand {
    draw(p: p5, minuteAngle: number, r: number) {
        p.push();
        p.rotate(p.radians(minuteAngle));
        p.stroke(0, 0, 255);
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

    draw(p: p5, secondAngle: number, r: number) {
        p.push();
        p.rotate(p.radians(secondAngle));
        p.stroke(0, 255, 0);
        p.strokeWeight(2);
        p.line(0, 0, r * 0.4, 0);
        p.pop();
    }
}

export default Clock;
