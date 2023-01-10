keyboard$.subscribe(function(key) {
    if (key.mode === "global" && key.type === "x") {
      /* Add custom keyboard handler here */
      key.claim() 
    }
  })
  