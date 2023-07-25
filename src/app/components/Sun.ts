import p5 from "p5";

class Sun {
    private static HOURS_PER_DAY = 24;
    private static MINUTES_PER_HOUR = 60;
    private static SECONDS_PER_MINUTE = 60;
    private static DEGREES_PER_CIRCLE = 360;

    draw(p: p5, currentTime: Date, r: number) {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // Calculate the angle for the sun based on the time of day, including minutes and seconds
        const hourAngle = p.map(
            hours % Sun.HOURS_PER_DAY + minutes / Sun.MINUTES_PER_HOUR + seconds / (Sun.MINUTES_PER_HOUR * Sun.SECONDS_PER_MINUTE),
            0,
            Sun.HOURS_PER_DAY,
            0,
            Sun.DEGREES_PER_CIRCLE
        );

        // Calculate the x and y coordinates of the sun based on the angle and clock radius
        const sunX = r * p.cos(p.radians(hourAngle)) * 0.4;
        const sunY = r * p.sin(p.radians(hourAngle)) * 0.4 - 15;

        const sunRadius = r * 0.03;

        p.fill('yellow');
        p.strokeWeight(2);
        p.circle(sunX, sunY, sunRadius);
        const lineTime = new Date(currentTime);
        lineTime.setHours(21);
        lineTime.setMinutes(44);
        const lineAngle = p.map(
            lineTime.getHours() % Sun.HOURS_PER_DAY + lineTime.getMinutes() / Sun.MINUTES_PER_HOUR + lineTime.getSeconds() / (Sun.MINUTES_PER_HOUR * Sun.SECONDS_PER_MINUTE),
            0,
            Sun.HOURS_PER_DAY,
            0,
            Sun.DEGREES_PER_CIRCLE
        );
        // Calculate the x and y coordinates of the line based on the angle and clock radius
        const lineX = r * p.cos(p.radians(lineAngle)) * 0.4;
        const lineY = r * p.sin(p.radians(lineAngle)) * 0.4 - 15;

        // Draw the line
        p.strokeWeight(2);
    }
}

export default Sun;
