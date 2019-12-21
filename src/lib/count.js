import $ from 'jquery'


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
      global.Count = factory(global, global.document);
    }
  }(typeof window !== 'undefined' ? window : this, function(window, document) {

    'use strict';

    function Count(options) {
      this.timeout = options.timeout
      this.callback = options.handler
    }

    Count.prototype.start = function() {
      console.log('==========startCount===========');
      var music = document.getElementById('music');
      // var money =  $("body");
      var money_en = $(".money_en");
      var i = 0,
        y = 30;
      var off = true;
      money_en.on("touchstart", function(e) {
        console.log('==============touchstart===============');

        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        // startX = e.originalEvent.changedTouches[0].pageX,
        this.startY = e.originalEvent.changedTouches[0].pageY;
      });
      money_en.on("touchend", function(e) {
        if (e.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!e.defaultPrevented) {
            e.preventDefault();
          }
        }
        // let moveEndX = e.originalEvent.changedTouches[0].pageX,
        var moveEndY = e.originalEvent.changedTouches[0].pageY,
          // X = moveEndX - this.startX,
          Y = moveEndY - this.startY;
        if (Y < 0) {
          $('.ri').show();
          music.play();
          if (off) {
            var time = setInterval(function() {
              $(".money_time span").html(y);
              if (y <= 0) {
                clearInterval(time);
                $(".money_en").remove();
                $(".ri").hide();
                window.location.href = "detail.html";
              }
              y--;
            }, 1000);
          }
          off = false;
          $(".money_en,.money_pos").addClass('add');
          $(".money_two").show();
          $(".money_one").hide();

          setTimeout(function() {
            music.play();
          }, 10);
          music.playbackRate = 4;
          music.defaultPlaybackRate = 4;
          money_en.find('img').animate({
            "top": "-1000"
          }, 400, function() {
            $(this).remove();
            i += 100;
            $(".money_add span").html("￥" + i)
          });
          setTimeout(function() {
            money_en.append('<img src="@/assets/dpgame/counter/4.jpg">');
          }, 100)
        }
      });
      document.addEventListener("WeixinJSBridgeReady", function() {
        music.load();
      }, false);
    };

    return Count;
  }));
