import styles from './styles/about.module.css';
export default  function About ({ title, description, mission, vision, values }) {
  return(
    <div className={styles.aboutbg}>
      <div className={styles.container}>
        <div className={styles.card}></div>
        <h1>{title} </h1>
        <div className={styles.description}>{description}</div>
      </div>  
        <div className={styles.mission}>Our Mission </div>
          <div className={styles.missioncom}>{mission}</div>
        
          <div className={styles.vision}>
            <div >Our Vision:-{vision}</div>
            <div className={styles.grid}>
                {values.map((value, index) => (
                    <div key={index} className={styles.card}>
                        <h3>{value}</h3>
                        
                    </div>
                ))}
            </div>
          </div>
    </div>
  )
}

