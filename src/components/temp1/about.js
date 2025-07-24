import styles from './styles/about.module.css';
export default  function About ({ title, description, mission, vision, values }) {
  return(
    <div style={{backgroundColor:'rebeccapurple',}}>
        <h1>{title} </h1>
        <div className={styles.description}>{description}</div>
        <div className={styles.mission}>Our Mission 
            <div className={styles.missioncom}>{mission}</div>
        </div>
        <section className={styles.vision}>
        <div>Our Vision:-{vision}</div>
        <div className={styles.grid}>
                {values.map((value, index) => (
                    <div key={index} className={styles.card}>
                        <h3>{index+1}.{value}</h3>
                        
                    </div>
                ))}
            </div>
      </section>
    </div>
  )
}

