document.addEventListener("DOMContentLoaded", function () {
  // Color Changer
  const colorChanger = document.getElementById("colorChanger");
  const colors = ["#ffcccb", "#a0e7e5", "#b4f8c8", "#f3f8ff", "#f7b267"];
  let colorIndex = 0;

  colorChanger.addEventListener("click", function () {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  });

  // Live Date
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

  // Task Cards
  let buttons = document.querySelectorAll(".status-completed");
  let clearHistoryButton = document.querySelector(".clear-history-btn");

  if (buttons.length === 0) {
    console.error("No '.status-completed' buttons found.");
    return;
  }

  // Clear History button
  if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
      let activityLog = document.getElementById("activityLog");
      if (activityLog) {
        activityLog.innerHTML = "";
      }
    });
  }

  let tasksCompleted = new Array(buttons.length).fill(false);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      alert("Task Completed Successfully!");

      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      let timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

      let taskCard = buttons[i].closest(".task-card");
      let taskTitleElement = taskCard.querySelector(".task-title");

      if (!taskTitleElement) {
        console.error("No '.task-title' found.");
        return;
      }

      let taskTitle = taskTitleElement.innerText;
      let activityLog = document.getElementById("activityLog");

      if (!activityLog) {
        console.error("No 'activityLog' found.");
        return;
      }

      let newLog = document.createElement("p");
      newLog.innerText = `You completed "${taskTitle}" (Button: ${buttons[i].id}) at ${timeString}`;

      // Add card-like styling
      newLog.style.backgroundColor = "#f0f0f0";
      newLog.style.padding = "10px";
      newLog.style.borderRadius = "10px";
      newLog.style.marginBottom = "5px";
      newLog.style.textAlign = "left";

      activityLog.appendChild(newLog);

      // Task count (countDisplay) decrement
      let countDisplay = document.getElementById("countDisplay");

      if (countDisplay) {
        let currentCount = parseInt(countDisplay.innerText);
        if (currentCount > 0) {
          countDisplay.innerText = currentCount - 1;
        }
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

      buttons[i].innerText = "Completed";
      buttons[i].disabled = true;
      buttons[i].style.backgroundColor = "#aaa";
      buttons[i].style.cursor = "not-allowed";

      tasksCompleted[i] = true;

      if (tasksCompleted.every((completed) => completed)) {
        alert("Congratulations! All tasks completed!");
      }
    });
  }

  // Feature for Task Descriptions
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
