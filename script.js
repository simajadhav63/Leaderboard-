// Function to add a player
function addPlayer() {
  var playerName = document.getElementById("playerName").value;
  var lastName = document.getElementById("lastName").value;
  var country = document.getElementById("country").value;
  var score = document.getElementById("score").value;

  // Validation (you can add more validation if needed)
  if (!playerName || !lastName || !score || !country) {
    alert("Please fill in all fields.");
    return;
  }

  // Create new row for the player
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${playerName}</td>
    <td>${lastName}</td>
    <td>${country}</td>
    <td>${score}</td>
    <td></td> <!-- Placeholder for rank -->
  `;

  // Append new row to the table
  document.getElementById("playerList").appendChild(newRow);

  // Save data to local storage
  saveData(playerName, lastName, score, country);

  // Clear input fields
  document.getElementById("playerName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("score").value = "";
  document.getElementById("country").value = "";

  // Reload players with updated ranking
  loadPlayers();
}

// Function to save data to local storage
function saveData(playerName, lastName, score, country) {
  var players = localStorage.getItem('players');
  if (!players) {
    players = [];
  } else {
    players = JSON.parse(players);
  }

  // Add new player data
  players.push({
    playerName: playerName,
    lastName: lastName,
    country: country,
    score: score,
  });

  // Save to local storage
  localStorage.setItem('players', JSON.stringify(players));
}

// Function to load data from local storage, calculate ranks, and display players
function loadPlayers() {
  var players = localStorage.getItem('players');
  if (players) {
    players = JSON.parse(players);

    // Sort players by score
    players.sort((a, b) => b.score - a.score);

    // Assign ranks
    for (var i = 0; i < players.length; i++) {
      players[i].rank = i + 1;
    }

    // Clear existing table
    var playerList = document.getElementById("playerList");
    playerList.innerHTML = '';

    // Display players with ranks
    players.forEach(function(player) {
      var newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${player.playerName}</td>
        <td>${player.lastName}</td>
        <td>${player.country}</td>
        <td>${player.score}</td>
        <td>${player.rank}</td>
      `;
      playerList.appendChild(newRow);
    });
  }
}

// Load players when the page is loaded
window.onload = function() {
  loadPlayers();
};
