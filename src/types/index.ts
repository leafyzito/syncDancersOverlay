export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    position: {
        x: number;
        y: number;
    };
    color: string;
    lastMessage?: string;
} 