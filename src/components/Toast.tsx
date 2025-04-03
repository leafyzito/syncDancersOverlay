import { useToast, ToastType } from '../services/toastService';

const toastStyles: Record<ToastType, string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black'
};

export function Toast() {
    const { toasts } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-2 rounded-lg shadow-lg ${toastStyles[toast.type]} transition-opacity duration-300`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
} 