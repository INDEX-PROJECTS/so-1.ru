/* eslint-disable react/no-array-index-key */
import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CartForm.module.scss';
import CardImage from '@/shared/assets/images/card-image.png';
import { Counter } from '@/shared/ui/Counter/Counter';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

export interface CartFormProps {
  className?: string;
  onSuccess: () => void;
}

export const CartForm = memo(({ className, onSuccess }: CartFormProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className={classNames(styles.CartForm, {}, [className])}>
            <div className={styles.top}>
                <div className={styles.header}>
                    <h3>2 товара</h3>
                    <p>Удалить всё</p>
                </div>

                <div className={styles.container}>
                    {
                        [...Array(3)].map((_, index) => (
                            <div key={index} className={styles.box}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={CardImage}
                                        className={styles.image}
                                        alt="MainBg"
                                        height="100%"
                                        width="100%"
                                        draggable={false}
                                    />
                                </div>

                                <div className={styles.content}>
                                    <h3 className="subTitle1">310 000 ₽</h3>
                                    <p>serial number</p>

                                    <h4>Product Name Product Name Product</h4>
                                    <Counter />

                                </div>

                            </div>
                        ))
                    }

                </div>

                <Checkbox
                    label="Я подтверждаю, что ознакомлен с условиями оферты"
                    checked={checked}
                    id="cartCheck"
                    onToggle={handleChange}
                />
            </div>

            <Button theme={ThemeButton.DEFAULT_BETWEEN}>
                <h4>Оформить</h4>
                <h3>53 000 ₽</h3>
            </Button>

        </div>
    );
});
