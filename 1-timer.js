import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as b,i as c}from"./assets/vendor-BbbuE1sJ.js";const t=document.querySelector("button[data-start]"),u=document.querySelector("button[data-reset]"),r=document.querySelector("#datetime-picker"),p=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),T=document.querySelector("[data-minutes]"),q=document.querySelector("[data-seconds]");let a=null,i=null;const v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const n=new Date;i=e[0],i<=n?(c.error({title:"Error",message:"Please choose a date in the future",timeout:2e3,transitionIn:"flipInX",transitionOut:"flipOutX",color:"#FF0000",icon:""}),t.disabled=!0):(t.disabled=!1,u.disabled=!1)}};b(r,v);function C(e){const m=Math.floor(e/864e5),f=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),y=Math.floor(e%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:h,seconds:y}}function d({days:e,hours:n,minutes:o,seconds:l}){p.textContent=s(e),S.textContent=s(n),T.textContent=s(o),q.textContent=s(l)}function s(e){return String(e).padStart(2,"0")}function D(){const e=i;r.disabled=!0,t.disabled=!0,a=setInterval(()=>{const o=e-new Date;o<=0?(clearInterval(a),c.success({title:"Success",message:"Countdown Complete!"}),r.disabled=!1,t.disabled=!0,d({days:0,hours:0,minutes:0,seconds:0})):d(C(o))},1e3)}function I(){clearInterval(a),a=null,d({days:0,hours:0,minutes:0,seconds:0}),r.disabled=!1,t.disabled=!0,u.disabled=!0,c.info({title:"Reset",message:"Timer has been reset!"})}t.addEventListener("click",D);u.addEventListener("click",I);
//# sourceMappingURL=1-timer.js.map