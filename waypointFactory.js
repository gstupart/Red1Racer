class WaypointFactory {

    static getWaypointsLVL1() {
        let scale = 3;
        return [
            new Point(WaypointFactory.variance(386), WaypointFactory.variance(490), scale),
            new Point(WaypointFactory.variance(600), WaypointFactory.variance(426), scale),
            new Point(WaypointFactory.variance(1200), WaypointFactory.variance(400), scale),
            new Point(WaypointFactory.variance(2472), WaypointFactory.variance(400), scale),
            new Point(WaypointFactory.variance(2767), WaypointFactory.variance(430), scale),
            new Point(WaypointFactory.variance(2965), WaypointFactory.variance(455), scale),
            new Point(WaypointFactory.variance(2965), WaypointFactory.variance(200), scale),
            new Point(WaypointFactory.variance(3100), WaypointFactory.variance(200), scale),
            new Point(WaypointFactory.variance(3800), WaypointFactory.variance(208), scale),
            new Point(WaypointFactory.variance(4223), WaypointFactory.variance(285), scale),
            new Point(WaypointFactory.variance(4325), WaypointFactory.variance(385), scale),
            new Point(WaypointFactory.variance(4200), WaypointFactory.variance(466), scale),
            new Point(WaypointFactory.variance(3434), WaypointFactory.variance(474), scale),
            new Point(WaypointFactory.variance(3235), WaypointFactory.variance(710), scale),
            new Point(WaypointFactory.variance(3252), WaypointFactory.variance(1532), scale),
            new Point(WaypointFactory.variance(3396), WaypointFactory.variance(1613), scale),
            new Point(WaypointFactory.variance(5800), WaypointFactory.variance(1620), scale)
        ];
    }

    static variance(num) {
        let mult = 1;
        if (Math.random() * 2 == 0) {
            mult = -1;
        }
        return num + Math.random() * 8 * mult;
    }
}