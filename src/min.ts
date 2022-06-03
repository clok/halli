// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
;(function () {
  // CommonJS module
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Halli
    }
    exports.Halli = Halli
  }

  // Register as an anonymous AMD module
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Halli
    })
  }

  // if there is a importsScrips object define chance for worker
  // allows worker to use full Halli functionality with seed
  if (typeof importScripts !== 'undefined') {
    halli = new Halli()
    self.Halli = Halli
  }

  // If there is a window object, that at least has a document property,
  // instantiate and define chance on the window
  if (typeof window === 'object' && typeof window.document === 'object') {
    window.Halli = Halli
    window.halli = new Halli()
  }
})()
