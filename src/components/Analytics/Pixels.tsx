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
    tiktokId?: PixelSettings | null;
}

export default function Pixels({ fbId, tiktokId }: PixelsProps) {
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
        if (tiktokId?.id) {
            ttq.pageview(tiktokId?.id);
        }
    }, [pathname, fbId, tiktokId, loaded]);

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

            {/* --- 2. TikTok Pixel --- */}
            {tiktokId?.id && (
                <Script
                    id="tiktok-pixel"
                    strategy="lazyOnload" // 👈 Performance improvement
                    dangerouslySetInnerHTML={{
                        __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq.methods[i=0];i<ttq.methods.length;i++)ttq.setAndDefer(e,ttq.methods[i]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
                var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                
                ttq.load('${tiktokId.id}');
                // ❌ Removed ttq.page() line from here
              }(window, document, 'ttq');
            `,
                    }}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </>
    );
}