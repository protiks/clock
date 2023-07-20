import { type Sketch } from "@p5-wrapper/react";
import Background from "./background";
import Clock from "./drawClock";

const Sketch: Sketch = (p5) => {

    let clock: Clock;
    let colorInterpolation = 0
    let centerX: number;
    let centerY: number;

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
        p5.angleMode(p5.RADIANS);
        centerX = p5.width / 2;
        centerY = p5.height / 2;
        clock = new Clock(p5, 0, 0); // Initialize the clock instance
    };

    let hour = 16;
    let minute = 50;
    let second = 18;
    p5.draw = () => {
        let time = new Date();
        // time.setHours(hour);
        // time.setMinutes(minute);
        // time.setSeconds(second);

        // Draw the background
        Background(p5, colorInterpolation, p5.color(255, 0, 255), p5.color(0, 255, 0));

        // Translate and rotate the canvas to draw the clock at the center
        p5.push();
        p5.translate(centerX, centerY);
        p5.rotate(p5.radians(-90)); // Rotate by -90 degrees

        // Draw the clock
        clock.draw(p5, time); // Pass 0, 0 as the center coordinates since the rotation is already applied
        p5.pop();

        // Draw the white circle with a black stroke at the center of the canvas
        p5.push();
        p5.fill('white');
        p5.stroke('white');
        p5.strokeWeight(2);
        // p5.circle(centerX, centerY, 200);
        p5.pop();

        // Increment the color interpolation
        colorInterpolation += 0.001;
    };
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        centerX = p5.width / 2;
        centerY = p5.height / 2;
    };
};

export default Sketch