import Button from '../Button/Button';
import HeaderLogo from '../../assets/Logo.png'
import Image from 'next/image';

import styles from './Header.module.scss';

function Header() {

    // Smooth Scroll

    const onScroll = (e) => {
        const btnLinks = document.querySelectorAll('[data-goto]');
        if (btnLinks.length > 0) {
            const btnLink = e.target;
            if (btnLink.dataset.goto && document.querySelector(btnLink.dataset.goto)) {
                const gotoSection = document.querySelector(btnLink.dataset.goto);
                const gotoSectionValue = gotoSection.getBoundingClientRect().top + scrollY - document.querySelector('#Header').offsetHeight;

                window.scrollTo({
                    top: gotoSectionValue,
                    behavior: 'smooth'
                });
            }
        }
    }

    return(    
        <div className={styles.Header} id='Header'>
            <div className={styles.header__content}>
                <Image src={HeaderLogo}  alt='logo' />
                <div className={styles.header__navigation}>
                    <Button onScroll={onScroll} dataGoto='#get_req' label={'Users'} />
                    <Button onScroll={onScroll} dataGoto='#form' label={'Sign up'} />
                </div>
            </div>
        </div>
    )
}

export default Header;