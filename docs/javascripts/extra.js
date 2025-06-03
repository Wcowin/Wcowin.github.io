// document$.subscribe(function() {
//   console.log("Initialize third-party libraries here")
// })

// // Wrap every letter in a span
// var textWrapper = document.querySelector('.ml3');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: true})
//   .add({
//     targets: '.ml3 .letter',
//     opacity: [0,1],
//     easing: "easeInOutQuad",
//     duration: 2250,
//     delay: (el, i) => 150 * (i+1)
//   }).add({
//     targets: '.ml3',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });


// //全屏视频
// var video = document.getElementById("video1");
// var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (isMobile) {
//   video.style.display = "none";
//   video.muted = true;
// } else {
//   video.volume = 0.5; // 或者根据需要设置适当的音量值，例如 0.5 表示 50% 的音量
// }

// // 优化
// const container = document.querySelector('.container');
// const boxes = document.querySelectorAll('p');

// // Read a layout property
// const newWidth = container.offsetWidth;

// for (var i = 0; i < boxes.length; i++) {    
//     // Then invalidate layouts with writes.
//     boxes[i].style.width = newWidth + 'px';
// }
// const width = box.offsetWidth;
// box.classList.add('big');

// // When the user clicks on a link/button:
// async function navigateToSettingsPage() {
//   // Capture and visually freeze the current state.
//   await document.documentTransition.prepare({
//     rootTransition: 'cover-up',
//     sharedElements: [element1, element2, element3],
//   });
//   // This is a function within the web app:
//   updateDOMForSettingsPage();
//   // Start the transition.
//   await document.documentTransition.start({
//     sharedElements: [element1, element4, element5],
//   });
//   // Transition complete!
// }
// // 优化end






window.addEventListener("DOMContentLoaded", function () {
  console.log("Initialize custom features");

  // Anime.js 动画标题修复
  const textWrapper = document.querySelector('.ml3');
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
      .add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1)
      }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }

  // 视频兼容逻辑
  const video = document.getElementById("video1");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (video) {
    if (isMobile) {
      video.style.display = "none";
      video.muted = true;
    } else {
      video.volume = 0.5;
    }
  }

  // 安全检查 container 和 boxes 存在
  const container = document.querySelector('.container');
  const boxes = document.querySelectorAll('p');

  if (container) {
    const newWidth = container.offsetWidth;
    boxes.forEach(box => {
      box.style.width = newWidth + 'px';
    });
  }

  // 修复潜在未定义变量
  // const width = box.offsetWidth;
  // box.classList.add('big');
});