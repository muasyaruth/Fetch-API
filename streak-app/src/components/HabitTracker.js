// src/components/HabitTracker.js

const { useState, useEffect } = require('react');
const { getHabits, addHabit } = require('../services/habitService');

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const habitsData = await getHabits();
    setHabits(habitsData);
  };

  const handleAddHabit = async () => {
    const habit = {
      name: newHabit,
      stoppedDate: new Date().toISOString(),
    };

    await addHabit(habit);
    setNewHabit('');
    fetchHabits();
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <input
        type="text"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />
      <button onClick={handleAddHabit}>Add Habit</button>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} - {habit.stoppedDate}
            {/* Calculate and display days since stopping the habit */}
          </li>
        ))}
      </ul>
    </div>
  );
};

module.exports = HabitTracker;
