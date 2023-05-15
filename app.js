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
        const challengesContainer = document.getElementById('challenges-container');
        Object.values(data).forEach((category, i) => {
            const rowCategory = document.createElement('div');
            rowCategory.classList.add('row');

            const cellCategory = document.createElement('div');
            cellCategory.classList.add('cell');
            cellCategory.classList.add('category');
            cellCategory.textContent = Object.keys(data)[i];
            rowCategory.appendChild(cellCategory);
            challengesContainer.appendChild(rowCategory);

            // cellCategory.style.fontWeight = 'bold';
            // cellCategory.style.textAlign = 'center';
            // cellCategory.style.backgroundColor = 'lightgrey';

            category.forEach((challenge, j) => {
                // Check if the challenge status is stored in local storage
                let statusID = localStorage.getItem(`status-${i}-${j}`);
                statusID = statusID ? parseInt(statusID) : 0;
                const status = statusIDToStatus[statusID];
                const row = document.createElement('div');
                row.classList.add('row');
                row.style.backgroundColor = statusToColor[status]['bg'];
                row.style.color = statusToColor[status]['text'];
                

                const titleCellDiv = document.createElement('div');
                titleCellDiv.classList.add('cell');
                titleCellDiv.classList.add('title-cell');
                const titleEl = document.createElement('div');
                const rewardEl = document.createElement('div');
                titleEl.classList.add('title-el');
                rewardEl.classList.add('reward-el');
                titleEl.textContent = challenge.title;
                rewardEl.textContent = challenge.reward;
                titleCellDiv.appendChild(titleEl);
                titleCellDiv.appendChild(rewardEl);
                row.appendChild(titleCellDiv);
            
                const challengeCell = document.createElement('div');
                challengeCell.textContent = challenge.challenge;
                challengeCell.classList.add('cell');
                challengeCell.classList.add('challenge-cell');
                row.appendChild(challengeCell);


                row.addEventListener('click', () => {
                    let statusID = localStorage.getItem(`status-${i}-${j}`);
                    statusID = statusID ? (parseInt(statusID) + 1) % Object.keys(statusIDToStatus).length  : 1;

                    const status = statusIDToStatus[statusID];

                    row.style.backgroundColor = statusToColor[status]['bg'];
                    row.style.color = statusToColor[status]['text'];

                    localStorage.setItem(`status-${i}-${j}`, String(statusID));
                });

                challengesContainer.appendChild(row);
            });
        });
    });