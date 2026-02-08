import { useUIStore } from '../../lib/store';

export default function ToastContainer() {
    const toasts = useUIStore((state) => state.toasts);
    const removeToast = useUIStore((state) => state.removeToast);

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast toast--${toast.type}`}
                    onClick={() => removeToast(toast.id)}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
