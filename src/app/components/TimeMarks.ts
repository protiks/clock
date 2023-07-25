import p5 from "p5";

class TimeMarks {

    public draw(p: p5, r: number, centerX: number, centerY: number) {
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(255);
        p.ellipse(centerX, centerY, r);

        const numHourMarkers = 12;
        const numMinuteMarkersBetweenHours = 4; // Each hour has 4 markers between large hour markers
        const numMinuteMarkersPerHour = numMinuteMarkersBetweenHours + 1; // Each hour has 5 minute markers (including the large hour marker)
        const numMinuteMarkers = numHourMarkers * numMinuteMarkersPerHour;

        const outerBreakLength = r * 0.5; // Length of the outer end of the 5-minute break markers (touching the edge of the circle)
        const innerBreakLength = r * 0.48; // Length of the inner end of the 5-minute break markers
        const innerBreakLength2 = r * 0.45; // Length of the inner end of the 5-minute break markers

        for (let i = 0; i < numHourMarkers; i++) {
            const hourAngle = p.radians(i * (360 / numHourMarkers));
            const mx1 = centerX + outerBreakLength * p.cos(hourAngle);
            const my1 = centerY + outerBreakLength * p.sin(hourAngle);
            const mx2 = centerX + innerBreakLength2 * p.cos(hourAngle);
            const my2 = centerY + innerBreakLength2 * p.sin(hourAngle);
            p.strokeWeight(4)
            p.line(mx1, my1, mx2, my2);

            // Draw minute markers between the large hour markers
            for (let j = 1; j <= numMinuteMarkersBetweenHours; j++) {
                const minuteAngle = p.radians(i * (360 / numHourMarkers) + j * (360 / numMinuteMarkers));
                const mx1 = centerX + outerBreakLength * p.cos(minuteAngle);
                const my1 = centerY + outerBreakLength * p.sin(minuteAngle);
                const mx2 = centerX + innerBreakLength * p.cos(minuteAngle);
                const my2 = centerY + innerBreakLength * p.sin(minuteAngle);

                p.strokeWeight(2)
                p.line(mx1, my1, mx2, my2);
            }
        }
    }
}

export default TimeMarks