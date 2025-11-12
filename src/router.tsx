import { Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts/main-layout';
import { HomePage } from '@/pages/home-page';
import { RefundDetailsPage } from '@/pages/refund-details-page';
import { RefundNewPage } from '@/pages/refund-new-page';
import { SendingRefundRequestPage } from '@/pages/sending-refund-request-page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/refund/new" element={<RefundNewPage />} />
        <Route path="/refund/details/:id" element={<RefundDetailsPage />} />
        <Route path="/refund/success" element={<SendingRefundRequestPage />} />
      </Route>
    </Routes>
  );
}
