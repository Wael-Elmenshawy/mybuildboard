import type { ReactNode } from "react";

import Modal from "@/components/ui/Modal";

type ExperienceDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function ExperienceDialog({
  open,
  title,
  children,
  onClose,
}: ExperienceDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      {children}
    </Modal>
  );
}

export default ExperienceDialog;
