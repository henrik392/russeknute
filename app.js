// fetch('challenges.json')
//   .then(response => response.json())
//   .then(data => {
//     const table = document.getElementById('challenges-table');
//     const tbody = table.querySelector('tbody');

//     Object.values(data).flat().forEach(challenge => {
//       const row = document.createElement('tr');

//       ['title', 'challenge', 'reward'].forEach(key => {
//         const cell = document.createElement('td');
//         cell.textContent = challenge[key];
//         row.appendChild(cell);
//       });

//       row.addEventListener('click', () => {

//         row.classList.toggle('completed');
//       });

//       tbody.appendChild(row);
//     });
//   });

const statusToColor = {
    "incomplete": {
        "bg": "white",
        "text": "black"
    },
    "completed": {
        "bg": "green",
        "text": "white"
    },
    "in-progress": {
        "bg": "yellow",
        "text": "black"
    },
    "hard": {
        "bg": "red",
        "text": "white"
    }
};

const statusIDToStatus = {
    0: "incomplete",
    1: "completed",
    2: "in-progress",
    3: "hard"
};

fetch('challenges.json')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('challenges-table');
        Object.values(data).forEach((category, i) => {
            const rowCategory = table.insertRow();
            const cellCategory = rowCategory.insertCell(0);
            cellCategory.textContent = Object.keys(data)[i];
            cellCategory.colSpan = 3;
            cellCategory.style.fontWeight = 'bold';
            cellCategory.style.textAlign = 'center';
            cellCategory.style.backgroundColor = 'lightgrey';

            category.forEach((challenge, j) => {
                // Check if the challenge status is stored in local storage
                let statusID = localStorage.getItem(`status-${i}-${j}`);
                statusID = statusID ? parseInt(statusID) : 0;
                console.log(statusID);
                const status = statusIDToStatus[statusID];
                const row = table.insertRow();
                row.style.backgroundColor = statusToColor[status]['bg'];
                row.style.color = statusToColor[status]['text'];

                const titleCell = row.insertCell(0);
                const challengeCell = row.insertCell(1);
                const rewardCell = row.insertCell(2);

                titleCell.textContent = challenge.title;
                challengeCell.textContent = challenge.challenge;
                rewardCell.textContent = challenge.reward;

                row.addEventListener('click', () => {
                    let statusID = localStorage.getItem(`status-${i}-${j}`);
                    statusID = statusID ? (parseInt(statusID) + 1) % Object.keys(statusIDToStatus).length  : 1;

                    const status = statusIDToStatus[statusID];

                    row.style.backgroundColor = statusToColor[status]['bg'];
                    row.style.color = statusToColor[status]['text'];

                    localStorage.setItem(`status-${i}-${j}`, String(statusID));
                });
            });
        });
    });