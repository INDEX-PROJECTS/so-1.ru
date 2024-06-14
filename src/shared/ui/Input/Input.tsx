import React, {
    InputHTMLAttributes, memo, useEffect, useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
className?: string;
value?: string | number;
placeholder: string;
onChange?: (value: string) => void;
autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        autofocus,
        placeholder,
        type = 'text',
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    return (
        <div className={classNames(styles.FieldBox, {}, [className])}>
            <div className={classNames(styles.InputWrapper, {}, [])}>
                <input
                    ref={ref}
                    type={type}
                    className={styles.input}
                    id={placeholder}
                    placeholder={placeholder}
                    name={placeholder}
                    value={value}
                    autoComplete="new-password"
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            </div>

        </div>
    );
});
