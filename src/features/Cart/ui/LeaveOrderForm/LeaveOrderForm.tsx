import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './LeaveOrderForm.module.scss';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { ReactComponent as CloseIcon } from '@/shared/assets/icons/close-icon.svg';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { useAppDispatch } from '@/app/Redux/store';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { addNotification } from '@/app/Redux/notifications/slice';

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

            <Button
                onClick={handleFormSubmit}
                disabled={!checked || isNameInvalid || isEmailInvalid}
                theme={ThemeButton.DEFAULT}
                className={styles.sendBtn}
            >
                <Text gap="0" isActive title="Отправить" size={TextSize.S} bold={TextBold.LIGHT} />
            </Button>
        </VStack>
    );
});
