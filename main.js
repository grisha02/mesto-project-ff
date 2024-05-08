(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)},n=function(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}},o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"eb139a18-e29d-4a3a-8ab5-b4e4371081dd","Content-Type":"application/json"}},r=function(){return fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function c(e,t,n,r,c){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button"),s=a.querySelector(".card__image"),l=a.querySelector(".card__title"),d=a.querySelector(".card__like-count");return s.src=e.link,s.alt=e.name,l.textContent=e.name,d.textContent=e.likes.length,e.owner._id===c?i.style.display="block":i.style.display="none",e.likes.some((function(e){return e._id===c}))&&u.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){var n;n=e._id,fetch("".concat(o.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))})),t(a)})),u.addEventListener("click",(function(){n(e._id,u,d)})),s.addEventListener("click",(function(){r(e.link,e.name)})),a}function a(e){e.remove()}function i(e,t,n){var r=t.classList.contains("card__like-button_is-active"),c=parseInt(n.textContent);r?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}))}(e).then((function(){t.classList.remove("card__like-button_is-active"),c--,n.textContent=c.toString()})).catch((function(e){console.log("Ошибка при удалении лайка:",e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}))}(e).then((function(){t.classList.add("card__like-button_is-active"),c++,n.textContent=c.toString()})).catch((function(e){console.log("Ошибка при добавлении лайка:",e)}))}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},s=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""};function l(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,o,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var m=document.querySelector(".places__list"),_=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_new-card"),b=document.querySelectorAll(".popup__close"),S=document.forms["edit-profile"],k=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=document.forms["new-place"],L=document.forms["new-place"]["place-name"],j=document.forms["new-place"].link,x=document.querySelector(".popup_type_image"),A=x.querySelector(".popup__image"),P=x.querySelector(".popup__caption"),w=document.querySelectorAll(".popup"),U=document.forms["edit-profile-avatar"],O=document.forms["edit-profile-avatar"]["link-avatar"],T=document.querySelector(".popup_type_edit-profile"),B=document.querySelector(".profile__image");function D(t,n){A.src=t,A.alt=n,P.textContent=n,e(x)}function I(e,t){var n=e.querySelector(".popup__button");n.textContent=t?"Сохранение...":"Сохранить",n.disabled=t}_.addEventListener("click",(function(){p(S,u);var t=E.textContent;S.elements.name.value=t;var n=g.textContent;S.elements.description.value=n,e(v),l(u)})),S.addEventListener("submit",(function(e){e.preventDefault(),I(S,!0);var n=k.value,r=q.value;(function(e,t){return fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(n,r).then((function(){E.textContent=n,g.textContent=r,t(v)})).catch((function(e){console.log(e)})).finally((function(){I(S,!1)}))})),y.addEventListener("click",(function(){e(h),l(u)})),C.addEventListener("submit",(function(e){e.preventDefault(),I(C,!0);var n=L.value,u=j.value;r().then((function(e){var r,s;(r=n,s=u,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:r,link:s})}).then((function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}))).then((function(n){m.prepend(c(n,a,i,D,e._id)),t(h),C.reset()})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})).finally((function(){I(C,!1)}))})),B.addEventListener("click",(function(){r().then((function(e){O.value=e.avatar,p(U,u)})),e(T),l(u)})),U.addEventListener("submit",(function(e){e.preventDefault(),I(U,!0);var n=O.value;(function(e){return fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(n).then((function(){B.style.backgroundImage="url('".concat(n,"')"),t(T)})).catch((function(e){console.log(e)})).finally((function(){I(U,!1)}))})),b.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup_is-opened"))}))})),w.forEach((function(e){e.classList.add("popup_is-animated")})),document.addEventListener("click",(function(e){e.target.classList.contains("popup_is-opened")&&t(e.target)})),Promise.all([r(),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],u=o[1];E.textContent=r.name,g.textContent=r.about,B.style.backgroundImage="url('".concat(r.avatar,"')"),u.forEach((function(e){var t=c(e,a,i,D,r._id);m.appendChild(t)}))})).catch((function(e){console.log(e)}))})();