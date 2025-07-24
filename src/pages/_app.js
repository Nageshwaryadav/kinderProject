import '../styles/globals.css';
import Navbar from '@/components/temp1/navbar';
import Footer from '@/components/temp1/footer'; // Importing Footer component

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      
      <div style={{minHeight:'85vh'}}>
      <Component {...pageProps} />
      
      </div>
      <Footer/>
    </>
  );
}
