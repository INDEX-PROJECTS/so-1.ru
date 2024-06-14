import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Hero.module.scss';

interface HeroProps {
  className?: string;
}

export const Hero = memo(({ className }: HeroProps) => (
    <div className={classNames(styles.Hero, {}, [className])}>
        <h1>Test Scroll Horizont</h1>
        <h2>Bim Bim Bam Bam</h2>
    </div>
));
