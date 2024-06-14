import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CircleLink.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { ReactComponent as ArrowLongIcon } from '@/shared/assets/icons/arrow-right-long-icon.svg';
import { HStack } from '../Stack';

interface CircleLinkProps {
  className?: string;
  href?: string;
  isLink: boolean;
  title: string;
}

export const CircleLink = memo((props: CircleLinkProps) => {
    const {
        className, href, isLink, title,
    } = props;

    if (isLink) {
        return (
            <a href={href} className={classNames(styles.CircleLink, {}, [className])}>
                {title}
                <Button theme={ThemeButton.SVG_CLEAR} className={styles.arrowLink}>
                    <ArrowLongIcon />
                </Button>
            </a>
        );
    }
    return (
        <HStack justify="center" align="center" className={classNames(styles.CircleLink, {}, [className])}>
            {title}
        </HStack>
    );
});
