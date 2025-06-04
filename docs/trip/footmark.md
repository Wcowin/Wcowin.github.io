---
tags: [旅行]
comments: false  #评论，默认不开启
hide:
  #  - navigation # 隐藏左边导航
   - toc #隐藏右边导
   - feedback
status: new
hide_reading_time: true
---

# 足迹



<div id="map-container">
  <iframe id="google-map-frame" src="https://www.google.com/maps/d/embed?mid=1r5_nsemni9ylpFNBFTWFhGaEkwGrFf0&ehbc=2E312F" width="100%" height="500"></iframe>
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
