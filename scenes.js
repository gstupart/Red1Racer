const LEVEL_ONE = {
    level: 1,
    type: 1,
    AICount: 2,
    TrackReward: 300,
    background: {src: "./maps/level1.png", width: 6000, height:1920, scale: 3},
    waypoint: "getWaypointsLVL1",
    player: {x: 400, y: 1370, degree: Math.PI / 2},
    // player: {x: 17000, y: 4900, degree: Math.PI / 2},
    AIWeapon: {type: MissileType.MAVERICK},
    playerSecondaryWeapon: [ 
        {type: MissileType.Sparrow},
        {type: MissileType.Alamo},  
        {type: MissileType.Speedster},
    ],
    offRoad: [
        {x: 0, y: 0, endX: 480, endY: 405},
        {x: 480, y: 0, endX: 2620, endY: 350},
        {x: 2620, y: 0, endX: 2870, endY: 390},
        {x: 2870, y: 0, endX: 3210, endY: 110},
        {x: 3210, y: 0, endX: 3830, endY: 130},
        {x: 3830, y: 0, endX: 4060, endY: 150},
        {x: 4060, y: 0, endX: 4165, endY: 170},
        {x: 4165, y: 0, endX: 4225, endY: 195},
        {x: 4225, y: 0, endX: 4470, endY: 40},
        {x: 4470, y: 0, endX: 4635, endY: 85},
        {x: 4635, y: 0, endX: 6000, endY: 1445},
        {x: 4635, y: 0, endX: 6000, endY: 1445},
        {x: 3345, y: 1445, endX: 5700, endY: 1540},
        {x: 3400, y: 690, endX: 4635, endY: 755},
        {x: 3345, y: 755, endX: 4635, endY: 1445},
        {x: 3075, y: 270, endX: 3100, endY: 540},
        {x: 3110, y: 280, endX: 3845, endY: 395},
        {x: 3845, y: 300, endX: 4010, endY: 395},
        {x: 4010, y: 325, endX: 4105, endY: 395},
        {x: 4190, y: 325, endX: 4200, endY: 395},
        {x: 3475, y: 533, endX: 4400, endY: 536},
        {x: 0, y: 560, endX: 485, endY: 1920},
        {x: 485, y: 530, endX: 600, endY: 1920},
        {x: 600, y: 495, endX: 2515, endY: 1920},
        {x: 2515, y: 530, endX: 2640, endY: 1920},
        {x: 2640, y: 565, endX: 3065, endY: 1920},
        {x: 3065, y: 1710, endX: 3815, endY: 1920},
        {x: 3815, y: 1695, endX: 5700, endY: 1920},
        {x: 5700, y: 1790, endX: 6000, endY: 1920},
    ],
    finishLine: {x: 5820, y: 1445, endX: 6000, endY: 1790},
    obstacles: [
        {x: 387, y: 473, angle: Math.PI / 2},
        {x: 2437, y: 448, angle: Math.PI / 2},
        {x: 2935, y: 318, angle: 0},
        {x: 4400, y: 453, angle: Math.PI},
        {x: 3146, y: 806, angle: Math.PI},
        {x: 3264, y: 1179, angle: Math.PI},
        {x: 3793, y: 1637, angle: Math.PI / 2},
        {x: 4996, y: 1584, angle: Math.PI / 2},
    ],
    suriken: [
        {x: 840, y: 320, direction: Math.PI, totalStep: 315},
        {x: 2780, y: 370, direction: Math.PI, totalStep: 345},
        {x: 3700, y: 90, direction: Math.PI, totalStep: 345},
        {x: 3020, y: 1380, direction: Math.PI / 2, totalStep: 570},
        {x: 4400, y: 1480, direction: Math.PI, totalStep: 375},
    ],
    block: [
        {x: 3073, y: 265, endX: 3074, endY: 773},
        {x: 3109, y: 340, endX: 4144, endY: 341},
        {x: 2074, y: 772, endX: 3074, endY: 773},
    ],
    boon: [
        {x: 455, y: 473},
        {x: 2700, y: 448},
        {x: 4000, y: 260},
        {x: 3000, y: 453},
        {x: 4700, y: 1584},
    ],
}

const LEVEL_TWO = {
    level: 2,
    type: 1,
    AICount: 4,
    TrackReward: 600,
    background: {src: "./maps/level2.png", width: 13132, height:1024, scale: 5},
    waypoint: "getWaypointsLVL2",
    player: {x: 35 * 5, y: 850 * 5, degree: Math.PI / 2},
    AIWeapon: {type: MissileType.MAVERICK},
    offRoad: [
        {x: 0, y: 0, endX: 2205, endY: 800},
        {x: 0, y: 895, endX: 2205, endY: 1024},
        {x: 2205, y: 990, endX: 2300, endY: 1024},
        {x: 2300, y: 607, endX: 3233, endY: 703},
        {x: 2300, y: 800, endX: 3233, endY: 830},
        {x: 6561, y: 318, endX: 7348, endY: 476},
        {x: 6800, y: 476, endX: 7348, endY: 580},
        {x: 6956, y: 580, endX: 7348, endY: 655},
        {x: 7153, y: 655, endX: 7348, endY: 669},
        {x: 6224, y: 190, endX: 7592, endY: 222},
        {x: 6224, y: 0, endX: 7592, endY: 190},
        {x: 7545, y: 225, endX: 7592, endY: 548},
        {x: 7592, y: 0, endX: 8377, endY: 512},
        // {x: 8330, y: 575, endX: 8377, endY: 510},
        {x: 8377, y: 0, endX: 8754, endY: 575},
        {x: 8271, y: 0, endX: 9162, endY: 607},
        // {x: 9113, y: 575, endX: 9162, endY: 510},
        {x: 9162, y: 0, endX: 10044, endY: 543},
        // {x: 9995, y: 510, endX: 10044, endY: 256},
        {x: 10044, y: 0, endX: 10092, endY: 319},
        {x: 10092, y: 0, endX: 10730, endY: 288},
        {x: 10730, y: 0, endX: 10829, endY: 255},
        {x: 10829, y: 0, endX: 11955, endY: 255},
        {x: 11955, y: 0, endX: 12005, endY: 287},
        {x: 12005, y: 0, endX: 12053, endY: 320},
        {x: 12053, y: 0, endX: 12101, endY: 352},
        {x: 12101, y: 0, endX: 12150, endY: 383},
        {x: 12150, y: 0, endX: 12200, endY: 415},
        {x: 12200, y: 0, endX: 12250, endY: 512},
        {x: 12250, y: 0, endX: 12298, endY: 542},
        {x: 12298, y: 0, endX: 12346, endY: 575},
        {x: 12346, y: 0, endX: 12740, endY: 607},   // Finish line offroad section top
        {x: 7349, y: 735, endX: 7587, endY: 800},
        {x: 7587, y: 766, endX: 9016, endY: 800},
        // {x: 9015, y: 800, endX: 10192, endY: 830},
    ],
    finishLine: {x: 12560, y: 608, endX: 12736, endY: 768},
    obstacles: [
        {x: 505, y: 835, angle: Math.PI / 2},
        {x: 705, y: 860, angle: Math.PI / 2},
        {x: 1000, y: 850, angle: Math.PI / 2},
        {x: 1800, y: 815, angle: Math.PI / 2},
        {x: 1900, y: 876, angle: Math.PI / 2},
        {x: 2276, y: 748, angle: Math.PI / 2},
        {x: 2660, y: 722, angle: Math.PI / 2},
        {x: 2655, y: 768, angle: Math.PI / 2},
        {x: 2860, y: 743, angle: Math.PI / 2},
        {x: 3445, y: 950, angle: Math.PI / 2},
        {x: 4133, y: 963, angle: Math.PI / 2},
        {x: 5332, y: 982, angle: Math.PI / 2},
        {x: 5735, y: 972, angle: Math.PI / 2},
        {x: 6300, y: 763, angle: Math.PI / 2},
        {x: 6290, y: 419, angle: Math.PI / 2},
        {x: 7116, y: 275, angle: Math.PI / 2},
        {x: 7765, y: 281, angle: Math.PI / 2},
        {x: 7733, y: 281, angle: Math.PI / 2},
        {x: 8245, y: 709, angle: Math.PI / 2},
        {x: 9432, y: 626, angle: Math.PI / 2},
        {x: 9906, y: 699, angle: Math.PI / 2},
        {x: 10122, y: 391, angle: Math.PI / 2},
        {x: 11122, y: 262, angle: Math.PI / 2},
        {x: 11172, y: 282, angle: Math.PI / 2},
        {x: 12000, y: 621, angle: Math.PI / 2},
    ],
    suriken: [
        {x: 3159, y: 715, direction: Math.PI, totalStep: 225},
        {x: 6014, y: 939, direction: Math.PI, totalStep: 225},
        {x: 7351, y: 449, direction: Math.PI / 2, totalStep: 225},
        {x: 8212, y: 449, direction: Math.PI, totalStep: 225},
        {x: 11920, y: 317, direction: Math.PI * 5 / 4, totalStep: 225},
    ],
    block: [
        {x: 2300, y: 830, endX: 3233, endY: 1024},
        {x: 3330, y: 191, endX: 6224, endY: 927},
        {x: 0, y: 476, endX: 3330, endY: 511},
        {x: 6368, y: 318, endX: 6561, endY: 1024},
        {x: 6561, y: 476, endX: 6800, endY: 1024},
        {x: 6800, y: 580, endX: 6956, endY: 1024},
        {x: 6956, y: 655, endX: 7153, endY: 1024},
        {x: 7153, y: 669, endX: 7348, endY: 1024},
        {x: 7349, y: 800, endX: 9015, endY: 1024},
        {x: 9015, y: 830, endX: 10241, endY: 1024},
        {x: 10241, y: 703, endX: 10290, endY: 1024},
        {x: 10290, y: 672, endX: 10338, endY: 1024},
        {x: 10338, y: 639, endX: 10486, endY: 1024},
        {x: 10486, y: 609, endX: 10583, endY: 1024},
        {x: 10583, y: 576, endX: 10681, endY: 1024},
        {x: 10681, y: 543, endX: 10778, endY: 1024},
        {x: 10778, y: 512, endX: 10827, endY: 1024},
        {x: 10827, y: 479, endX: 10878, endY: 1024},
        {x: 10878, y: 445, endX: 10926, endY: 1024},
        {x: 10926, y: 416, endX: 11611, endY: 1024},
        {x: 11611, y: 447, endX: 11710, endY: 1024},
        {x: 11710, y: 543, endX: 11759, endY: 1024},
        {x: 11759, y: 576, endX: 11808, endY: 1024},
        {x: 11808, y: 640, endX: 11856, endY: 1024},
        {x: 11856, y: 671, endX: 11905, endY: 1024},
        {x: 11905, y: 703, endX: 11955, endY: 1024},
        {x: 11955, y: 767, endX: 12004, endY: 1024},
        {x: 12004, y: 799, endX: 12542, endY: 1024},
        {x: 12542, y: 831, endX: 12738, endY: 1024}
    ],
    
    level2boon: [
        {x: 520, y: 835},
        {x: 980, y: 840},
        {x: 2500, y: 740},
        {x: 3300, y: 748},
        {x: 3300, y: 1000},
        {x: 6300, y: 980},
    ],
    superenergy: [
        // points for superEnergy
        {x: 6300, y: 230},
        {x: 7400, y: 290},
        {x: 7400, y: 590},
        {x: 10100, y: 590},
        {x: 12000, y: 400},
    ],
}

const LEVEL_THREE = {
    level: 3,
    type: 1,
    AICount: 2,
    TrackReward: 900,
    background: {src: "./maps/level3.png", width: 2754, height:2302, scale: 4},
    waypoint: "getWaypointsLVL3",
    player: {x: 2600, y: 7740, degree: 0},
    AIWeapon: {type: MissileType.MAVERICK},
    offRoad: [
        {x: 3, y: 0, endX: 670, endY: 447},
        {x: 670, y: 1, endX: 1484, endY: 285},
        {x: 1484, y: 4, endX: 2303, endY: 283},
        {x: 2305, y: 3, endX: 2751, endY: 285},
        {x: 2338, y: 289, endX: 2755, endY: 943},
        {x: 3, y: 453, endX: 871, endY: 700},
        {x: 877, y: 450, endX: 1724, endY: 701},
        {x: 1728, y: 451, endX: 2175, endY: 670},
        {x: 645, y: 831, endX: 766, endY: 1151},
        {x: 0, y: 700, endX: 510, endY: 1276},
        {x: 1, y: 1279, endX: 925, endY: 1596},
        {x: 835, y: 834, endX: 1279, endY: 1151},
        {x: 2311, y: 964, endX: 2748, endY: 1342},
        {x: 2275, y: 1347, endX: 2749, endY: 2300},
        {x: 1571, y: 1478, endX: 1823, endY: 1599},
        {x: 1825, y: 1473, endX: 2005, endY: 1511},
        {x: 2, y: 1598, endX: 602, endY: 2299},
        {x: 606, y: 2052, endX: 1437, endY: 2300},
        {x: 741, y: 1732, endX: 1657, endY: 2046},
        {x: 1439, y: 2050, endX: 2273, endY: 2301},
        {x: 1662, y: 1733, endX: 2273, endY: 2049},
        {x: 1480, y: 716, endX: 1984, endY: 766},
        {x: 1630, y: 776, endX: 1820, endY: 841},
        {x: 1824, y: 918, endX: 2011, endY: 945},
        {x: 1934, y: 862, endX: 2101, endY: 899},
        {x: 2030, y: 806, endX: 2163, endY: 849},
        {x: 2188, y: 1018, endX: 2311, endY: 1345},
        {x: 2036, y: 1091, endX: 2172, endY: 1337},
        {x: 1807, y: 1147, endX: 2026, endY: 1331},
        {x: 1605, y: 1089, endX: 1788, endY: 1335},
        {x: 1422, y: 993, endX: 1592, endY: 1333},
        {x: 1286, y: 881, endX: 1411, endY: 1324},
        {x: 1095, y: 1158, endX: 1272, endY: 1226},
        {x: 1211, y: 1233, endX: 1276, endY: 1291},
        {x: 1832, y: 1518, endX: 1897, endY: 1564},
        {x: 940, y: 1349, endX: 1059, endY: 1589},
        {x: 1076, y: 1403, endX: 1178, endY: 1593},
        {x: 1190, y: 1472, endX: 1499, endY: 1597},
        {x: 1499, y: 1589, endX: 1499, endY: 1593},
        {x: 2140, y: 1583, endX: 2267, endY: 1726},
        {x: 1995, y: 1649, endX: 2138, endY: 1731},
    ],
    finishLine: {x: 768, y: 293, endX: 837, endY: 442},
    block: [
        {x: 1465, y: 1484, endX: 1490, endY: 1589},
        {x: 1579, y: 1485, endX: 1601, endY: 1584},
        {x: 1613, y: 1526, endX: 1885, endY: 1547},
        {x: 1137, y: 1528, endX: 1452, endY: 1555},
        {x: 1893, y: 1167, endX: 1941, endY: 1321},
    ],
    obstacles: [
        {x: 834, y: 1641, angle: Math.PI / 2},
        {x: 1148, y: 1690, angle: Math.PI / 2},
        {x: 1607, y: 1673, angle: Math.PI / 2},
        {x: 2130, y: 1440, angle: -Math.PI / 2},
        {x: 1414, y: 1430, angle: -Math.PI / 2},
        {x: 722, y: 1236, angle: -Math.PI / 2},
        {x: 943, y: 752, angle: Math.PI / 2},
        {x: 1441, y: 863, angle: Math.PI * 3 / 4},
        {x: 1859, y: 1040, angle: Math.PI * 3 / 4},
        {x: 2257, y: 926, angle: 0},
        {x: 2251, y: 607, angle: 0},
        {x: 1807, y: 403, angle: -Math.PI / 2},
        {x: 1537, y: 344, angle: -Math.PI / 2},
    ],
    suriken: [
        {x: 1847, y: 1548, direction: Math.PI * 3 / 4, totalStep: 225},
        {x: 466, y: 1014, direction: Math.PI / 2, totalStep: 225},
        {x: 2048, y: 249, direction: Math.PI, totalStep: 225},
    ],
    level2boon: [
        {x: 1500, y: 1641},
        {x: 570, y: 1200},
        {x: 2000, y: 790},
    ],
    superenergy: [
        // points for superEnergy
        {x: 820, y: 1641},
        {x: 1530, y: 1400},
        {x: 570, y: 790},
        {x: 2240, y: 390},
    ],
    
}

const LEVEL_FOUR = {
    level: 4,
    type: 1,
    AICount: 2,
    TrackReward: 1200,
    background: {src: "./maps/level4.png", width: 512, height:3328, scale: 8},
    waypoint: "getWaypointsLVL4",
    player: {x: 1160, y: 25520, degree: 0},
    AIWeapon: {type: MissileType.MAVERICK},
    finishLine: {x: 210, y: 32, endX: 285, endY: 95},
    offRoad: [
        {x: 192, y: 3120, endX: 507, endY: 3321},
        {x: 2, y: 3279, endX: 187, endY: 3323},
        {x: 3, y: 2786, endX: 108, endY: 3274},
        {x: 113, y: 2785, endX: 173, endY: 3036},
        {x: 176, y: 2931, endX: 365, endY: 3034},
        {x: 450, y: 1875, endX: 507, endY: 3116},
        {x: 3, y: 2257, endX: 44, endY: 2779},
        {x: 338, y: 1873, endX: 444, endY: 2252},
        {x: 4, y: 2210, endX: 253, endY: 2253},
        {x: 5, y: 1793, endX: 77, endY: 2204},
        {x: 467, y: 1634, endX: 506, endY: 1869},
        {x: 275, y: 1489, endX: 506, endY: 1629},
        {x: 5, y: 1489, endX: 189, endY: 1708},
        {x: 465, y: 1025, endX: 505, endY: 1483},
        {x: 5, y: 1170, endX: 77, endY: 1487},
        {x: 5, y: 738, endX: 62, endY: 1101},
        {x: 434, y: 625, endX: 505, endY: 956},
        {x: 305, y: 371, endX: 505, endY: 540},
        {x: 5, y: 466, endX: 61, endY: 701},
        {x: 433, y: 147, endX: 505, endY: 363},
        {x: 1, y: 144, endX: 77, endY: 365},
        {x: 5, y: 34, endX: 203, endY: 141},
        {x: 290, y: 34, endX: 507, endY: 141},
        {x: 3, y: 1, endX: 507, endY: 31},
        {x: 160, y: 224, endX: 350, endY: 285},
        {x: 3, y: 369, endX: 221, endY: 463},
        {x: 146, y: 547, endX: 505, endY: 621},
        {x: 5, y: 1713, endX: 381, endY: 1788},
        {x: 161, y: 1345, endX: 381, endY: 1406},
        {x: 5, y: 1103, endX: 205, endY: 1168},
        {x: 145, y: 816, endX: 189, endY: 1021},
        {x: 193, y: 961, endX: 507, endY: 1021},
        {x: 273, y: 707, endX: 351, endY: 878},
        {x: 256, y: 2784, endX: 447, endY: 2845},
    ],
    block: [
        {x: 256, y: 2805, endX: 447, endY: 2825},
        {x: 128, y: 2336, endX: 253, endY: 2365},
        {x: 128, y: 2368, endX: 141, endY: 2702},
        {x: 145, y: 2559, endX: 254, endY: 2589},
        {x: 145, y: 2594, endX: 173, endY: 2701},
        {x: 258, y: 2673, endX: 365, endY: 2701},
        {x: 339, y: 2339, endX: 365, endY: 2669},
        {x: 225, y: 2449, endX: 333, endY: 2475},
        {x: 161, y: 1985, endX: 254, endY: 2124},
        {x: 162, y: 1872, endX: 333, endY: 1901},
        {x: 161, y: 1367, endX: 381, endY: 1390},
        {x: 161, y: 1248, endX: 303, endY: 1263},
        {x: 288, y: 1105, endX: 301, endY: 1245},
        {x: 159, y: 817, endX: 173, endY: 1019},
        {x: 176, y: 976, endX: 503, endY: 999},
        {x: 3, y: 703, endX: 347, endY: 731},
        {x: 305, y: 733, endX: 329, endY: 877},
        {x: 145, y: 574, endX: 505, endY: 593},
        {x: 163, y: 246, endX: 347, endY: 267},
        {x: 4, y: 412, endX: 218, endY: 433},
        {x: -1, y: 1126, endX: 204, endY: 1142},
        {x: 380, y: 1100, endX: 388, endY: 1351},
        {x: 272, y: 1548, endX: 505, endY: 1567},
        {x: 3, y: 1744, endX: 381, endY: 1763},
        {x: 3, y: 2223, endX: 253, endY: 2239},
        {x: 0, y: 2975, endX: 366, endY: 3003},
    ],
    obstacles: [
        {x: 245, y: 3079, angle: Math.PI / 2},
        {x: 313, y: 2889, angle: -Math.PI / 2},
        {x: 87, y: 2579, angle: 0},
        {x: 413, y: 2559, angle: 0},
        {x: 114, y: 2117, angle: 0},
        {x: 296, y: 1998, angle: 0},
        {x: 231, y: 1601, angle: 0},
        {x: 428, y: 1301, angle: 0},
        {x: 99, y: 913, angle: 0},
        {x: 385, y: 745, angle: 0},
        {x: 185, y: 507, angle: Math. PI / 2},
    ],
    suriken: [
        {x: 356, y: 1757, direction: Math.PI / 2, totalStep: 225},
        {x: 311, y: 865, direction: Math.PI, totalStep: 225},
        {x: 63, y: 251, direction: Math.Pi / 2, totalStep: 225},
        {x: 449, y: 251, direction: -Math.PI / 2, totalStep: 225},
    ],
    level2boon: [
        {x: 245, y: 3079},
        {x: 200, y: 2889},
        {x: 100, y: 1940},
    ],
    superenergy: [
        {x: 200, y: 2500},
        {x: 280, y: 1940},
        {x: 400, y: 1820},
    ],
}

const FINAL_LEVEL = {
    level: 5,
    type: 1,
    AICount: 2,
    TrackReward: 300,
    background: {src: "./maps/level1.png", width: 6000, height:1920, scale: 3},
    waypoint: "getWaypointsLVL1",
    player: {x: 400, y: 1370, degree: Math.PI / 2},
    // player: {x: 17000, y:4900, degree: Math.PI / 2},
    AIWeapon: {type: MissileType.MAVERICK},
    AISecondaryWeapon: [ 
        {type: MissileType.Sparrow},
        {type: MissileType.Alamo},  
        {type: MissileType.Speedster},
    ],
    offRoad: [
        {x: 0, y: 0, endX: 480, endY: 405},
        {x: 480, y: 0, endX: 2620, endY: 350},
        {x: 2620, y: 0, endX: 2870, endY: 390},
        {x: 2870, y: 0, endX: 3210, endY: 110},
        {x: 3210, y: 0, endX: 3830, endY: 130},
        {x: 3830, y: 0, endX: 4060, endY: 150},
        {x: 4060, y: 0, endX: 4165, endY: 170},
        {x: 4165, y: 0, endX: 4225, endY: 195},
        {x: 4225, y: 0, endX: 4470, endY: 40},
        {x: 4470, y: 0, endX: 4635, endY: 85},
        {x: 4635, y: 0, endX: 6000, endY: 1445},
        {x: 4635, y: 0, endX: 6000, endY: 1445},
        {x: 3345, y: 1445, endX: 5700, endY: 1540},
        {x: 3400, y: 690, endX: 4635, endY: 755},
        {x: 3345, y: 755, endX: 4635, endY: 1445},
        {x: 3075, y: 270, endX: 3100, endY: 540},
        {x: 3110, y: 280, endX: 3845, endY: 395},
        {x: 3845, y: 300, endX: 4010, endY: 395},
        {x: 4010, y: 325, endX: 4105, endY: 395},
        {x: 4190, y: 325, endX: 4200, endY: 395},
        {x: 3475, y: 533, endX: 4400, endY: 536},
        {x: 0, y: 560, endX: 485, endY: 1920},
        {x: 485, y: 530, endX: 600, endY: 1920},
        {x: 600, y: 495, endX: 2515, endY: 1920},
        {x: 2515, y: 530, endX: 2640, endY: 1920},
        {x: 2640, y: 565, endX: 3065, endY: 1920},
        {x: 3065, y: 1710, endX: 3815, endY: 1920},
        {x: 3815, y: 1695, endX: 5700, endY: 1920},
        {x: 5700, y: 1790, endX: 6000, endY: 1920},
    ],
    finishLine: {x: 5820, y: 1445, endX: 6000, endY: 1790},
    obstacles: [
        {x: 387, y: 473, angle: Math.PI / 2},
        {x: 2437, y: 448, angle: Math.PI / 2},
        {x: 2935, y: 318, angle: 0},
        {x: 4400, y: 453, angle: Math.PI},
        {x: 3146, y: 806, angle: Math.PI},
        {x: 3264, y: 1179, angle: Math.PI},
        {x: 3793, y: 1637, angle: Math.PI / 2},
        {x: 4996, y: 1584, angle: Math.PI / 2},
    ],
    suriken: [
        {x: 840, y: 320, direction: Math.PI, totalStep: 315},
        {x: 2780, y: 370, direction: Math.PI, totalStep: 345},
        {x: 3700, y: 90, direction: Math.PI, totalStep: 345},
        {x: 3020, y: 1380, direction: Math.PI / 2, totalStep: 570},
        {x: 4400, y: 1480, direction: Math.PI, totalStep: 375},
    ],
    block: [
        {x: 3073, y: 265, endX: 3074, endY: 773},
        {x: 3109, y: 340, endX: 4144, endY: 341},
        {x: 2074, y: 772, endX: 3074, endY: 773},
    ],
    boon: [
        {x: 455, y: 473},
        {x: 2700, y: 448},
        {x: 4000, y: 260},
        {x: 3000, y: 453},
        {x: 4700, y: 1584},
    ],
}