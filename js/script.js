document.addEventListener("DOMContentLoaded", function () {
  // Color Changer (Same as before)
  const colorChanger = document.getElementById("colorChanger");
  const colors = ["#ffcccb", "#a0e7e5", "#b4f8c8", "#f3f8ff", "#f7b267"];
  let colorIndex = 0;

  colorChanger.addEventListener("click", function () {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  });

  // Live Date (Same as before)
  const liveDayElement = document.getElementById("liveDay");
  const liveDateElement = document.getElementById("liveDate");

  function updateLiveDate() {
    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "short" });
    const date = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    liveDayElement.textContent = dayName;
    liveDateElement.textContent = date;
  }

  updateLiveDate();

  // Task Cards (No Loops)
  let buttons = document.querySelectorAll(".status-completed");

  if (buttons.length === 0) {
    console.error("No '.status-completed' buttons found.");
    return;
  }

  // Clear History button (Same as before)
  let clearHistoryButton = document.querySelector(".clear-history-btn");
  if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
      let activityLog = document.getElementById("activityLog");
      if (activityLog) {
        activityLog.innerHTML = "";
      }
    });
  }

  // Helper function (No Loops)
  function taskComplete(button) {
    // --- Task Completion Logic ---
    alert("Task Completed!");

    let now = new Date();
    let timeString = now.toLocaleTimeString();

    let taskTitleElement = button
      .closest(".task-card")
      .querySelector(".task-title");
    if (!taskTitleElement) return console.error("No '.task-title' found.");

    let taskTitle = taskTitleElement.innerText;

    let activityLog = document.getElementById("activityLog");
    if (!activityLog) return console.error("No 'activityLog' found.");

    let newLog = document.createElement("p");
    newLog.innerText = `Completed "${taskTitle}" at ${timeString}`;
    newLog.style.cssText =
      "background-color:#f0f0f0; padding:10px; border-radius:10px; margin-bottom:5px; text-align:left;";
    activityLog.appendChild(newLog);

    let countDisplay = document.getElementById("countDisplay");
    if (countDisplay) {
      let currentCount = parseInt(countDisplay.innerText);
      if (currentCount > 0) countDisplay.innerText = currentCount - 1;
    } else {
      console.error("No 'countDisplay' found.");
    }

    let notificationCount = document.getElementById("notificationCount");
    if (notificationCount) {
      let currentNotification = parseInt(notificationCount.innerText);
      notificationCount.innerText = currentNotification + 1;
    } else {
      console.error("No 'notificationCount' found.");
    }

    button.innerText = "Completed";
    button.disabled = true;
    button.style.backgroundColor = "#aaa";
    button.style.cursor = "not-allowed";
  }

  //All complete checker function (NO Loops)
  function checkAllTasksCompleted() {
    let buttons = document.querySelectorAll(".status-completed"); //Re-query the buttons
    if (
      (buttons[0] ? buttons[0].innerText === "Completed" : true) &&
      (buttons[1] ? buttons[1].innerText === "Completed" : true) &&
      (buttons[2] ? buttons[2].innerText === "Completed" : true) &&
      (buttons[3] ? buttons[3].innerText === "Completed" : true) &&
      (buttons[4] ? buttons[4].innerText === "Completed" : true) &&
      (buttons[5] ? buttons[5].innerText === "Completed" : true)
    ) {
      alert("All tasks done!");
    }
  }

  // Task 1
  if (buttons[0]) {
    buttons[0].addEventListener("click", function () {
      taskComplete(buttons[0]);
      checkAllTasksCompleted();
    });
  }

  // Task 2
  if (buttons[1]) {
    buttons[1].addEventListener("click", function () {
      taskComplete(buttons[1]);
      checkAllTasksCompleted();
    });
  }

  // Task 3
  if (buttons[2]) {
    buttons[2].addEventListener("click", function () {
      taskComplete(buttons[2]);
      checkAllTasksCompleted();
    });
  }

  // Task 4
  if (buttons[3]) {
    buttons[3].addEventListener("click", function () {
      taskComplete(buttons[3]);
      checkAllTasksCompleted();
    });
  }

  // Task 5
  if (buttons[4]) {
    buttons[4].addEventListener("click", function () {
      taskComplete(buttons[4]);
      checkAllTasksCompleted();
    });
  }

  // Task 6
  if (buttons[5]) {
    buttons[5].addEventListener("click", function () {
      taskComplete(buttons[5]);
      checkAllTasksCompleted();
    });
  }

  // Task Descriptions (Loops used as per the prompt)
  let taskDescriptions = document.querySelectorAll(".task-desc");

  taskDescriptions.forEach((desc) => {
    let fullText = desc.innerText.trim();
    let maxLength = 50;

    if (fullText.length > maxLength) {
      let shortText = fullText.substring(0, maxLength) + "...";
      desc.innerHTML = `<span class="short-text">${shortText}</span>
                            <span class="full-text" style="display:none">${fullText}</span>`;

      let shortTextSpan = desc.querySelector(".short-text");
      let fullTextSpan = desc.querySelector(".full-text");

      desc.addEventListener("click", function (event) {
        if (event.target.classList.contains("short-text")) {
          event.preventDefault();

          if (fullTextSpan.style.display === "none") {
            fullTextSpan.style.display = "inline";
            shortTextSpan.style.display = "none";
          } else {
            fullTextSpan.style.display = "none";
            shortTextSpan.style.display = "inline";
          }
        }
      });

      // Hide ellipsis
      fullTextSpan.addEventListener("click", function () {
        fullTextSpan.style.display = "none";
        shortTextSpan.style.display = "inline";
      });

      fullTextSpan.style.display = "none";
    }
  });
});
