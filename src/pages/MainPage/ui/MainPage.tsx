import { TestScroll } from '@/features/TestScroll';
import { Page } from '@/widgets/Page';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const MainPage = () => (
    <Page>
        <TestScroll />
    </Page>
);

export default MainPage;
