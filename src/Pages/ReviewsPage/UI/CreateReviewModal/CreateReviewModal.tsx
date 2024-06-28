import { Suspense } from 'react';
import { Modal } from '@/Shared/UI/Modal';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { CreateReviewFormAsync} from '../CreateReviewForm/CreateReviewForm.async';
import { Loader } from '@/Shared/UI/Loader';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CreateReviewModal = ({ className, isOpen, onClose }: LoginModalProps) => {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <CreateReviewFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
