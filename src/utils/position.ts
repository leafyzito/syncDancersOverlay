import { configService } from '../services/config';

export const getRandomPosition = () => {
    const config = configService.getConfig();
    const scaledAvatarSize = config.display.avatarSize * config.ui.scale;
    const barrierSize = 50 * config.ui.scale; // 10px barrier scaled by UI scale
    const maxX = window.innerWidth - scaledAvatarSize - barrierSize;

    return {
        x: Math.random() * maxX + barrierSize,
        y: Math.random() * (config.animation.movementRange.y.max - config.animation.movementRange.y.min) + config.animation.movementRange.y.min
    };
}; 