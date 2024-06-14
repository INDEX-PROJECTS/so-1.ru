import { Modal } from '@/shared/ui/Modal/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CartModal.module.scss';
import { CartForm } from '../CartForm/CartForm';

interface CartModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ className, isOpen, onClose } : CartModalProps) => (
    <Modal lazy className={classNames(styles.CartModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
        <CartForm onSuccess={onClose} />
    </Modal>
);
