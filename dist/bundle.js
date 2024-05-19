(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{gf:()=>y,dg:()=>E,ri:()=>w,uZ:()=>q,kQ:()=>b});const t="posts",n="user-posts",o="auth",s="add-post",r="loading";function a({element:e}){return e.innerHTML=`\n  <div class="page-header">\n      <h1 class="logo">instapro</h1>\n      <button class="header-button add-or-login-button">\n      ${b?'<div title="Добавить пост" class="add-post-sign"></div>':"Войти"}\n      </button>\n      ${b?`<button title="${d(b.name)}" class="header-button logout-button">Выйти</button>`:""}  \n  </div>  \n`,e.querySelector(".add-or-login-button").addEventListener("click",(()=>{E(b?s:o)})),e.querySelector(".logo").addEventListener("click",(()=>{E(t)})),e.querySelector(".logout-button")?.addEventListener("click",w),e}function i(e,t){const n=document.querySelector(`[data-post-id="${e}"]`);if(n){n.querySelector("img").src=t?"./assets/images/like-not-active.svg":"./assets/images/like-active.svg"}}function l(e,t){e.querySelectorAll(".like-button").forEach((e=>{e.addEventListener("click",(n=>{n.stopPropagation();const o=e.dataset.postId,s="true"===e.dataset.liked;t(o,s).then((e=>{i(o,s)})).catch((e=>{console.error("Ошибка при обработке лайка:",e)}))}))}))}const c=e=>{const t=new Date(e),n=new Date-t;return`${Math.round(n/6e4)} минут назад`},d=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");function u(e,t){const n=y();return t?v(e,{token:n}).then((t=>{const n=document.querySelector(`[data-post-id="${e}"]`);return n&&(n.querySelector("img").src="./assets/images/like-not-active.svg",n.dataset.liked="false"),t})).catch((e=>{throw console.error("Ошибка при дизлайке:",e),e})):m(e,{token:n}).then((t=>{const n=document.querySelector(`[data-post-id="${e}"]`);return n&&(n.querySelector("img").src="./assets/images/like-active.svg",n.dataset.liked="true"),t})).then((()=>function(){const e=y();return fetch(g,{method:"GET",headers:{Authorization:e}}).then((e=>{if(401===e.status)throw new Error("Нет авторизации");return e.json()})).then((e=>e.posts))}())).then((t=>{q(t),i(e,!0)})).catch((e=>{throw console.error("Ошибка при лайке:",e),e}))}const p="https://webdev-hw-api.vercel.app",g=`${p}/api/v1/karina-rozenberga/instapro`,m=(e,{token:t})=>fetch(`${g}/${e}/like`,{method:"POST",headers:{Authorization:t}}).then((e=>{if(!e.ok)throw new Error(`Ошибка ${e.status}: ${e.statusText}`);return e.json()})).catch((e=>{throw alert("Вы не авторизованы!"),e})),v=(e,{token:t})=>fetch(`${g}/${e}/dislike`,{method:"POST",headers:{Authorization:t}}).then((e=>{if(!e.ok)throw new Error(`Ошибка ${e.status}: ${e.statusText}`);return e.json()})).catch((e=>{throw console.error("Ошибка при удалении лайка:",e),alert("Что-то пошло не так, попробуйте позже."),e}));function h({element:e,onImageUrlChange:t}){let n="";const o=()=>{e.innerHTML=`\n  <div class="upload=image">\n      ${n?`\n          <div class="file-upload-image-conrainer">\n            <img class="file-upload-image" src="${n}">\n            <button class="file-upload-remove-button button">Заменить фото</button>\n          </div>\n          `:'\n            <label class="file-upload-label secondary-button">\n                <input\n                  type="file"\n                  class="file-upload-input"\n                  style="display:none"\n                />\n                Выберите фото\n            </label>'}\n  </div>`;const s=e.querySelector(".file-upload-input");s?.addEventListener("change",(()=>{const e=s.files[0];if(e){const s=document.querySelector(".file-upload-label");s.setAttribute("disabled",!0),s.textContent="Загружаю файл...",function({file:e}){const t=new FormData;return t.append("file",e),fetch(p+"/api/upload/image",{method:"POST",body:t}).then((e=>e.json()))}({file:e}).then((({fileUrl:e})=>{n=e,t(n),o()}))}})),e.querySelector(".file-upload-remove-button")?.addEventListener("click",(()=>{n="",t(n),o()}))};o()}function f({appEl:e}){let n="";e.innerHTML='\n    <div class="page-container">\n      <div class="header-container"></div>\n      <div class="form">\n        <h3 class="form-title">Добавить пост</h3>\n        <div class="form-inputs">\n          <div class="upload-image-container"></div>\n          <label>Описание:</label>\n          <textarea class="input textarea" id=\'textarea-input\' rows="4"></textarea>\n          <button class="button" id="add-button">Добавить</button>\n        </div>\n      </div>\n    </div>',a({element:document.querySelector(".header-container")}),h({element:e.querySelector(".upload-image-container"),onImageUrlChange(e){n=e}}),document.getElementById("add-button").addEventListener("click",(()=>{const e=document.getElementById("textarea-input");""===e.value?alert("Заполните поле"):n?((e,n)=>{(function({description:e,imageUrl:t}){return fetch(g,{method:"POST",headers:{Authorization:y()},body:JSON.stringify({description:e,imageUrl:t})}).then((e=>e.json()))})({description:e,imageUrl:n,token:y()}).then((()=>{E(t)})).catch((e=>{console.error("Ошибка при добавлении поста:",e),alert("Произошла ошибка при добавлении поста. ")}))})(e.value,n):alert("Добавьте фотографию")}))}console.log("Hello, Webpack!");let b=function(e){try{return JSON.parse(window.localStorage.getItem("user"))}catch(e){return null}}(),k=null,$=[];const y=()=>b?`Bearer ${b.token}`:null,w=()=>{b=null,window.localStorage.removeItem("user"),E(t)},E=(e,a)=>{if(console.log("goToPage called with:",e,a),[t,o,s,n,r].includes(e))return e===s?(k=b?s:o,S()):e===t?(k=r,S(),function({token:e}){return fetch(g,{method:"GET",headers:{Authorization:e}}).then((e=>{if(401===e.status)throw new Error("Нет авторизации");return e.json()})).then((e=>(console.log("API response:",e),e.posts)))}({token:y()}).then((e=>{console.log("getPosts resolved:",e),k=t,$=e,S()})).catch((e=>{console.error("Error fetching posts:",e),E(t)}))):e===n?function({id:e}){return fetch(g+`/user-posts/${e}`,{method:"GET"}).then((e=>e.json())).then((e=>e.posts))}({id:a.userId}).then((e=>{console.log("getUserPosts resolved:",e),k=n,$=e,S()})).catch((e=>{console.log(e),console.error("Error fetching user posts:",e),E(t)})):(k=e,void S());throw new Error("страницы не существует")},S=()=>{console.log("renderApp called with page:",k);const e=document.getElementById("app");return k===r?function({appEl:e,user:t,goToPage:n}){e.innerHTML='\n              <div class="page-container">\n                <div class="header-container"></div>\n                <div class="loading-page">\n                  <div class="loader"><div></div><div></div><div></div></div>\n                </div>\n              </div>',a({user:t,element:document.querySelector(".header-container"),goToPage:n})}({appEl:e,user:b,goToPage:E}):k===o?function({appEl:e,setUser:t}){let n=!0,o="";const s=()=>{const r=`\n      <div class="page-container">\n          <div class="header-container"></div>\n          <div class="form">\n              <h3 class="form-title">\n                ${n?"Вход в&nbsp;Instapro":"Регистрация в&nbsp;Instapro"}\n                </h3>\n              <div class="form-inputs">\n    \n                  ${n?"":'\n                      <div class="upload-image-container"></div>\n                      <input type="text" id="name-input" class="input" placeholder="Имя" />\n                      '}\n                  \n                  <input type="text" id="login-input" class="input" placeholder="Логин" />\n                  <input type="password" id="password-input" class="input" placeholder="Пароль" />\n                  \n                  <div class="form-error"></div>\n                  \n                  <button class="button" id="login-button">${n?"Войти":"Зарегистрироваться"}</button>\n              </div>\n            \n              <div class="form-footer">\n                <p class="form-footer-title">\n                  ${n?"Нет аккаунта?":"Уже есть аккаунт?"}\n                  <button class="link-button" id="toggle-button">\n                    ${n?"Зарегистрироваться.":"Войти."}\n                  </button>\n                </p> \n               \n              </div>\n          </div>\n      </div>    \n`;e.innerHTML=r;const i=t=>{e.querySelector(".form-error").textContent=t};a({element:document.querySelector(".header-container")}),e.querySelector(".upload-image-container")&&h({element:e.querySelector(".upload-image-container"),onImageUrlChange(e){o=e}}),document.getElementById("login-button").addEventListener("click",(()=>{if(i(""),n){const e=document.getElementById("login-input").value,n=document.getElementById("password-input").value;if(!e)return void alert("Введите логин");if(!n)return void alert("Введите пароль");(function({login:e,password:t}){return fetch(p+"/api/user/login",{method:"POST",body:JSON.stringify({login:e,password:t})}).then((e=>{if(400===e.status)throw new Error("Неверный логин или пароль");return e.json()}))})({login:e,password:n}).then((e=>{t(e.user)})).catch((e=>{console.warn(e),i(e.message)}))}else{const e=document.getElementById("login-input").value,n=document.getElementById("name-input").value,s=document.getElementById("password-input").value;if(!n)return void alert("Введите имя");if(!e)return void alert("Введите логин");if(!s)return void alert("Введите пароль");if(!o)return void alert("Не выбрана фотография");(function({login:e,password:t,name:n,imageUrl:o}){return fetch(p+"/api/user",{method:"POST",body:JSON.stringify({login:e,password:t,name:n,imageUrl:o})}).then((e=>{if(400===e.status)throw new Error("Такой пользователь уже существует");return e.json()}))})({login:e,password:s,name:n,imageUrl:o}).then((e=>{t(e.user)})).catch((e=>{console.warn(e),i(e.message)}))}})),document.getElementById("toggle-button").addEventListener("click",(()=>{n=!n,s()}))};s()}({appEl:e,setUser:e=>{b=e,function(e){window.localStorage.setItem("user",JSON.stringify(e))}(b),E(t)},user:b,goToPage:E}):k===s?f({appEl:e,onAddPostClick:({description:e,imageUrl:n})=>{console.log("Adding post with description:",e,"and imageUrl:",n),E(t)}}):k===t?function({appEl:e,posts:t}){c();const o=`\n    <div class="page-container">\n      <div class="header-container"></div>\n      <ul class="posts">\n      ${t.length>0?t.map((e=>{const t=e.isLiked?"true":"false",n=e.likes?e.likes.length:0;let o="Нравится:";return o+=0===n?" 0":1===n?` ${d(e.likes[0].name)}`:` ${d(e.likes[0].name)} и еще ${n-1}`,`\n      <li class="post">\n        <div class="post-header" data-user-id="${e.user.id}">\n          <img src="${e.user.imageUrl}" class="post-header__user-image">\n          <p class="post-header__user-name">${d(e.user.name)}</p>\n        </div>\n        <div class="post-image-container">\n          <img class="post-image" src="${e.imageUrl}">\n        </div>\n        <div class="post-likes">\n          <button data-post-id="${e.id}" data-liked="${t}" class="like-button">\n            <img src="./assets/images/${e.isLiked?"like-active":"like-not-active"}.svg">\n          </button>\n          <p class="post-likes-text">\n            ${o}\n          </p>\n        </div>\n        <p class="post-text">\n          <span class="user-name">${d(e.user.name)}</span>\n          ${d(e.description)}\n        </p>\n        <p class="post-date">\n          ${c(e.createdAt)}\n        </p>\n      </li>\n    `})).join(""):"<p>Нет доступных постов</p>"}\n      </ul>\n    </div>`;e.innerHTML=o,a({element:e.querySelector(".header-container")}),l(e,u),e.querySelectorAll(".post-header").forEach((e=>{((e,t)=>{e.addEventListener("click",(()=>{E(n,{userId:t})}))})(e,e.dataset.userId)}))}({appEl:e,posts:$}):k===n?function({appEl:e,posts:t}){c();const n=`\n    <div class="page-container">\n      <div class="header-container"></div>\n      ${(e=>`\n      <div class="user-info">\n        <img src="${e.imageUrl}" class="user-info__user-image">\n        <p class="user-info__user-name">${d(e.name)}</p>\n      </div>\n    `)(t[0].user)}\n      <ul class="posts">\n        ${t.map((e=>{const t=e.likes.length;let n="Нравится:";return n+=0===t?" 0":1===t?` ${d(e.likes[0].name)}`:` ${d(e.likes[0].name)} и еще ${t-1}`,`\n    <li class="post">\n      <div class="post-header" data-user-id="${e.user.id}">\n        <div class="user-info-container"></div>\n      </div>\n      <div class="post-image-container">\n        <img class="post-image" src="${e.imageUrl}">\n      </div>\n      <div class="post-text">\n        ${d(e.description)}\n      </div>\n      <p class="post-date">\n        ${c(e.createdAt)}\n      </p>\n      <div class="post-likes">\n        <button data-post-id="${e.id}" data-liked="${e.isLiked?"true":"false"}" class="like-button">\n          <img src="./assets/images/${e.isLiked?"like-active":"like-not-active"}.svg">\n        </button>\n        <p class="post-likes-text">\n          ${n}\n        </p>\n      </div>\n    </li>\n  `})).join("")}\n      </ul>\n    </div>`;e.innerHTML=n,a({element:e.querySelector(".header-container")}),l(e,u)}({appEl:e,posts:$}):void 0};function q(e){$=e}E(t)})();