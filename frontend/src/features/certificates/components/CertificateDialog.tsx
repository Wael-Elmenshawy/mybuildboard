import type { ReactNode } from "react";

import Modal from "@/components/ui/Modal";

type CertificateDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function CertificateDialog({
  open,
  title,
  children,
  onClose,
}: CertificateDialogProps) {
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

export default CertificateDialog;
