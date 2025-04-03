import styled from 'styled-components';
import { UserAvatar } from './UserAvatar';
import { User } from '../types';
import { useState, useEffect } from 'react';
import { TwitchChatService } from '../services/twitchChat';
import { configService } from '../services/config';
import { getRandomPosition } from '../utils/position';

const OverlayContainer = styled.div`
  position: fixed;
  bottom: ${props => props.theme.overlayBottomPadding}px;
  left: 0;
  right: 0;
  height: ${props => props.theme.overlayHeight}px;
  pointer-events: none;
  transform-origin: bottom center;
  transform: scale(${props => props.theme.scale});
  overflow: visible;
  margin: 0 ${props => props.theme.overlayBottomPadding}px;
  // Add a border for debugging
  // border: 1px solid red;
`;

export const StreamOverlay = () => {
    const [users, setUsers] = useState<User[]>([]);
    const config = configService.getConfig();

    useEffect(() => {
        // Initialize Twitch chat service
        TwitchChatService.getInstance((user: User) => {
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
            // Don't disconnect here, as it would cause issues with Strict Mode
            // The service will be properly cleaned up when the app is closed
        };
    }, []);

    // Function to move avatars randomly
    const moveAvatars = () => {
        setUsers(prevUsers =>
            prevUsers.map(user => ({
                ...user,
                position: getRandomPosition()
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