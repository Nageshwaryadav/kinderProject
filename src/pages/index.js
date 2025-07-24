import fs from 'fs';
import path from 'path';

import Hero from '@/components/temp1/hero';
import FullscreenImageBackground from '@/components/temp1/bgimage'; // Importing Image component
import Main from '@/components/temp1/main'; // Assuming you have a main component




export default function Home({ content }) {
  return (
    <>
      <Hero className="hero" {...content.hero} />
      <FullscreenImageBackground/>
      <Main/>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/data/home.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const content = JSON.parse(fileContents);

  return {
    props: { content }
  };
}

