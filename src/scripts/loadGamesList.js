"use strict";

(async function() {
	const supportedGamesSuspense = document.getElementById("supportedGamesSuspense");
	
	try {
		const response = await fetch("https://raw.githubusercontent.com/TeamNullFire/NullFire/refs/heads/main/games.json");
		if (!response.ok) throw new Error("request failed");
			
		const gamesData = await response.json();
			
		const supportedGames = document.createElement("ul");
		supportedGames.id = "supportedGames";
			
		for (const [name, status] of Object.entries(gamesData)) {
			const listEl = document.createElement("li");
				
			const nameEl = document.createElement("span");
			nameEl.className = "bold";
			nameEl.textContent = name;
				
			const statusEl = document.createElement("span");
			statusEl.className = "italic";
			statusEl.textContent = status;
				
			listEl.append(nameEl, ": ", statusEl);
			supportedGames.appendChild(listEl);
		};
			
		supportedGamesSuspense.replaceWith(supportedGames);
	} catch (err) {
		supportedGamesSuspense.textContent = "failed to load list of supported games. try reloading!";
		console.error("failed to load games list: ", err);
	};
})();
