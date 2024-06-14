import { memo } from 'react';

import styles from './Checkbox.module.scss';

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
        <label htmlFor={id} className={styles.label}>{label}</label>
    </div>
));
