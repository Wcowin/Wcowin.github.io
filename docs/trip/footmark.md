---
title: 足迹
tags: 
    - 旅行
comments: false  #评论，默认不开启
hide:
  #  - navigation # 隐藏左边导航
   - toc #隐藏右边导
   - feedback
status: new
hide_reading_time: true
---

# 足迹


## 3D 地球足迹

<style>
.globe-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
}
#globe-canvas {
  width: 500px;
  height: 500px;
  display: block;
  margin: 0 auto;
}

</style>

<div class="globe-wrapper">
  <canvas id="globe-canvas" width="1000" height="1000"></canvas>
</div>

<script type="module">
import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm';

const locations = [
  { name: "重庆", lat: 29.56301, lng: 106.55156, id: "cq" },
  { name: "南阳", lat: 32.99073, lng: 112.52832, id: "ny" },
  { name: "西安", lat: 34.34157, lng: 108.93977, id: "xa" },
  { name: "宜昌", lat: 30.69186, lng: 111.28642, id: "yc" },
  { name: "青岛", lat: 36.06708, lng: 120.38264, id: "qd" },
  { name: "上海", lat: 31.2304, lng: 121.4737, id: "sh" },
  { name: "苏州", lat: 31.29888, lng: 120.58531, id: "sz" },
  { name: "杭州", lat: 30.27415, lng: 120.15515, id: "hz" },
  { name: "嘉兴", lat: 30.74501, lng: 120.7555, id: "jx" },
  { name: "郑州", lat: 34.7466, lng: 113.62537, id: "zz" },
  { name: "漯河", lat: 33.58149, lng: 114.01681, id: "lh" },
  { name: "商丘", lat: 34.41427, lng: 115.65635, id: "sq" },
  { name: "咸阳", lat: 34.32932, lng: 108.70899, id: "xy" },
  { name: "武汉", lat: 30.59276, lng: 114.30525, id: "wh" }
];

const markers = locations.map(loc => ({
  id: loc.id,
  location: [loc.lat, loc.lng],
  size: 0.03,
  color: [0.1, 0.1, 0.8]
}));

const canvas = document.getElementById("globe-canvas");
let state = { phi: 0, theta: 0.25 };

let pointerDown = false;
let pointerX = 0;
let pointerY = 0;

canvas.addEventListener('pointerdown', e => { pointerDown = true; pointerX = e.clientX; pointerY = e.clientY; });
canvas.addEventListener('pointerup', () => { pointerDown = false });
canvas.addEventListener('pointerleave', () => { pointerDown = false });
canvas.addEventListener('pointermove', e => {
  if (!pointerDown) return;
  const dx = (e.clientX - pointerX) / canvas.clientWidth;
  const dy = (e.clientY - pointerY) / canvas.clientHeight;
  state.phi += dx * 5;
  state.theta += dy * 3;
  state.theta = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, state.theta));
  pointerX = e.clientX;
  pointerY = e.clientY;
});

const globe = createGlobe(canvas, {
  devicePixelRatio: 2,
  width: 1000,
  height: 1000,
  phi: state.phi,
  theta: state.theta,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 22000,
  mapBrightness: 6,
  baseColor: [0.95, 0.95, 0.98],
  markerColor: [0.1, 0.1, 0.6],
  glowColor: [0.9, 0.92, 1],
  markers: markers,
  onRender: (s) => {
    s.phi = state.phi;
    s.theta = state.theta;
    if (!pointerDown) state.phi += 0.003;
  }
});
</script>

---


<div id="map-container" style="border-radius: 12px; overflow: hidden;">
  <iframe id="google-map-frame" src="https://www.google.com/maps/d/embed?mid=1r5_nsemni9ylpFNBFTWFhGaEkwGrFf0&ehbc=2E312F" width="100%" height="500" style="border: none; display: block;"></iframe>
</div>
<script>
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    if (data && data.country_code === 'CN') {
      // 中国大陆IP，隐藏地图
      document.getElementById('map-container').innerHTML = '<p style="text-align:center;color:#888;">因为采用了谷歌地图，仅中国大陆之外的IP可见</p>';
    }
  })
  .catch(() => {});
</script>

<!-- <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<div id="footmark-map" style="width: 100%; height: 420px;"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  var map = L.map('footmark-map').setView([33.0, 113.0], 5); // 以中国中部为中心

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // 足迹点
  var points = [
    { name: "重庆", lat: 29.56301, lng: 106.55156 },
    { name: "南阳", lat: 32.99073, lng: 112.52832 },
    { name: "西安", lat: 34.34157, lng: 108.93977 },
    { name: "宜昌", lat: 30.69186, lng: 111.28642 },
    { name: "青岛", lat: 36.06708, lng: 120.38264 },
    { name: "上海", lat: 31.2304, lng: 121.4737 },
    { name: "苏州", lat: 31.29888, lng: 120.58531 },
    { name: "杭州", lat: 30.27415, lng: 120.15515 },
    { name: "嘉兴", lat: 30.74501, lng: 120.7555 },
    { name: "郑州", lat: 34.7466, lng: 113.62537 },
    { name: "漯河", lat: 33.58149, lng: 114.01681 },
    { name: "商丘", lat: 34.41427, lng: 115.65635 },
    { name: "咸阳", lat: 34.32932, lng: 108.70899 },
    { name: "武汉", lat: 30.59276, lng: 114.30525 },
    { name: "北京", lat: 39.9042, lng: 116.4074 }
  ];

  points.forEach(function(point) {
    L.marker([point.lat, point.lng]).addTo(map)
      .bindPopup(point.name);
  });
});
</script> -->


