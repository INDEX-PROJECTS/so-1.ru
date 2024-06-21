import { memo } from 'react';
import styles from './MainSection.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactComponent as Logo } from '@/shared/assets/icons/logo-icon.svg';
import { CircleLink } from '@/shared/ui/CircleLink/CircleLink';

interface MainSectionProps {
  className?: string;
  idImageContainer: string;
  idLink: string;

}

export const MainSection = memo(({ className, idLink, idImageContainer }: MainSectionProps) => (
    <div id="mainSection" className={classNames(styles.MainSection, {}, [className])}>
        <div className={styles.container}>
            <div className={styles.imageContainer} id={idImageContainer}>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.CircleLinkContainer} />

            <CircleLink
                id={idLink}
                title="Смотреть каталог"
                href="#catalogSection"
                isLink
                className={styles.link}
            />
        </div>
    </div>
));
