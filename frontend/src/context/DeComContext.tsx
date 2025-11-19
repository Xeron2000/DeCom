import { createContext, useContext, ReactNode } from 'react';
import { CONTRACT_ABI } from '../config/contract';

interface DeComConfig {
    contractAddress: `0x${string}`;
    abi?: any;
}

const DeComContext = createContext<DeComConfig | null>(null);

interface DeComProviderProps extends DeComConfig {
    children: ReactNode;
}

export function DeComProvider({ children, contractAddress, abi }: DeComProviderProps) {
    const config = {
        contractAddress,
        abi: abi || CONTRACT_ABI,
    };

    return (
        <DeComContext.Provider value={config}>
            {children}
        </DeComContext.Provider>
    );
}

export function useDeComConfig() {
    const context = useContext(DeComContext);
    if (!context) {
        throw new Error('useDeComConfig must be used within a DeComProvider');
    }
    return context;
}
