/* eslint-disable default-case */
/* eslint-disable jsx-a11y/control-has-associated-label */

import {
    ChangeEvent, memo, useCallback, useEffect, useState,
} from 'react';
import styles from './Counter.module.scss';
import { ReactComponent as MinusIcon } from '@/shared/assets/icons/minus-icon.svg';
import { ReactComponent as PlusIcon } from '@/shared/assets/icons/plus-icon.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

interface CounterProps {
  className?: string;
}

export const Counter = memo(({ className }: CounterProps) => {
    const [count, setCount] = useState(0);
    const [width, setWidth] = useState(10);

    const [isInputActive, setIsInputActive] = useState(false);

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
        setIsInputActive(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsInputActive(false);
    }, []);

    const handleIncrement = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    const handleDecrement = useCallback(() => {
        if (count > 0) {
            setCount((prevCount) => prevCount - 1);
        }
    }, [count]);

    const handleInputChange = useCallback(
        (event : ChangeEvent<HTMLInputElement>) => {
            const newCount = Number(event.target.value);
            if (!Number.isNaN(newCount)) {
                setCount(newCount);
            }
        },
        [],
    );

    return (
        <div className={classNames(styles.Counter, {}, [className])}>
            <button onClick={handleDecrement} disabled={count === 0} type="button" className={styles.btn}>
                <MinusIcon className={styles.icon} />
            </button>

            <input
                type="text"
                className={styles.input}
                value={count}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                readOnly={!isInputActive}
                autoComplete="new-password"
                onChange={handleInputChange}
                style={{
                    width: `${width}px`,
                }}
                maxLength={3}
            />

            <button onClick={handleIncrement} type="button" className={styles.btn}>
                <PlusIcon className={styles.icon} />
            </button>
        </div>
    );
});
