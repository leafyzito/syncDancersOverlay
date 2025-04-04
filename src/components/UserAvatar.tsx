import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types/user.types';
import { configService } from '../services/config';
import { useState, useEffect } from 'react';

const AvatarContainer = styled(motion.div) <{ avatarSize: number }>`
  position: absolute;
  width: ${props => props.avatarSize}px;
  height: ${props => props.avatarSize}px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;

const UsernameTooltip = styled.div<{ tooltipBackground: string; textColor: string }>`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.tooltipBackground};
  color: ${props => props.textColor};
  padding: 4px 8px;
  border-radius: 100px; 
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TooltipTwitchAvatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageBubble = styled(motion.div) <{ messageBubbleBackground: string; textColor: string }>`
  position: absolute;
  bottom: 80%;
  left: 40px;
  transform: translateX(-20%);
  background-color: ${props => props.messageBubbleBackground};
  color: ${props => props.textColor};
  padding: 8px 12px;
  border-radius: 16px 16px 16px 4px;
  font-size: 12px;
  max-width: 400px;
  width: max-content;
  word-wrap: break-word;
  pointer-events: none;
  z-index: 2;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 10px;
    width: 15px;
    height: 15px;
    background-color: ${props => props.messageBubbleBackground};
    clip-path: path('M 0 0 C 8 0, 15 -5, 15 -15 L 0 -15 Z');
    transform: rotate(10deg);
  }
`;

interface UserAvatarProps {
    user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
    const [showMessage, setShowMessage] = useState(false);
    const config = configService.getConfig();

    useEffect(() => {
        if (user.lastMessage) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, config.display.messageDuration);
            return () => clearTimeout(timer);
        }
    }, [user.lastMessage, config.display.messageDuration]);

    return (
        <AvatarContainer
            avatarSize={config.display.avatarSize}
            initial={{ scale: 0 }}
            animate={{
                scale: 1,
                x: user.position.x,
                y: user.position.y
            }}
            exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.5 }
            }}
            transition={{ duration: config.animation.transitionDuration }}
        >
            <AvatarImage src={user.syncAvatar} alt={user.username + "'Sync avatar"} />
            {config.display.showUsernames && (
                <UsernameTooltip
                    tooltipBackground={config.ui.tooltipBackground}
                    textColor={config.ui.textColor}
                    style={{
                        color: user.color || config.ui.textColor,
                        fontWeight: '500'
                    }}
                >
                    {config.display.showTwitchAvatars && user.twitchAvatar && (
                        <TooltipTwitchAvatar src={user.twitchAvatar} alt={user.username + "'Twitch avatar"} />
                    )}
                    {user.username}
                </UsernameTooltip>
            )}
            <AnimatePresence>
                {config.display.showMessages && showMessage && user.lastMessage && (
                    <MessageBubble
                        messageBubbleBackground={config.ui.messageBubbleBackground}
                        textColor={config.ui.textColor}
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {user.lastMessage.slice(0, config.display.messageMaxLength)}
                    </MessageBubble>
                )}
            </AnimatePresence>
        </AvatarContainer>
    );
}; 