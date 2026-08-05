import SmoothScroll from '../components/SmoothScroll';
import './globals.css';

export const metadata = {
  title: 'MuvieFlex',
  description: 'Discover and stream blockbuster movies, TV shows & Web Series.',
  icons: {
    icon: '/m2.webp', // public ফোল্ডারে থাকা তোমার লোগো ফাইলের নাম এখানে দিতে হবে
    shortcut: '/m2.webp',
    apple: '/m2.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-zinc-950 text-white antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}