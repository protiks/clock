import p5 from 'p5';

const Background = (p5: p5, colorInterpolation: number, color?: string) => {
    let c1 = p5.color(200, 25, 0);
    let c2 = p5.color(10, 50, 220);

    // Calculate the interpolation factor using the modulo operator
    let t = (colorInterpolation % 1 + 1) % 1;

    if (t > 0.5) {
        t = 1 - t; // Reverse t to go back from c2 to c1
    }
    let c3 = p5.lerpColor(c1, c2, t);
    p5.background(c3);
};

export default Background;
