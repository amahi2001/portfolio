import { useState, useEffect } from 'react';

export default function useIsBrowser(): boolean {
    const [isBrowser, setIsBrowser] = useState<boolean>(
        window.matchMedia('(min-width: 768px)').matches
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(min-width: 768px)');
        const listener = (e: MediaQueryListEvent) => setIsBrowser(e.matches);
        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
    }, []);

    return isBrowser;
}