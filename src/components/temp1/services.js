import styles from './styles/services.module.css';

export default function Services({ services }) {
    return (
        <section className={styles.servicesSection}>
            <h2 className={styles.heading}>Our Services</h2>
            <div className={styles.grid}>
                {services.map((service, index) => (
                    <div key={index} className={styles.card}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

