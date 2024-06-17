/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';

import styles from './Checkbox.module.scss';
import { Text, TextBold, TextSize } from '../Text/Text';

interface CheckboxProps {
  className?: string;
  label?: string;
  checked?: boolean;
  onToggle: () => void;
  id: string;
}

export const Checkbox = memo(({
    className, label, checked, id, onToggle, ...props
}: CheckboxProps) => (
    <div className={styles.rect}>
        <input
            type="checkbox"
            checked={checked}
            id={id}
            onChange={onToggle}
            className={styles.checkbox}
            {...props}
        />
        <label htmlFor={id} className={styles.label}>
            <Text textPrimary title={label} size={TextSize.S} bold={TextBold.MEDIUM} gap="0" />
        </label>
    </div>
));
