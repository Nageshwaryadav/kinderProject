// import styles from "./styles/hero.module.css"
export default function Hero({ title, subtitle, ctaText }) {
    return (
        <section >
            <h1 >{title}</h1>
            <p>{subtitle}</p>
            <button >
                {ctaText}
            </button>
        </section>
    );
}
