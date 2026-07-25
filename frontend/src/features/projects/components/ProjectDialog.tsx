import type { ReactNode } from "react";
import { X } from "lucide-react";

type ProjectDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function ProjectDialog({
  open,
  title,
  children,
  onClose,
}: ProjectDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-8 py-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill in the project details below.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-200"
          >
            <X size={22} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ProjectDialog;
