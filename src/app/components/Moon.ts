import p5 from "p5";

class Moon {
    draw(p5: p5, r: number) {
        p5.fill('lightgrey')
        p5.circle(r * p5.cos(p5.radians(253)) * 0.4, r * p5.sin(p5.radians(263)) * 0.4, 70)
        p5.fill('white')
        p5.strokeWeight(0)
        p5.circle(r * p5.cos(p5.radians(253)) * 0.4, r * p5.sin(p5.radians(263)) * 0.4 - 15, 70)
    }

}

export default Moon