let vomitParticles = [];
let victoryParticles = [];
let simulationActive = false;
let simulationType = ""; // "vomit" or "victory"

let currentChoices = [];
let correctIndex = 0;

let currentScreen = "menu";
let status;

let correctCount = 0;
let nausea = 0;

let currentQuestion = 0;
let questions = [];

let maxTime = 900; // frames (~10 seconds if 60fps)
let timer = maxTime;

let backgroundImg, happyImg, neutralImg, gorssImg, victoryImg, worriedImg, trophyImg;

let backgroundMusic, clickSound, correctSound, wrongSound;

let playButton, playButton2, playButton3, menuButton, leaderboardButton, saveButton;

let initialsBox, locationBox;

let gui;

let instructionTimer;

let setupTrue = false;
let musicStarted = false;
let dataLoaded = false

let gameCanvas;

let showAnswerMessage = false;
let answerMessage = "";
let answerTimer = 0;
let questionColor = 'lime'

function preload() {
  backgroundImg = loadImage("Assets/quiz_background.png");
  happyImg = loadImage("Assets/happy_face.png");
  neutralImg = loadImage("Assets/neutral_face.png");
  grossImg = loadImage("Assets/gross_face.png");
  worriedImg = loadImage("Assets/worried_face.png");
  victoryImg = loadImage("Assets/victory_background.png");
  trophyImg = loadImage("Assets/trophy.png");

  backgroundMusic = loadSound("Assets/background_music.mp3");
  clickSound = loadSound("Assets/click.mp3");
  correctSound = loadSound("Assets/correct.mp3");
  wrongSound = loadSound("Assets/wrong.mp3");
}

function setup() {
  // create canvas and attach it to the container
  gameCanvas = createCanvas(800, 600);

  document.addEventListener("touchmove", (e) => e.preventDefault(), {
    passive: false,
  });

  gui = createGui(gameCanvas);
  background(50);

  setupQuestions();

  questions = shuffle(questions); // random order

  playButton = createButton("Play", width / 2 - 75, height / 2 - 40, 150, 75);
  playButton.setStyle({
    textSize: 30,
    fillBg: color("black"),
    fillBgHover: color("white"),
    fillLabel: color("white"),
    rounding: 12,
    strokeBg: color("white"),
  });

  playButton2 = createButton(
    "Play Again?",
    width / 2 - 50,
    height / 2 + 40,
    150,
    75
  );
  playButton2.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });
  
  playButton3 = createButton(
    "Play Again?",
    width / 2 - 50,
    height / 2 + 40,
    150,
    75
  );
  playButton3.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  menuButton = createButton(
    "Back to Menu?",
    width / 2 - 50,
    height / 2 + 120,
    150,
    75
  );
  menuButton.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });
  
  saveButton = createButton(
    "Save Score",
    width / 2 - 100,
    height / 2 + 100,
    225,
    75
  );
  saveButton.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });
  
  initialsInput = createInput();
  initialsInput.attribute("maxlength", 30);
  initialsInput.attribute("placeholder", "Enter Initials");
  initialsInput.size(100, 25);
  initialsInput.input(saveInput);

  locationSelect = createInput();
  locationSelect.attribute("maxlength", 30);
  locationSelect.attribute("placeholder", "Enter Location");
  locationSelect.size(150, 25);
  locationSelect.input(saveInput);

  // Create GUI buttons next to where the inputs are
  initialsBox = createButton("Focus", width / 2 + 150, height / 2 - 70, 50, 40);
  initialsBox.setStyle({
    textSize: 10,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });
  locationBox = createButton("Focus", width / 2 + 150, height / 2 - 10, 50, 40);

  locationBox.setStyle({
    textSize: 10,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  playButton2.visible = false;
  playButton2.enabled = false;
  
  playButton3.visible = false;
  playButton3.enabled = false;

  menuButton.visible = false;
  menuButton.enabled = false;
  
  saveButton.visible = false;
  saveButton.enabled = false;
  
  leaderboardButton = new Clickable();
  leaderboardButton.resize(125, 125);
  leaderboardButton.image = trophyImg;
  leaderboardButton.text = "Leaderboard";
  leaderboardButton.textColor = "white";
  leaderboardButton.locate(0, 0);
  leaderboardButton.updateTextSize()
}

function positionInputs() {
  let rect = gameCanvas.elt.getBoundingClientRect();

  initialsInput.position(
    rect.left + width / 2 - 60,
    rect.top + height / 2 - 60
  );
  locationSelect.position(
    rect.left + width / 2 - 60,
    rect.top + height / 2 - 20
  );
}

function draw() {
  background(50);

  drawMenu();
  
  selectScreen()

  instructionScreen();

  resultsScreen();
  
  leaderboardScreen()

  if (currentScreen === "quiz") {
    runQuiz();
  }

  if (simulationActive) {
    if (simulationType === "vomit") {
      runVomit();
    } else if (simulationType === "victory") {
      runVictory();
    }
  }
}

function triggerVomit() {
  simulationActive = true;
  simulationType = "vomit";
  vomitParticles = [];

  const colors = [color("#8B4513"), color("#D4AF37"), color("#98FB98")]; // brown, bile yellow, pale green

  for (let i = 0; i < 600; i++) {
    // more particles
    // spread wider horizontally
    let angle = random(-PI / 0.5, PI / 2.5);
    let speed = random(4, 12);

    vomitParticles.push({
      x: width / 2,
      y: height / 4,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed - 5, // shoot upward
      alpha: 255,
      color: random(colors),
      size: random(15, 30),
    });
  }
}

function runVomit() {
  for (let p of vomitParticles) {
    // move particles
    p.x += p.vx;
    p.y += p.vy;

    // simulate gravity and slow down
    p.vy += 0.01;
    p.vx *= 0.99;

    // stick to screen edges
    if (p.y > height - 10) p.vy *= -0.3;
    if (p.x < 0 || p.x > width) p.vx *= -0.3;

    // fade
    p.alpha -= 1;

    fill(red(p.color), green(p.color), blue(p.color), p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
  }

  // remove faded particles
  vomitParticles = vomitParticles.filter((p) => p.alpha > 0);

  if (vomitParticles.length === 0) {
    simulationActive = false;
    console.log("GAME OVER!");
    // Call your game over logic here
  }
}

function triggerVictory() {
  simulationActive = true;
  simulationType = "victory";
  victoryParticles = [];
  victoryEmojis = [];

  const goldColors = [color("#FFD700"), color("#FFFACD"), color("#FFE680")]; // shimmering golds

  // Generate fast golden sparks
  for (let i = 0; i < 800; i++) {
    let angle = random(TWO_PI);
    let speed = random(6, 12); // faster than vomit
    victoryParticles.push({
      x: width / 2,
      y: height / 2,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      alpha: 255,
      color: random(goldColors),
      size: random(5, 12),
    });
  }

  // Generate occasional emojis
  for (let i = 0; i < 15; i++) {
    victoryEmojis.push({
      x: width / 2,
      y: height / 2,
      vx: random(-10, 10),
      vy: random(-5, 5), // float upward
      alpha: 255,
      emoji: random(["🏆", "👑", "🎉", "✨"]),
      size: random(24, 48),
    });
  }
}

function runVictory() {
  // Golden sparks
  for (let p of victoryParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 1;
    fill(red(p.color), green(p.color), blue(p.color), p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
  }
  victoryParticles = victoryParticles.filter((p) => p.alpha > 0);

  // Floating emojis
  textAlign(CENTER, CENTER);
  textSize(32);
  for (let e of victoryEmojis) {
    e.x += e.vx;
    e.y += e.vy;
    e.alpha -= 3;
    textSize(e.size);
    fill(255, 255, 0, e.alpha);
    text(e.emoji, e.x, e.y);
  }
  victoryEmojis = victoryEmojis.filter((e) => e.alpha > 0);

  if (victoryParticles.length === 0 && victoryEmojis.length === 0) {
    simulationActive = false;
    console.log("VICTORY COMPLETE!");
    // Add your final "STATUS: APEX PREDATOR" message here
    fill("#FFD700");
    textSize(28);
    textAlign(CENTER, CENTER);
    text(
      "STATUS: APEX PREDATOR. THE MENU HAS BEEN CONQUERED.",
      width / 2,
      height / 2
    );
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);

  if (!musicStarted) {
    backgroundMusic.loop();
    musicStarted = true;
  }

  if (currentScreen !== "quiz" || showAnswerMessage == true) return;

  let q = questions[currentQuestion];

  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2 - 250;
    let y = 350 + i * 80;
    let w = 500;
    let h = 60;

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      clickSound.play();
      checkAnswer(i);
      return;
    }
  }
}

function touchStarted() {
  if (!musicStarted) {
    backgroundMusic.loop();
    musicStarted = true;
  }

  if (currentScreen !== "quiz" || showAnswerMessage == true) return;

  let q = questions[currentQuestion];

  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2 - 250;
    let y = 350 + i * 80;
    let w = 500;
    let h = 60;

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      clickSound.play();
      checkAnswer(i);
      return;
    }
  }
}

function keyPressed() {
  if (
    currentScreen === "instructions" &&
    (keyCode === 32 || keyCode === ENTER)
  ) {
    currentScreen = "quiz";
    setupTrue = true;
    generateTwoChoices();
  }
}

//Save initials and location
function saveInput(initials, location) {
  localStorage.setItem("quizplayerInitials", initials);
  localStorage.setItem("quizplayerLocation", location);
}