// components/ClarityAnalytics.tsx
'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityAnalytics() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    useEffect(() => {
        if (clarityId) {
            Clarity.init(clarityId);
        }
    }, [clarityId]);

    return null; // This component renders nothing visually
}