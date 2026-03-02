'use client';

import { pixel } from '@/types';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';



export default function FacebookPixel({ fbId }: {fbId : pixel | undefined}) {
    const pathname = usePathname();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // 1. Wait for the script to load
        if (!loaded) return;

        // 2. Verify we have an ID
        if (!fbId?.id) return;

        // 3. Access Facebook Pixel globally
        const fbq = (window as any).fbq;

        // 4. Fire the event
        if (typeof fbq === 'function') {
            fbq('track', 'PageView');
        }
    }, [pathname, fbId, loaded]);

    // Don't render anything if no ID is provided
    if (!fbId?.id) return null;

    return (
        <Script
            id="fb-pixel"
            strategy="afterInteractive" // Loads immediately after the page is interactive
            dangerouslySetInnerHTML={{
                __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${fbId.id}');
          `,
            }}
            onLoad={() => setLoaded(true)}
        />
    );
}