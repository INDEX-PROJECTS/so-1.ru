/* eslint-disable react/no-this-in-sfc */
import {
    MutableRefObject, memo, useEffect, useRef, useState,
} from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './TestScroll.module.scss';
import { MainSection } from '@/features/MainSection';
import { Catalog } from '@/entities/Catalog';
import { CallBackForm } from '@/features/CallBackForm';
import { Documentation } from '@/features/Documentation';
import { VStack } from '@/shared/ui/Stack';

interface TestScrollProps {
  className?: string;
}

export const TestScroll = memo(({ className }: TestScrollProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [isUpVisible, setIsUpVisible] = useState(false);

    const onClickScrollTop = () => {
        wrapperRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Вызываем для первоначальной проверки

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');

        scrollLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                // @ts-ignore
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        });

        return () => {
            scrollLinks.forEach((link) => {
                link.removeEventListener('click', () => {});
            });
        };
    }, []);

    useGSAP(() => {
        gsap.to('#imageContainerDesktop', { opacity: 1, x: 0, duration: 1 });
        gsap.to('#imageContainerMobile', { opacity: 1, y: 0, duration: 1 });
        gsap.to('#link', {
            opacity: 1, x: 155, duration: 1, delay: 2,
        });
        gsap.to('#link-mobile', {
            opacity: 1, x: 80, y: 8, duration: 1, delay: 2,
        });
    }, [isMobile]);

    if (isMobile) {
        return (
            <VStack ref={wrapperRef} max align="start" gap="50" className={styles.mainContainer}>
                <MainSection idLink="link-mobile" idImageContainer="imageContainerMobile" />
                <Catalog />
                <CallBackForm />
                <Documentation />
                {/* <Button onClick={onClickScrollTop} theme={ThemeButton.DEFAULT} className={styles.up}>
                    Наверх
                </Button> */}
            </VStack>
        );
    }

    return (
        <div className={classNames(styles.TestScroll, {}, [className])}>
            <section className={styles.section}>
                <MainSection idImageContainer="imageContainerDesktop" idLink="link" />
            </section>
            <section className={styles.section}>
                <Catalog />
            </section>
            <section className={styles.section}>
                <CallBackForm />
            </section>
            <section className={styles.section}>
                <Documentation />
            </section>
        </div>
    );
});
