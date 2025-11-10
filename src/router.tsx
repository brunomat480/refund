import { Route, Routes } from 'react-router';

import { HomePage } from '@/pages/home-page';
import { RefundDetailsPage } from '@/pages/refund-details-page';

export function Router() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/refund/details/:id" element={<RefundDetailsPage />} />
    </Routes>
  );
}
