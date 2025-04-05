// Landing Quotes
const landingQuotes = [
    "The Earth is what we all have in common. 🌍",
    "Sustainability is not a choice — it’s our future.",
    "Act as if what you do makes a difference. Because it does.",
    "A green planet starts with you. 💚",
    "Be part of the solution, not the pollution.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "There is no Planet B — let’s protect the one we’ve got.",
    "Live simply so others can simply live.",
    "Don’t wait for change. Be the change. 🌱",
    "Nature is not a place to visit. It is home."
];

// Show random quote on landing page
window.onload = function () {
    const landing = document.getElementById("landing");
    const quoteText = document.getElementById("landingQuote");
    const randomQuote = landingQuotes[Math.floor(Math.random() * landingQuotes.length)];
    quoteText.innerText = randomQuote;

    // Fade out landing after 3 seconds
    setTimeout(() => {
        landing.classList.add("hidden");
    }, 3000);

    // Restore saved progress
    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
        document.getElementById("progressBar").style.width = savedProgress + "%";
        updateTreeImage(parseFloat(savedProgress));
    }
};

function updateTreeImage(progress) {
    const tree = document.getElementById("treeImage");
    if (progress >= 100) {
        tree.src = "images/tree-full.png";
    } else if (progress >= 66) {
        tree.src = "images/tree-half.png";
    } else if (progress >= 33) {
        tree.src = "images/tree-seedling.png";
    } else {
        tree.src = "images/tree.png";
    }
}

function updateProgress() {
    let habits = document.querySelectorAll(".habit");
    let completed = 0;

    habits.forEach(habit => {
        if (habit.checked) completed++;
        habit.checked = false;
    });

    let progress = Math.min((completed / habits.length) * 100, 100);
    document.getElementById("progressBar").style.width = progress + "%";

    const quotes = [
        "Small steps lead to big changes!",
        "One bottle reused is one less in the ocean.",
        "Green habits grow great futures.",
        "You're doing amazing — keep it up!"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteBox").innerText = randomQuote;

    updateTreeImage(progress);
    localStorage.setItem("progress", progress);
}

// Dark/Light Mode Toggle Logic
document.getElementById("modeToggle").addEventListener("change", function () {
    const isDark = this.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.getElementById("themeLabel").innerText = isDark ? "Dark Mode" : "Light Mode";
});

// On Page Load - Apply saved theme
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        document.getElementById("modeToggle").checked = true;
        document.getElementById("themeLabel").innerText = "Dark Mode";
    }
});

// Show the login form when "Sign In" button is clicked
document.getElementById("showLoginForm").addEventListener("click", function () {
    const loginForm = document.getElementById("loginForm");
    loginForm.style.display = "block";
    this.style.display = "none"; // Hide the "Sign In" button
});

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Redirect to account.html
    window.location.href = "account.html";
});

// Selectors
const frequencySelector = document.getElementById("frequencySelector");
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const taskListTitle = document.getElementById("taskListTitle");

// Initialize tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || {
    daily: [],
    weekly: [],
    monthly: [],
};

// Current frequency
let currentFrequency = "daily";

// Update task list
function updateTaskList() {
    taskList.innerHTML = "";
    taskListTitle.textContent = `${currentFrequency.charAt(0).toUpperCase() + currentFrequency.slice(1)} Tasks`;

    const currentTasks = tasks[currentFrequency];
    currentTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        li.classList.toggle("completed", task.completed);

        // Mark as complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
            tasks[currentFrequency][index].completed = !task.completed;
            saveTasks();
            updateTaskList();
            updateProgress();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#f44336";
        deleteButton.addEventListener("click", () => {
            tasks[currentFrequency].splice(index, 1);
            saveTasks();
            updateTaskList();
            updateProgress();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    updateProgress();
}

// Add task
addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    tasks[currentFrequency].push({ name: taskName, completed: false });
    taskInput.value = "";
    saveTasks();
    updateTaskList();
});

// Update progress
function updateProgress() {
    const currentTasks = tasks[currentFrequency];
    const completedTasks = currentTasks.filter((task) => task.completed).length;
    const progress = currentTasks.length > 0 ? (completedTasks / currentTasks.length) * 100 : 0;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% Complete`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Change frequency
frequencySelector.addEventListener("change", (e) => {
    currentFrequency = e.target.value;
    updateTaskList();
});

// Initial load
updateTaskList();

// Eco-Awareness Game Data
const ecoGameQuestions = [
  {
    question: "What is the most eco-friendly way to dispose of food waste?",
    options: ["Throw it in the trash", "Compost it", "Burn it"],
    correct: 1,
    feedback: [
      "Throwing food waste in the trash contributes to methane emissions in landfills.",
      "Correct! Composting reduces waste and creates nutrient-rich soil.",
      "Burning food waste releases harmful pollutants into the air."
    ]
  },
  {
    question: "Which of these is the best way to conserve energy at home?",
    options: ["Use LED bulbs", "Keep lights on all day", "Use incandescent bulbs"],
    correct: 0,
    feedback: [
      "Correct! LED bulbs use significantly less energy and last longer.",
      "Keeping lights on all day wastes energy unnecessarily.",
      "Incandescent bulbs are inefficient and consume more energy."
    ]
  },
  {
    question: "What is the most sustainable way to shop for groceries?",
    options: ["Buy local and seasonal produce", "Buy imported goods", "Use single-use plastic bags"],
    correct: 0,
    feedback: [
      "Correct! Local and seasonal produce reduces transportation emissions.",
      "Imported goods have a higher carbon footprint due to transportation.",
      "Single-use plastic bags contribute to plastic pollution."
    ]
  }
];

let currentQuestionIndex = 0;

// Selectors
const gameQuestion = document.getElementById("gameQuestion");
const gameOptions = document.getElementById("gameOptions");
const gameFeedback = document.getElementById("gameFeedback");
const startGameButton = document.getElementById("startGameButton");

// Start Game
startGameButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  gameFeedback.textContent = "";
  startGameButton.style.display = "none";
  loadQuestion();
});

// Load Question
function loadQuestion() {
  const questionData = ecoGameQuestions[currentQuestionIndex];
  gameQuestion.textContent = questionData.question;
  gameOptions.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    gameOptions.appendChild(button);
  });
}

// Check Answer
function checkAnswer(selectedIndex) {
  const questionData = ecoGameQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === questionData.correct;

  gameFeedback.textContent = questionData.feedback[selectedIndex];
  gameFeedback.style.color = isCorrect ? "#2e7d32" : "#f44336";

  if (isCorrect) {
    currentQuestionIndex++;
    if (currentQuestionIndex < ecoGameQuestions.length) {
      setTimeout(loadQuestion, 2000); // Load next question after 2 seconds
    } else {
      setTimeout(() => {
        gameQuestion.textContent = "Congratulations! You've completed the game!";
        gameOptions.innerHTML = "";
        startGameButton.textContent = "Play Again";
        startGameButton.style.display = "inline-block";
      }, 2000);
    }
  }
}