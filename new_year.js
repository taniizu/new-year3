let emitters = [];
let backgroundImage;
let syouhinImage;
let message = 'あけましておめでとう';

function preload() {
  backgroundImage = loadImage('red.jpeg');
  syouhinImage = loadImage('tatu.png');
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function setup() {
  displayDensity(1);
  createCanvas(350, 650); // ウィンドウサイズを350×650に設定
  textFont('むつきかな', 35);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);

  for (let emitter of emitters) {
    emitter.emit(1);
    emitter.show();
    emitter.update();
  }

  const syouhinWidth = 327;
  const syouhinHeight = 763;
  const syouhinX = (width - syouhinWidth) / 2;
  const syouhinY = (height - syouhinHeight) / 2-50;
  image(syouhinImage, syouhinX, syouhinY, syouhinWidth, syouhinHeight);
  
  let goldenColor = color(255, 215, 0);
  fill(255);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < message.length; i++) {
    textAlign(LEFT, CENTER);
    let xPosition = i *35;  
    let yPosition = height / 4 + sin(frameCount * 0.05) * 20;
    text(message.charAt(i), xPosition, yPosition);
  }
}

class Emitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
  }

  emit(numParticles) {
    for (let i = 0; i < numParticles; i++) {
      const particleColor = color(random(200, 255), random(150, 200), random(0, 50), random(150, 200));
      const particleSize = random(2, 10);
      let x = random(-0.6, 0.6);
      let y = random(-0.6, 0.6);
      const xSpeed = (x, x);
      const ySpeed = (y, y);
      this.particles.push(new Particle(this.x, this.y, particleColor, particleSize, xSpeed, ySpeed));
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }
}

class Particle {
  constructor(x, y, color, size, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
