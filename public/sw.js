if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),o={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/J5Suo_kT12MYJrODnnLyZ/_buildManifest.js",revision:"bd3a6f2024489becdbbe6526fe0fa750"},{url:"/_next/static/J5Suo_kT12MYJrODnnLyZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1022.258ea1f6a3207145.js",revision:"258ea1f6a3207145"},{url:"/_next/static/chunks/1102.633646e880d86f8d.js",revision:"633646e880d86f8d"},{url:"/_next/static/chunks/119.8a93228e7a3e4b56.js",revision:"8a93228e7a3e4b56"},{url:"/_next/static/chunks/1194.4aaa8ee8c460a7f9.js",revision:"4aaa8ee8c460a7f9"},{url:"/_next/static/chunks/1331.57feaee4bc2ec6c8.js",revision:"57feaee4bc2ec6c8"},{url:"/_next/static/chunks/1706.8b7f2231ada3fc47.js",revision:"8b7f2231ada3fc47"},{url:"/_next/static/chunks/2258.a1cb02b388609786.js",revision:"a1cb02b388609786"},{url:"/_next/static/chunks/2670.4c9b4ed100c275c4.js",revision:"4c9b4ed100c275c4"},{url:"/_next/static/chunks/2738.c47358dd9bb48e09.js",revision:"c47358dd9bb48e09"},{url:"/_next/static/chunks/3033.d56076c2fd61958a.js",revision:"d56076c2fd61958a"},{url:"/_next/static/chunks/3201.f913b0545d67341c.js",revision:"f913b0545d67341c"},{url:"/_next/static/chunks/3376.f39554f5fecd9dd2.js",revision:"f39554f5fecd9dd2"},{url:"/_next/static/chunks/430.67aa5148e32fa43b.js",revision:"67aa5148e32fa43b"},{url:"/_next/static/chunks/5161.44bd1519040a38f2.js",revision:"44bd1519040a38f2"},{url:"/_next/static/chunks/5307.7f52909d3454d379.js",revision:"7f52909d3454d379"},{url:"/_next/static/chunks/5529.9a7698688176863e.js",revision:"9a7698688176863e"},{url:"/_next/static/chunks/5625.708a320ab2179abd.js",revision:"708a320ab2179abd"},{url:"/_next/static/chunks/5811.831865be61a6ff51.js",revision:"831865be61a6ff51"},{url:"/_next/static/chunks/6310.9e8c0819e11a9ea2.js",revision:"9e8c0819e11a9ea2"},{url:"/_next/static/chunks/6370.7acfa153e9b02369.js",revision:"7acfa153e9b02369"},{url:"/_next/static/chunks/6563.099381adeb047d8f.js",revision:"099381adeb047d8f"},{url:"/_next/static/chunks/6628-12be71abd434c39a.js",revision:"12be71abd434c39a"},{url:"/_next/static/chunks/6704.ceb44295591c335c.js",revision:"ceb44295591c335c"},{url:"/_next/static/chunks/6942.c08085427c39966c.js",revision:"c08085427c39966c"},{url:"/_next/static/chunks/7066.6a5406d7d74f268a.js",revision:"6a5406d7d74f268a"},{url:"/_next/static/chunks/7096.5432dc37729227a5.js",revision:"5432dc37729227a5"},{url:"/_next/static/chunks/7564.0ac65fa213a67913.js",revision:"0ac65fa213a67913"},{url:"/_next/static/chunks/7652.f7077b85b34c80e1.js",revision:"f7077b85b34c80e1"},{url:"/_next/static/chunks/8048.6dfe3b2759b9e194.js",revision:"6dfe3b2759b9e194"},{url:"/_next/static/chunks/8061.74f566713989ca63.js",revision:"74f566713989ca63"},{url:"/_next/static/chunks/8754.09f7ca3c20de3edb.js",revision:"09f7ca3c20de3edb"},{url:"/_next/static/chunks/9146.ffaa862ccd58a211.js",revision:"ffaa862ccd58a211"},{url:"/_next/static/chunks/9586.bf3d8b0101b68b09.js",revision:"bf3d8b0101b68b09"},{url:"/_next/static/chunks/9849.fddccc2c10bb3730.js",revision:"fddccc2c10bb3730"},{url:"/_next/static/chunks/framework-1f1fb5c07f2be279.js",revision:"1f1fb5c07f2be279"},{url:"/_next/static/chunks/main-da53b9fb43906915.js",revision:"da53b9fb43906915"},{url:"/_next/static/chunks/pages/_app-6202f02b087be794.js",revision:"6202f02b087be794"},{url:"/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js",revision:"02cc11fd74b4e5ff"},{url:"/_next/static/chunks/pages/artists/%5Bslug%5D-eb6f2f5ce8a5ee7e.js",revision:"eb6f2f5ce8a5ee7e"},{url:"/_next/static/chunks/pages/collection-cebc9704fef757a5.js",revision:"cebc9704fef757a5"},{url:"/_next/static/chunks/pages/favorites-2df709882824d8aa.js",revision:"2df709882824d8aa"},{url:"/_next/static/chunks/pages/index-1581345a448f3b87.js",revision:"1581345a448f3b87"},{url:"/_next/static/chunks/pages/live-109df6bebbfb2f1c.js",revision:"109df6bebbfb2f1c"},{url:"/_next/static/chunks/pages/playing-c9b7e6ed2d7c8bbb.js",revision:"c9b7e6ed2d7c8bbb"},{url:"/_next/static/chunks/pages/playlists-0556ac881b7aa0ff.js",revision:"0556ac881b7aa0ff"},{url:"/_next/static/chunks/pages/playlists/%5Bid%5D-04606813b50f537f.js",revision:"04606813b50f537f"},{url:"/_next/static/chunks/pages/tracks/%5Bslug%5D-13cdba2037cd2229.js",revision:"13cdba2037cd2229"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/reactPlayerDailyMotion.8fcd7575128430a0.js",revision:"8fcd7575128430a0"},{url:"/_next/static/chunks/reactPlayerFacebook.7b57f0ace60082ca.js",revision:"7b57f0ace60082ca"},{url:"/_next/static/chunks/reactPlayerFilePlayer.405a40279400b911.js",revision:"405a40279400b911"},{url:"/_next/static/chunks/reactPlayerKaltura.bf02fd819c8a7f70.js",revision:"bf02fd819c8a7f70"},{url:"/_next/static/chunks/reactPlayerMixcloud.9c2c452f97ad84fd.js",revision:"9c2c452f97ad84fd"},{url:"/_next/static/chunks/reactPlayerPreview.dc80e84b54ddb38b.js",revision:"dc80e84b54ddb38b"},{url:"/_next/static/chunks/reactPlayerSoundCloud.12d57d0c2462e1c7.js",revision:"12d57d0c2462e1c7"},{url:"/_next/static/chunks/reactPlayerStreamable.31abfa2944e52f3d.js",revision:"31abfa2944e52f3d"},{url:"/_next/static/chunks/reactPlayerTwitch.1814be60b0da26c7.js",revision:"1814be60b0da26c7"},{url:"/_next/static/chunks/reactPlayerVidyard.175137e94b7bd015.js",revision:"175137e94b7bd015"},{url:"/_next/static/chunks/reactPlayerVimeo.03832ba5c90a3e35.js",revision:"03832ba5c90a3e35"},{url:"/_next/static/chunks/reactPlayerWistia.96f445c7246a1afd.js",revision:"96f445c7246a1afd"},{url:"/_next/static/chunks/reactPlayerYouTube.ae90afa4ec69a763.js",revision:"ae90afa4ec69a763"},{url:"/_next/static/chunks/webpack-0f54dbc967ec03a6.js",revision:"0f54dbc967ec03a6"},{url:"/_next/static/css/c3152cfb7a54862e.css",revision:"c3152cfb7a54862e"},{url:"/favicon.ico",revision:"8b0db3602c16ea7e642b01c17d6659f6"},{url:"/fonts/Gilroy-ExtraBold.otf",revision:"0f6e082f42f5247d82c3ade9c2a8f928"},{url:"/fonts/Gilroy-Light.otf",revision:"c62aded729bf7146d491275e5019d7fc"},{url:"/fonts/Gilroy-Medium.ttf",revision:"c83281ae1ca703d0741a770ee7e7c091"},{url:"/fonts/Gilroy-Regular.ttf",revision:"31ff7c1a62a300dbbf9656b4ba14a0d5"},{url:"/fonts/Gilroy-Semibold.woff2",revision:"aebaa8b1ed01037d84d61390cbba818f"},{url:"/icons/Add.svg",revision:"aee162773b89968c8830bc88161920ee"},{url:"/icons/Add_to_Queue.svg",revision:"aeb0e0c7d262e32b8b0cb6974d64b033"},{url:"/icons/Close.svg",revision:"181f32c5d42e59154bbaa8772c7353b0"},{url:"/icons/Globe.svg",revision:"df35d0cabc511a0501f752a6d3734378"},{url:"/icons/GlobeBlue.svg",revision:"8f94693d81a5cf285c38198e50b53fd8"},{url:"/icons/HeartControls.svg",revision:"3624786b5dd8a68ce5f92992018c97b8"},{url:"/icons/HeartFilled2.svg",revision:"2f6e2d344ae8a79dbe45dc1f823087aa"},{url:"/icons/NowPlaying.svg",revision:"576abc787a6a225bcec81583ec047f67"},{url:"/icons/Play_Controls.svg",revision:"5f9a6fad529432ab4ddb74fe08dae302"},{url:"/icons/Playing.svg",revision:"83288179d6d81fc6a53adaf877a764a3"},{url:"/icons/PlayingBlue.svg",revision:"bcce40404cc74f865898fccb675fddce"},{url:"/icons/Playlist.svg",revision:"ebf664e74090593b3fff4b3a9b16a500"},{url:"/icons/Playlists.svg",revision:"c9dddbac33a7b9b71d1ea8fac772c878"},{url:"/icons/PlaylistsBlue.svg",revision:"dbc85b7ece88c001d5568a32f47658dd"},{url:"/icons/Repeat.svg",revision:"ee0c70e1c6c589095acd83c52f21c814"},{url:"/icons/RepeatOnce.svg",revision:"ebeab92d6b832a8c2e17f93ba2a5dd75"},{url:"/icons/Shuffle.svg",revision:"91912927bfe689d2ad4194d8e475b6fe"},{url:"/icons/ShuffleFilled.svg",revision:"659d881e72c37a606b7324c81d4b9ee3"},{url:"/icons/SmallHeart.svg",revision:"ecf5dc5e6a6fc6a339a83ac159af8541"},{url:"/icons/SmallHeartFilled.svg",revision:"60ae086852f15434d87df7da3ff87b20"},{url:"/icons/SmallShare.svg",revision:"0a96cb2361d27d37801163a709b2acf6"},{url:"/icons/SmallThreeDots.svg",revision:"cc7be11f7e53ae81a9dd94190071fa2b"},{url:"/icons/Volume.svg",revision:"4a13298bbbf9bff88d0e00b59b913694"},{url:"/icons/logos/Catalog.svg",revision:"2894bf12c26a6a9054510b00fa6b2762"},{url:"/icons/logos/Nina.svg",revision:"f58f46e14cb496fe2386c6dcbca107c3"},{url:"/icons/logos/Reamp_xyz_512.svg",revision:"190a0c2af4b751062a96a346b97fe136"},{url:"/icons/logos/Sound.svg",revision:"a4c5d0d189149f315bc78f8cb656c650"},{url:"/icons/logos/Zora.svg",revision:"baa280c8a01206578a8f4ef160c5af0c"},{url:"/images/Reamp_AQUA.svg",revision:"7b0414dd88391469b452c9df01eb2e27"},{url:"/images/Reamp_Cover_BG.png",revision:"1e2cf777ef84c96603ced23d18743bad"},{url:"/images/Reamp_WHT.svg",revision:"38f2b18fd0f576b40e4574da8345568a"},{url:"/images/reamp-logo-blue.png",revision:"01b6af7586ad0174ad287009c46ad19b"},{url:"/images/reamp-logo-white.png",revision:"0f8ab074787527038813fd34c175e114"},{url:"/manifest.json",revision:"2700a67ba9883362ece1674cebd047cf"},{url:"/pfp/Reamp_pfp_blue.svg",revision:"258d21fa75c1667ea8a0d3cb2a8b1c33"},{url:"/pfp/Reamp_pfp_green.svg",revision:"db04e954f3d24997d45f78829a86b97a"},{url:"/pfp/Reamp_pfp_orange.svg",revision:"86072251b3cc93ba0b77848027296deb"},{url:"/pfp/Reamp_pfp_yellowpink.svg",revision:"7f35a425cc112d22dc7f7f2c5600c00b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));