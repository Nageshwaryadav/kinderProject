import styles from './styles/footer.module.css'; // ✅ Use `styles` import for CSS Modules
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div >Copyright @ kinder| All rights reserved </div>
    </div>
  )
}

export default Footer
