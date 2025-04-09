export interface User {
    id: string;
    username: string;
    syncAvatar: string;
    twitchAvatar: string;
    position: {
        x: number;
        y: number;
    };
    color: string;
    lastMessageTimestamp: number;
    lastMessage?: string;
    lastMessageChannel?: string;
    animationDone?: boolean;
} 