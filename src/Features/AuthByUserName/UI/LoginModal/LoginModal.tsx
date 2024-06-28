import { Suspense } from "react";
import { Modal } from "@/Shared/UI/Modal";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Loader } from "@/Shared/UI/Loader";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
