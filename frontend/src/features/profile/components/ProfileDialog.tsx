import {
  useEffect,
  type ReactNode,
} from "react";

type ProfileDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function ProfileDialog({
  open,
  title,
  children,
  onClose,
}: ProfileDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-dialog-title"
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2
            id="profile-dialog-title"
            className="text-2xl font-semibold"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-2 text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
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

export default ProfileDialog;
