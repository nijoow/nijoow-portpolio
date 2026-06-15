'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // QueryClient는 컴포넌트 생애주기당 1회만 생성한다 (리렌더 시 재생성 방지).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30 * 1000 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
