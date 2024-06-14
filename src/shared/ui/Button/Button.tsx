/* eslint-disable no-unused-vars */
import {
    ButtonHTMLAttributes, ReactNode, memo,
    useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './Button.module.scss';
import { VStack } from '../Stack';
import {
    Text, TextAlign, TextBold, TextSize,
} from '../Text/Text';

export enum ThemeButton {
  CLEAR = 'clear',
  DEFAULT = 'default',
  DEFAULT_BETWEEN = 'default_between',
  SVG_CLEAR ='svg_clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  disabled?: boolean;
  children?: ReactNode;
  helper?: boolean;
  helperText?: string;
}

export const Button = memo((props : ButtonProps) => {
    const {
        className, children, disabled, helper, helperText, theme = ThemeButton.CLEAR, ...otherProps
    } = props;

    const mods: Mods = {
        [styles[theme]]: true,
        [styles.disabled]: disabled,
    };

    const [isShown, setIsShown] = useState(false);

    const onMouseEnter = () => {
        setIsShown(true);
    };
    const onMouseLeave = () => {
        setIsShown(false);
    };

    if (helper) {
        return (
            <div className={styles.buttonWrapper} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <button
                    disabled={disabled}
                    type="button"
                    className={classNames(styles.Button, mods, [className])}
                    {...otherProps}
                >
                    {children}
                </button>

                <CSSTransition
                    in={isShown}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    <VStack className={styles.helper}>
                        <Text
                            text={helperText}
                            size={TextSize.M}
                            isActive
                            align={TextAlign.CENTER}
                            bold={TextBold.BOLD}
                            gap="0"
                        />
                    </VStack>
                </CSSTransition>

            </div>
        );
    }

    return (
        <button
            disabled={disabled}
            type="button"
            className={classNames(styles.Button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>

    );
});
