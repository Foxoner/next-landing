
import styles from './Card.module.scss';

function Card( {user} ) {
    const tooltipMouseOver = (e) => {
        const tipCreate = (e) => {
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');

            tooltip.innerText = e.target.getAttribute('tip');
            tooltip.style.zIndex = 100;
            tooltip.style.position = 'absolute';
            tooltip.style.top = e.pageY + 20 + 'px';
            tooltip.style.left = e.pageX  + 'px';

            document.body.appendChild(tooltip);
        }

        let overflowed = e.target.scrollWidth > e.target.clientWidth;
        if (overflowed) {
            tipCreate(e);
        }

    }

    const tooltipMouseOut = (e) => {
        let tooltip = document.querySelector('.tooltip')
        if (tooltip) {
            document.body.removeChild(tooltip);
        }
    }

    return(
        <>
            <div className={styles.Card}>
                <img className={styles.Card__img} src={user.photo} alt='user-img' />
                <p className={styles.Card__name} onMouseOver={tooltipMouseOver} onMouseOut={tooltipMouseOut} tip={user.name}>{user.name}</p>
                <div className={styles.Card__desc}>
                    <p onMouseOver={tooltipMouseOver} onMouseOut={tooltipMouseOut} tip={user.position} >{user.position}</p>
                    <p onMouseOver={tooltipMouseOver} onMouseOut={tooltipMouseOut} tip={user.email} >{user.email}</p>
                    <p onMouseOver={tooltipMouseOver} onMouseOut={tooltipMouseOut} tip={user.phone} >{user.phone}</p>
                    
                </div>
            </div>
            <style jsx='true'>
                {`
                    .tooltip {
                        min-width: 200px;
                        background: rgba(0, 0, 0, 0.87);
                        border-radius: 4px;
                        padding: 3px 16px;
                        font-size: 16px;
                        line-height: 26px;
                        color: #FFFFFF;
                        text-align: center;
                    }
                `}
            </style>
        </>
    )
}

export default Card;