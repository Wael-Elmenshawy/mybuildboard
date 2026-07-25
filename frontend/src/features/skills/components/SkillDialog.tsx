import type { ReactNode } from "react";

import Modal from "@/components/ui/Modal";

type SkillDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function SkillDialog({
  open,
  title,
  children,
  onClose,
}: SkillDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      {children}
    </Modal>
  );
}

export default SkillDialog;
