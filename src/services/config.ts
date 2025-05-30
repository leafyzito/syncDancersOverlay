import defaultConfig from '../../config.json';

export interface TwitchConfig {
    channel: string;
    customAvatarUrls: string[];
}

export interface DisplayConfig {
    avatarSize: number;
    showUsernames: boolean;
    showTwitchAvatars: boolean;
    showMessages: boolean;
    messageMaxLength: number;
    messageDuration: number;
    deleteIdleUsers: boolean;
    deleteIdleUsersAfterSeconds: number;
}

export interface AnimationConfig {
    avatarMovement: boolean;
    movementInterval: number;
    movementRange: {
        y: { min: number; max: number };
    };
    transitionDuration: number;
}

export interface UIConfig {
    backgroundColor: string;
    textColor: string;
    messageBubbleBackground: string;
    overlayHeight: number;
    overlayBottomPadding: number;
    scale: number;
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
        // Start with default config
        this.config = defaultConfig;

        // Apply URL parameters, which override default values
        this.applyUrlParameters();
    }

    private applyUrlParameters() {
        // First handle customAvatarUrls specially by parsing the URL string directly
        const url = window.location.href;
        console.log('Processing URL:', url);

        const customAvatarUrlsMatch = url.match(/twitch\.customAvatarUrls=([^&]+(?:&[^&]+)*)/);
        if (customAvatarUrlsMatch) {
            const urlsString = customAvatarUrlsMatch[1];
            // Split by comma and handle any remaining & characters in the URLs
            const urls = urlsString.split(',').map(url => {
                // Replace any & that are part of the URL with their original form
                return url.trim().replace(/&amp;/g, '&');
            }).filter(url => url !== '');

            this.config.twitch.customAvatarUrls = urls;
            console.log('Parsed customAvatarUrls:', urls);
            console.log('Number of custom avatar URLs found:', urls.length);
        }

        // Then handle all other parameters normally
        const params = new URLSearchParams(window.location.search);
        console.log('URL Parameters:', Object.fromEntries(params.entries()));

        // Helper function to parse boolean values
        const parseBoolean = (value: string | null): boolean | undefined => {
            if (value === null) return undefined;
            const lowerValue = value.toLowerCase();
            console.log('Parsing boolean value:', value, 'to', lowerValue);
            if (lowerValue === 'true') return true;
            if (lowerValue === 'false') return false;
            return undefined;
        };

        // Helper function to parse number values
        const parseNumber = (value: string | null): number | undefined => {
            if (value === null) return undefined;
            const num = Number(value);
            return isNaN(num) ? undefined : num;
        };

        // Helper function to parse color values
        const parseColor = (value: string | null): string | undefined => {
            if (value === null) return undefined;
            // Check if it's a valid hex color or rgba color
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) ||
                /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(value)) {
                return value;
            }
            return undefined;
        };

        // Helper function to set nested config values
        const setNestedValue = (obj: any, path: string[], value: any) => {
            let current = obj;
            for (let i = 0; i < path.length - 1; i++) {
                if (!current[path[i]]) current[path[i]] = {};
                current = current[path[i]];
            }
            console.log('Setting config value:', path.join('.'), 'to', value);
            current[path[path.length - 1]] = value;
        };

        // Helper function to determine if a config path should be a boolean
        const isBooleanConfig = (path: string[]): boolean => {
            if (path.length !== 2) return false;

            const [section, key] = path;
            if (section === 'display' || section === 'animation') {
                const config = this.config[section] as Record<string, any>;
                return typeof config[key] === 'boolean';
            }
            return false;
        };

        // Parse all URL parameters
        params.forEach((value, key) => {
            const path = key.split('.');
            let parsedValue: any;

            // Determine the type of value based on the path
            if (path[0] === 'display' || path[0] === 'animation' || path[0] === 'ui') {
                if (isBooleanConfig(path)) {
                    parsedValue = parseBoolean(value);
                    console.log('Parsed boolean parameter:', key, '=', parsedValue);
                } else if (path.includes('Color') || path.includes('Background')) {
                    parsedValue = parseColor(value);
                } else {
                    parsedValue = parseNumber(value);
                }
            } else if (path[0] === 'twitch') {
                if (path[1] === 'channel') {
                    parsedValue = value;
                }
            }

            if (parsedValue !== undefined) {
                setNestedValue(this.config, path, parsedValue);
            }
        });

        // Log the final configuration for debugging
        console.log('Final configuration:', JSON.stringify(this.config, null, 2));
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

    // This method is kept for backward compatibility but should be used sparingly
    public async loadConfig(configUrl: string): Promise<void> {
        console.warn('loadConfig is deprecated. Use URL parameters instead.');
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