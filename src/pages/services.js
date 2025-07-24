import fs from 'fs';
import path from 'path';
import Services from '@/components/temp1/services';

export default function ServicesPage({ services }) {
    return (
        <main>
            <Services services={services} />
        </main>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'public/data/services.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);

    return {
        props: {
            services: json.services
        }
    };
}
