/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CircleLink.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { ReactComponent as ArrowLongIcon } from '@/shared/assets/icons/arrow-right-long-icon.svg';
import { HStack } from '../Stack';
import { Text, TextSize } from '../Text/Text';

interface CircleLinkProps {
  className?: string;
  href?: string;
  isLink: boolean;
  title: string;
  id: string;
}

export const CircleLink = memo((props: CircleLinkProps) => {
    const {
        className, href, isLink, title, id,
    } = props;

    if (isLink) {
        return (
            <a
                id={id}
                href={href}
                className={classNames(styles.CircleLink, {}, [className])}
            >
                <Text gap="0" size={TextSize.XXL} title={title} isActive className={styles.text} />
                <Button theme={ThemeButton.SVG_CLEAR} className={styles.arrowLink}>
                    <ArrowLongIcon />
                </Button>
            </a>
        );
    }
    return (
        <HStack justify="center" align="center" className={classNames(styles.CircleLink, {}, [className])}>
            <Text gap="0" size={TextSize.L} title={title} isActive className={styles.text} />
        </HStack>
    );
});
