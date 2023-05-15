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
                const completed = localStorage.getItem(`completed-${i}-${j}`) === 'true';
                const row = table.insertRow();
                row.dataset.completed = completed;
                row.style.backgroundColor = completed ? 'green' : 'white';
                row.style.color = completed ? 'white' : 'black';

                const titleCell = row.insertCell(0);
                const challengeCell = row.insertCell(1);
                const rewardCell = row.insertCell(2);

                titleCell.textContent = challenge.title;
                challengeCell.textContent = challenge.challenge;
                rewardCell.textContent = challenge.reward;

                row.addEventListener('click', () => {
                    const completed = row.dataset.completed === 'true';
                    row.dataset.completed = !completed;
                    row.style.backgroundColor = !completed ? 'green' : 'white';
                    row.style.color = !completed ? 'white' : 'black';
                    // Store the challenge status in local storage
                    localStorage.setItem(`completed-${i}-${j}`, String(!completed));
                });
            });
        });
    });