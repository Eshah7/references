import { Nav } from '@/components/layout/Nav';
import { NavigationProgress } from '@/components/layout/NavigationProgress';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationProgress />
      <Nav />
      <main className="page-enter">{children}</main>
    </>
  );
}
