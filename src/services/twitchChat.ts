import tmi from 'tmi.js';
import { User } from '../types';
import { configService } from './config';

const avatarCache = new Map<string, string>();

const getAvatarUrl = async (username: string, skipCache: boolean = false) => {
    const config = configService.getConfig();

    // If using Twitch avatars is disabled, return the custom avatar set in the config
    if (!config.twitch.useTwitchAvatars) {
        // Check cache first for consistent avatar per user
        const cachedUrl = avatarCache.get(username);
        if (cachedUrl && !skipCache) {
            return cachedUrl;
        }

        // Assign random avatar from config and cache it
        const randomAvatar = config.twitch.defaultAvatarUrls[Math.floor(Math.random() * config.twitch.defaultAvatarUrls.length)];
        avatarCache.set(username, randomAvatar);
        return randomAvatar;
    }

    // Check cache first
    const cachedUrl = avatarCache.get(username);
    if (cachedUrl && !skipCache) {
        return cachedUrl;
    }

    // Fetch if not cached
    const api_url = `https://api.ivr.fi/v2/twitch/user?login=${username}`;
    const response = await fetch(api_url);
    const data = await response.json();
    const avatarUrl = data[0]["logo"];

    // Cache the result
    avatarCache.set(username, avatarUrl);

    return avatarUrl;
};

export class TwitchChatService {
    private client: tmi.Client;
    private onUserMessage: (user: User) => void;
    private connectedUsers: Map<string, User>;

    constructor(onUserMessage: (user: User) => void) {
        this.onUserMessage = onUserMessage;
        this.connectedUsers = new Map();
        const config = configService.getConfig();

        this.client = new tmi.Client({
            channels: [config.twitch.channel]
        });

        this.client.on('message', async (channel, tags, message, self) => {
            if (self) return;
            console.log('Received message:', { channel, username: tags['display-name'], message });

            let updateAvatar = false;
            if (message.toLowerCase() == "!changeavatar") {
                updateAvatar = true;
            }

            const username = tags['display-name'] || tags.username;
            if (!username) return;

            try {
                const avatarUrl = await getAvatarUrl(username, updateAvatar);
                const existingUser = this.connectedUsers.get(tags['user-id'] || username);
                const user: User = {
                    id: tags['user-id'] || username,
                    username: username,
                    avatarUrl: avatarUrl,
                    position: existingUser?.position || {
                        x: Math.random() * (window.innerWidth - config.display.avatarSize),
                        y: Math.random() * (config.animation.movementRange.y.max - config.animation.movementRange.y.min) + config.animation.movementRange.y.min
                    },
                    color: tags['color'] || existingUser?.color || '',
                    lastMessage: message
                };
                console.log('Created user object:', user);
                this.connectedUsers.set(user.id, user);
                this.onUserMessage(user);
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        });

        this.client.connect().catch(console.error);
    }

    public disconnect() {
        this.client.disconnect();
    }

    public getConnectedUsers(): User[] {
        return Array.from(this.connectedUsers.values());
    }
} 