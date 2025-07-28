import Image from 'next/image';

export default function FullscreenImageBackground() {
  return (
    <div
      style={{
       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#0fdca9',
        overflow: 'hidden',
        position: 'relative', // ⭐ CRITICAL: Parent MUST have position: 'relative'
      }}
    >
      <Image
        src="/schoolstudent.jpg" // Local image path
        alt="Multi-cultural primary or elementary school students with backpacks running outdoors"
        layout="fill"        // ⭐ Use this to make it fill its parent
        objectFit="cover"    // ⭐ Ensures the image covers the area, maintaining aspect ratio
        priority             // Optional: Helps Next.js load it quickly
        // Remove any 'width' or 'height' props, and any 'style' prop with width/height here
      />
    </div>
  );
}