'use client'
type Props = {
    children: React.ReactNode;
};
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Providers({ children }: Props) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}