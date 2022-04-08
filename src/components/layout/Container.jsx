import styles from './Container.module.css'

function container(props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
    )
}

export default container