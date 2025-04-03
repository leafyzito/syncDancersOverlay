import { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
}

export class ToastService {
    private static instance: ToastService;
    private toasts: Toast[] = [];
    private subscribers: ((toasts: Toast[]) => void)[] = [];

    private constructor() { }

    public static getInstance(): ToastService {
        if (!ToastService.instance) {
            ToastService.instance = new ToastService();
        }
        return ToastService.instance;
    }

    public show(message: string, type: ToastType = 'info', duration: number = 3000) {
        const id = Date.now();
        const toast: Toast = { id, message, type, duration };
        this.toasts = [...this.toasts, toast];
        this.notifySubscribers();

        setTimeout(() => {
            this.removeToast(id);
        }, duration);
    }

    private removeToast(id: number) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifySubscribers();
    }

    public subscribe(callback: (toasts: Toast[]) => void) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    private notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.toasts));
    }

    public getToasts(): Toast[] {
        return this.toasts;
    }
}

// Create a hook for using the toast service in components
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toastService = ToastService.getInstance();

    useEffect(() => {
        const unsubscribe = toastService.subscribe(newToasts => {
            setToasts(newToasts);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        toasts,
        show: (message: string, type?: ToastType, duration?: number) =>
            toastService.show(message, type, duration)
    };
} 