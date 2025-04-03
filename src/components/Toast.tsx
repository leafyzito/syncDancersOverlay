import { useToast, ToastType } from '../services/toastService';
import './Toast.css';

const toastTypeClasses: Record<ToastType, string> = {
    success: 'toast-success',
    error: 'toast-error',
    info: 'toast-info',
    warning: 'toast-warning'
};

export function Toast() {
    const { toasts } = useToast();

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast ${toastTypeClasses[toast.type]}`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
} 