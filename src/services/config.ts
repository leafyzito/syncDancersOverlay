import defaultConfig from '../../config.json';

export interface TwitchConfig {
    channel: string;
    useTwitchAvatars: boolean;
    defaultAvatarUrls: string[];
}

export interface DisplayConfig {
    avatarSize: number;
    showUsernames: boolean;
    showMessages: boolean;
    messageMaxLength: number;
    messageDuration: number;
}

export interface AnimationConfig {
    movementInterval: number;
    movementRange: {
        y: { min: number; max: number };
    };
    transitionDuration: number;
}

export interface UIConfig {
    backgroundColor: string;
    textColor: string;
    tooltipBackground: string;
    messageBubbleBackground: string;
    overlayHeight: number;
    overlayBottomPadding: number;
}

export interface Config {
    twitch: TwitchConfig;
    display: DisplayConfig;
    animation: AnimationConfig;
    ui: UIConfig;
}

class ConfigService {
    private static instance: ConfigService;
    private config: Config;

    private constructor() {
        this.config = defaultConfig;
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public getConfig(): Config {
        return this.config;
    }

    public async loadConfig(configUrl: string): Promise<void> {
        try {
            const response = await fetch(configUrl);
            const customConfig = await response.json();
            this.config = { ...this.config, ...customConfig };
        } catch (error) {
            console.error('Error loading custom config:', error);
        }
    }
}

export const configService = ConfigService.getInstance(); 