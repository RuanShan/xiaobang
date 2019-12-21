


(
  function(global, factory) {
    // if (typeof define === 'function' && define.amd) {
    //   define(function() {
    //     return factory(global, global.document);
    //   });
    // } else
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = factory(global, global.document);
    } else {
      global.Shake = factory(global, global.document);
    }
  }(typeof window !== 'undefined' ? window : this, function(window, document) {

    'use strict';

    function FakeShake(options) {
      this.timeout = options.timeout
      this.callback =options.handler
    }

    FakeShake.prototype.start = function() {
      console.log('==========startShake===========');
      console.log('this.timeout---:',this.timeout);
      this.addScore = setInterval(
        this.callback
      , this.timeout);
    };

    FakeShake.prototype.stop = function() {
      console.log('==========stopShake============');
      clearInterval(this.addScore) ;
    };



    return FakeShake;
  }));
