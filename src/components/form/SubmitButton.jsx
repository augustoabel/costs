import styles from './SubmitButton.module.css'

function SubmitButton(props) {
    return (
        <div>
            <button className={styles.btn}>{props.text}</button>
        </div>
    )
}

export default SubmitButton