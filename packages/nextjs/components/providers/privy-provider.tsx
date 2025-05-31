"use client";

import { PrivyProvider } from '@privy-io/react-auth';
import { monadTestnet } from 'viem/chains'

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

export function PrivyClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID as string}
      config={{
        loginMethods: ['google'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
        },
        supportedChains: [monadTestnet],
        defaultChain: monadTestnet
      }}
    >
      {children}
    </PrivyProvider>
  );
} 