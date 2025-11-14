import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';

import { queryClient } from '@/lib/react-query';
import { Router } from '@/router';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Toaster position="top-right" richColors />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
