import {
    memo, MutableRefObject, ReactNode,
    useRef,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
}

export const Page = memo((props: PageProps) => {
    const { className, children } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [isUpVisible, setIsUpVisible] = useState(false);

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

        </main>
    );
});
