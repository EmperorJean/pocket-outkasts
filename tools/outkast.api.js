export async function fetchDataForAddress(ethAddress, skip = 0, allData = []) {
    const response = await fetch(`https://api.mnnt.io/collections/outkasts/tokens?owner=${ethAddress}&skip=${skip}`);
    const data = await response.json();

    if (data && data.length > 0) {
        data.forEach(item => {
            item.level = calculateLevel(item.experience);
        });
        allData.push(...data);

        // Fetch the next set of items, skipping the number of items we already have
        return fetchDataForAddress(ethAddress, skip + data.length, allData);
    } else {
        // No more items, return all data
        return allData;
    }
}

export async function fetchInProgressMissions() {
    try {
        const response = await fetch('https://api.mnnt.io/missions/outkasts');
        const missions = await response.json();
        const currentTime = Math.round(Date.now() / 1000);
        const inProgressMissions = missions.filter(mission => mission.start <= currentTime && mission.end >= currentTime);
        return inProgressMissions.reverse();
    } catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
}


function calculateLevel(experience) {
    let i = 0;
    let level = 0;

    while (i <= experience) {
        level++;
        i += Math.round(1000 * Math.pow(1.1, level - 1));
    }

    if (level > 100)
        return 100;

    return level;
}