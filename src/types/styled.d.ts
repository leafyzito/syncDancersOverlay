import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        overlayBottomPadding: number;
        overlayHeight: number;
        scale: number;
    }
} 