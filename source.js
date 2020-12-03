let L;
var N = 40;
let time = 2;
let tracker = [];
let increments = 2;
let radiusFunction = (i) => 4 / (i * PI);
let radiusModifer = 40;
function setup() {
    let gameCanvas = createCanvas(1000, 300);
    gameCanvas.parent("myCanvas");
    slider = document.getElementById("circle-count");
    L = TWO_PI;
}

function draw() {
    background(200);
    translate(width / 6, height / 2);
    N = slider.value;
    let prev = [0, 0];
    for (let i = 1; i < N; i += increments) {
        let { x, y } = fourierSeries(time, i);
        animateEpicycles(prev, x, y, i);
        prev[0] += x;
        prev[1] += y;
    }
    tracker.unshift(prev[1]);
    animateGraph(prev[0], prev[1]);
    time += 0.05;
}

const animateGraph = (prev_x, prev_y) => {
    translate(width / 3, 0);
    colorMode(RGB, 100);
    stroke("blue");
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < tracker.length; i++) {
        vertex(i, tracker[i]);
    }
    endShape();
    line(0, tracker[0], prev_x - width / 3, prev_y);
};

const animateEpicycles = (prev, x, y, i) => {
    noFill();
    stroke("black");
    strokeWeight(1);
    circle(prev[0], prev[1], radius * 2);
    colorMode(HSB, N);
    strokeWeight(5);
    stroke(i, N, N);
    point(prev[0] + x, prev[1] + y);
    line(prev[0], prev[1], prev[0] + x, prev[1] + y);
};

const fourierSeries = (time, i) => {
    radius = radiusFunction(i);
    radius *= radiusModifer;
    angle = (i * PI * time) / L;
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    return { x, y };
};

document.getElementById("wave-picker").addEventListener("change", (picker) => {
    switch (picker.target.value) {
        case "Square wave":
            increments = 2;
            radiusFunction = (i) => 4 / (i * PI);
            radiusModifer = 40;
            break;
        case "Saw-Tooth wave":
            increments = 1;
            radiusFunction = (i) => 1 / (i * PI);
            radiusModifer = 150;
            break;
        case "Triangle wave":
            increments = 2;
            radiusFunction = (i) =>
                (8 * (-1) ** ((i - 1) / 2)) / (PI ** 2 * i ** 2);
            radiusModifer = 70;
            break;
    }
});
