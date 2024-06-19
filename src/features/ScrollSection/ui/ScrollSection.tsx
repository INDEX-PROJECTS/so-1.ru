/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    MutableRefObject, memo, useEffect, useRef,
    useState,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './ScrollSection.module.scss';

import { ReactComponent as Logo } from '@/shared/assets/icons/logo-icon.svg';

import { CircleLink } from '@/shared/ui/CircleLink/CircleLink';
import { Catalog } from '@/entities/Catalog';
import { CallBackForm } from '@/features/CallBackForm';
import { Documentation } from '@/features/Documentation';
import { VStack } from '@/shared/ui/Stack';

interface ScrollSectionProps {
  className?: string;
}

export const ScrollSection = memo(({ className }: ScrollSectionProps) => {
    const [isMobile, setIsMobile] = useState(false);

    const sectionRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
        if (!isMobile) {
            const pin = gsap.fromTo(
                sectionRef.current,
                {
                    translateX: 0,
                },
                {
                    translateX: '-300vw',
                    ease: 'none',
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top top',
                        end: '2000 top',
                        scrub: 0.6,
                        pin: true,
                    },
                },
            );

            return () => {
                pin.kill();
            };
        }

        return () => {
        };
    }, [isMobile]);

    useGSAP(() => {
        gsap.to('#image-container', { opacity: 1, x: 0, duration: 1 });
        gsap.to('#imageContainerMobile', { opacity: 1, y: 0, duration: 1 });
        gsap.to('#link', {
            opacity: 1, x: 200, duration: 1, delay: 2,
        });
        gsap.to('#link-mobile', {
            opacity: 1, x: 61, y: -22, duration: 1, delay: 2,
        });
    }, []);

    if (isMobile) {
        return (
            <VStack max align="start" gap="50" className={styles.mainContainer}>
                <VStack className={styles.mainSection}>
                    <div className={styles.imageContainerMobile} id="imageContainerMobile">
                        <Logo className={styles.logo} />
                    </div>
                    <div className={styles.CircleLinkContainerMobile} />

                    <CircleLink
                        id="link-mobile"
                        title="Смотреть каталог"
                        href="#catalog"
                        isLink
                        className={styles.linkMobile}
                    />

                </VStack>
                <Catalog />
                <CallBackForm />
                <Documentation />
            </VStack>
        );
    }

    return (
        <section className="scroll-section-outer">

            <div ref={triggerRef}>
                <div ref={sectionRef} className="scroll-section-inner">
                    <div id="main-section" className="scroll-section">
                        <div className={styles.container}>

                            <div className={styles.imageContainer} id="image-container">
                                <Logo className={styles.logo} />
                            </div>
                            <div className={styles.CircleLinkContainerDesktop} />

                            <CircleLink
                                id="link"
                                title="Смотреть каталог"
                                href="#catalog"
                                isLink
                                className={styles.link}
                            />

                        </div>
                    </div>
                    <Catalog />

                    <div id="call-back" className="scroll-section-big">
                        <CallBackForm />
                        <Documentation />
                    </div>
                </div>
            </div>
        </section>
    );
});
