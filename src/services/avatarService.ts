import { configService } from './config';

const twitchAvatarCache = new Map<string, string>();
const syncAvatarCache = new Map<string, string>();

export const getSyncAvatar = async (username: string, skipCache: boolean = false) => {
    const config = configService.getConfig();
    const cachedSyncAvatar = syncAvatarCache.get(username);
    if (cachedSyncAvatar && !skipCache) {
        return cachedSyncAvatar;
    }

    const randomAvatar = config.twitch.customAvatarUrls[Math.floor(Math.random() * config.twitch.customAvatarUrls.length)];
    syncAvatarCache.set(username, randomAvatar);
    return randomAvatar;
}

export const getTwitchAvatar = async (username: string, skipCache: boolean = false) => {
    // if showTwitchAvatars is false, return null
    if (!configService.getConfig().display.showTwitchAvatars) {
        return null;
    }

    const cachedTwitchAvatar = twitchAvatarCache.get(username);
    if (cachedTwitchAvatar && !skipCache) {
        return cachedTwitchAvatar;
    }

    // If the twitch client id and oauth token are not set, use the ivr.fi api
    if (!import.meta.env.VITE_TWITCH_CLIENT_ID || !import.meta.env.VITE_TWITCH_OAUTH_TOKEN) {
        const api_url = `https://api.ivr.fi/v2/twitch/user?login=${username}`;
        const response = await fetch(api_url);
        const data = await response.json();
        const twitchAvatar = data[0]["logo"];
        twitchAvatarCache.set(username, twitchAvatar);
        return twitchAvatar;
    }

    // If the twitch client id and oauth token are set, use the twitch api
    const api_url = `https://api.twitch.tv/helix/users?login=${username}`;
    const response = await fetch(api_url, {
        headers: {
            'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${import.meta.env.VITE_TWITCH_OAUTH_TOKEN}`
        }
    });
    const data = await response.json();
    const twitchAvatar = data.data[0].profile_image_url;
    twitchAvatarCache.set(username, twitchAvatar);
    return twitchAvatar;
} 