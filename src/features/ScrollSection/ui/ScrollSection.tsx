/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    MutableRefObject, memo, useEffect, useRef,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainBgImage from '@/shared/assets/images/main-page-bg-image.png';
import styles from './ScrollSection.module.scss';

import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow-right-icon.svg';
import { ReactComponent as Logo } from '@/shared/assets/icons/logo-icon.svg';

import { CircleLink } from '@/shared/ui/CircleLink/CircleLink';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Catalog } from '@/entities/Catalog';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface ScrollSectionProps {
  className?: string;
}

export const ScrollSection = memo(({ className }: ScrollSectionProps) => {
    const sectionRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: '-300vw',
                ease: 'none',
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: '2000 top',
                    scrub: 0.6,
                    pin: true,
                },
            },
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section className="scroll-section-outer">

            <div ref={triggerRef}>
                <div ref={sectionRef} className="scroll-section-inner">
                    <div id="main-section" className="scroll-section">
                        <div className={styles.container}>

                            <div className={styles.imageContainer}>
                                <img
                                    src={MainBgImage}
                                    className={styles.image}
                                    alt="MainBg"
                                    height="100%"
                                    width="100%"
                                    draggable={false}
                                />
                                <Logo className={styles.logo} />
                            </div>

                            <CircleLink title="Смотреть каталог" href="#catalog" isLink className={styles.link} />

                        </div>
                    </div>
                    <Catalog />

                    <div id="call-back" className="scroll-section-big">
                        <div className={styles.formContainer}>
                            <form className={styles.form}>
                                <h3 className={styles.formTitle}>
                                    Для получения консультации по наличию товара и срока
                                    поступления на склад оставьте свой номер
                                </h3>

                                <Input autofocus placeholder="Телефон *" />
                                <Input autofocus placeholder="Тема запроса" />

                                <Button theme={ThemeButton.SVG_CLEAR} className={styles.submitBtn}>
                                    <ArrowIcon className={styles.arrowIcon} />
                                </Button>

                                <CircleLink title="Обратная связь" isLink={false} className={styles.formCircle} />

                            </form>
                        </div>
                        <div className={styles.docContainer}>
                            <Text gap="32" title="Документация" size={TextSize.XL} className="title" />

                            <div className={styles.boxContainer}>

                                <div className={styles.box}>
                                    <h3 className={styles.boxTitle}>Оферта</h3>
                                    <h4 className={styles.boxSubtitle}>
                                        Публичная оферта о заключении договора оказания услуг.
                                    </h4>
                                    <p className={styles.text}>
                                        Настоящий документ является предложением ИП
                                        «Мишарин Эдуард Валерьевич» (далее – «Компания») в адрес
                                        зарегистрированных и незарегистрированных пользователей
                                        (далее – «пользователи», «вы») сайта, расположенного на
                                        домене https://so-1.ru/ и
                                        всех его поддоменах (далее – «so-1.ru») заключить рамочный договор оказания
                                        услуг (далее – «Договор») на указанных ниже условиях (далее – «Оферта»).
                                        <br />
                                        {' '}
                                        <br />
                                        Термины и определения, применяемые в
                                        настоящем Договоре термины и определения используются в следующем их значении:
                                        <br />
                                        {' '}
                                        <br />
                                        «Сайт» одна или несколько логически связанных между
                                        собой веб-страниц, объединенных общей тематикой, расположенный
                                        под одним адресом, доступный пользователем с помощью интернет
                                        <br />
                                        {' '}
                                        <br />
                                        «Товары\Услуги» ассортимент продукции или услуг, размещенный на сайте so-1.ru,
                                        предназначенный для реализации для физическим или юридическим лицам путем
                                        оформления заказа онлайн
                                    </p>
                                </div>
                                <div className={styles.box}>
                                    <h3 className={styles.boxTitle}>Персональные данные</h3>
                                    <h4 className={styles.boxSubtitle}>
                                        Согласие на обработку персональных данных
                                    </h4>
                                    <p className={styles.text}>
                                        Настоящим я даю свое согласие ИП Мишарину
                                        Эдуарду Валерьевичу(ОГРНИП 323246800091042, ИНН 245603918087),Адрес: 662211,
                                        Красноярский край, Назаровский р-н, деревня Ярлыково, ул. Центральная, д.
                                        20(далее – Оператор) на обработку Оператором (включая получение от меня
                                        и/или от любых третьих лиц, с учетом требований действующего законодательства
                                        Российской Федерации) моих персональных данных и подтверждаю, что, давая такое
                                        согласие, я действую своей волей и в своем интересе.
                                        <br />
                                        {' '}
                                        <br />
                                        Согласие дается мною для целей заключения с Оператором и/или
                                        его партнерами по лицензионным договорам любых договоров,
                                        направленных на реализацию
                                        (продажу) мне или другим лицам товаров, а также и иных сделок,
                                        совершения иных действий,
                                        порождающих юридические последствия в отношении
                                        меня или других лиц, предоставления мне
                                        информации об оказываемых Оператором и/или его партнерами
                                        по лицензионным договорам услугах
                                        и реализуемых товарах и распространяется на следующую
                                        информацию: мои фамилия, имя, отчество,
                                        год, месяц, дата и место рождения, адрес и любая иная
                                        информация, относящаяся к моей личности,
                                        доступная либо известная в любой конкретный момент
                                        времени Оператору (далее - «Персональные
                                        данные»),
                                    </p>
                                </div>
                                <div className={styles.box}>
                                    <h3 className={styles.boxTitle}>Покупателям</h3>
                                    <h4 className={styles.boxSubtitle}>
                                        Контакты
                                    </h4>
                                    <p className={styles.text}>
                                        Настоящий документ является предложением ИП
                                        «Мишарин Эдуард Валерьевич» (далее – «Компания») в адрес
                                        зарегистрированных и незарегистрированных пользователей
                                        (далее – «пользователи», «вы») сайта, расположенного на
                                        домене https://so-1.ru/ и
                                        всех его поддоменах (далее – «so-1.ru») заключить рамочный договор оказания
                                        услуг (далее – «Договор») на указанных ниже условиях (далее – «Оферта»).
                                        <br />
                                        {' '}
                                        <br />
                                        Термины и определения, применяемые в
                                        настоящем Договоре термины и определения используются в следующем их значении:
                                        <br />
                                        {' '}
                                        <br />
                                        «Сайт» одна или несколько логически связанных между
                                        собой веб-страниц, объединенных общей тематикой, расположенный
                                        под одним адресом, доступный пользователем с помощью интернет
                                        <br />
                                        {' '}
                                        <br />
                                        «Товары\Услуги» ассортимент продукции или услуг, размещенный на сайте so-1.ru,
                                        предназначенный для реализации для физическим или юридическим лицам путем
                                        оформления заказа онлайн
                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <div id="for-users" className="scroll-section" /> */}
                </div>
            </div>
        </section>
    );
});
