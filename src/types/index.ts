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
    lastMessage?: string;
} 