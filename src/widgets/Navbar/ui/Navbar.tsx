/* eslint-disable ulbi-tv-plugin/layer-imports */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { ReactComponent as CartIcon } from '../../../shared/assets/icons/cart-icon.svg';
import { ReactComponent as EmptyCartIcon } from '../../../shared/assets/icons/cart-empty-icon.svg';
import { ReactComponent as MailIcon } from '../../../shared/assets/icons/mail-icon.svg';
import { ReactComponent as PhoneIcon } from '../../../shared/assets/icons/phone-icon.svg';
import { ReactComponent as MessagesIcon } from '../../../shared/assets/icons/messages-icon.svg';
import { ReactComponent as DocsIcon } from '../../../shared/assets/icons/docs-icon.svg';
import { CartModal } from '@/features/Cart';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { selectCart } from '@/app/Redux/cart/selectors';
import { useAppDispatch } from '@/app/Redux/store';
import { setIsCartModel } from '@/app/Redux/cart/slice';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();

    const { items, isCartModelOpen } = useSelector(selectCart);

    useGSAP(() => {
        gsap.to('#navigation', { opacity: 1, x: 0, delay: 1.2 });
        gsap.to('#menu', { opacity: 1, x: 0, delay: 1.2 });
    }, []);

    const onCloseCartModal = useCallback(() => {
        dispatch(setIsCartModel({
            isCartModelOpen: false,
            isOrderModel: false,
        }));
    }, [dispatch]);

    const onShowCartModal = useCallback(() => {
        dispatch(setIsCartModel({
            isCartModelOpen: true,
            isOrderModel: false,
        }));
    }, [dispatch]);

    return (
        <header
            className={classNames(styles.header, {}, [className])}
        >
            <nav id="navigation" className={styles.nav}>
                <a className="link" href="#catalogSection">Каталог</a>
                <a className="link" href="#documentationSection">Оферта</a>
                <a className="link" href="#documentationSection">Персональные данные</a>
                <a className="link" href="#documentationSection">Покупателям</a>
            </nav>

            <div id="menu" className={styles.menuContainer}>
                <a href="#documentationSection" className={classNames(styles.item, {}, [styles.mobileItem])}>
                    <DocsIcon className={styles.icon} />
                </a>
                <Button theme={ThemeButton.CLEAR} onClick={onShowCartModal} className={styles.item}>
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
                <a href="#callBackSection" className={styles.item}>
                    <MessagesIcon className={styles.icon} />
                </a>
            </div>

            <CartModal
                isOpen={isCartModelOpen}
                onClose={onCloseCartModal}
            />
        </header>
    );
});
