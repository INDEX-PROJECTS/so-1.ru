import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './LeaveOrderForm.module.scss';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { ReactComponent as CloseIcon } from '@/shared/assets/icons/close-icon.svg';

interface LeaveOrderFormProps {
  className?: string;
  onSuccess: () => void;
}

export const LeaveOrderForm = memo(({ className, onSuccess }: LeaveOrderFormProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <VStack max align="start" justify="between" className={classNames(styles.LeaveOrderForm, {}, [className])}>
            <HStack max justify="end">
                <Button onClick={onSuccess} theme={ThemeButton.CLEAR} className={styles.closeBtn}>
                    <CloseIcon className={styles.closeIcon} />
                </Button>
            </HStack>

            <Text gap="0" title="Оставить заявку" size={TextSize.L} />

            <VStack max align="start" gap="50">
                <VStack max gap="16" align="start">
                    <Input placeholder="Ф.И.О" />
                    <Input placeholder="Email / Номер" />
                </VStack>

                <Checkbox
                    label="Согласен на обработку персональных данных"
                    checked={checked}
                    id="leaveOrderCheck"
                    onToggle={handleChange}
                />
            </VStack>

            <Button onClick={onSuccess} disabled={!checked} theme={ThemeButton.DEFAULT} className={styles.sendBtn}>
                <Text gap="0" isActive title="Отправить" size={TextSize.S} bold={TextBold.LIGHT} />
            </Button>
        </VStack>
    );
});
