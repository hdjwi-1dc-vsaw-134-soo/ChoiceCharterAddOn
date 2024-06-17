import{b as l}from"./init-cbacef14.js";let i="https://admin.workadventu.re";function c(){const o=WA.player.userRoomToken;if(o===void 0)throw new Error("No userRoomToken found. The quests plugin can only work with WorkAdventure SAAS edition (at https://play.workadventu.re).");return o}async function u(o,e){if(!WA.player.isLogged)throw new Error("You must be logged to gain XP.");const t=new URL(`/api/quests/${o}/level-up`,i),r=await fetch(t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:c()},body:JSON.stringify({xp:e})});if(!r.ok)throw new Error(`An error occurred. HTTP Code: ${r.status} ${r.statusText}.`);const s=await r.json();return s.awardedBadges.length>0&&(async()=>{for(const a of s.awardedBadges)await d(o,a)})().catch(a=>{console.error(a)}),s}async function d(o,e){const t=new URL(`/quests/${o}/badge/${e}/congratulations`,i);t.search=new URLSearchParams({token:c()}).toString(),await WA.ui.website.open({url:t.toString(),position:{vertical:"middle",horizontal:"middle"},allowApi:!0,visible:!0,size:{width:"100%",height:"100%"}})}console.log("Script started successfully");let n;WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.onEnterLayer("exit_zone").subscribe(async()=>{await u("1101_ESCAPE_ROOM_FIBONACCI_100_ROADS_OFFICE",10),console.log("Test passed")}),WA.room.onEnterLayer("clockZone").subscribe(()=>{const o=new Date,e=o.getHours()+":"+o.getMinutes();n=WA.ui.openPopup("clockPopup","It's "+e,[])}),WA.room.onEnterLayer("tv_zone").subscribe(()=>{WA.room.showLayer("tv-on")}),WA.room.onLeaveLayer("tv_zone").subscribe(()=>{WA.room.hideLayer("tv-on")}),WA.room.onLeaveLayer("clockZone").subscribe(p),l().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o))}).catch(o=>console.error(o));function p(){n!==void 0&&(n.close(),n=void 0)}
