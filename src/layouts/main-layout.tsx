import { Outlet } from 'react-router';

import { Header } from '@/components/header';

export function MainLayout() {
  return (
    <div className="bg-gray-400">
      <Header />
      <main className="mt-10 h-screen pb-14">
        <Outlet />
      </main>
    </div>
  );
}
