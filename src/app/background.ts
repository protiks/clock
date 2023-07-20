import p5 from 'p5';

const Background = (p5: p5, colorInterpolation: number, c1: p5.Color, c2: p5.Color) => {
    // Calculate the interpolation factor using the modulo operator and ensure it stays in the range [0, 1]
    let t = colorInterpolation % 2;
    if (t > 1) {
        t = 2 - t; // Reverse t to go back from 1 to 0
    }

    // Use the interpolation factor t to get the color
    let c3 = p5.lerpColor(c1, c2, t);
    p5.background(c3);
};

export default Background;
