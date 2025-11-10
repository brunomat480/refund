import { Outlet } from 'react-router';

import { Header } from '@/components/header';

export function MainLayout() {
  return (
    <div className="h-screen bg-gray-400">
      <Header />
      <main className="mt-10">
        <Outlet />
      </main>
    </div>
  );
}
