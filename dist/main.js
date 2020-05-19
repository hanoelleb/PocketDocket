!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++)e.appendChild(t[n])}function r(e,t,n="",o=""){var r,i=[];if("submit"!==t){var a=document.createElement("label");a.innerHTML=n,a.style.cssText="width: 100px",i.push(a)}"textarea"!==t?((r=document.createElement("input")).type=t,r.style.cssText="margin-right: 75px; margin-bottom: 10px;","submit"!==t&&""!==o&&(r.placeholder=o),"submit"===t&&""!=n&&(r.value=n),r.id=e,i.push(r)):((r=document.createElement("textarea")).rows=6,r.cols=40,r.style.cssText="margin-right: 75px; margin-bottom: 10px;",""!==o&&(r.placeholder=o),r.id=e,i.push(r));return i}function i(e,t,n){var o=document.createElement("label");o.innerHTML=e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()+": ";var r=document.createElement("select");r.id=e,r.style.cssText="margin-right: 120px; margin-bottom: 10px;";for(var i=0;i<t.length;i++){var a=document.createElement("option");a.value=t[i],a.innerHTML=n[i],r.appendChild(a)}return[o,r]}function a(e,t){var n=document.createElement("h2");n.innerHTML="Projects",e.appendChild(n);for(var o=0;o<t.length;o++){var r=document.createElement("div");r.style.cssText="background-color: #606060; margin-bottom: 20px; style: inline-block; height: 20px; width: 300px;",r.innerHTML=t[o].title+" "+t[o].desc+" "+t[o].date,e.appendChild(r)}return 1}function l(e){var t=document.getElementById("content");t.innerHTML="",console.log("clicked on "+e.title);var n=document.createElement("h2");n.innerHTML=e.title,t.appendChild(n);var o=document.createElement("h3");o.innerHTML=e.desc,t.append(o),t.append(function(e){var t=document.createElement("div");t.style.cssText="top: 0; right: 0; height: 100%; margin: 0px; padding: 0px; display: block; float: right; position: fixed; background-color: rgb(96, 96, 96);";var n=document.createElement("h3");n.innerHTML="Notes",t.appendChild(n);var o=document.createElement("p");o.innerHTML=e,t.appendChild(o);var r=document.createElement("textArea");t.appendChild(r);var i=document.createElement("button");return i.innerHTML="Edit",t.appendChild(i),t}(e.notes))}function c(e){for(var t=document.getElementById("content"),n=[],o=[],r=0;r<e.length;r++){var i=document.createElement("div");i.innerHTML=r+1+". "+e[r].task,e[r].getIsDone()&&(i.style.textDecoration="line-through");var a=document.createElement("button");a.innerHTML="Done",a.addEventListener("click",()=>{i.style.textDecoration="line-through",i.firstElementChild.style.textDecoration="none!important"}),i.appendChild(a);var l=document.createElement("h5");l.innerHTML="Details: "+e[r].details,l.style.textDecoration="none",l.style.display="none",i.appendChild(l),n.push(l);const c=r;i.onmouseover=function(){n[c].style.display="block"},i.onmouseout=function(){n[c].style.display="none"},t.appendChild(i),o.push(a)}return o}n.r(t);const d=(e,t,n,o,r,i="",a="",l=[])=>({title:e,date:t,priority:n,category:o,completed:r,desc:i,notes:a,addTodoItem:(e,t,n)=>{var o=((e,t,n="")=>({task:e,getIsDone:()=>t,details:n,setIsDone:e=>{console.log("before: "+t),t=e,console.log("after: "+t)}}))(e,t,n);l.push(o)},getTodos:()=>l,markTodo:e=>{console.log("within markTodo: "+l[e].task+" "+l[e].getIsDone()),l[e].setIsDone(!0),console.log("within markTodo after: "+l[e].task+" "+l[e].getIsDone())}}),s=(u=[],{getRoster:()=>u,addToRoster:e=>{u.push(e)},getProjectsById:e=>{for(var t=[],n=0;n<u.length;n++)u[n].category===e&&t.push(u[n]);return t}});var u;const p=["#e6fc67","#fc6e67","#67e8fc","#fc67b6","#fc9167","#67fc94","#aa67fc"];function m(e){var t=document.createElement("form");e.appendChild(t),t.id="projectForm",t.style.cssText="right: 35%; position: fixed; margin-left: auto; margin-right: auto;width: 300px; display: none; z-index: 5; font-family: Arial",o(t,r("title","text","Title: ","Project Name")),o(t,r("date","date","Date: ")),o(t,r("desc","textarea","Project Description (optional): ")),o(t,r("notes","textarea","Project Notes (optional): ","contact information, important links, ties to other projects, etc.")),o(t,i("priority",[1,2,3],["low","medium","high"]));const n=["school","work","home","social","recreation","finance","personal","other"];o(t,i("category",n,n)),o(t,r("submit","submit","Add Project")),t.onsubmit=f}function h(){document.getElementById("projectForm").style.display="block"}function g(e){var t=document.createElement("button");t.innerHTML="+Project",t.onclick=h,e.appendChild(t)}function f(e){var t=document.getElementById("content").childNodes.item("projectForm"),n=t.childNodes[1].value,o=t.childNodes[3].value,r=t.childNodes[5].value,i=t.childNodes[7].value,a=t.childNodes[9].value,l=t.childNodes[11].value,c=d(n,o,a,l,!1,r,i);return s.addToRoster(c),v(),t.style.display="none",!1}function v(){var e=document.getElementById("content"),t=s.getRoster();e.innerHTML="",m(e);for(var n=a(e,t)+1,o=0;o<t.length;o++){const r=o;e.children[n].addEventListener("click",()=>{l(t[r]),b(e,t[r]),T(e),c(t[r].getTodos())}),n++}g(e)}function y(e){var t=document.getElementById("content");t.innerHTML="",m(t);for(var n=a(t,e)+1,o=0;o<e.length;o++){const r=o;t.children[n].addEventListener("click",()=>{l(e[r]),b(t,e[r]),T(t),c(e[r].getTodos())}),n++}g(t)}function x(){document.getElementById("todo").style.display="block"}function T(e){var t=document.createElement("button");t.innerHTML="+Task",t.onclick=x,e.appendChild(t)}function b(e,t){console.log("the current project: "+t.title);var n=document.createElement("form");n.id="todo",n.style.cssText="right: 35%; position: fixed; margin-left: auto; margin-right: auto;width: 300px; display: none; z-index: 5; font-family: Arial",e.appendChild(n);var i=r("desc","text","Task: ");o(n,i);var a=r("details","textarea","Details (optional): ","Locations, needed contact info, etc.");o(n,a);var d=r("todoSubmit","submit","Add Task");o(n,d),n.onsubmit=function(){var e=document.getElementById("content"),o=(e.childNodes.item("todo"),n.childNodes[1].value),r=n.childNodes[3].value;t.addTodoItem(o,!1,r),console.log("get todos: "+t.getTodos()[0].task),e.innerHTML="",l(t),b(e,t);for(var i=c(t.getTodos()),a=0;a<i.length;a++){const e=a;i[a].addEventListener("click",()=>{for(var n=t.getTodos(),o=0;o<n.length;o++)console.log(n[o].task+" "+n[o].getIsDone());console.log("------------------------------"),t.markTodo(e);var r=t.getTodos();for(o=0;o<n.length;o++)console.log(r[o].task+" "+r[o].getIsDone())})}return T(e),n.style.display="none",!1}}!function(){document.body.style.cssText="background-color: #111111; color: #fcfcfc; font-family: Arial;",function(){var e=document.createElement("div");e.id="navbar",document.body.appendChild(e);var t=document.createElement("ul");t.style.cssText="float: left; list-style-type: none; margin: 0; padding: 0; height: 100%; width: 120px; position: fixed;background-color: #606060",e.appendChild(t);const n=["All Projects","This Week","High Priority"];for(var o=0;o<n.length;o++){var r=document.createElement("li");r.style.cssText="padding-left: 5px; padding-bottom: 5px; display: block, width: 60px;",r.innerHTML=n[o],r.onclick=v,t.appendChild(r)}const i=["School","Work","Home","Social","Recreation","Finance","Personal","Other"];for(o=0;o<i.length;o++){var a=document.createElement("li");a.style.cssText="padding-left: 5px; padding-bottom: 5px; display: block, width: 60px;",a.innerHTML=i[o];const e=o;a.onclick=()=>{y(s.getProjectsById(i[e].toLowerCase()))};var l=document.createElement("span");l.style.cssText="position: relative; float: left; top: 50%; display: block; background-color: "+p[o]+"; border-radius: 50%; width : 10px; height : 10px; z-index: 1;",a.appendChild(l),t.appendChild(a)}}();var e=document.createElement("div");e.id="content",e.style.cssText="padding: 20px; position: relative; left: 20%",document.body.appendChild(e)}(),v()}]);