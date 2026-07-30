import React, { useEffect } from "react";

interface LogoutConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  open,
  onClose,
  onLogout,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-7 animate-[fadeIn_.2s_ease]"
      >
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-500/15 flex items-center justify-center border border-red-500/30">
            <span className="text-3xl">🚪</span>
          </div>
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-white">
          Leave Startives?
        </h2>

        <p className="mt-3 text-center text-gray-300 leading-relaxed">
          Pressing back will log you out of your account.
          <br />
          Are you sure you want to continue?
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;