import p5 from "p5";
import HourHand from "./HourHand";
import MinuteHand from "./MinuteHand";
import SecondHand from "./SecondHand";
import Sun from "./Sun";
import TimeMarks from "./TimeMarks";
import PrayerTimeLine from "./PrayerTimes";
import Moon from "./Moon";
interface IClock {
    draw(p: p5, currentTime: Date): void;
}

class Clock implements IClock {
    private centerX: number;
    private centerY: number;
    private hourHand: HourHand;
    private minuteHand: MinuteHand;
    private secondHand: SecondHand;
    private timeMarks: TimeMarks;
    private sun: Sun;
    private moon: Moon;
    private prayerTimeLine: PrayerTimeLine

    constructor(_p: p5, centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.hourHand = new HourHand();
        this.minuteHand = new MinuteHand();
        this.secondHand = new SecondHand();
        this.timeMarks = new TimeMarks()
        this.prayerTimeLine = new PrayerTimeLine()
        this.sun = new Sun()
        this.moon = new Moon()

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

        let targetSecondAngle = seconds * (Clock.DEGREES_PER_CIRCLE / Clock.SECONDS_PER_MINUTE);

        // Calculate the difference between targetSecondAngle and previousAngle
        const angleDifference = targetSecondAngle - this.secondHand.previousAngle;

        // Check if the difference is greater than 180 degrees
        if (angleDifference > 180) {
            // Adjust targetSecondAngle to ensure a smooth transition
            targetSecondAngle -= 360;
        }

        // Smoothly interpolate the second hand
        const secondAngle = p.lerp(this.secondHand.previousAngle, targetSecondAngle, 0.1);
        this.secondHand.previousAngle = secondAngle;

        // Handle reverse movement when seconds go from 59 to 0
        if (this.secondHand.previousAngle > targetSecondAngle + 180) {
            this.secondHand.previousAngle = 0;
        }
        console.log(this.secondHand.previousAngle, targetSecondAngle)
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

        const maghribTime = new Date(currentTime);
        maghribTime.setHours(21);
        maghribTime.setMinutes(38);

        this.timeMarks.draw(p, r, this.centerX, this.centerY);
        this.prayerTimeLine.draw(p, r, maghribTime, hourAngle);
        this.hourHand.draw(p, hourAngle, r);
        this.hourHand.draw(p, 90, r);
        this.minuteHand.draw(p, minuteAngle, r);
        this.sun.draw(p, currentTime, r)

        const secondHandX = r * p.cos(p.radians(secondAngle)) * 0.4;
        const secondHandY = r * p.sin(p.radians(secondAngle)) * 0.4;

        this.moon.draw(p, r)
        this.secondHand.drawNewHand(p, secondAngle, secondHandX, secondHandY);




    }


}



export default Clock;
