'use client';
import dynamic from 'next/dynamic';

const EarthPage = dynamic(() => import('./EarthPage'), { ssr: false });

export default function Home() {
  return <EarthPage />;
}
