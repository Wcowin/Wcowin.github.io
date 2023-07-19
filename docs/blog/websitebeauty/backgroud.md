---
title: 背景特效
tags:
  - Mkdocs
---
!!! Note

    以下代码均在`docs/javascripts/extra.js`下复制粘贴



<!-- <head>
<script src="https://www.lanjie100.com/js/snow.user.js"></script>
</head> -->

<div id="snowflakes-container"></div>
<script>
  // 在LocalStorage中设置不显示雪花效果的标志
  localStorage.setItem('showSnowflakes', 'true');
</script>

<script>
  // 判断LocalStorage中是否设置了显示雪花效果的标志
  if (localStorage.getItem('showSnowflakes') === 'true') {
    var script = document.createElement('script');
    script.src = 'https://www.lanjie100.com/js/snow.user.js';
    document.head.appendChild(script);
  }
</script>



## 雪花❄️


```js
//雪花
const fps = 30;
const mspf = Math.floor(1000 / fps) ; 

let width = window.innerWidth || document.documentElement.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight;
let canvas;
window.addEventListener('resize', () => {
  width = window.innerWidth || document.documentElement.clientWidth;
  height = window.innerHeight || document.documentElement.clientHeight;
  if (canvas) {
    canvas.width = width;
    canvas.height = height;
  }
});

let particles = [];
let wind = [0, 0];
let cursor = [0, 0];

function velocity(r) {
  return 70 / r + 30;
}

function sine_component(h, a) {
  return [2 * Math.PI / h, Math.random() * a, Math.random() * 2 * Math.PI]; // [frequency, amplitude, phase]
}

function calc_sine(components, x) {
  let sum = 0;
  for (let i = 0; i < components.length; i++) {
    const [f, a, p] = components[i];
    sum += Math.sin(x * f + p) * a;
  }
  return sum;
}

function gen_particle() {
  let r = Math.random() * 4 + 1;
  return {
    radius: r,
    x: Math.random() * width,
    y: -r,
    opacity: Math.random(),
    sine_components: [sine_component(height, 3), sine_component(height / 2, 2), sine_component(height / 5, 1), sine_component(height / 10, 0.5)],
  };
}

function update_pos(dt) {
  const n = particles.length;
  for (let i = 0; i < n; i++) {
    const v = velocity(particles[i].radius);
    particles[i].x += calc_sine(particles[i].sine_components, particles[i].y) * v / 5 * dt;
    particles[i].y += v * dt;
    
    // const dist = Math.hypot(particles[i].x - cursor[0], particles[i].y - cursor[1]) + 1;
    // particles[i].x += wind[0] * dt / dist
    // particles[i].y += wind[1] * dt / dist;
    
    if (particles[i].y - particles[i].radius > height) {
      particles[i] = gen_particle();  
    }
  }
}

let context_cache;
function get_context() {
  if (context_cache)
    return context_cache;
  
  canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  canvas.width = width;
  canvas.height = height;
  canvas.style = 'position: fixed; top: 0; left: 0; overflow: hidden; pointer-events: none; z-index: 256;';
  if ((document.documentElement.dataset.darkreaderMode || "").startsWith('filter'))
    canvas.style.filter = 'invert(1)';
  document.body.appendChild(canvas);
  
  context_cache = canvas.getContext('2d');
  return context_cache;
}

function draw() {
  const ctx = get_context();
  
  ctx.clearRect(0, 0, width, height);
  
  const n = particles.length;
  for (let i = 0; i < n; i++) {
    const p = particles[i];
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.shadowColor = '#80EDF7';
    ctx.shadowBlur = 7;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}

let focused = true;
let disabled = false;
let lastTime = performance.now();
const requestFrame = () => setTimeout(loop, mspf);
function loop() {
  const dt = (performance.now() - lastTime) / 1000;
  
  if (particles.length < 120 && Math.random() < 0.1) {
    particles.push(gen_particle());
  }
  
  update_pos(dt);
  draw();
  
  lastTime = performance.now();
  if (focused && !disabled)
    requestFrame();
}


window.addEventListener('focus', () => {
  console.log('snow start');
  focused = true;
  lastTime = performance.now();
  requestFrame();
});

window.addEventListener('blur', () => {
  console.log('snow stop');
  focused = false;
});

window.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key == 's') {
    e.preventDefault();
    disabled = !disabled;
    if (disabled) {
      canvas.style.display = 'none';
    } else {
      canvas.style.display = 'block';
      lastTime = performance.now();
      requestFrame();
    }
  }
});

requestFrame();
//雪花
```

***
## 樱花🌸

```js
//樱花
Sakura.prototype.draw = function (cxt) {
    cxt.save(); var xc = 40 * this.s / 4; cxt.translate(this.x, this.y); cxt.rotate(this.r); cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
    cxt.restore();
}
Sakura.prototype.update = function () { this.x = this.fn.x(this.x, this.y); this.y = this.fn.y(this.y, this.y); this.r = this.fn.r(this.r); if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) { this.r = getRandom('fnr'); if (Math.random() > 0.4) { this.x = getRandom('x'); this.y = 0; this.s = getRandom('s'); this.r = getRandom('r'); } else { this.x = window.innerWidth; this.y = getRandom('y'); this.s = getRandom('s'); this.r = getRandom('r'); } } }
SakuraList = function () { this.list = []; }
SakuraList.prototype.push = function (sakura) { this.list.push(sakura); }
SakuraList.prototype.update = function () { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].update(); } }
SakuraList.prototype.draw = function (cxt) { for (var i = 0, len = this.list.length; i < len; i++) { this.list[i].draw(cxt); } }
SakuraList.prototype.get = function (i) { return this.list[i]; }
SakuraList.prototype.size = function () { return this.list.length; }
function getRandom(option) {
    var ret, random; switch (option) {
        case 'x': ret = Math.random() * window.innerWidth; break; case 'y': ret = Math.random() * window.innerHeight; break; case 's': ret = Math.random(); break; case 'r': ret = Math.random() * 6; break; case 'fnx': random = -0.5 + Math.random() * 1; ret = function (x, y) { return x + 0.5 * random - 1.7; }; break; case 'fny': random = 1.5 + Math.random() * 0.7
            ret = function (x, y) { return y + random; }; break; case 'fnr': random = Math.random() * 0.03; ret = function (r) { return r + random; }; break;
    }
    return ret;
}
function startSakura() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame; var canvas = document.createElement('canvas'), cxt; staticx = true; canvas.height = window.innerHeight; canvas.width = window.innerWidth; canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;'); canvas.setAttribute('id', 'canvas_sakura'); document.getElementsByTagName('body')[0].appendChild(canvas); cxt = canvas.getContext('2d'); var sakuraList = new SakuraList(); for (var i = 0; i < 50; i++) { var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny; randomX = getRandom('x'); randomY = getRandom('y'); randomR = getRandom('r'); randomS = getRandom('s'); randomFnx = getRandom('fnx'); randomFny = getRandom('fny'); randomFnR = getRandom('fnr'); sakura = new Sakura(randomX, randomY, randomS, randomR, { x: randomFnx, y: randomFny, r: randomFnR }); sakura.draw(cxt); sakuraList.push(sakura); }
    stop = requestAnimationFrame(function () { cxt.clearRect(0, 0, canvas.width, canvas.height); sakuraList.update(); sakuraList.draw(cxt); stop = requestAnimationFrame(arguments.callee); })
}
window.onresize = function () { var canvasSnow = document.getElementById('canvas_snow'); }
img.onload = function () { startSakura(); }
//樱花
```

## 线条

```js
!function() {
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }
    function j(i) {
        return document.getElementsByTagName(i)
    }
    function l() {
        var i = j("script"),
        w = i.length,
        v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", -1),
            o: o(v, "opacity", 0.5),
            c: o(v, "color", "0,0,0"),
            n: o(v, "count", 99)
        }
    }
    function k() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function b() {
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function(i) {
            i.x += i.xa,
            i.y += i.ya,
            i.xa *= i.x > r || i.x < 0 ? -1 : 1,
            i.ya *= i.y > n || i.y < 0 ? -1 : 1,
            e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x,
                    z = i.y - x.y,
                    y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                }
            }
            w.splice(w.indexOf(i), 1)
        }),
        m(b)
    }
    var u = document.createElement("canvas"),
    s = l(),
    c = "c_n" + s.l,
    e = u.getContext("2d"),
    r,
    n,
    m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(i) {
        window.setTimeout(i, 1000 / 45)
    },
    a = Math.random,
    f = {
        x: null,
        y: null,
        max: 20000
    };
    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
    j("body")[0].appendChild(u);
    k(),
    window.onresize = k;
    window.onmousemove = function(i) {
        i = i || window.event,
        f.x = i.clientX,
        f.y = i.clientY
    },
    window.onmouseout = function() {
        f.x = null,
        f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = a() * r,
        g = a() * n,
        q = 2 * a() - 1,
        d = 2 * a() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: 6000
        })
    }
    setTimeout(function() {
        b()
    },
    100)
} ();
```

## 粒子

```js
/*背景*/
window.onload = function () {
    //定义body的margin由默认值8px->0px
    document.body.style.margin = "0";
    document.body.style.background = "255,255,255";
    //创建canvas画布
    document.body.appendChild(document.createElement('canvas'));
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d') //ctx返回一个在canvas上画图的api/dom
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;
    //定义鼠标覆盖范围
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };
    var dots = {
        nb: 1000,//Dot的总数
        distance: 50,
        d_radius: 100,
        array: []
    };
    //创建颜色类，Color类返回字符串型rgba（*,*,*,.8）
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }
    function createColorStyle(r, g, b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }
    //创建Dot类以及一系列方法
    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
    }

    Dot.prototype = {
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
    function moveDots() {//Dot对象的移动
        for (i = 0; i < dots.nb; i++) {

            var dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = - dot.vy;
            }
            else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = - dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    function connectDots() {//DOt对象的连接
        for (i = 0; i < dots.nb; i++) {
            for (j = i; j < dots.nb; j++) {
                i_dot = dots.array[i];
                j_dot = dots.array[j];

                if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();//绘制定义的路线
                        ctx.closePath();//创建从当前点回到起始点的路径
                    }
                }
            }
        }
    }
    function createDots() {//创建nb个Dot对象
        for (i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }
    function drawDots() {//引用Dot原型链，使用draw方法，在canvas上画出Dot对象
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }
    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);//清除画布，否则线条会连在一起
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
    }
    createDots();//使用创建Dot类函数
    requestAnimationFrame(animateDots);//使用canvas独有的60Hz刷新屏幕画布的方法

    document.querySelector('canvas').addEventListener('mousemove', function (e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    })

    document.querySelector('canvas').addEventListener('mouseleave', function (e) {//鼠标离开时，连接自动返回到画布中心
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    })

}

/*背景end*/
```