window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    // 支持更多LaTeX包
    packages: {'[+]': ['ams', 'newcommand', 'configmacros', 'action', 'bbox', 'boldsymbol', 'braket', 'cancel', 'color', 'enclose', 'extpfeil', 'html', 'mhchem', 'unicode', 'verb']},
    // 自定义宏
    macros: {
      "\\RR": "\\mathbb{R}",
      "\\NN": "\\mathbb{N}",
      "\\ZZ": "\\mathbb{Z}",
      "\\QQ": "\\mathbb{Q}",
      "\\CC": "\\mathbb{C}",
      "\\dd": "\\mathrm{d}",
      "\\ee": "\\mathrm{e}",
      "\\ii": "\\mathrm{i}",
      "\\jj": "\\mathrm{j}",
      "\\abs": ["\\left|#1\\right|", 1],
      "\\norm": ["\\left\\|#1\\right\\|", 1],
      "\\set": ["\\left\\{#1\\right\\}", 1],
      "\\paren": ["\\left(#1\\right)", 1],
      "\\bracket": ["\\left[#1\\right]", 1],
      "\\angle": ["\\left\\langle#1\\right\\rangle", 1]
    }
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  // 启用自动编号
  tex2jax: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true
  },
  // SVG输出配置
  svg: {
    fontCache: 'global'
  }
};

document$.subscribe(() => { 
  MathJax.startup.output.clearCache()
  MathJax.typesetClear()
  MathJax.texReset()
  MathJax.typesetPromise()
})