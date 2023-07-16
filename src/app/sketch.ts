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

    p5.draw = () => {
        let time = new Date()
        Background(p5, colorInterpolation)
        p5.translate(centerX, centerY);
        p5.rotate(p5.radians(-90)); // Rotate by -90 degrees

        clock.draw(p5, time); // Pass 0, 0 as the center coordinates since the rotation is already applied
        colorInterpolation += 0.001
    };
    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        centerX = p5.width / 2;
        centerY = p5.height / 2;
    };
};

export default Sketch