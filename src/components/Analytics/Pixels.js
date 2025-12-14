'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/ttpixel';

export default function Pixels({ fbId, tiktokId }) {
    const pathname = usePathname();
    const [loaded, setLoaded] = useState(false);

    // تتبع تغيير الصفحة
    useEffect(() => {
        // نتحقق أولاً أن السكريبت قد تم تحميله لتجنب الأخطاء
        if (!loaded) return;

        // فيسبوك
        if (fbId?.id) {
            fbq.pageview(); // لاحظ: لا تمرر الـ ID هنا عادة، الدالة pageview تأخذها من الـ init
        }

        // تيك توك
        if (tiktokId?.id) {
            ttq.pageview();
        }
    }, [pathname, fbId, tiktokId, loaded]);

    return (
        <>
            {/* --- 1. Facebook Pixel --- */}
            {fbId?.id && (
                <Script
                    id="fb-pixel"
                    strategy="lazyOnload" // 👈 تحسين الأداء: تحميل كسول
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
              // ❌ حذفنا سطر track PageView من هنا
              // ✅ الـ useEffect سيتكفل بالأمر لضمان عدم التكرار
            `,
                    }}
                    onLoad={() => setLoaded(true)} // نخبر الـ State أن السكريبت جاهز
                />
            )}

            {/* --- 2. TikTok Pixel --- */}
            {tiktokId?.id && (
                <Script
                    id="tiktok-pixel"
                    strategy="lazyOnload" // 👈 تحسين الأداء
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
                // ❌ حذفنا سطر ttq.page() من هنا
              }(window, document, 'ttq');
            `,
                    }}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </>
    );
}