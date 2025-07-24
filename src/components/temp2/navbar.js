import Link from 'next/link';
import styles from './styles/navbar.module.css'; // ✅ Use `styles` import for CSS Modules

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
        </nav>
    );
}