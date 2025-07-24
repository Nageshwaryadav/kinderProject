
import fs from 'fs';
import path from 'path'
import About from '@/components/temp1/about'

export default function AboutPage({ about }) {
    return (
        <main>
            <About {...about} />
        </main>
    );
}



export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/about.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);

    if (!json.about) {
      throw new Error('About data is missing in JSON');
    }

    return {
      props: {
        about: json.about
      }
    };
  } catch (error) {
    console.error('Error loading about.json:', error.message);
    return {
      props: {
        about: null
      }
    };
  }
}