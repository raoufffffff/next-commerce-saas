'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/ttpixel';

// Define the shape of the pixel objects
interface PixelSettings {
    id: string;
}

interface PixelsProps {
    fbId?: PixelSettings | null;
}

export default function Pixels({ fbId }: PixelsProps) {
    const pathname = usePathname();
    const [loaded, setLoaded] = useState(false);

    // Track page changes
    useEffect(() => {
        // First check if the script is loaded to avoid errors
        if (!loaded) return;

        // Facebook
        if (fbId?.id) {
            fbq.pageview(fbId?.id);
        }

        // TikTok

    }, [pathname, fbId, loaded]);

    return (
        <>
            {/* --- 1. Facebook Pixel --- */}
            {fbId?.id && (
                <Script
                    id="fb-pixel"
                    strategy="lazyOnload" // 👈 Performance improvement: lazy load
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
              // ❌ Removed track PageView line from here
              // ✅ The useEffect will handle it to ensure no duplication
            `,
                    }}
                    onLoad={() => setLoaded(true)} // Tell State that the script is ready
                />
            )}
        </>
    );
}