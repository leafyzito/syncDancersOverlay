# Stream Overlay

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt.md)

A beautiful and customizable overlay for your Twitch stream that brings your chat to life with animated avatars and messages.

## What It Does

- Shows your Twitch chat messages with animated avatars
- Customizable appearance and animations
- Interactive chat commands
- Automatic cleanup of inactive users
- Smooth animations and transitions

## Quick Start

1. Add the overlay to your streaming software (OBS, Streamlabs, etc.)
2. Use this URL format:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=YOUR_CHANNEL_NAME
```

## Customization Guide

You can customize everything by adding parameters to the URL. Here are all available settings:

### Twitch Settings
- `twitch.channel`: Your Twitch channel name
- `twitch.customAvatarUrls`: Custom avatar URLs (comma-separated). Example: `?twitch.customAvatarUrls=https://example.com/avatar1.gif,https://example.com/avatar2.gif`

### Display Settings
- `display.avatarSize`: Avatar size in pixels (default: 45)
- `display.showUsernames`: Show/hide usernames (true/false) (default: true)
- `display.showTwitchAvatars`: Show/hide Twitch avatars (true/false) (default: false)
- `display.showMessages`: Show/hide message bubbles (true/false) (default: true)
- `display.messageMaxLength`: Maximum length of messages (default: 100)
- `display.messageDuration`: How long messages stay visible in milliseconds (default: 5000)
- `display.deleteIdleUsers`: Remove inactive users automatically (true/false) (default: true)
- `display.deleteIdleUsersAfterSeconds`: Time before removing inactive users in seconds (default: 120)

### Animation Settings
- `animation.movementInterval`: How often avatars move in milliseconds (default: 10000)
- `animation.movementRange.y.min`: Minimum vertical movement (default: 0)
- `animation.movementRange.y.max`: Maximum vertical movement (default: 60)
- `animation.transitionDuration`: How long animations take in seconds (default: 3)

### Appearance Settings
- `ui.backgroundColor`: Background color (use hex codes like #1a1a1a)
- `ui.textColor`: Text color (use hex codes like #ffffff)
- `ui.tooltipBackground`: Tooltip background color (use rgba like rgba(0, 0, 0, 0.8))
- `ui.messageBubbleBackground`: Message bubble background color (use rgba like rgba(0, 0, 0, 0.8))
- `ui.overlayHeight`: Height of the overlay area in pixels (default: 100)
- `ui.overlayBottomPadding`: Space from bottom of screen in pixels (default: 40)
- `ui.scale`: Overall size multiplier (1.0 = normal, 1.5 = 50% larger) (default: 1.1)

### Example URLs

1. Basic setup:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=your_channel
```

2. Custom colors and appearance:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=your_channel&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff&ui.scale=1.1
```

3. Custom display and animation:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=your_channel&display.avatarSize=60&display.messageDuration=8000&animation.movementInterval=5000&animation.transitionDuration=2
```

4. Complete customization:
```
https://leafyzito.github.io/syncDancersOverlay/?twitch.channel=your_channel&display.avatarSize=60&display.showUsernames=true&display.showMessages=true&display.messageDuration=5000&animation.movementInterval=10000&animation.transitionDuration=3&ui.backgroundColor=%231a1a1a&ui.textColor=%23ffffff&ui.scale=1.1
```

## Chat Commands

- `!reloadavatar` - Refreshes the user's avatar

## How It Works

- Avatars move smoothly around the screen
- Messages appear in speech bubbles and fade away
- Inactive users are automatically removed
- Everything can be customized to match your stream's style

## Need Help?

If you need help customizing your overlay, try different combinations of the settings above. You can always reset by removing all parameters except your channel name.

## License

MIT
