/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { ReactComponent as CartIcon } from '../../../shared/assets/icons/cart-icon.svg';
import { ReactComponent as EmptyCartIcon } from '../../../shared/assets/icons/cart-empty-icon.svg';
import { ReactComponent as MailIcon } from '../../../shared/assets/icons/mail-icon.svg';
import { ReactComponent as PhoneIcon } from '../../../shared/assets/icons/phone-icon.svg';
import { ReactComponent as MessagesIcon } from '../../../shared/assets/icons/messages-icon.svg';
import { CartModal } from '@/features/Cart';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { selectCart } from '@/app/Redux/cart/selectors';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);

    const { items } = useSelector(selectCart);
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <header className={classNames(styles.header, {}, [className])}>
            <nav className={styles.nav}>
                <a className="link" href="#main-section">Главная</a>
                <a className="link" href="#catalog">Каталог</a>
                <a className="link" href="#">Оферта</a>
                <a className="link" href="#">Персональные данные</a>
                <a className="link" href="#">Покупателям</a>
            </nav>

            <div className={styles.menuContainer}>
                <Button theme={ThemeButton.CLEAR} onClick={onShowModal} className={styles.item}>
                    {
                        items.length > 0 ? (
                            <CartIcon className={styles.icon} />
                        ) : <EmptyCartIcon className={styles.icon} />
                    }

                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    helper
                    helperText="e.misharin1970@mail.ru"
                    disabled
                    className={styles.item}
                >
                    <MailIcon className={styles.icon} />
                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    helper
                    helperText="+7 (982) 348 20 13"
                    disabled
                    className={styles.item}
                >
                    <PhoneIcon className={styles.icon} />
                </Button>
                <Button theme={ThemeButton.CLEAR} className={styles.item}>
                    <MessagesIcon className={styles.icon} />
                </Button>
            </div>

            <CartModal isOpen={isAuthModal} onClose={onCloseModal} />
        </header>
    );
});
