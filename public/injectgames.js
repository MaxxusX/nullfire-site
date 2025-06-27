document.addEventListener("DOMContentLoaded", async () => {
	const ul = document.getElementById("supported");
	if (!ul) return;

	try {
		const response = await fetch("https://raw.githubusercontent.com/TeamNullFire/NullFire/refs/heads/main/games.json");
		if (!response.ok) throw new Error("Network error");

		const gameData = await response.json();

		for (const [gameName, status] of Object.entries(gameData)) {
			const li = document.createElement("li");
			li.innerHTML = `<strong>${gameName}</strong>: <em>${status}</em>`;
			ul.appendChild(li);
		}
	} catch (err) {
		console.error("Error loading games:", err);
	}
});
