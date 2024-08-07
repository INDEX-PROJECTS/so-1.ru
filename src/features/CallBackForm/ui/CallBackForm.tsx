import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CallBackForm.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow-right-icon.svg';
import { CircleLink } from '@/shared/ui/CircleLink/CircleLink';
import { useAppDispatch } from '@/app/Redux/store';
import { addNotification } from '@/app/Redux/notifications/slice';

interface CallBackFormProps {
  className?: string;
}

export const CallBackForm = memo(({ className }: CallBackFormProps) => {
    const dispatch = useAppDispatch();
    const [phone, setPhone] = useState('');
    const [request, setRequest] = useState('');

    const onChangePhone = (value: string) => {
        setPhone(value);
    };

    const onChangeRequest = (value: string) => {
        setRequest(value);
    };

    const isPhoneInvalid = !phone || !phone.length;

    const isRequestInvalid = !request || !request.length;

    const handleFormSubmit = () => {
        dispatch(addNotification({
            text: 'Заявка успешно оформлена',
        }));
        setRequest('');
        setPhone('');
    };

    return (
        <div id="callBackSection" className={classNames(styles.CallBackForm, {}, [className])}>
            <div className={styles.container}>
                <VStack gap="32" align="start" className={styles.form}>
                    <Text
                        gap="0"
                        text="Для получения
                         консультации по наличию
                          товара и срока поступления на склад оставьте свой номер"
                        textPrimary
                        bold={TextBold.BOLD}
                        size={TextSize.XL}
                    />

                    <VStack max>
                        <Input value={phone} onChange={onChangePhone} placeholder="Телефон *" />
                        <Input value={request} onChange={onChangeRequest} placeholder="Тема запроса" />
                    </VStack>

                    <Button
                        onClick={handleFormSubmit}
                        disabled={isPhoneInvalid || isRequestInvalid}
                        theme={ThemeButton.SVG_CLEAR}
                    >
                        <ArrowIcon className={styles.arrowIcon} />
                    </Button>

                    <div className={styles.circleContainer} />

                    <CircleLink title="Обратная связь" isLink={false} className={styles.formCircle} id="call-back" />
                </VStack>
            </div>

        </div>
    );
});
