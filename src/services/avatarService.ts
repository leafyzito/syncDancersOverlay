import { configService } from './config';

const twitchAvatarCache = new Map<string, string>();
const syncAvatarCache = new Map<string, string>();

export const getSyncAvatar = async (username: string, skipCache: boolean = false) => {
    const config = configService.getConfig();
    const cachedSyncAvatar = syncAvatarCache.get(username);
    if (cachedSyncAvatar && !skipCache) {
        return cachedSyncAvatar;
    }

    const randomAvatar = config.twitch.defaultAvatarUrls[Math.floor(Math.random() * config.twitch.defaultAvatarUrls.length)];
    syncAvatarCache.set(username, randomAvatar);
    return randomAvatar;
}

export const getTwitchAvatar = async (username: string, skipCache: boolean = false) => {
    const cachedTwitchAvatar = twitchAvatarCache.get(username);
    if (cachedTwitchAvatar && !skipCache) {
        return cachedTwitchAvatar;
    }

    const api_url = `https://api.ivr.fi/v2/twitch/user?login=${username}`;
    const response = await fetch(api_url);
    const data = await response.json();
    const twitchAvatar = data[0]["logo"];
    twitchAvatarCache.set(username, twitchAvatar);
    return twitchAvatar;
} 