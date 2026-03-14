//Create function to make buttons
function createPlayButton(button) {
  if (button == 0) {
    playButton.visible = true;
    playButton.enabled = true;
    if (!playButton) {
      // create a "Play" button
      playButton = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 60,
        150,
        75
      );
      playButton.setStyle({
        textSize: 30,
        fillBg: color("black"),
        fillBgHover: color("white"),
        fillLabel: color("white"),
        rounding: 12,
        strokeBg: color("white"),
      });
    }
  }

  if (button == 1) {
    playButton2 = createButton(
      "Play Again?",
      width / 2 - 75,
      height / 2 + 30,
      180,
      75
    );
    playButton2.setStyle({
      textSize: 30,
      fillBg: color("black"),
      fillBgHover: color("white"),
      fillLabel: color("white"),
      rounding: 12,
      strokeBg: color("white"),
    });
  }

  if (button == 2) {
    menuButton = createButton(
      "Back to Menu?",
      width / 2 - 112.5,
      height / 2 + 120,
      250,
      75
    );
    menuButton.setStyle({
      textSize: 30,
      fillBg: color("black"),
      fillBgHover: color("white"),
      fillLabel: color("white"),
      rounding: 12,
      strokeBg: color("white"),
    });
  }
  
  if (button == 3) {
    saveButton = createButton(
      "Save Score?",
      width / 2 - 100,
      height / 2 + 210,
      225,
      75
    );
    saveButton.setStyle({
      textSize: 30,
      fillBg: color("black"),
      fillBgHover: color("white"),
      fillLabel: color("white"),
      rounding: 12,
      strokeBg: color("white"),
    });
  }
  
  if (button == 4) {
    playButton3 = createButton(
      "Play",
      width / 2 - 75,
      height / 2 + 30,
      180,
      75
    );
    playButton3.setStyle({
      textSize: 30,
      fillBg: color("black"),
      fillBgHover: color("white"),
      fillLabel: color("white"),
      rounding: 12,
      strokeBg: color("white"),
    });
  }
  
  if (button == 5) {
    initialsBox.visible = true;
    initialsBox.enabled = true;
    if (!initialsBox) {
      // create a "Play" button
      initialsBox = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 40,
        150,
        35
      );
      initialsBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }

  if (button == 6) {
    locationBox.visible = true;
    locationBox.enabled = true;
    if (!locationBox) {
      // create a "Play" button
      locationBox = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 40,
        150,
        35
      );
      locationBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }
}

//Create menus with buttons
function drawMenu() {
  if (currentScreen == "menu") {
    playButton2.visible = false;
    playButton2.enabled = false;

    menuButton.visible = false;
    menuButton.enabled = false;
    
    initialsInput.hide();
    locationSelect.hide();
    
    //In case any errors happen
    try {
      initialsBox.visible = false;
      initialsBox.enabled = false;
      locationBox.visible = false;
      locationBox.enabled = false;
    } catch (err) {}

    image(backgroundImg, 0, 0, width, height);

    //Style the menu
    fill("black");
    rect(125, 50, 550, 100);

    stroke("white");
    strokeWeight(1);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Gag Reflex", width / 2, 100);
    drawGui();
    
    leaderboardButton.draw();
  }

  //Check if buttons are pressed
  if (currentScreen === "menu" && playButton.isPressed) {
    currentScreen = "select";
    strokeWeight(1);
    playButton.visible = false;
    playButton.enabled = false;

    instructionTimer = millis();
    createPlayButton(4);
  }
  
  leaderboardButton.onPress = function () {
    currentScreen = "leaderboard";
    createPlayButton(2);
    playButton.visible = false;
    playButton.enabled = false;
  };
}

function selectScreen() {
  if (currentScreen == "select") {
    image(backgroundImg, 0, 0, width, height);
    if (dataLoaded == false) {
      positionInputs();

      // load only once
      const savedInitials = localStorage.getItem("quizplayerInitials");
      const savedLocation = localStorage.getItem("quizplayerLocation");

      if (savedInitials) initialsInput.value(savedInitials);
      if (savedLocation) locationSelect.value(savedLocation);

      dataLoaded = true; // mark as loaded

      createPlayButton(5);
      createPlayButton(6);
    }

    //Declare input values
    var initials = initialsInput.value().trim();
    var location = locationSelect.value();

    stroke("white");
    strokeWeight(1);
    fill("black");
    rect(150, 0, 500, 200);

    fill("white");
    text(" Enter your initials \n and location", width / 2, height / 2 - 200);

    //Show the input boxes
    initialsInput.show();
    locationSelect.show();
    drawGui();

    //Play game when pressed
    if (playButton3.isPressed) {
      if (initials.length >= 3 && location != "") {
        localStorage.setItem("quizplayerInitials", initials);
        localStorage.setItem("quizplayerLocation", location);

        instructionTimer = millis();
        currentScreen = "instructions";

        strokeWeight(1);
        initialsInput.hide();
        locationSelect.hide();
        playButton3.visible = false;

        //In case any errors happen
        try {
          initialsBox.visible = false;
          initialsBox.enabled = false;
          locationBox.visible = false;
          locationBox.enabled = false;
        } catch (err) {}

        dataLoaded = false; // reset for next time
      } else {
        alert("Please enter 3 initials and select a location!");
      }
    }

    if (initialsBox.isPressed) {
      initialsInput.elt.focus();
      
    }

    if (locationBox.isPressed) {
      locationSelect.elt.focus();
    }
  }
}


function instructionScreen() {
  if (currentScreen === "instructions") {
    image(backgroundImg, 0, 0, width, height);

    push();
    // Title
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Trebuchet MS");
    textStyle(BOLD);
    textSize(64);
    text(" How to Play ", width / 2, 50);

    // Pop-out background box
    noStroke();
    fill(0, 0, 0, 150); // Semi-transparent black background
    rectMode(CENTER);
    rect(width / 2, height / 2, width * 0.8, height * 0.6, 20);

    // Instruction text
    fill(255);
    textSize(24);
    textAlign(CENTER, TOP);
    text(
      "• A question will appear on the screen.\n" +
        "• Read the question and choose the correct answer.\n" +
        "• A timer of 15 seconds for each question\n" +
        "• Try to get to 10 points.\n" +
        "• 3 wrong answers will get you OUT!\n\n" +
        "Press SPACE or ENTER to skip.",
      width / 2,
      height / 2 - 100
    );

    pop();

    // 10-second countdown
    let remaining = max(0, 10 - floor((millis() - instructionTimer) / 1000));
    textSize(18);
    fill("yellow");
    text(`Starting in ${remaining} seconds...`, width / 2, height - 60);

    // Auto transition after 10 seconds
    if (millis() - instructionTimer > 10000) {
      currentScreen = "quiz";
      setupTrue = true;
      generateTwoChoices();
    }
  }
}

function resultsScreen() {
  if (currentScreen === "results") {
    if (status == "lose") {
      image(backgroundImg, 0, 0, width, height);
      image(grossImg, 30, 30, 150, 150);
    }
    if (status == "victory") {
      image(victoryImg, 0, 0, width, height);
    }

    push();

    // Title
    fill("white");
    textAlign(CENTER, CENTER);

    if (status == "lose") {
      fill(0, 0, 0, 150);
      rectMode(CENTER);
      rect(width / 2, height / 2 - 200, 400, 100, 20);
      textSize(60);
      fill("red");
      text("GAME OVER!", width / 2, 100);
    }
    if (status == "victory") {
      fill(0, 0, 0, 150);
      rectMode(CENTER);
      rect(width / 2, height / 2 - 200, 600, 100, 20);
      textSize(30);
      fill("lime");
      text(
        "STATUS: APEX PREDATOR. \n" + "THE MENU HAS BEEN CONQUERED!",
        width / 2,
        100
      );
    }

    // Score box
    fill(0, 0, 0, 150);
    rectMode(CENTER);
    rect(width / 2, height / 2 - 40, 400, 200, 20);

    // Score text
    fill("yellow");
    textSize(40);
    text("Your Score:", width / 2, height / 2 - 90);

    fill("white");
    textSize(50);
    text(correctCount, width / 2, height / 2 - 20);

    pop();

    drawGui();

    // PLAY AGAIN BUTTON
    if (playButton2 && playButton2.isPressed) {
      generateTwoChoices();
      
      correctCount = 0;
      currentScreen = "quiz";
      setupQuestions();

      questions = shuffle(questions);
      playButton2.visible = false;
      playButton2.enabled = false;

      menuButton.visible = false;
      menuButton.enabled = false;
      
      saveButton.visible = false;
      saveButton.enabled = false;
    }

    // BACK TO MENU BUTTON
    if (menuButton.isPressed) {
      correctCount = 0;
      currentScreen = "menu";
      createPlayButton(0);
      playButton2.visible = false;
      playButton2.enabled = false;

      menuButton.visible = false;
      menuButton.enabled = false;
      
      saveButton.visible = false;
      saveButton.enabled = false;
    }
    
    // SAVE SCORE
    if (saveButton.isPressed) {
      currentScreen = "menu";
      createPlayButton(0);
      playButton2.visible = false;
      playButton2.enabled = false;

      menuButton.visible = false;
      menuButton.enabled = false;
      
      saveButton.visible = false;
      saveButton.enabled = false;
      generateDailyLeaderboard();
      updateLeaderboard(
            localStorage.getItem("quizplayerInitials"),
            localStorage.getItem("quizplayerLocation"),
            correctCount
          );
      correctCount = 0
    }
  }
}

function runQuiz() {
  image(backgroundImg, 0, 0, width, height);

  updateTimer();

  drawTimerBar();
  
  showCorrectAnswerMessage();

  push();
  imageMode(CENTER);
  if (nausea == 0) {
    image(happyImg, width / 2, 50, 50, 50);
  } else if (nausea <= 34) {
    image(neutralImg, width / 2, 50, 50, 50);
  } else if (nausea <= 67) {
    image(worriedImg, width / 2, 50, 50, 50);
  }
  else if (nausea >= 100) {
    image(grossImg, width / 2, 50, 50, 50);
  }
  pop();

  let q = questions[currentQuestion];

  push();
  // Question box
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 0, 180);
  rect(width / 2, 250, 700, 140, 20);

  // Border
  stroke("#FFD700");
  strokeWeight(3);
  noFill();
  rect(width / 2, 250, 700, 140, 20);

  // Question text
  noStroke();
  fill(questionColor);
  textAlign(CENTER, CENTER);
  textSize(26);
  text(q.text, width / 2, 250, 650);
  pop();
  push();

 for (let i = 0; i < currentChoices.length; i++){
    let x = width / 2 - 250;
    let y = 350 + i * 80;
    let w = 500;
    let h = 60;

    // Hover effect
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      fill("#FFD700"); // highlight
    } else {
      fill(60);
    }

    stroke(255);
    strokeWeight(1);
    rect(x, y, w, h, 12);

    // Letter label
    fill("white");
    textSize(20);
    textAlign(LEFT, CENTER);
    let letters = ["A", "B", "C", "D"];
    text(letters[i] + ".", x + 20, y + h / 2);

    // Option text
    fill(255);
    textAlign(CENTER, CENTER);
    if(i == 0){
      
    }
    text(currentChoices[i], width / 2 + 20, y + h / 2);
  }
  pop();

  drawUI();

  if (nausea >= 100 && showAnswerMessage == false) {
    triggerVomit();
    currentScreen = "results";
    status = "lose";
    createPlayButton(1);
    createPlayButton(2);
    createPlayButton(3);
    nausea = 0;
    timer = maxTime;
    return;
  }
}

function drawUI() {
  // Vomit meter background
  fill(50);
  rect(45, 60, 220, 25, 8);

  // Vomit fill
  fill("#8B4513");
  rect(45, 60, 220 * (nausea / 100), 25, 8);

  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Nausea", 45, 50);

  textSize(14);
  text(floor(nausea) + "%", 270, 58);

  // Score
  textAlign(RIGHT);
  textSize(18);
  text("Courses Cleared: " + correctCount + "/10", width - 40, 50);
}

function generateTwoChoices() {

  let q = questions[currentQuestion];

  // get correct answer
  let correct = q.options[q.correct];

  // get all wrong answers
  let wrongOptions = q.options.filter((opt, i) => i !== q.correct);

  // pick one random wrong answer
  let randomWrong = random(wrongOptions);

  // randomly decide position
  if (random() < 0.5) {
    currentChoices = [correct, randomWrong];
    correctIndex = 0;
  } else {
    currentChoices = [randomWrong, correct];
    correctIndex = 1;
  }

}

function checkAnswer(choice) {
  let q = questions[currentQuestion];

  if (choice === correctIndex) {
    correctCount++;
    timer = maxTime; // reset timer
    correctSound.play();
    currentQuestion = (currentQuestion + 1) % questions.length;
    generateTwoChoices();

    if (correctCount >= 10) {
      triggerVictory();
      currentScreen = "results";
      status = "victory";
      createPlayButton(1);
      createPlayButton(2);
      createPlayButton(3);
      nausea = 0;
      timer = maxTime;
      return;
    }
  } else {
    nausea += 33.4;
    timer = maxTime;
    wrongSound.play();
    
    answerMessage = "Correct Answer: " + currentChoices[correctIndex];
    showAnswerMessage = true;
    questionColor = 'red'
    answerTimer = millis();
  }

}

function showCorrectAnswerMessage(){

  push()
  if(!showAnswerMessage) return;

  fill(0,180);
  rect(width/2 - 20, height/2 - 200, 400, 50, 20);

  textAlign(LEFT)
  fill(255);
  textSize(16);
  text(answerMessage, width/2, height/2 - 175);

  if(millis() - answerTimer > 5000){
    showAnswerMessage = false;
    currentQuestion++;
    generateTwoChoices();
    timer = maxTime
    questionColor = 'lime'
  }

  pop()
}

function updateTimer() {
  timer--;

  if (timer <= 0) {
    let q = questions[currentQuestion];

    // treat as wrong answer
    nausea += 33.4;
    timer = maxTime;
    
    wrongSound.play();
    
    answerMessage = "Correct Answer: " + q.options[q.correct];
    showAnswerMessage = true;
    questionColor = 'red'
    answerTimer = millis();

    if (nausea >= 100) {
      triggerVomit();
      gameState = "vomit";
      return;
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  generateTwoChoices();
  timer = maxTime; // reset timer
}

function drawTimerBar() {
  let barWidth = 300;
  let barHeight = 20;

  let x = 50;
  let y = 120;

  let percent = timer / maxTime;
  
  if(showAnswerMessage == true){
    return;
  }

  // background
  fill(60);
  rect(x, y, barWidth, barHeight);

  // timer fill
  fill("#D4AF37");
  rect(x, y, barWidth * percent, barHeight);

  // label
  fill(255);
  textAlign(CENTER);
  textSize(14);
  text("Taste Timer", 80, 110);
}

let leaderboard = [];
let lastGeneratedDate = "";

function updateLeaderboard(initials, location, score) {
  // Load the current leaderboard from localStorage
  let storedLeaderboard =
    JSON.parse(localStorage.getItem("quizleaderboard")) || [];
  leaderboard = storedLeaderboard; // use existing leaderboard

  // Check if player already exists
  let player = leaderboard.find((entry) => entry.initials === initials);

  if (player) {
    // Update score if higher
    if (score >= player.score) {
      player.score = score;
      player.location = location;
    }
  } else {
    // Add new player
    leaderboard.push({ initials, location, score });
  }

  // Sort from highest to lowest score
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep only top 10 entries
  if (leaderboard.length > 10) {
    leaderboard = leaderboard.slice(0, 10);
  }

  // Save updated leaderboard back to localStorage
  localStorage.setItem("quizleaderboard", JSON.stringify(leaderboard));
}

function generateDailyLeaderboard() {
  // Get today's date in YYYY-MM-DD format
  let today = new Date().toISOString().split("T")[0];

  // Check if we already generated today's leaderboard
  if (localStorage.getItem("quizleaderboardDate") === today) {
    leaderboard = JSON.parse(localStorage.getItem("quizleaderboard"));
    return;
  }
  else{
    localStorage.removeItem("quizleaderboard");
    localStorage.removeItem("quizleaderboardDate");
  }

  // Otherwise, make a new random leaderboard
  const sampleInitials = [
    "AM",
    "JS",
    "KT",
    "LM",
    "RB",
    "TD",
    "CG",
    "MP",
    "ZN",
    "QF",
  ];
  const sampleLocations = [
    "Canada",
    "USA",
    "Japan",
    "UK",
    "France",
    "Germany",
    "Italy",
    "Brazil",
    "India",
    "Australia",
  ];

  leaderboard = [];
  for (let i = 0; i < 10; i++) {
    let initials =
      sampleInitials[Math.floor(Math.random() * sampleInitials.length)];
    let location =
      sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    let score = Math.floor(Math.random() * 8 + 2); 

    leaderboard.push({ initials, location, score });
  }

  // Sort leaderboard (highest score first)
  leaderboard.sort((a, b) => b.score - a.score);

  // Save to localStorage with today's date
  localStorage.setItem("quizleaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("quizleaderboardDate", today);
}

function leaderboardScreen() {
  if (currentScreen == "leaderboard") {
    image(backgroundImg, 0, 0, width, height);
    // Ensure leaderboard is ready
    generateDailyLeaderboard();

    stroke("black");
    strokeWeight(4);
    fill("white");

    push();
    // --- BACKGROUND SQUARES ---
    noStroke();
    fill(0, 0, 0, 180); // dark transparent squares
    let boxWidth = 320;
    let boxHeight = 350;
    rect(width / 2 - boxWidth - 50, 60, boxWidth - 50, boxHeight, 20); // left box
    rect(width / 2 + 110, 60, boxWidth - 50, boxHeight, 20); // right box
    pop();

    drawGui();

    fill("yellow");
    textAlign(CENTER);
    textSize(20);
    text("🏆 Daily Leaderboard 🏆", width / 2, 40);
    textSize(22);

    fill("white");
    // Split into two columns
    const leftX = width / 5; // left column x position
    const rightX = (width / 5) * 4; // right column x position
    const startY = 100; // top margin
    const lineSpacing = 60; // vertical spacing

    // Draw leaderboard
    for (let i = 0; i < leaderboard.length; i++) {
      let entry = leaderboard[i];
      let columnX, rowY;

      // First 5 entries on the left, rest on the right
      if (i < 5) {
        columnX = leftX;
        rowY = startY + i * lineSpacing;
      } else {
        columnX = rightX;
        rowY = startY + (i - 5) * lineSpacing;
      }

      text(
        `${i + 1}. ${entry.initials} - ${entry.location}\nScore: ${
          entry.score
        }`,
        columnX,
        rowY
      );
    }

    // Back button
    if (currentScreen == "leaderboard" && menuButton.isPressed) {
      currentScreen = "menu";
      createPlayButton(0);
    }
  }
}