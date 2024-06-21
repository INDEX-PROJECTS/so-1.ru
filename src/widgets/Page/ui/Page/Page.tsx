import {
    memo, MutableRefObject, ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Page.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface PageProps {
    className?: string;
    children: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { className, children } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [isUpVisible, setIsUpVisible] = useState(false);

    useEffect(() => {
        const scrollThreshold = 300;
        let currentWrapperRef: HTMLDivElement | null = null;

        const handleScroll = () => {
            if (currentWrapperRef && currentWrapperRef.scrollTop >= scrollThreshold) {
                setIsUpVisible(true);
            } else {
                setIsUpVisible(false);
            }
        };

        if (wrapperRef.current) {
            currentWrapperRef = wrapperRef.current;
            currentWrapperRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentWrapperRef) {
                currentWrapperRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const onClickScrollTop = () => {
        wrapperRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <main
            ref={wrapperRef}
            className={classNames(styles.Page, {}, [className])}
        >
            {children}

            <CSSTransition
                in={isUpVisible}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >

                <Button className={styles.up} onClick={onClickScrollTop} theme={ThemeButton.DEFAULT}>
                    Наверх
                </Button>

            </CSSTransition>

        </main>
    );
});
