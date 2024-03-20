import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY_PREFIX = 'OutkastCache_';
const ONE_HOUR = 60 * 60 * 1000;

const isCacheValid = async (cacheKey) => {
    const cacheData = await AsyncStorage.getItem(CACHE_KEY_PREFIX + cacheKey);
    if (!cacheData) return false;

    const { timestamp } = JSON.parse(cacheData);
    return Date.now() - timestamp < ONE_HOUR;
};

const getCache = async (cacheKey) => {
    var cacheData = await AsyncStorage.getItem(CACHE_KEY_PREFIX + cacheKey);
    console.log(cacheData.timestamp)
    return cacheData ? await JSON.parse(cacheData).data : null;
};

const setCache = async (cacheKey, data) => {
    const cacheData = JSON.stringify({ timestamp: Date.now(), data: data });
    await AsyncStorage.setItem(CACHE_KEY_PREFIX + cacheKey, cacheData);
};

export async function fetchDataForAddress(ethAddress, skip = 0, allData = []) {
    const cacheKey = 'fetchDataForAddress';
    if (await isCacheValid(cacheKey)) {
        return getCache(cacheKey);
    }

    const response = await fetch(`https://api.mnnt.io/collections/outkasts/tokens?owner=${ethAddress}&skip=${skip}`);
    const data = await response.json();

    if (data && data.length > 0) {
        data.forEach(item => {
            item.level = calculateLevel(item.experience);
        });
        allData.push(...data);

        return fetchDataForAddress(ethAddress, skip + data.length, allData);
    } else {
        await setCache(cacheKey, allData);
        return allData;
    }
}

export async function fetchInProgressMissions() {
    const cacheKey = 'fetchInProgressMissions';
    if (await isCacheValid(cacheKey)) {
        return getCache(cacheKey);
    }

    try {
        const response = await fetch('https://api.mnnt.io/missions/outkasts');
        const missions = await response.json();
        const currentTime = Math.round(Date.now() / 1000);
        const inProgressMissions = missions.filter(mission => mission.start <= currentTime && mission.end >= currentTime);
        await setCache(cacheKey, inProgressMissions);
        return inProgressMissions;
    } catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
}

export async function fetchOutkastStats() {
    const cacheKey = 'fetchOutkastStats';
    if (await isCacheValid(cacheKey)) {
        return getCache(cacheKey);
    }

    try {
        const response = await fetch('https://data.andrometa.fun/api/outkast/stats');
        const stats = await response.json();
        await setCache(cacheKey, stats);
        return stats;
    } catch (error) {
        console.error('Error fetching Outkast stats:', error);
        throw error;
    }
}


export async function fetchOutkastStatsOpensea() {
    try {
        const response = await fetch('https://pocket-outkasts-api-production.up.railway.app/api/data');
        const stats = await response.json();
        return stats;
    } catch (error) {
        console.error('Error fetching Outkast stats:', error);
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