let dataArray = [];

document.addEventListener('DOMContentLoaded', function () {
  const habitsContainer = document.querySelector('#habitsContainer');
  const newHabitForm = document.getElementById('newHabitForm');

  habitsContainer.style.cssText = "height: fit-content; padding: 15px; margin-top: 20px; background-color: aqua; display: grid; gap: 20px; width: 60vw; grid-template-columns: repeat(3, 1fr); border-radius: 10px"

  // Function to fetch habits from the server
  async function fetchHabits() {
    try {
      const response = await fetch('http://localhost:3000/habits');
      const data = await response.json();

      data.forEach((item) => {
        dataArray.push(item);
      });

      processHabits();
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  }

  // Function to calculate days passed since stopping the habit
  function calculateDaysPassed(stoppedDate) {
    const today = new Date();
    const stoppedOn = new Date(stoppedDate);
    const timeDifference = today.getTime() - stoppedOn.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    if (daysPassed > 30) {
      const months = Math.floor(daysPassed / 30);
      const remainingDays = daysPassed % 30;
      return `${months} month(s) and ${remainingDays} day(s)`;
    } else {
      return `${daysPassed} day(s)`;
    }
  }

  // Function to process habits and update the display
  function processHabits() {
    try {
      habitsContainer.innerHTML = ''; // Clear the existing habits

      dataArray.forEach((habit) => {
        const habitItem = document.createElement('div');
        habitItem.className = 'habits';

        habitItem.style.cssText = "display: flex; flex-direction: column; background-color: white; width: 200px; height: 100px; justify-content: space-between; padding: 10px; border-radius: 10px; text-align: center";

        let habitName = document.createElement('p');
        habitName.className = 'habitName';
        habitName.textContent = habit.name;

        let stopDate = document.createElement('p');
        stopDate.className = 'stopDate';
        stopDate.textContent = `Stopped on: ${new Date(habit.stoppedDate).toLocaleDateString()}`;

        let daysPassed = document.createElement('p');
        daysPassed.className = 'daysPassed';
        daysPassed.textContent = `Days Passed: ${calculateDaysPassed(habit.stoppedDate)}`;

        // Append individual habit items to the container
        habitItem.appendChild(habitName);
        habitItem.appendChild(stopDate);
        habitItem.appendChild(daysPassed);

        habitsContainer.appendChild(habitItem);
      });

    } catch (error) {
      console.error('Error processing habits:', error);
    }
  }

  // Example usage:
  window.onload = fetchHabits;
});
