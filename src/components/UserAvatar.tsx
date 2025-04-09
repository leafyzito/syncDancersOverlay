import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types/user.types';
import { configService } from '../services/config';
import { useState, useEffect, useRef } from 'react';

const AvatarContainer = styled(motion.div) <{ avatarSize: number }>`
  position: absolute;
  width: ${props => props.avatarSize}px;
  height: ${props => props.avatarSize}px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;

const UsernameTooltip = styled.div<{ $textColor: string }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.$textColor};
  padding: 4px 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const TooltipTwitchAvatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageBubble = styled(motion.div) <{ messageBubbleBackground: string; textColor: string }>`
  position: absolute;
  bottom: 120%;
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
    const [shouldJump, setShouldJump] = useState(false);
    const config = configService.getConfig();
    const timersRef = useRef<{ messageTimer?: ReturnType<typeof setTimeout>; jumpTimer?: ReturnType<typeof setTimeout> }>({});

    useEffect(() => {
        // Clear any existing timers
        if (timersRef.current.messageTimer) {
            clearTimeout(timersRef.current.messageTimer);
        }
        if (timersRef.current.jumpTimer) {
            clearTimeout(timersRef.current.jumpTimer);
        }

        // Show message and jump if there's a message
        if (user.lastMessage) {
            setShowMessage(true);
            setShouldJump(true);

            timersRef.current.messageTimer = setTimeout(() => {
                setShowMessage(false);
            }, config.display.messageDuration);

            timersRef.current.jumpTimer = setTimeout(() => {
                setShouldJump(false);
            }, 100); // Jump animation duration
        }

        // Cleanup function
        return () => {
            if (timersRef.current.messageTimer) {
                clearTimeout(timersRef.current.messageTimer);
            }
            if (timersRef.current.jumpTimer) {
                clearTimeout(timersRef.current.jumpTimer);
            }
            setShowMessage(false);
            setShouldJump(false);
        };
    }, [user.lastMessage]); // Depend on lastMessage to trigger on every new message

    return (
        <AvatarContainer
            avatarSize={config.display.avatarSize}
            initial={{ x: user.position.x, y: window.innerHeight }}
            animate={{
                x: user.position.x,
                y: user.animationDone ? user.position.y : (shouldJump ? user.position.y - 20 : user.position.y)
            }}
            exit={{
                y: window.innerHeight,
                opacity: 0,
                transition: {
                    duration: config.animation.transitionDuration,
                    ease: "easeOut"
                }
            }}
            transition={{
                duration: config.animation.transitionDuration,
                ease: [0.16, 1, 0.3, 1], // Custom easing for smooth deceleration
                y: { type: "spring", stiffness: 200, damping: 18 }
            }}
        >
            <AvatarImage src={user.syncAvatar} alt={user.username + "'Sync avatar"} />
            {config.display.showUsernames && (
                <UsernameTooltip
                    $textColor={config.ui.textColor}
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