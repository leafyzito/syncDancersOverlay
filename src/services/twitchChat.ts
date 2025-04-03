import tmi from 'tmi.js';
import { User } from '../types';
import { configService } from './config';
import { getTwitchAvatar, getSyncAvatar } from './avatarService';

export class TwitchChatService {
    private client: tmi.Client;
    private onUserMessage: (user: User) => void;
    private connectedUsers: Map<string, User>;

    constructor(onUserMessage: (user: User) => void) {
        this.onUserMessage = onUserMessage;
        this.connectedUsers = new Map();
        const config = configService.getConfig();
        // Get channel name from URL path
        const channelName = window.location.pathname.substring(1);
        const channel = channelName || config.twitch.channel; // Fallback to config if path is empty

        this.client = new tmi.Client({
            channels: [channel]
        });
        console.log('Connecting to channel:', channel);

        this.client.on('message', async (channel, tags, message, self) => {
            if (self) return;
            // console.log('Received message:', { channel, username: tags['display-name'], message });

            let skipAvatarCache = false;
            if (message.toLowerCase() == "!reloadavatar") {
                skipAvatarCache = true;
            }

            const username = tags['display-name'] || tags.username;
            if (!username) return;

            try {
                const existingUser = this.connectedUsers.get(tags['user-id'] || username);
                const user: User = {
                    id: tags['user-id'] || username,
                    username: username,
                    twitchAvatar: await getTwitchAvatar(username, skipAvatarCache),
                    syncAvatar: await getSyncAvatar(username, skipAvatarCache),
                    position: existingUser?.position || {
                        x: Math.random() * (window.innerWidth - config.display.avatarSize),
                        y: Math.random() * (config.animation.movementRange.y.max - config.animation.movementRange.y.min) + config.animation.movementRange.y.min
                    },
                    color: tags['color'] || existingUser?.color || '',
                    lastMessage: message
                };
                console.log(`${existingUser ? 'Updated' : 'Created'} user object:`, user);
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