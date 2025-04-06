import { configService } from '../services/config';

export const getRandomPosition = () => {
    const config = configService.getConfig();
    const scaledAvatarSize = config.display.avatarSize * config.ui.scale;
    const barrierSize = 100 * config.ui.scale; // 50px barrier scaled by UI scale
    const maxX = window.innerWidth - scaledAvatarSize - barrierSize;
    const minX = barrierSize;

    return {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (config.animation.movementRange.y.max - config.animation.movementRange.y.min) + config.animation.movementRange.y.min
    };
}; 