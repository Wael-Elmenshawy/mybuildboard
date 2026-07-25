import {
  useEffect,
  type ReactNode,
} from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

function Modal({
  open,
  title,
  children,
  onClose,
  maxWidth = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-xl bg-white shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-2xl text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
