(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{42:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(49);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(47),c=a.n(n),r=a(48),l=a(10),s=a(0),u=a.n(s),i=a(8),m=(a(60),function(e){return u.a.createElement("div",{className:"avatar ".concat(e.className),style:e.style},u.a.createElement("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}}))}),o=a(42),p=(a(61),function(e){return u.a.createElement("li",{className:"user-item"},u.a.createElement(o.a,{className:"user-item__content"},u.a.createElement(i.b,{to:"/".concat(e.id,"/places")},u.a.createElement("div",{className:"user-item__image"},u.a.createElement(m,{image:"".concat("https://your-place5.herokuapp.com/").concat(e.image),alt:e.name})),u.a.createElement("div",{className:"user-item__info"},u.a.createElement("h2",null,e.name),u.a.createElement("h3",null,e.placeCount," ",1===e.placeCount?"Place":"Places")))))}),f=(a(62),function(e){return 0===e.items.length?u.a.createElement("div",{className:"center"},u.a.createElement(o.a,null,u.a.createElement("h2",null,"No users found."))):u.a.createElement("ul",{className:"users-list"},e.items.map((function(e){return u.a.createElement(p,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places.length})})))}),E=a(50),d=a(15),h=a(51);t.default=function(){var e=Object(h.a)(),t=e.isLoading,a=e.error,n=e.sendRequest,i=e.clearError,m=Object(s.useState)(),o=Object(l.a)(m,2),p=o[0],v=o[1];return Object(s.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n("https://your-place5.herokuapp.com/api/users/");case 3:t=e.sent,v(t.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[n]),u.a.createElement(u.a.Fragment,null,u.a.createElement(E.a,{error:a,onClear:i}),t&&u.a.createElement("div",{className:"center"},u.a.createElement(d.a,null)),!t&&p&&u.a.createElement(f,{items:p}))}}}]);
//# sourceMappingURL=8.939fcacd.chunk.js.map