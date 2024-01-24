document.addEventListener("submit", function (e) {
    e.preventDefault();

    const habitstopped = document.getElementById("habitName").value;
    const dateStopped = document.getElementById('habitStoppedOn').value;

    // Convert date to the desired format
    const formattedDate = convertToDesiredFormat(dateStopped);

    const newHabit = {
        name: habitstopped,
        stoppedDate: formattedDate,
    };

    fetch("http://localhost:3000/habits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newHabit),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Okay", data);
            processHabits();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

function convertToDesiredFormat(originalDate) {
    const dateObject = new Date(originalDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

