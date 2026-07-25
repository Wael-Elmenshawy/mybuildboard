import type { ReactNode } from "react";

import Modal from "@/components/ui/Modal";

type EducationDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function EducationDialog({
  open,
  title,
  children,
  onClose,
}: EducationDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      {children}
    </Modal>
  );
}

export default EducationDialog;
