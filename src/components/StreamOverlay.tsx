import styled from 'styled-components';
import { UserAvatar } from './UserAvatar';
import { User } from '../types';
import { useState, useEffect } from 'react';
import { TwitchChatService } from '../services/twitchChat';
import { configService } from '../services/config';

const OverlayContainer = styled.div`
  position: fixed;
  bottom: ${props => props.theme.overlayBottomPadding}px;
  left: 0;
  right: 0;
  height: ${props => props.theme.overlayHeight}px;
  pointer-events: none;
`;

export const StreamOverlay = () => {
    const [users, setUsers] = useState<User[]>([]);
    const config = configService.getConfig();

    useEffect(() => {
        // Initialize Twitch chat service
        const service = new TwitchChatService((user) => {
            setUsers(prevUsers => {
                const existingUserIndex = prevUsers.findIndex(u => u.id === user.id);
                if (existingUserIndex >= 0) {
                    // Update existing user's position
                    const updatedUsers = [...prevUsers];
                    updatedUsers[existingUserIndex] = user;
                    return updatedUsers;
                }
                // Add new user
                return [...prevUsers, user];
            });
        });

        // Cleanup on unmount
        return () => {
            service.disconnect();
        };
    }, []);

    // Function to move avatars randomly
    const moveAvatars = () => {
        const maxX = window.innerWidth - config.display.avatarSize;
        setUsers(prevUsers =>
            prevUsers.map(user => ({
                ...user,
                position: {
                    x: Math.random() * maxX, // Random x position with overlay width as max
                    y: Math.random() * (config.animation.movementRange.y.max - config.animation.movementRange.y.min) + config.animation.movementRange.y.min // Random y position with min and max from config
                }
            }))
        );
    };

    // Move avatars based on configured interval
    useEffect(() => {
        const interval = setInterval(moveAvatars, config.animation.movementInterval);
        return () => clearInterval(interval);
    }, []);

    return (
        <OverlayContainer theme={config.ui}>
            {users.map(user => (
                <UserAvatar key={user.id} user={user} />
            ))}
        </OverlayContainer>
    );
}; 