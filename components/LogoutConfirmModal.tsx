import React, { useEffect } from "react";
import { LogOut } from "lucide-react";

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
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleLogout = () => {
    onClose();

    setTimeout(() => {
      onLogout();
    }, 180);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-xl px-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] p-7 animate-in zoom-in-95 duration-200"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/15">
            <LogOut className="h-8 w-8 text-red-400" strokeWidth={2.2} />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-5 text-center text-2xl font-bold text-white">
          Leave Startives?
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm leading-6 text-gray-300">
          Pressing back will log you out of your account.
          <br />
          Are you sure you want to continue?
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 rounded-full bg-red-600 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98]"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;