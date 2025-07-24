import styles from "./styles/hero.module.css"
export default function Hero({ title, subtitle, ctaText }) {
    return (
        <section className={styles.hero}>
            <h1 >{title}</h1>
            <p>{subtitle}</p>
            <button className={styles.button}>
                {ctaText}
            </button>
        </section>
    );
}
