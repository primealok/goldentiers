const tiers = ['S', 'A', 'B', 'C', 'D'];

async function loadPlayers() {
    const response = await fetch('/api/players');
    const players = await response.json();

    const container = document.getElementById('tiersContainer');
    container.innerHTML = '';

    tiers.forEach(tier => {
        const tierPlayers = players.filter(p => p.tier === tier);

        const tierBox = document.createElement('div');
        tierBox.className = 'tier-box';

        tierBox.innerHTML = `
            <div class="tier-label ${tier.toLowerCase()}">
                ${tier}
            </div>
            <div class="players">
                ${tierPlayers.map(player => `
                    <div class="player">${player.name}</div>
                `).join('')}
            </div>
        `;

        container.appendChild(tierBox);
    });
}

loadPlayers();
setInterval(loadPlayers, 3000);