import SmoothScroll from '../components/SmoothScroll';
import './globals.css';

export const metadata = {
  title: 'MovieFlex - Watch Movies & Web Series',
  description: 'Discover and stream blockbuster movies and TV shows.',
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