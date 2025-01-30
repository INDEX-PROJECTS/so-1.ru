import { memo, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './LeaveOrderForm.module.scss';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { ReactComponent as CloseIcon } from '@/shared/assets/icons/close-icon.svg';
import { useAppDispatch } from '@/app/Redux/store';
import { addNotification } from '@/app/Redux/notifications/slice';
import { formatNumber } from '@/shared/utils/formatNumber.ts';
import { selectCart } from '@/app/Redux/cart/selectors.ts';

interface LeaveOrderFormProps {
  className?: string;
  onSuccess: () => void;
  isBack?: boolean;
  onClickBack?: () => void;
  onClearCart?: () => void;
}

export const LeaveOrderForm = memo(({
    className, onSuccess, onClickBack, isBack, onClearCart,
}: LeaveOrderFormProps) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { totalPrice } = useSelector(selectCart);

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeEmail = (value: string) => {
        setEmail(value);
    };

    const isNameInvalid = !name || !name.length;

    const isEmailInvalid = !email || !email.length;

    const handleChange = () => {
        setChecked(!checked);
    };

    const handleFormSubmit = () => {
        onSuccess();
        dispatch(addNotification({
            text: 'Заявка успешно отправлена.',
        }));
        setName('');
        setEmail('');

        if (onClearCart) {
            onClearCart();
        }
    };

    const paymentYooKassa = async () => {
        await axios
            .post(import.meta.env.VITE_PAYMENT_LINK, {
                amount: totalPrice,
                email,
            })
            .then((response) => {
                onSuccess();
                dispatch(addNotification({
                    text: 'Переадресация...',
                }));
                setName('');
                setEmail('');
                if (onClearCart) {
                    onClearCart();
                }
                window.location.replace(response.data.paymentUrl);
            })
            .catch(() => {
                dispatch(addNotification({
                    text: 'Что-то пошло не так! Повторите попытку позже.',
                }));
            });
    };

    return (
        <VStack max align="start" justify="between" className={classNames(styles.LeaveOrderForm, {}, [className])}>
            <HStack max justify={isBack ? 'between' : 'end'}>

                {
                    isBack && (
                        <Button onClick={onClickBack} theme={ThemeButton.CLEAR_COMMENT}>
                            Назад
                        </Button>
                    )
                }

                <Button onClick={onSuccess} theme={ThemeButton.CLEAR} className={styles.closeBtn}>
                    <CloseIcon className={styles.closeIcon} />
                </Button>
            </HStack>

            <Text gap="0" title="Оставить заявку" size={TextSize.L} />

            <VStack max align="start" gap="50">
                <VStack max gap="16" align="start">
                    <Input value={name} onChange={onChangeName} placeholder="Ф.И.О" />
                    <Input value={email} onChange={onChangeEmail} placeholder="Email" />
                </VStack>

                <Checkbox
                    label="Согласен на обработку персональных данных"
                    checked={checked}
                    id="leaveOrderCheck"
                    onToggle={handleChange}
                />
            </VStack>

            {
                import.meta.env.VITE_DOMEN_NAME === 'pro-zapchasti.online'
                    ? (
                        <Button
                            onClick={paymentYooKassa}
                            disabled={!checked}
                            theme={ThemeButton.DEFAULT_BETWEEN}
                        >
                            <Text gap="0" isActive title="Оплатить" size={TextSize.S} bold={TextBold.LIGHT} />
                            <Text
                                gap="0"
                                isActive
                                title={`${formatNumber(totalPrice)} ₽`}
                                size={TextSize.M}
                                bold={TextBold.MEDIUM}
                            />
                        </Button>
                    )
                    : (
                        <Button
                            onClick={handleFormSubmit}
                            disabled={!checked || isNameInvalid || isEmailInvalid}
                            theme={ThemeButton.DEFAULT}
                            className={styles.sendBtn}
                        >
                            <Text gap="0" isActive title="Отправить" size={TextSize.S} bold={TextBold.LIGHT} />
                        </Button>
                    )
            }
        </VStack>
    );
});
