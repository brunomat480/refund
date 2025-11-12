import { Outlet } from 'react-router';

import { Header } from '@/components/header';

export function MainLayout() {
  return (
    <div className="pt-10">
      <Header />
      <main className="mt-10 pb-14">
        <Outlet />
      </main>
    </div>
  );
}
