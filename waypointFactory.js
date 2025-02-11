class WaypointFactory {

    static getWaypointsLVL1() {
        let scale = 3;
        return [
            new Point(WaypointFactory.variance(378, scale), WaypointFactory.variance(491, scale), scale),
            new Point(WaypointFactory.variance(644, scale), WaypointFactory.variance(423, scale), scale),
            new Point(WaypointFactory.variance(1363, scale), WaypointFactory.variance(423, scale), scale),
            new Point(WaypointFactory.variance(2031, scale), WaypointFactory.variance(423, scale), scale),
            new Point(WaypointFactory.variance(2462, scale), WaypointFactory.variance(423, scale), scale),
            new Point(WaypointFactory.variance(2765, scale), WaypointFactory.variance(495, scale), scale),
            new Point(WaypointFactory.variance(2964, scale), WaypointFactory.variance(484, scale), scale),
            new Point(WaypointFactory.variance(2964, scale), WaypointFactory.variance(203, scale), scale),
            new Point(WaypointFactory.variance(3494, scale), WaypointFactory.variance(203, scale), scale),
            new Point(WaypointFactory.variance(3814, scale), WaypointFactory.variance(210, scale), scale),
            new Point(WaypointFactory.variance(4237, scale), WaypointFactory.variance(297, scale), scale),
            new Point(WaypointFactory.variance(4221, scale), WaypointFactory.variance(471, scale), scale),
            new Point(WaypointFactory.variance(3861, scale), WaypointFactory.variance(471, scale), scale),
            new Point(WaypointFactory.variance(3434, scale), WaypointFactory.variance(471, scale), scale),
            new Point(WaypointFactory.variance(3206, scale), WaypointFactory.variance(681, scale), scale),
            new Point(WaypointFactory.variance(3206, scale), WaypointFactory.variance(1144, scale), scale),
            new Point(WaypointFactory.variance(3219, scale), WaypointFactory.variance(1600, scale), scale),
            new Point(WaypointFactory.variance(4031, scale), WaypointFactory.variance(1613, scale), scale),
            new Point(WaypointFactory.variance(4830, scale), WaypointFactory.variance(1613, scale), scale),
            new Point(WaypointFactory.variance(5841, scale), WaypointFactory.variance(1615, scale), scale)
        ];
    }

    static getWaypointsLVL2() {
        let scale = 1;
        return [
            new Point(WaypointFactory.variance(939, scale), WaypointFactory.variance(848, scale), scale),
            new Point(WaypointFactory.variance(2215, scale), WaypointFactory.variance(848, scale), scale),
            new Point(WaypointFactory.variance(2250, scale), WaypointFactory.variance(752, scale), scale),
            new Point(WaypointFactory.variance(2741, scale), WaypointFactory.variance(752, scale), scale),
            new Point(WaypointFactory.variance(3268, scale), WaypointFactory.variance(752, scale), scale),
            new Point(WaypointFactory.variance(3285, scale), WaypointFactory.variance(978, scale), scale),
            new Point(WaypointFactory.variance(4200, scale), WaypointFactory.variance(978, scale), scale),
            new Point(WaypointFactory.variance(5200, scale), WaypointFactory.variance(978, scale), scale),
            new Point(WaypointFactory.variance(6290, scale), WaypointFactory.variance(978, scale), scale),
            new Point(WaypointFactory.variance(6300, scale), WaypointFactory.variance(273, scale), scale),
            new Point(WaypointFactory.variance(6870, scale), WaypointFactory.variance(273, scale), scale),
            new Point(WaypointFactory.variance(7448, scale), WaypointFactory.variance(288, scale), scale),
            new Point(WaypointFactory.variance(7448, scale), WaypointFactory.variance(650, scale), scale),
            new Point(WaypointFactory.variance(8226, scale), WaypointFactory.variance(650, scale), scale),
            new Point(WaypointFactory.variance(8690, scale), WaypointFactory.variance(682, scale), scale),
            new Point(WaypointFactory.variance(9160, scale), WaypointFactory.variance(701, scale), scale),
            new Point(WaypointFactory.variance(9584, scale), WaypointFactory.variance(657, scale), scale),
            new Point(WaypointFactory.variance(10047, scale), WaypointFactory.variance(660, scale), scale),
            new Point(WaypointFactory.variance(10247, scale), WaypointFactory.variance(433, scale), scale),
            new Point(WaypointFactory.variance(10642, scale), WaypointFactory.variance(388, scale), scale),
            new Point(WaypointFactory.variance(10890, scale), WaypointFactory.variance(304, scale), scale),
            new Point(WaypointFactory.variance(11661, scale), WaypointFactory.variance(306, scale), scale),
            new Point(WaypointFactory.variance(12208, scale), WaypointFactory.variance(666, scale), scale),
            new Point(WaypointFactory.variance(12714, scale), WaypointFactory.variance(690, scale), scale)
        ];
    }

    static variance(num, scale) {
        let mult = 1 / scale;
        if (Math.random() * 2 == 0) {
            mult *= -1;
        }
        return num + Math.random() * 8 * mult;
    }
}
