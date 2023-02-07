
import styles from './Input.module.scss';

function Input( {label, helper, ...rest} ) {
    return(
            <div className={styles.inputBox}>
                <input {...rest} />
                <span>{label}</span>
                <p>{helper}</p>
            </div>
    )
}

export default Input