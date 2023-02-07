import styles from './Button.module.scss';

function Button( {label, disabled, onScroll, dataGoto} ) {
    return(
            <div>
                <button onClick={onScroll} className={styles.Button} disabled={disabled} data-goto={dataGoto}>{label}</button>
            </div>
    )
}

export default Button;