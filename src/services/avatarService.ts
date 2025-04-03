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