/* eslint-disable default-case */
/* eslint-disable jsx-a11y/control-has-associated-label */

import {
    ChangeEventHandler, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import styles from './Counter.module.scss';
import { ReactComponent as MinusIcon } from '@/shared/assets/icons/minus-icon.svg';
import { ReactComponent as PlusIcon } from '@/shared/assets/icons/plus-icon.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

interface CounterProps {
  className?: string;
  count: number;
  onChangeInputValue: ChangeEventHandler<HTMLInputElement>;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
}

export const Counter = memo((props: CounterProps) => {
    const {
        className, onClickIncrement, onClickDecrement, count, onChangeInputValue,
    } = props;
    const [width, setWidth] = useState(10);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        switch (String(count).length) {
        case 1:
            setWidth(10);
            break;
        case 2:
            setWidth(20);
            break;
        case 3:
            setWidth(30);
            break;
        }
    }, [count]);

    const handleInputClick = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const handleInputBlur = useCallback(() => {
        if (Number(count) === 0) {
            onClickIncrement();
        }
    }, [count, onClickIncrement]);

    return (
        <div className={classNames(styles.Counter, {}, [className])}>
            <button onClick={onClickDecrement} disabled={count === 1} type="button" className={styles.btn}>
                <MinusIcon className={styles.icon} />
            </button>

            <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={count}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                onChange={onChangeInputValue}
                style={{
                    width: `${width}px`,
                }}
                maxLength={3}
            />

            <button onClick={onClickIncrement} type="button" className={styles.btn}>
                <PlusIcon className={styles.icon} />
            </button>
        </div>
    );
});
