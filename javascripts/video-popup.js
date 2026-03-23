export const globalVideoPopup=n=>{if(n.length){const t=document.querySelector("#videoModal");t&&(t.addEventListener("shown.bs.modal",n=>{const f=n.relatedTarget,e=f?.getAttribute("data-video-id")?.trim(),r=f?.getAttribute("data-video-type")?.trim(),u=t.querySelectorAll("[data-video-popup]");if(u.length){const i=u[0].querySelector("[data-video-wrapper]");if(i){i.setAttribute("data-video-type",r);i.setAttribute("data-video-id",e);const o=i.querySelectorAll(".video__frame-wrapper");if(o.length===0&&(r==="vimeo"||r==="youtube"))i.insertAdjacentHTML("beforeend",'<div data-video-frame class="video__frame-wrapper"><\/div>');else if(r==="brightcove"){const n=i.querySelector(".video-player-app");n||i.insertAdjacentHTML("beforeend",`<div class="video-player-app h-100 w-100">
                        <inv-video-player
                            reference-id="${e}"
                            :autoplay="true"
                            :enable-caption="false"
                            :enable-fullscreen="true"
                            :enable-playback-speed="true"
                            :enable-video-quality="true"
                            :background-video="false"
                            :enable-preview="false"
                            :hide-default-controls="false"
                            :enable-stop-button="false"
                        ></inv-video-player>
                    </div>`);VideoPlayers.init([".video-player-app"])}const s=u[0].querySelectorAll("[data-video-wrapper]");setTimeout(()=>{import("./video-player.js").then(n=>{n.globalVideoPlayer(s)})},100)}}}),t.addEventListener("hide.bs.modal",()=>{const n=t.querySelectorAll("[data-video-popup]");if(n.length){const t=n[0].querySelector("[data-video-wrapper]");t&&(t.innerHTML="")}}))}}