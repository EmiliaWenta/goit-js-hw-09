const t=document.querySelectorAll("button"),e=document.querySelector("body"),o=t[0],d=t[1];o.addEventListener("click",(t=>{t.stopPropagation,timerId=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;e.style.background=t,localStorage.setItem("bodyRandomHexColor",t),o.setAttribute("disabled","disabled"),d.removeAttribute("disabled")}),1e3)})),d.addEventListener("click",(t=>{t.stopPropagation,clearInterval(timerId),d.setAttribute("disabled","disabled"),o.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.110d800e.js.map
