import tmi from 'tmi.js';
import { User } from '../types';
import { configService } from './config';
import { getTwitchAvatar, getSyncAvatar } from './avatarService';
import { ToastService } from './toastService';
import { getRandomPosition } from '../utils/position';

export class TwitchChatService {
    private static instance: TwitchChatService | null = null;
    private client: tmi.Client;
    private onUserMessage: (user: User) => void;
    private connectedUsers: Map<string, User>;
    private toastService: ToastService;

    private constructor(onUserMessage: (user: User) => void) {
        if (TwitchChatService.instance) {
            throw new Error('TwitchChatService is a singleton. Use getInstance() instead.');
        }
        console.log('TwitchChatService instance created');
        this.onUserMessage = onUserMessage;
        this.connectedUsers = new Map();
        this.toastService = ToastService.getInstance();
        const config = configService.getConfig();
        // Get channel name from URL path
        const channelName = window.location.pathname.substring(1);
        const channel = channelName || config.twitch.channel; // Fallback to config if path is empty

        this.client = new tmi.Client({
            channels: [channel]
        });
        console.log('Connecting to channel:', channel);

        this.client.connect().catch(
            (error) => {
                console.error('Error connecting to Twitch:', error);
                // this.toastService.show(`Error connecting to Twitch: ${error.message}`, 'error');
            }
        );

        this.client.on('connecting', () => {
            this.toastService.show(`Connecting to ${channel}`, 'info');
        });

        this.client.on('connected', () => {
            this.toastService.show(`Successfully connected to ${channel}`, 'success');
        });

        this.client.on('disconnected', () => {
            this.toastService.show(`Disconnected from ${channel}`, 'error');
        });

        this.client.on('message', async (channel, tags, message, self) => {
            if (self) return;

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
                    position: existingUser?.position || getRandomPosition(),
                    color: tags['color'] || existingUser?.color || '',
                    lastMessage: message,
                    lastMessageChannel: channel
                };
                console.log(`${existingUser ? 'Updated' : 'Created'} user object:`, user);
                this.connectedUsers.set(user.id, user);
                this.onUserMessage(user);
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        });
    }

    public static getInstance(onUserMessage?: (user: User) => void): TwitchChatService {
        if (!TwitchChatService.instance) {
            if (!onUserMessage) {
                throw new Error('onUserMessage callback is required for first instance creation');
            }
            TwitchChatService.instance = new TwitchChatService(onUserMessage);
        }
        return TwitchChatService.instance;
    }

    public disconnect() {
        if (this.client) {
            this.client.disconnect();
        }
        TwitchChatService.instance = null;
    }

    public getConnectedUsers(): User[] {
        return Array.from(this.connectedUsers.values());
    }
}