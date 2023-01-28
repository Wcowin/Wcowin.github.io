//雪花
// const fps = 30;
// const mspf = Math.floor(1000 / fps) ; 

// let width = window.innerWidth || document.documentElement.clientWidth;
// let height = window.innerHeight || document.documentElement.clientHeight;
// let canvas;
// window.addEventListener('resize', () => {
//   width = window.innerWidth || document.documentElement.clientWidth;
//   height = window.innerHeight || document.documentElement.clientHeight;
//   if (canvas) {
//     canvas.width = width;
//     canvas.height = height;
//   }
// });

// let particles = [];
// let wind = [0, 0];
// let cursor = [0, 0];

// function velocity(r) {
//   return 70 / r + 30;
// }

// function sine_component(h, a) {
//   return [2 * Math.PI / h, Math.random() * a, Math.random() * 2 * Math.PI]; // [frequency, amplitude, phase]
// }

// function calc_sine(components, x) {
//   let sum = 0;
//   for (let i = 0; i < components.length; i++) {
//     const [f, a, p] = components[i];
//     sum += Math.sin(x * f + p) * a;
//   }
//   return sum;
// }

// function gen_particle() {
//   let r = Math.random() * 4 + 1;
//   return {
//     radius: r,
//     x: Math.random() * width,
//     y: -r,
//     opacity: Math.random(),
//     sine_components: [sine_component(height, 3), sine_component(height / 2, 2), sine_component(height / 5, 1), sine_component(height / 10, 0.5)],
//   };
// }

// function update_pos(dt) {
//   const n = particles.length;
//   for (let i = 0; i < n; i++) {
//     const v = velocity(particles[i].radius);
//     particles[i].x += calc_sine(particles[i].sine_components, particles[i].y) * v / 5 * dt;
//     particles[i].y += v * dt;
    
//     // const dist = Math.hypot(particles[i].x - cursor[0], particles[i].y - cursor[1]) + 1;
//     // particles[i].x += wind[0] * dt / dist
//     // particles[i].y += wind[1] * dt / dist;
    
//     if (particles[i].y - particles[i].radius > height) {
//       particles[i] = gen_particle();  
//     }
//   }
// }

// let context_cache;
// function get_context() {
//   if (context_cache)
//     return context_cache;
  
//   canvas = document.createElement('canvas');
//   canvas.id = 'snow-canvas';
//   canvas.width = width;
//   canvas.height = height;
//   canvas.style = 'position: fixed; top: 0; left: 0; overflow: hidden; pointer-events: none; z-index: 256;';
//   if ((document.documentElement.dataset.darkreaderMode || "").startsWith('filter'))
//     canvas.style.filter = 'invert(1)';
//   document.body.appendChild(canvas);
  
//   context_cache = canvas.getContext('2d');
//   return context_cache;
// }

// function draw() {
//   const ctx = get_context();
  
//   ctx.clearRect(0, 0, width, height);
  
//   const n = particles.length;
//   for (let i = 0; i < n; i++) {
//     const p = particles[i];
//     ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
//     ctx.shadowColor = '#80EDF7';
//     ctx.shadowBlur = 7;
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2*Math.PI);
//     ctx.fill();
//   }
// }

// let focused = true;
// let disabled = false;
// let lastTime = performance.now();
// const requestFrame = () => setTimeout(loop, mspf);
// function loop() {
//   const dt = (performance.now() - lastTime) / 1000;
  
//   if (particles.length < 120 && Math.random() < 0.1) {
//     particles.push(gen_particle());
//   }
  
//   update_pos(dt);
//   draw();
  
//   lastTime = performance.now();
//   if (focused && !disabled)
//     requestFrame();
// }


// window.addEventListener('focus', () => {
//   console.log('snow start');
//   focused = true;
//   lastTime = performance.now();
//   requestFrame();
// });

// window.addEventListener('blur', () => {
//   console.log('snow stop');
//   focused = false;
// });

// window.addEventListener('keydown', e => {
//   if (e.ctrlKey && e.key == 's') {
//     e.preventDefault();
//     disabled = !disabled;
//     if (disabled) {
//       canvas.style.display = 'none';
//     } else {
//       canvas.style.display = 'block';
//       lastTime = performance.now();
//       requestFrame();
//     }
//   }
// });

// requestFrame();
//雪花


// 线条上
// !function() {
//     function o(w, v, i) {
//         return w.getAttribute(v) || i
//     }
//     function j(i) {
//         return document.getElementsByTagName(i)
//     }
//     function l() {
//         var i = j("script"),
//         w = i.length,
//         v = i[w - 1];
//         return {
//             l: w,
//             z: o(v, "zIndex", -1),
//             o: o(v, "opacity", 0.5),
//             c: o(v, "color", "0,0,0"),
//             n: o(v, "count", 99)
//         }
//     }
//     function k() {
//         r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//         n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//     }
//     function b() {
//         e.clearRect(0, 0, r, n);
//         var w = [f].concat(t);
//         var x, v, A, B, z, y;
//         t.forEach(function(i) {
//             i.x += i.xa,
//             i.y += i.ya,
//             i.xa *= i.x > r || i.x < 0 ? -1 : 1,
//             i.ya *= i.y > n || i.y < 0 ? -1 : 1,
//             e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
//             for (v = 0; v < w.length; v++) {
//                 x = w[v];
//                 if (i !== x && null !== x.x && null !== x.y) {
//                     B = i.x - x.x,
//                     z = i.y - x.y,
//                     y = B * B + z * z;
//                     y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
//                 }
//             }
//             w.splice(w.indexOf(i), 1)
//         }),
//         m(b)
//     }
//     var u = document.createElement("canvas"),
//     s = l(),
//     c = "c_n" + s.l,
//     e = u.getContext("2d"),
//     r,
//     n,
//     m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//     function(i) {
//         window.setTimeout(i, 1000 / 45)
//     },
//     a = Math.random,
//     f = {
//         x: null,
//         y: null,
//         max: 20000
//     };
//     u.id = c;
//     u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
//     j("body")[0].appendChild(u);
//     k(),
//     window.onresize = k;
//     window.onmousemove = function(i) {
//         i = i || window.event,
//         f.x = i.clientX,
//         f.y = i.clientY
//     },
//     window.onmouseout = function() {
//         f.x = null,
//         f.y = null
//     };
//     for (var t = [], p = 0; s.n > p; p++) {
//         var h = a() * r,
//         g = a() * n,
//         q = 2 * a() - 1,
//         d = 2 * a() - 1;
//         t.push({
//             x: h,
//             y: g,
//             xa: q,
//             ya: d,
//             max: 6000
//         })
//     }
//     setTimeout(function() {
//         b()
//     },
//     100)
// } ();
//线条下



//click    
// function clickEffect() {
//     let balls = [];
//     let longPressed = false;
//     let longPress;
//     let multiplier = 0;
//     let width, height;
//     let origin;
//     let normal;
//     let ctx;
//     const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
//     const canvas = document.createElement("canvas");
//     document.body.appendChild(canvas);
//     canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
//     const pointer = document.createElement("span");
//     pointer.classList.add("pointer");
//     document.body.appendChild(pointer);
 
//     if (canvas.getContext && window.addEventListener) {
//         ctx = canvas.getContext("2d");
//         updateSize();
//         window.addEventListener('resize', updateSize, false);
//         loop();
//         window.addEventListener("mousedown", function(e) {
//             pushBalls(randBetween(10, 20), e.clientX, e.clientY);
//             document.body.classList.add("is-pressed");
//             longPress = setTimeout(function() {
//                 document.body.classList.add("is-longpress");
//                 longPressed = true;
//             }, 500);
//         }, false);
//         window.addEventListener("mouseup", function(e) {
//             clearInterval(longPress);
//             if (longPressed == true) {
//                 document.body.classList.remove("is-longpress");
//                 pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
//                 longPressed = false;
//             }
//             document.body.classList.remove("is-pressed");
//         }, false);
//         window.addEventListener("mousemove", function(e) {
//             let x = e.clientX;
//             let y = e.clientY;
//             pointer.style.top = y + "px";
//             pointer.style.left = x + "px";
//         }, false);
//     } else {
//         console.log("canvas or addEventListener is unsupported!");
//     }
 
 
//     function updateSize() {
//         canvas.width = window.innerWidth * 2;
//         canvas.height = window.innerHeight * 2;
//         canvas.style.width = window.innerWidth + 'px';
//         canvas.style.height = window.innerHeight + 'px';
//         ctx.scale(2, 2);
//         width = (canvas.width = window.innerWidth);
//         height = (canvas.height = window.innerHeight);
//         origin = {
//             x: width / 2,
//             y: height / 2
//         };
//         normal = {
//             x: width / 2,
//             y: height / 2
//         };
//     }
//     class Ball {
//         constructor(x = origin.x, y = origin.y) {
//             this.x = x;
//             this.y = y;
//             this.angle = Math.PI * 2 * Math.random();
//             if (longPressed == true) {
//                 this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
//             } else {
//                 this.multiplier = randBetween(6, 12);
//             }
//             this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
//             this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
//             this.r = randBetween(8, 12) + 3 * Math.random();
//             this.color = colours[Math.floor(Math.random() * colours.length)];
//         }
//         update() {
//             this.x += this.vx - normal.x;
//             this.y += this.vy - normal.y;
//             normal.x = -2 / window.innerWidth * Math.sin(this.angle);
//             normal.y = -2 / window.innerHeight * Math.cos(this.angle);
//             this.r -= 0.3;
//             this.vx *= 0.9;
//             this.vy *= 0.9;
//         }
//     }
 
//     function pushBalls(count = 1, x = origin.x, y = origin.y) {
//         for (let i = 0; i < count; i++) {
//             balls.push(new Ball(x, y));
//         }
//     }
 
//     function randBetween(min, max) {
//         return Math.floor(Math.random() * max) + min;
//     }
 
//     function loop() {
//         ctx.fillStyle = "rgba(255, 255, 255, 0)";
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < balls.length; i++) {
//             let b = balls[i];
//             if (b.r < 0) continue;
//             ctx.fillStyle = b.color;
//             ctx.beginPath();
//             ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
//             ctx.fill();
//             b.update();
//         }
//         if (longPressed == true) {
//             multiplier += 0.2;
//         } else if (!longPressed && multiplier >= 0) {
//             multiplier -= 0.4;
//         }
//         removeBall();
//         requestAnimationFrame(loop);
//     }
 
//     function removeBall() {
//         for (let i = 0; i < balls.length; i++) {
//             let b = balls[i];
//             if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
//                 balls.splice(i, 1);
//             }
//         }
//     }
// }
// clickEffect();

//click

//樱花
// Sakura.prototype.draw = function (cxt) {
//     cxt.save(); var xc = 40 * this.s / 4; cxt.translate(this.x, this.y); cxt.rotate(this.r); cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
//     cxt.restore();
// }
// Sakura.prototype.update = function () { this.x = this.fn.x(this.x, this.y); this.y = this.fn.y(this.y, this.y); this.r = this.fn.r(this.r); if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) { this.r = getRandom('fnr'); if (Math.random() > 0.4) { this.x = getRandom('x'); this.y = 0; this.s = getRandom('s'); this.r = getRandom('r'); } else { this.x = window.innerWidth; this.y = getRandom('y'); this.s = getRandom('s'); this.r = getRandom('r'); } } }
// SakuraList = function () { this.list = []; }
// SakuraList.prototype.push = function (sakura) { this.list.push(sakura); }
// SakuraList.prototype.update = function () { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].update(); } }
// SakuraList.prototype.draw = function (cxt) { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].draw(cxt); } }
// SakuraList.prototype.get = function (i) { return this.list[i]; }
// SakuraList.prototype.size = function () { return this.list.length; }
// function getRandom(option) {
//     var ret, random; switch (option) {
//         case 'x': ret = Math.random() * window.innerWidth; break; case 'y': ret = Math.random() * window.innerHeight; break; case 's': ret = Math.random(); break; case 'r': ret = Math.random() * 6; break; case 'fnx': random = -0.5 + Math.random() * 1; ret = function (x, y) { return x + 0.5 * random - 1.7; }; break; case 'fny': random = 1.5 + Math.random() * 0.7
//             ret = function (x, y) { return y + random; }; break; case 'fnr': random = Math.random() * 0.03; ret = function (r) { return r + random; }; break;
//     }
//     return ret;
// }
// function startSakura() {
//     requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame; var canvas = document.createElement('canvas'), cxt; staticx = true; canvas.height = window.innerHeight; canvas.width = window.innerWidth; canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;'); canvas.setAttribute('id', 'canvas_sakura'); document.getElementsByTagName('body')[0].appendChild(canvas); cxt = canvas.getContext('2d'); var sakuraList = new SakuraList(); for (var i = 0; i < 50; i++) { var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny; randomX = getRandom('x'); randomY = getRandom('y'); randomR = getRandom('r'); randomS = getRandom('s'); randomFnx = getRandom('fnx'); randomFny = getRandom('fny'); randomFnR = getRandom('fnr'); sakura = new Sakura(randomX, randomY, randomS, randomR, { x: randomFnx, y: randomFny, r: randomFnR }); sakura.draw(cxt); sakuraList.push(sakura); }
//     stop = requestAnimationFrame(function () { cxt.clearRect(0, 0, canvas.width, canvas.height); sakuraList.update(); sakuraList.draw(cxt); stop = requestAnimationFrame(arguments.callee); })
// }
// window.onresize = function () { var canvasSnow = document.getElementById('canvas_snow'); }
// img.onload = function () { startSakura(); }
//樱花



 

// 鼠标点击爱心效果
// (function (window, document, undefined) {
//   var hearts = [];
//   window.requestAnimationFrame = (function () {
//     return window.requestAnimationFrame ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       function (callback) {
//         setTimeout(callback, 1000 / 60);
//       }
//   })();
//   init();
//   function init() {
//     css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
//     attachEvent();
//     gameloop();
//   }
//   function gameloop() {
//     for (var i = 0; i < hearts.length; i++) {
//       if (hearts[i].alpha <= 0) {
//         document.body.removeChild(hearts[i].el);
//         hearts.splice(i, 1);
//         continue;
//       }
//       hearts[i].y--;
//       hearts[i].scale += 0.004;
//       hearts[i].alpha -= 0.013;
//       hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
//     }
//     requestAnimationFrame(gameloop);
//   }
//   function attachEvent() {
//     var old = typeof window.οnclick === "function" && window.onclick;
//     window.onclick = function (event) {
//       old && old();
//       createHeart(event);
//     }
//   }
//   function createHeart(event) {
//     var d = document.createElement("div");
//     d.className = "heart";
//     hearts.push({
//       el: d,
//       x: event.clientX - 5,
//       y: event.clientY - 5,
//       scale: 1,
//       alpha: 1,
//       color: randomColor()
//     });
//     document.body.appendChild(d);
//   }
//   function css(css) {
//     var style = document.createElement("style");
//     style.type = "text/css";
//     try {
//       style.appendChild(document.createTextNode(css));
//     } catch (ex) {
//       style.styleSheet.cssText = css;
//     }
//     document.getElementsByTagName('head')[0].appendChild(style);
//   }
//   function randomColor() {
//     return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
//   }
// })(window, document);
//heart

/*鼠标*/
// var CURSOR;

// Math.lerp = (a, b, n) => (1 - n) * a + n * b;

// const getStyle = (el, attr) => {
//     try {
//         return window.getComputedStyle
//             ? window.getComputedStyle(el)[attr]
//             : el.currentStyle[attr];
//     } catch (e) {}
//     return "";
// };

// class Cursor {
//     constructor() {
//         this.pos = {curr: null, prev: null};
//         this.pt = [];
//         this.create();
//         this.init();
//         this.render();
//     }

//     move(left, top) {
//         this.cursor.style["left"] = `${left}px`;
//         this.cursor.style["top"] = `${top}px`;
//     }

//     create() {
//         if (!this.cursor) {
//             this.cursor = document.createElement("div");
//             this.cursor.id = "cursor";
//             this.cursor.classList.add("hidden");
//             document.body.append(this.cursor);
//         }

//         var el = document.getElementsByTagName('*');
//         for (let i = 0; i < el.length; i++)
//             if (getStyle(el[i], "cursor") == "pointer")
//                 this.pt.push(el[i].outerHTML);

//         document.body.appendChild((this.scr = document.createElement("style")));
//         // 这里改变鼠标指针的颜色 由svg生成
//         this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='rgb(57, 197, 187)'/></svg>") 4 4, auto}`;
//     }

//     refresh() {
//         this.scr.remove();
//         this.cursor.classList.remove("hover");
//         this.cursor.classList.remove("active");
//         this.pos = {curr: null, prev: null};
//         this.pt = [];

//         this.create();
//         this.init();
//         this.render();
//     }

//     init() {
//         document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
//         document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
//         document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
//         document.onmouseenter = e => this.cursor.classList.remove("hidden");
//         document.onmouseleave = e => this.cursor.classList.add("hidden");
//         document.onmousedown  = e => this.cursor.classList.add("active");
//         document.onmouseup    = e => this.cursor.classList.remove("active");
//     }

//     render() {
//         if (this.pos.prev) {
//             this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
//             this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
//             this.move(this.pos.prev.x, this.pos.prev.y);
//         } else {
//             this.pos.prev = this.pos.curr;
//         }
//         requestAnimationFrame(() => this.render());
//     }
// }

// (() => {
//     CURSOR = new Cursor();
//     // 需要重新获取列表时，使用 CURSOR.refresh()
// })();


//图片放大//
document.querySelectorAll('.zoom').forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('image-zoom-large');
    })
});

