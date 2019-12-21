var __reflect = this && this.__reflect ||
function(e, t, n) {
    e.__class__ = t,
    n ? n.push(t) : n = [t],
    e.__types__ = e.__types__ ? n.concat(e.__types__) : n
},
__extends = this && this.__extends ||
function() {
    var e = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array &&
    function(e, t) {
        e.__proto__ = t
    } ||
    function(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
    };
    return function(t, n) {
        function i() {
            this.constructor = t
        }
        e(t, n),
        t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
    }
} (),
BaseView = function(e) {
    function t() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = e.call(this) || this;
        return i.onCreate.apply(i, t),
        i
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
    },
    t.prototype.addChildren = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0,
        i = e.length; i > n; n++) this.addChild(e[n])
    },
    t.prototype.removeChildren = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        if (!t || !t.length) return void e.prototype.removeChildren.call(this);
        for (var i = 0,
        o = t.length; o > i; i++) this.removeChild(t[i])
    },
    t
} (eui.Component);
__reflect(BaseView.prototype, "BaseView");
var BaseContainer = function(e) {
    function t() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = e.call(this) || this;
        return i.isAdded = !1,
        i.IS_ADDED = "IS_ADDED",
        i.hasTouchListener = !1,
        i.isTouchTargetEnd = !1,
        i.isTouchTargetOutside = !1,
        i.onCreate.apply(i, t),
        i
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.name = Tool.getClazzName(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this)
    },
    t.prototype.UIAdded = function() {
        this.onAdded(),
        this.isAdded = !0,
        this.dispatchEventWith(this.IS_ADDED),
        EventManager.dispatchEventWith(this.name + EventManager.ON_CONTAINER_ADDED)
    },
    t.prototype.UIRemoved = function() {
        this.onRemoved(),
        this.isAdded = !1,
        EventManager.dispatchEventWith(this.name + EventManager.ON_CONTAINER_REMOVED)
    },
    t.prototype.onAdded = function() {
        this.isAdded || (this.touchEnabled = this.touchChildren = !0)
    },
    t.prototype.onRemoved = function() {
        this.touchEnabled = this.touchChildren = !1,
        this.hasTouchListener && this.removeTouchListener()
    },
    t.prototype.addTouchListener = function() {
        this.removeTouchListener();
        var e = this.touchListener;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_END, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
        this.hasTouchListener = !0
    },
    t.prototype.removeTouchListener = function() {
        if (this.hasTouchListener) {
            var e = this.touchListener;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_END, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
            this.hasTouchListener = !1
        }
    },
    t.prototype.touchListener = function(e) {
        switch (e.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
            this.touchTarget = e.target,
            this.isTouchTargetOutside = !1,
            this.isTouchTargetEnd = !1,
            this.onTouchBegin.call(this, e);
            break;
        case egret.TouchEvent.TOUCH_END:
            e.target == this.touchTarget && (this.isTouchTargetEnd = !0, this.onTouchEnd.call(this, e));
            break;
        case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
            e.target == this.touchTarget && (this.isTouchTargetOutside = !0, this.isTouchTargetEnd || this.onTouchEnd.call(this, e));
            break;
        case egret.TouchEvent.TOUCH_TAP:
            e.target == this.touchTarget && this.onTouchExecute.call(this, e)
        }
    },
    t.prototype.onTouchBegin = function(e) {},
    t.prototype.onTouchEnd = function(e) {},
    t.prototype.onTouchExecute = function(e) {},
    t.prototype.addChildren = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0,
        i = e.length; i > n; n++) this.addChild(e[n])
    },
    t.prototype.removeChildren = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        if (!t || !t.length) return void e.prototype.removeChildren.call(this);
        for (var i = 0,
        o = t.length; o > i; i++) this.removeChild(t[i])
    },
    t
} (eui.Group);
__reflect(BaseContainer.prototype, "BaseContainer");
var BaseSington = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return this.instance || (this.instance = new(this.bind.apply(this, [void 0].concat(e)))),
        this.instance
    },
    t.dispatchEventWith = function(e, t, n, i) {
        this.getInstance().dispatchEventWith(e, t, n, i)
    },
    t.once = function(e, t, n) {
        this.getInstance().once(e, t, n)
    },
    t.addEventListener = function(e, t, n) {
        this.getInstance().addEventListener(e, t, n)
    },
    t.removeEventListener = function(e, t, n) {
        this.getInstance().removeEventListener(e, t, n)
    },
    t
} (BaseView);
__reflect(BaseSington.prototype, "BaseSington");
var BaseScroller = function(e) {
    function t() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = e.call(this) || this;
        return i.isAdded = !1,
        i.IS_ADDED = "IS_ADDED",
        i.onCreate.apply(i, t),
        i
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.name = Tool.getClazzName(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this)
    },
    t.prototype.UIAdded = function() {
        this.onAdded(),
        this.isAdded = !0,
        this.dispatchEventWith(this.IS_ADDED),
        EventManager.dispatchEventWith(this.name + EventManager.ON_IMAGE_ADDED)
    },
    t.prototype.UIRemoved = function() {
        this.onRemoved(),
        this.isAdded = !1,
        EventManager.dispatchEventWith(this.name + EventManager.ON_SCROLLER_REMOVED)
    },
    t.prototype.onAdded = function() {
        this.isAdded || (this.touchEnabled = this.touchChildren = !0)
    },
    t.prototype.onRemoved = function() {
        this.touchEnabled = this.touchChildren = !1
    },
    t.prototype.addChildren = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0,
        i = e.length; i > n; n++) this.addChild(e[n])
    },
    t.prototype.removeChildren = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        if (!t || !t.length) return void e.prototype.removeChildren.call(this);
        for (var i = 0,
        o = t.length; o > i; i++) this.removeChild(t[i])
    },
    t
} (eui.Scroller);
__reflect(BaseScroller.prototype, "BaseScroller");
var BaseItemRenderer = function(e) {
    function t() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = e.call(this) || this;
        return i.isAdded = !1,
        i.IS_ADDED = "IS_ADDED",
        i.hasTouchListener = !1,
        i.isTouchTargetEnd = !1,
        i.isTouchTargetOutside = !1,
        i.hasTapListener = !1,
        i.onCreate.apply(i, t),
        i
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = this.name = Tool.getClazzName(this);
        skins[n] && (this.skinName = skins[n]),
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this)
    },
    t.prototype.UIAdded = function() {
        this.onAdded(),
        this.isAdded = !0,
        this.dispatchEventWith(this.IS_ADDED),
        EventManager.dispatchEventWith(this.name + EventManager.ON_IMAGE_ADDED)
    },
    t.prototype.UIRemoved = function() {
        this.onRemoved(),
        this.isAdded = !1,
        EventManager.dispatchEventWith(this.name + EventManager.ON_IIEM_RENDERER_REMOVED)
    },
    t.prototype.onAdded = function(e) {
        this.isAdded || (this.touchEnabled = this.touchChildren = !0),
        e && (e.visible && (this.visibleWatcher = eui.Watcher.watch(this, ["visible"], this.onVisibleChange, this)), e.visiblity && (EventManager.addEventListener(EventManager.HTML_IS_SHOW, this.onResume, this), EventManager.addEventListener(EventManager.HTML_IS_HIDE, this.onPause, this)))
    },
    t.prototype.onVisible = function() {},
    t.prototype.onInvisible = function() {},
    t.prototype.onResume = function() {},
    t.prototype.onPause = function() {},
    t.prototype.onRemoved = function() {
        this.touchEnabled = this.touchChildren = !1,
        this.visibleWatcher && this.visibleWatcher.unwatch(),
        EventManager.removeEventListener(EventManager.HTML_IS_SHOW, this.onResume, this),
        EventManager.removeEventListener(EventManager.HTML_IS_HIDE, this.onPause, this),
        this.hasTouchListener && this.removeTouchListener(),
        this.hasTapListener && this.removeTapListener()
    },
    t.prototype.onVisibleChange = function(e) {
        this.visible ? this.onVisible() : this.onInvisible()
    },
    t.prototype.addTouchListener = function() {
        this.removeTouchListener();
        var e = this.touchListener;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_END, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
        this.hasTouchListener = !0
    },
    t.prototype.removeTouchListener = function() {
        if (this.hasTouchListener) {
            var e = this.touchListener;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_END, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
            this.hasTouchListener = !1
        }
    },
    t.prototype.touchListener = function(e) {
        switch (e.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
            this.touchTarget = e.target,
            this.isTouchTargetOutside = !1,
            this.isTouchTargetEnd = !1,
            this.onTouchBegin.call(this, e);
            break;
        case egret.TouchEvent.TOUCH_END:
            e.target == this.touchTarget && (this.isTouchTargetEnd = !0, this.onTouchEnd.call(this, e));
            break;
        case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
            e.target == this.touchTarget && (this.isTouchTargetOutside = !0, this.isTouchTargetEnd || this.onTouchEnd.call(this, e));
            break;
        case egret.TouchEvent.TOUCH_TAP:
            e.target == this.touchTarget && this.onTouchExecute.call(this, e)
        }
    },
    t.prototype.onTouchBegin = function(e) {},
    t.prototype.onTouchEnd = function(e) {},
    t.prototype.onTouchExecute = function(e) {},
    t.prototype.addTapListener = function() {
        this.removeTapListener(),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapListener, this),
        this.hasTapListener = !0
    },
    t.prototype.removeTapListener = function() {
        this.hasTapListener && (this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapListener, this), this.hasTapListener = !1)
    },
    t.prototype.tapListener = function(e) {
        this.onTap.call(this, e)
    },
    t.prototype.onTap = function(e) {},
    t.prototype.addChildren = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0,
        i = e.length; i > n; n++) this.addChild(e[n])
    },
    t.prototype.removeChildren = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        if (!t || !t.length) return void e.prototype.removeChildren.call(this);
        for (var i = 0,
        o = t.length; o > i; i++) this.removeChild(t[i])
    },
    t
} (eui.ItemRenderer);
__reflect(BaseItemRenderer.prototype, "BaseItemRenderer");
var ImagePreload = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.isReady = !1,
        t.IS_READY = "IS_READY",
        t
    }
    return __extends(t, e),
    t.prototype.childrenCreated = function() {
        this.createBg(),
        this.createImageMask(),
        this.createImage(),
        this.createShadow(),
        this.createLoadIco(),
        this.isReady = !0,
        this.dispatchEventWith(this.IS_READY)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.loadIco.isPlaying && this.loadIco.stop()
    },
    t.prototype.createBg = function() {
        var e = this.bg = new eui.Rect(this.width, this.height);
        e.fillColor = 16777215,
        e.strokeWeight = 2,
        e.strokeColor = 0,
        this.addChild(e)
    },
    t.prototype.createImageMask = function() {
        var e = this.imageMask = new eui.Rect(this.width, this.height);
        e.visible = !1,
        this.addChild(e)
    },
    t.prototype.createImage = function() {
        var e = this.image = new eui.Image;
        this.addChild(e)
    },
    t.prototype.createShadow = function() {
        var e = this.width,
        t = this.height,
        n = this.shadow = new eui.Rect(e - 4, t - 4);
        n.fillColor = 0,
        n.fillAlpha = .5,
        this.addChild(n),
        Tool.setCenterOfParent(n)
    },
    t.prototype.createLoadIco = function() {
        for (var e = this.loadIco = new BitmapMovie,
        t = [], n = 1; 12 > n; n++) t.push(RES.getRes("dft_json.dft_com_ios_" + n));
        e.setResource(t),
        e.frame = 11;
        var i = t[0];
        e.texture = i,
        e.width = i.textureWidth,
        e.height = i.textureHeight,
        this.addChild(e),
        Tool.setCenterOfParent(e),
        Tool.setAnchorOffsetCenter(e),
        e.scaleX = e.scaleY = .15 * Tool.getScale(this, e),
        e.play()
    },
    t.prototype.load = function(e, t, n) {
        var i = this;
        if (!this.isReady) return void this.once(this.IS_READY,
        function(o) {
            return i.load(e, t, n)
        },
        this);
        var o = this,
        r = o.image,
        a = o.imageMask,
        s = o.shadow,
        c = o.loadIco;
        return s.alpha = c.alpha = 1,
        r.source = r.texture = null,
        r.width = o.width,
        r.height = o.height,
        r.mask = a,
        "string" == typeof e ? !e || e.indexOf("http") < 0 ? (console.warn("'" + e + "' is not http"), c.stop(), s.alpha = c.alpha = 0, void(t && n && t.call(n))) : (e = window.replaceFlyH5CDN(e), r.source == e ? void this.initData(r.texture, t, n) : (r.once(egret.Event.COMPLETE,
        function(e) {
            i.initData(r.source, t, n)
        },
        o), void(r.source = e))) : (r.source = e, void this.initData(r.source, t, n))
    },
    t.prototype.initData = function(e, t, n) {
        var i = this,
        o = i.image,
        r = i.imageMask;
        e instanceof egret.Texture ? (o.texture = e, o.width = e.textureWidth, o.height = e.textureHeight) : o.validateNow(),
        o.width = void 0,
        o.height = void 0,
        Tool.setScale(r, o),
        Tool.setCenterOfParent(o),
        r.visible = !0,
        o.mask = r;
        var a = i.shadow,
        s = i.loadIco;
        s.visible = a.visible = !1;
        var c = Tool.getTextureByRectangle(i);
        o.texture = c,
        o.x = o.y = 0,
        o.width = c.textureWidth,
        o.height = c.textureHeight,
        o.mask = null,
        r.visible = !1,
        o.alpha = 0,
        s.visible = a.visible = !0,
        s.stop(),
        o.alpha = 1,
        a.alpha = s.alpha = 0,
        t && n && t.call(n, c)
    },
    t
} (BaseContainer);
__reflect(ImagePreload.prototype, "ImagePreload");
var BaseEditText = function(e) {
    function t(t) {
        for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
        var o = e.call(this) || this;
        return o.isAdded = !1,
        o.IS_ADDED = "IS_ADDED",
        o.onCreate.apply(o, [t].concat(n)),
        o
    }
    return __extends(t, e),
    t.prototype.onCreate = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        this.name = Tool.getClazzName(this);
        this.readyText = e,
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this)
    },
    t.prototype.UIAdded = function() {
        this.onAdded(),
        this.isAdded = !0,
        this.dispatchEventWith(this.IS_ADDED),
        EventManager.dispatchEventWith(this.name + EventManager.ON_EDIT_TEXT_ADDED)
    },
    t.prototype.UIRemoved = function() {
        this.onRemoved(),
        this.isAdded = !1,
        EventManager.dispatchEventWith(this.name + EventManager.ON_EDIT_TEXT_REMOVED)
    },
    t.prototype.onAdded = function() {
        this.isAdded || (this.touchEnabled = !0),
        this.readyText && (this.text = this.readyText)
    },
    t.prototype.onRemoved = function() {
        this.touchEnabled = !1
    },
    t.prototype.getLength = function() {
        for (var e = 0,
        t = this.text,
        n = 0,
        i = t.length; i > n; n++) {
            var o = t.charCodeAt(n);
            e += o > 0 && 126 > o || o > 65440 && 65377 > o ? 1 : 2
        }
        return e
    },
    t
} (eui.Label);
__reflect(BaseEditText.prototype, "BaseEditText");
var BaseUI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.childrenReady = !1,
        t.CHILDREN_READY = "CHILDREN_READY",
        t.isAdded = !1,
        t.IS_ADDED = "IS_ADDED",
        t.hasTouchListener = !1,
        t.isTouchTargetEnd = !1,
        t.hasTapListener = !1,
        t.hasTicker = !1,
        t.hasFramer = !1,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = this.name = Tool.getClazzName(this);
        skins[n] && (this.skinName = skins[n]),
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this),
        this.visible = !1
    },
    t.prototype.childrenCreated = function() {
        this.childrenReady = !0,
        this.dispatchEventWith(this.CHILDREN_READY)
    },
    t.prototype.UIAdded = function() {
        var e = this,
        t = function() {
            e.visible = !0,
            e.onAdded(),
            e.isAdded = !0,
            e.dispatchEventWith(e.IS_ADDED),
            EventManager.dispatchEventWith(e.name + EventManager.ON_IMAGE_ADDED)
        };
        this.childrenReady ? t() : this.once(this.CHILDREN_READY, t, this)
    },
    t.prototype.UIRemoved = function() {
        this.isAdded && (this.onRemoved(), this.isAdded = !1, EventManager.dispatchEventWith(this.name + EventManager.ON_UI_REMOVED))
    },
    t.prototype.onAdded = function(e) {
        this.isAdded || (this.touchEnabled = this.touchChildren = !0),
        e && (e.visible && (this.visibleWatcher = eui.Watcher.watch(this, ["visible"], this.onVisibleChange, this)), e.visiblity && (EventManager.addEventListener(EventManager.HTML_IS_SHOW, this.onResume, this), EventManager.addEventListener(EventManager.HTML_IS_HIDE, this.onPause, this)))
    },
    t.prototype.onVisible = function() {},
    t.prototype.onInvisible = function() {},
    t.prototype.onResume = function() {},
    t.prototype.onPause = function() {},
    t.prototype.onRemoved = function() {
        this.touchEnabled = this.touchChildren = !1,
        this.visibleWatcher && this.visibleWatcher.unwatch(),
        EventManager.removeEventListener(EventManager.HTML_IS_SHOW, this.onResume, this),
        EventManager.removeEventListener(EventManager.HTML_IS_HIDE, this.onPause, this),
        this.hasTouchListener && this.removeTouchListener(),
        this.hasTapListener && this.removeTapListener(),
        this.orientationObject && this.removeOrientationChangeListener(),
        this.hasTicker && this.removeTicker(),
        this.timer && this.removeTimer(),
        this.hasFramer && this.removeFramer()
    },
    t.prototype.onVisibleChange = function(e) {
        this.visible ? this.onVisible() : this.onInvisible()
    },
    t.prototype.addTouchListener = function() {
        this.removeTouchListener();
        var e = this.touchListener;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_END, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
        this.hasTouchListener = !0
    },
    t.prototype.removeTouchListener = function() {
        if (this.hasTouchListener) {
            var e = this.touchListener;
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_END, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, e, this),
            this.hasTouchListener = !1
        }
    },
    t.prototype.touchListener = function(e) {
        switch (e.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
            this.touchTarget = e.target,
            this.isTouchTargetEnd = !1,
            this.onTouchBegin.call(this, e);
            break;
        case egret.TouchEvent.TOUCH_END:
            e.target == this.touchTarget && (this.isTouchTargetEnd = !0, this.onTouchEnd.call(this, e));
            break;
        case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
            e.target != this.touchTarget || this.isTouchTargetEnd || this.onTouchEnd.call(this, e);
            break;
        case egret.TouchEvent.TOUCH_TAP:
            e.target == this.touchTarget && this.onTouchExecute.call(this, e)
        }
    },
    t.prototype.onTouchBegin = function(e) {},
    t.prototype.onTouchEnd = function(e) {},
    t.prototype.onTouchExecute = function(e) {},
    t.prototype.addTapListener = function() {
        this.removeTapListener(),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapListener, this),
        this.hasTapListener = !0
    },
    t.prototype.removeTapListener = function() {
        this.hasTapListener && (this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapListener, this), this.hasTapListener = !1)
    },
    t.prototype.tapListener = function(e) {
        this.onTap.call(this, e)
    },
    t.prototype.onTap = function(e) {},
    t.prototype.addOrientationChangeListener = function() {
        this.removeOrientationChangeListener();
        var e = this.orientationObject = new egret.DeviceOrientation;
        e.addEventListener(egret.Event.CHANGE, this.orientationChangeListener, this),
        e.start()
    },
    t.prototype.removeOrientationChangeListener = function() {
        if (this.orientationObject) {
            var e = this.orientationObject;
            e.removeEventListener(egret.Event.CHANGE, this.orientationChangeListener, this),
            e.stop(),
            this.orientationObject = null
        }
    },
    t.prototype.orientationChangeListener = function(e) {
        this.onOrientationChange.call(this, e.alpha, e.beta, e.gamma)
    },
    t.prototype.onOrientationChange = function(e, t, n) {},
    t.prototype.addTicker = function() {
        this.removeTicker(),
        egret.startTick(this.tickerListener, this),
        this.hasTicker = !0
    },
    t.prototype.removeTicker = function() {
        this.hasTicker && (egret.stopTick(this.tickerListener, this), this.hasTicker = !1)
    },
    t.prototype.tickerListener = function(e) {
        return this.onTicker.call(this, e),
        !0
    },
    t.prototype.onTicker = function(e) {},
    t.prototype.addTimer = function(e, t) {
        this.removeTimer();
        var n = this.timer = new egret.Timer(e, t);
        n.addEventListener(egret.TimerEvent.TIMER, this.timerListener, this),
        n.start()
    },
    t.prototype.removeTimer = function() {
        if (this.timer) {
            var e = this.timer;
            e.removeEventListener(egret.TimerEvent.TIMER, this.timerListener, this),
            e.stop(),
            this.timer = null
        }
    },
    t.prototype.timerListener = function(e) {
        this.onTimer.call(this, e)
    },
    t.prototype.onTimer = function(e) {},
    t.prototype.addFramer = function() {
        this.removeFramer(),
        this.addEventListener(egret.Event.ENTER_FRAME, this.framerListener, this),
        this.hasFramer = !0
    },
    t.prototype.removeFramer = function() {
        this.hasFramer && (this.removeEventListener(egret.Event.ENTER_FRAME, this.framerListener, this), this.hasFramer = !1)
    },
    t.prototype.framerListener = function(e) {
        this.onFramer.call(this, e)
    },
    t.prototype.onFramer = function(e) {},
    t.prototype.removeSelf = function() {
        return this.parent ? void this.parent.removeChild(this) : (this.visible = !1, this.onRemoved(), void console.warn(this.name + "'s parent undefined!!!"))
    },
    t
} (BaseView);
__reflect(BaseUI.prototype, "BaseUI");
var BaseUIManager = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.cacheObject = !1,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.cacheObject = e[0],
        e[0] && (this.cachePoolUtil = CachePoolUtil.build())
    },
    t.addChild = function(e, t) {
        this.getInstance().addChild(e, t)
    },
    t.prototype.addChild = function(e, t) {
        var n;
        if (this.cacheObject) try {
            n = this.cachePoolUtil.cacheObject(e)
        } catch(i) {
            console.warn("In the " + Tool.getClazzName(this) + ",addChild:" + i)
        } else try {
            n = "object" == typeof e ? e: new e
        } catch(i) {
            console.warn("In the " + Tool.getClazzName(this) + ",addChild:" + i)
        }
        return this.addChildAt(n, void 0 != t ? t: this.numChildren),
        this.currentChild = n,
        n
    },
    t.removeChild = function(e) {
        this.getInstance().removeChild(e)
    },
    t.prototype.removeChild = function(t) {
        if (!t) return null;
        var n;
        if (this.cachePoolUtil) if ("object" == typeof t) n = t;
        else {
            var i = t[CachePoolUtil.TAG];
            if (!i) return console.warn("In the " + Tool.getClazzName(this) + ",removeChild:error"),
            null;
            n = this.cachePoolUtil.getObject(i)
        } else n = t;
        return n.parent && n.parent == this ? (e.prototype.removeChild.call(this, n), n == this.currentChild && this.numChildren > 0 ? this.currentChild = this.getChildAt(this.numChildren - 1) : this.currentChild = null, n) : (console.warn("In the " + Tool.getClazzName(this) + ",removeChild:error"), null)
    },
    t
} (BaseSington);
__reflect(BaseUIManager.prototype, "BaseUIManager");
var BaseImage = function(e) {
    function t(t) {
        for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
        var o = e.call(this, t) || this;
        return o.isAdded = !1,
        o.IS_ADDED = "IS_ADDED",
        o.onCreate.apply(o, n),
        o
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.name = Tool.getClazzName(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.UIAdded, this),
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.UIRemoved, this)
    },
    t.prototype.UIAdded = function() {
        this.onAdded(),
        this.isAdded = !0,
        this.dispatchEventWith(this.IS_ADDED),
        EventManager.dispatchEventWith(this.name + EventManager.ON_IMAGE_ADDED)
    },
    t.prototype.UIRemoved = function() {
        this.onRemoved(),
        this.isAdded = !1,
        EventManager.dispatchEventWith(this.name + EventManager.ON_IMAGE_REMOVED)
    },
    t.prototype.onAdded = function() {
        this.isAdded || (this.touchEnabled = !0),
        this.source && (this.texture = "string" == typeof this.source ? RES.getRes(this.source) : this.source)
    },
    t.prototype.onRemoved = function() {
        this.touchEnabled = !1
    },
    t
} (eui.Image);
__reflect(BaseImage.prototype, "BaseImage");
var FormatTimer = function() {
    function FormatTimer() {}
    return FormatTimer.build = function() {
        return new FormatTimer
    },
    FormatTimer.prototype.init = function(e, t) {
        this.iFormatTimer = t;
        var n = 1e3,
        i = 60 * n,
        o = 60 * i,
        r = 24 * o,
        a = e - e % r;
        this.days = a / r;
        var s = e - a,
        c = s - s % o;
        this.hours = c / o;
        var h = s - c,
        l = h - h % i;
        this.minutes = l / i;
        var d = h - l,
        u = d - d % n;
        return this.seconds = Math.floor(u / n),
        this
    },
    FormatTimer.prototype.start = function(delay) {
        var _this = this;
        void 0 === delay && (delay = 1e3);
        try {
            eval("egret"),
            this.intervalId = egret.setInterval(this.countDownLogic, this, delay)
        } catch(e) {
            this.intervalId = setInterval(function(e) {
                return _this.countDownLogic()
            },
            delay)
        }
        this.countDownLogic()
    },
    FormatTimer.prototype.stop = function() {
        try {
            eval("egret"),
            egret.clearInterval(this.intervalId)
        } catch(e) {
            clearInterval(this.intervalId)
        }
    },
    FormatTimer.prototype.countDownLogic = function() {
        if (this.seconds--, this.seconds < 0 && (this.minutes--, this.seconds = 59), this.minutes < 0 && (this.hours--, this.minutes = 59), this.hours < 0 && (this.days--, this.hours = 23), this.formatTimerData = {
            days: this.days + "",
            hours: this.hours + "",
            minutes: this.minutes + "",
            seconds: this.seconds + ""
        },
        !(this.days || this.hours || this.minutes || this.seconds)) {
            this.stop();
            var e = this.iFormatTimer.onTimerOver;
            return void(e && e.call(this.iFormatTimer, this.formatTimerData))
        }
        var t = this.iFormatTimer.onTimerChanging;
        t && t.call(this.iFormatTimer, this.formatTimerData)
    },
    FormatTimer
} ();
__reflect(FormatTimer.prototype, "FormatTimer");
var FormatTimerData = function() {
    function e() {}
    return e
} ();
__reflect(FormatTimerData.prototype, "FormatTimerData");
var PageManager = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function(t) {
        return void 0 === t && (t = !1),
        e.getInstance.call(this, t)
    },
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t);
        var i = this.swichPage;
        EventManager.addEventListener(Mode.GOTO_LOADING, i, this),
        EventManager.addEventListener(Mode.GOTO_INDEX, i, this),
        EventManager.addEventListener(Mode.GOTO_DRAWGUIDE, i, this),
        EventManager.addEventListener(Mode.GOTO_DRAW1, i, this),
        EventManager.addEventListener(Mode.GOTO_DRAW2, i, this),
        EventManager.addEventListener(Mode.GOTO_PROCESS, i, this),
        EventManager.addEventListener(Mode.GOTO_END, i, this)
    },
    t.prototype.swichPage = function(e) {
        t.removeChild(this.currentChild);
        var n;
        switch (e.type) {
        case Mode.GOTO_LOADING:
            n = LoadingUI;
            break;
        case Mode.GOTO_INDEX:
            n = IndexUI;
            break;
        case Mode.GOTO_DRAWGUIDE:
            n = DrawGuideUI;
            break;
        case Mode.GOTO_DRAW1:
            n = Draw1UI;
            break;
        case Mode.GOTO_DRAW2:
            n = Draw2UI;
            break;
        case Mode.GOTO_PROCESS:
            n = ProcessUI;
            break;
        case Mode.GOTO_END:
            n = EndUI
        }
        n && t.addChild(n)
    },
    t
} (BaseUIManager);
__reflect(PageManager.prototype, "PageManager");
var ThemeAdapter = function() {
    function e() {}
    return e.prototype.getTheme = function(e, t, n, i) {
        function o(e) {
            t.call(i, e)
        }
        function r(t) {
            t.resItem.url == e && (RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, r, null), n.call(i))
        }
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, r, null),
        RES.getResByUrl(e, o, this, RES.ResourceItem.TYPE_TEXT)
    },
    e
} ();
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var AssetAdapter = function() {
    function e() {}
    return e.prototype.getAsset = function(e, t, n) {
        function i(i) {
            t.call(n, i, e)
        }
        if (RES.hasRes(e)) {
            var o = RES.getRes(e);
            o ? i(o) : RES.getResAsync(e, i, this)
        } else RES.getResByUrl(e, i, this, RES.ResourceItem.TYPE_IMAGE)
    },
    e
} ();
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var DoubleFingerHelper = function() {
    function e(e) {
        this.maxScaleSize = 4096,
        this.minScaleSize = 200,
        this.outSideRange = 100,
        this.canTouchMoveX = !0,
        this.canTouchMoveY = !0,
        this.canTouchScale = !1,
        this.canTouchRotate = !1,
        this.defineSize = !1,
        this.defineOutside = !1,
        this.isTouched = !1,
        this.doubleDistance = 0,
        this.doubleAngle = 0,
        this.touchCount = 0,
        this.originAngle = 0,
        this.touchObj = e;
        var t = this.stage = egret.MainContext.instance.stage;
        t.maxTouches = 2;
        var n = t.$children[0];
        this.rectangle || (this.rectangle = new egret.Rectangle(0, 0, n.width, n.height)),
        this.release()
    }
    return e.build = function(t) {
        return new e(t)
    },
    e.prototype.addHelperListener = function(e) {
        this.iDoubleFingerHelper = e
    },
    e.prototype.removeHelperListener = function() {
        this.iDoubleFingerHelper = null
    },
    e.prototype.reset = function() {
        this.release(),
        this.touchCount = 0,
        this.touchPoints = {
            ids: []
        },
        this.originPoints = {
            ids: []
        };
        var e = this.stage;
        e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
        e.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    },
    e.prototype.release = function() {
        this.isTouched = !1;
        var e = this.stage;
        e.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    },
    e.prototype.onTouchBegin = function(e) {
        var t = e.touchPointID,
        n = e.stageX,
        i = e.stageY,
        o = this.touchObj;
        this.originAngle = o.rotation;
        var r = this.touchPoints;
        r[t] || (r[t] = new egret.Point(n, i), r.ids.push(t));
        var a = this.originPoints;
        if (a[t] || (a[t] = new egret.Point(n - o.x, i - o.y), a.ids.push(t)), this.touchCount++, 2 == this.touchCount) return this.doubleDistance = this.getDoubleDistance(),
        void(this.doubleAngle = this.getDoubleAngle());
        this.isTouched = !0,
        o.dispatchEventWith(EventManager.TOUCH_BEGIN);
        var s = this.iDoubleFingerHelper;
        s && s.onDoubleTouchBegin && s.onDoubleTouchBegin()
    },
    e.prototype.onTouchMove = function(e) {
        var t = e.touchPointID,
        n = e.stageX,
        i = e.stageY,
        o = this.touchObj;
        if (this.touchPoints[t].setTo(n, i), this.touchCount > 1) {
            this.canTouchScale && (o.scaleX = o.scaleY = this.getDoubleDistance() / this.doubleDistance, this.defineSize && Tool.defineSize(o, this.maxScaleSize, this.minScaleSize)),
            this.canTouchRotate && (o.rotation = this.originAngle + this.getDoubleAngle() - this.doubleAngle);
            var r = this.iDoubleFingerHelper;
            r && r.onDoubleTouchMove && r.onDoubleTouchMove()
        } else {
            if (e.target != this.touchObj) return;
            var a = this.originPoints[t];
            this.canTouchMoveX && (o.x = n - a.x),
            this.canTouchMoveY && (o.y = i - a.y),
            this.defineOutside && Tool.defineOutSide(o, this.rectangle, this.outSideRange),
            o.dispatchEventWith(EventManager.TOUCH_MOVE);
            var r = this.iDoubleFingerHelper;
            r && r.onDoubleTouchMove && r.onDoubleTouchMove()
        }
    },
    e.prototype.onTouchEnd = function(e) {
        var t = e.touchPointID;
        if ( - 1 != this.touchPoints.ids.indexOf(t)) {
            delete this.touchPoints[t],
            delete this.originPoints[t],
            this.touchCount > 0 && this.touchCount--;
            var n = this.touchObj;
            if (n.width *= n.scaleX, n.height *= n.scaleY, n.scaleX = 1, n.scaleY = 1, n.anchorOffsetX = n.width / 2, n.anchorOffsetY = n.height / 2, this.touchCount < 1) {
                this.defineSize && Tool.defineSize(n, this.maxScaleSize, this.minScaleSize),
                this.defineOutside && Tool.defineOutSide(n, this.rectangle, this.outSideRange),
                this.isTouched = !1,
                n.dispatchEventWith(EventManager.TOUCH_END);
                var i = this.iDoubleFingerHelper;
                i && i.onDoubleTouchEnd && i.onDoubleTouchEnd()
            }
        }
    },
    e.prototype.getDoubleDistance = function() {
        var e = this.touchPoints,
        t = e.ids,
        n = t.length,
        i = e[t[n - 1]],
        o = e[t[n - 2]];
        return i && o ? MathUtil.getDistanceFromPP(i, o) : 0
    },
    e.prototype.getDoubleAngle = function() {
        var e = this.touchPoints,
        t = e.ids,
        n = t.length,
        i = e[t[n - 1]],
        o = e[t[n - 2]];
        return i && o ? MathUtil.getAngleFromPP(i, o) : 0
    },
    e
} ();
__reflect(DoubleFingerHelper.prototype, "DoubleFingerHelper");
var LinearChangeExpert = function() {
    function e(e) {
        this.$t1 = 0,
        this.$t2 = 0,
        this.iLinearChangeExpert = e
    }
    return e.build = function(t) {
        return new e(t)
    },
    e.prototype.start = function(e, t, n, i, o) {
        var r = this;
        void 0 === i && (i = {
            start: 2e3,
            end: 4e3
        }),
        void 0 === o && (o = egret.Ease.quadInOut);
        var a = RandomUtil.getRandomInteger(n.start, n.end),
        s = RandomUtil.getRandomInteger(i.start, i.end);
        this.$t1 = this.$t2,
        this.$t2 = this.$t2 - this.$t2 % t + t * a + e,
        egret.Tween.get(this).to({
            t: this.$t2
        },
        s, o).call(function(e) {
            var t = r.iLinearChangeExpert;
            t && t.onStop && t.onStop(r.$t1)
        })
    },
    e.prototype.stop = function() {
        egret.Tween.removeTweens(this)
    },
    Object.defineProperty(e.prototype, "t", {
        get: function() {
            return this.$t1
        },
        set: function(e) {
            var t = this.iLinearChangeExpert;
            t && t.onPlaying && t.onPlaying(Math.floor(e))
        },
        enumerable: !0,
        configurable: !0
    }),
    e
} ();
__reflect(LinearChangeExpert.prototype, "LinearChangeExpert");
var LinearChangeNormal = function() {
    function e(e) {
        this.iLinearChangeNormal = e
    }
    return e.build = function(t) {
        return new e(t)
    },
    e.prototype.start = function(e, t, n, i) {
        var o = this;
        void 0 === n && (n = 500),
        this.$t = e;
        var r = egret.Tween.get(this).to({
            t: t
        },
        n, i),
        a = this.iLinearChangeNormal;
        a && a.onStop && r.call(function(e) {
            return a.onStop(o.$t)
        })
    },
    e.prototype.stop = function() {
        egret.Tween.removeTweens(this)
    },
    Object.defineProperty(e.prototype, "t", {
        get: function() {
            return this.$t
        },
        set: function(e) {
            var t = this.iLinearChangeNormal;
            t && t.onPlaying && t.onPlaying(Math.floor(e))
        },
        enumerable: !0,
        configurable: !0
    }),
    e
} ();
__reflect(LinearChangeNormal.prototype, "LinearChangeNormal");
var OrientationTips = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = this,
        n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
        e.prototype.onCreate.apply(this, n);
        var o = n[0];
        this.isLandscapeHint = 1 == o,
        this.visible = !1,
        this.width = 2048,
        this.height = 2048,
        this.horizontalCenter = 0,
        this.verticalCenter = 0;
        var r = egret.MainContext.instance.stage.$children[0];
        this.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            for (var n = r.$children,
            i = 0,
            o = n.length; o > i; i++) n[i] == t && EventManager.removeEventListener(EventManager.RELOCATION, t.tipLogic, t)
        },
        this),
        r.addChild(this)
    },
    t.build = function(e) {
        for (var n = egret.MainContext.instance.stage.$children[0], i = n.$children, o = 0, r = i.length; r > o; o++) {
            var a = i[o];
            a instanceof t && a.parent.removeChild(a)
        }
        return new t(e)
    },
    t.prototype.childrenCreated = function() {
        var e = new eui.Rect;
        e.fillColor = 3355443,
        e.left = e.top = e.right = e.bottom = 0;
        var t = RES.getRes("dft_json.dft_ori_ico"),
        n = this.ico = new eui.Image(t);
        n.width = t.textureWidth,
        n.height = t.textureHeight,
        Tool.setAnchorOffsetCenter(n);
        var i = this.lb = new eui.Label;
        i.size = 36,
        i.fontFamily = "Microsoft YaHei";
        var o = this.isLandscapeHint;
        i.text = "为了更好的体验，请使用" + (o ? "横屏": "竖屏") + "浏览",
        i.horizontalCenter = 0,
        this.addChildren(e, n, i);
        var r = document.body,
        a = r.clientWidth,
        s = r.clientHeight; (o && s > a || !o && a > s) && this.show(),
        EventManager.addEventListener(EventManager.RELOCATION, this.tipLogic, this)
    },
    t.prototype.tipLogic = function(e) {
        var t = document.body,
        n = this.isLandscapeHint,
        i = t.clientWidth,
        o = t.clientHeight;
        n && o > i || !n && i > o ? this.show() : this.hide()
    },
    t.prototype.show = function() {
        this.parent.addChild(this);
        var e = this.ico,
        t = this.lb;
        Tool.setCenterOfParent(e),
        e.y -= 40,
        t.y = e.y + e.height / 2 + 40;
        var n, i;
        Mode.EGRET_IS_PORTRAIT ? this.isLandscapeHint ? (n = 90, i = 0, this.rotation = Number(window.orientation)) : (n = 90, i = 0, this.rotation = Number(window.orientation)) : this.isLandscapeHint ? (n = 0, i = 90, this.rotation = -90) : (n = 90, i = 0, this.rotation = 0),
        e.rotation = n,
        egret.Tween.get(e, {
            loop: !0
        }).to({
            rotation: i
        },
        600).wait(500).to({
            rotation: n
        },
        600).wait(50),
        this.visible = !0
    },
    t.prototype.hide = function() {
        egret.Tween.removeTweens(this.ico),
        this.visible = !1
    },
    t
} (BaseSington);
__reflect(OrientationTips.prototype, "OrientationTips");
var ScrollerHelper = function() {
    function e(e, t, n) {
        this.isTouchMove = !1,
        this.isFixed = !1,
        this.currentPosition = 0,
        this.lastPosition = 0,
        t ? (this.scrollerBorder = "width", this.scrollerParam = "scrollPolicyH", this.viewportBorder = "contentWidth", this.viewportParam = "scrollH", this.pointParam = "X") : (this.scrollerBorder = "height", this.scrollerParam = "scrollPolicyV", this.viewportBorder = "contentHeight", this.viewportParam = "scrollV", this.pointParam = "Y"),
        e.once(egret.Event.REMOVED_FROM_STAGE, this.stop, this),
        this.scroller = e,
        this.isHScroller = t,
        this.pullOffset = n
    }
    return e.build = function(t, n, i) {
        return void 0 === i && (i = 80),
        new e(t, n, i)
    },
    e.prototype.addPullListener = function(e) {
        return this.iScrollerHelper = e,
        this
    },
    e.prototype.removePullListener = function() {
        this.iScrollerHelper = null
    },
    e.prototype.start = function() {
        this.resetStatus();
        var e = this.scroller.stage;
        e && (e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), e.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this))
    },
    e.prototype.stop = function() {
        this.removePullListener(),
        this.stopScroll();
        var e = this.scroller.stage;
        e && (e.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this))
    },
    e.prototype.resetScroll = function() {
        var e = this.scroller,
        t = e.viewport,
        n = t[this.viewportParam];
        switch (!0) {
        case 0 > n: var i = this.isHScroller ? {
                scrollH: 0
            }: {
                scrollV: 0
            };
            egret.Tween.get(t).to(i, -n, egret.Ease.circIn).call(this.resetStatus, this);
            break;
        case n > 0 : var o = t[this.viewportBorder] - e[this.scrollerBorder];
            if (this.isFixed) return t[this.viewportParam] = o,
            void this.resetStatus();
            if (n > o) {
                var i = this.isHScroller ? {
                    scrollH: o
                }: {
                    scrollV: o
                };
                return void egret.Tween.get(t).to(i, n - o, egret.Ease.circIn).call(this.resetStatus, this)
            }
        default:
            this.resetStatus()
        }
    },
    e.prototype.onTouchBegin = function(e) {
        this.isTouchMove = !1;
        var t = this.scroller;
        t.validateNow(),
        this.currentPosition = t.viewport[this.viewportParam],
        t.stage && t.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this)
    },
    e.prototype.onTouchMove = function(e) {
        this.isTouchMove = !0;
        var t = this.scroller,
        n = t.viewport,
        i = n[this.viewportBorder],
        o = this.viewportParam,
        r = n[o],
        a = t[this.scrollerBorder],
        s = this.pullOffset,
        c = this.lastPosition,
        h = e["stage" + this.pointParam];
        this.isFixed = !1,
        i > a ? h > c ? -s >= r && (n[o] = -s, this.stopScroll()) : r >= i + s - a && (n[o] = i + s - a, this.stopScroll()) : h > c ? -s >= r && (n[o] = -s, this.stopScroll()) : r >= s && (n[o] = s, this.isFixed = !0, this.stopScroll()),
        this.lastPosition = h
    },
    e.prototype.onTouchEnd = function(e) {
        var t = this.scroller;
        if (this.isTouchMove || (t.viewport[this.viewportParam] = this.currentPosition, t.stopAnimation()), this.isTouchMove = !1, t[this.scrollerParam] != eui.ScrollPolicy.ON) {
            if (this.iScrollerHelper) {
                var n = this.iScrollerHelper,
                i = t.viewport;
                if (i[this.viewportParam] < 0) return void(n.onStartPullOver && n.onStartPullOver());
                if (i[this.viewportParam] > i[this.viewportBorder] - t[this.scrollerBorder]) return void(n.onEndPullOver && n.onEndPullOver())
            }
            this.resetScroll()
        }
    },
    e.prototype.stopScroll = function() {
        var e = this.scroller;
        e.stage && e.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e[this.scrollerParam] = eui.ScrollPolicy.OFF,
        e.stopAnimation()
    },
    e.prototype.resetStatus = function() {
        var e = this.scroller;
        e.stage && e.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e[this.scrollerParam] = eui.ScrollPolicy.ON
    },
    e
} ();
__reflect(ScrollerHelper.prototype, "ScrollerHelper");
var SingleFingerHelper = function() {
    function e(e) {
        this.maxScaleSize = 4096,
        this.minScaleSize = 200,
        this.outSideRange = 100,
        this.canTouchMoveX = !0,
        this.canTouchMoveY = !0,
        this.canTouchScale = !1,
        this.canTouchRotate = !1,
        this.defineSize = !1,
        this.defineOutside = !1,
        this.isTouched = !1,
        this.touchdistance = 0,
        this.touchAngle = 0,
        this.originAngle = 0,
        this.lastAngle = 0,
        this.anticlockwise = !1,
        this.anticlockwiseCount = 0,
        this.anticlockwiseOffset = 0,
        this.clockwiseCount = 0,
        this.clockwiseOffset = 0,
        this.positiveScale = !0,
        this.touchObj = e;
        var t = this.stage = egret.MainContext.instance.stage;
        t.maxTouches = 2;
        var n = t.$children[0];
        this.rectangle || (this.rectangle = new egret.Rectangle(0, 0, n.width, n.height)),
        this.release()
    }
    return e.build = function(t) {
        return new e(t)
    },
    e.prototype.addHelperListener = function(e) {
        return this.iSingleFingerHelper = e,
        this
    },
    e.prototype.reset = function() {
        this.release(),
        this.touchPoint = new egret.Point,
        this.originPoint = new egret.Point,
        this.centerPoint = new egret.Point;
        var e = this.stage;
        e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
        e.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    },
    e.prototype.release = function() {
        this.isTouched = !1;
        var e = this.stage;
        e.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    },
    e.prototype.onTouchBegin = function(e) {
        if (e.target == this.touchObj) {
            var t = e.stageX,
            n = e.stageY,
            i = this.touchObj;
            this.originAngle = i.rotation;
            var o = this.touchPoint;
            o ? o.setTo(t, n) : o = new egret.Point(t, n);
            var r = this.originPoint;
            r ? r.setTo(t - i.x, n - i.y) : r = new egret.Point(t - i.x, n - i.y);
            var a = i.localToGlobal(),
            s = this.centerPoint;
            s ? s.setTo(a.x + i.width / 2, a.y + i.height / 2) : s = new egret.Point(a.x + i.width / 2, a.y + i.height / 2),
            this.touchdistance = this.getCurrentDistance(),
            this.touchAngle = this.getCurrentAngle(),
            this.isTouched = !0,
            i.dispatchEventWith(EventManager.TOUCH_BEGIN);
            var c = this.iSingleFingerHelper;
            c && c.onSingleTouchBegin && c.onSingleTouchBegin()
        }
    },
    e.prototype.onTouchMove = function(e) {
        if (this.isTouched) {
            var t = e.stageX,
            n = e.stageY,
            i = this.touchObj;
            this.touchPoint.setTo(t, n);
            var o = this.originPoint;
            this.canTouchMoveX && (i.x = t - o.x),
            this.canTouchMoveY && (i.y = n - o.y),
            this.defineOutside && Tool.defineOutSide(i, this.rectangle, this.outSideRange),
            this.canTouchScale && (i.scaleX = i.scaleY = this.getCurrentDistance() / this.touchdistance),
            this.defineSize && Tool.defineSize(i, this.maxScaleSize, this.minScaleSize),
            this.canTouchRotate && this.rotate(),
            i.dispatchEventWith(EventManager.TOUCH_MOVE);
            var r = this.iSingleFingerHelper;
            r && r.onSingleTouchMove && r.onSingleTouchMove()
        }
    },
    e.prototype.onTouchEnd = function(e) {
        if (this.isTouched) {
            this.touchObj.dispatchEventWith(EventManager.TOUCH_END);
            var t = this.iSingleFingerHelper;
            t && t.onSingleTouchEnd && t.onSingleTouchEnd(),
            this.isTouched = !1
        }
    },
    e.prototype.rotate = function() {
        var e = this.lastAngle,
        t = this.getCurrentAngle(),
        n = t - e;
        t > 0 && e > 0 || 0 > t && 0 > e ? n > 0 ? this.anticlockwise ? (this.anticlockwiseOffset = 0, this.anticlockwise = !1) : this.clockwiseRotate(n) : this.anticlockwise ? this.anticlockwiseRotate(n) : (this.clockwiseOffset = 0, this.anticlockwise = !0) : t > 0 && 0 > e ? this.clockwiseRotate(n) : this.anticlockwiseRotate(n);
        var i = this.touchObj;
        this.lastAngle = i.rotation = this.originAngle + t - this.touchAngle
    },
    e.prototype.getCurrentDistance = function() {
        var e = this.touchPoint,
        t = this.centerPoint;
        return e && t ? MathUtil.getDistanceFromPP(e, t) : 0
    },
    e.prototype.getCurrentAngle = function() {
        var e = this.touchPoint,
        t = this.centerPoint;
        return e && t ? MathUtil.getAngleFromPP(e, t) : 0
    },
    e.prototype.clockwiseRotate = function(e) {
        this.clockwiseOffset += e,
        this.clockwiseOffset > 360 && (this.clockwiseOffset -= 360, this.clockwiseCount++, this.anticlockwiseCount--)
    },
    e.prototype.anticlockwiseRotate = function(e) {
        this.anticlockwiseOffset += e,
        this.anticlockwiseOffset > 360 && (this.anticlockwiseOffset -= 360, this.anticlockwiseCount++, this.clockwiseCount--)
    },
    e
} ();
__reflect(SingleFingerHelper.prototype, "SingleFingerHelper");
var Toast = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.margin = 25,
        t.padding = 20,
        t.messages = [],
        t.durations = [],
        t.mBottom = 200,
        t.isPlay = !1,
        t.tweenTime = 750,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t);
        var i = egret.MainContext.instance.stage.$children[0];
        this.width = i.width,
        this.height = i.height,
        this.visible = !1,
        this.alpha = 0,
        this.touchEnabled = this.touchChildren = !1
    },
    t.getInstance = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return e.getInstance.apply(this, t)
    },
    t.prototype.childrenCreated = function() {
        var e = this.bg = new eui.Rect;
        e.fillAlpha = .75,
        e.ellipseWidth = 24,
        e.width = e.height = 0;
        var t = this.lb = new eui.Label;
        t.size = 24,
        t.fontFamily = "Microsoft YaHei";
        var n = 2 * this.margin + 2 * this.padding,
        i = this.parent;
        t.maxWidth = i.width - n,
        t.maxHeight = i.height - n,
        this.addChildren(e, t)
    },
    t.makeText = function(e, n) {
        return void 0 === n && (n = t.LENGTH_SHORT),
        this.getInstance().makeText(e, n)
    },
    t.prototype.makeText = function(e, t) {
        return this.parent || egret.MainContext.instance.stage.$children[0].addChild(this),
        this.messages.push(e),
        this.durations.push(t),
        this
    },
    t.prototype.show = function() {
        var e = this;
        if (!this.isPlay && this.messages.length) {
            var t = this.parent;
            t.addChildAt(this, t.numChildren);
            var n = this.lb;
            n.text = this.messages.shift(),
            n.validateNow();
            var i = this.bg,
            o = this.padding,
            r = 2 * o;
            i.width = n.width + r,
            i.height = n.height + r,
            n.x = (t.width - n.width) / 2,
            n.y = t.height - n.height - this.mBottom,
            i.x = n.x - o,
            i.y = n.y - o;
            var a = 750,
            s = this.durations.shift(),
            c = s - 2 * a;
            this.visible = this.isPlay = !0,
            egret.Tween.get(this).to({
                alpha: 1
            },
            a).wait(c).to({
                alpha: 0
            },
            a).call(function(t) {
                e.visible = e.isPlay = !1,
                e.show()
            })
        }
    },
    t.hide = function() {
        this.getInstance().hide()
    },
    t.prototype.hide = function() {
        egret.Tween.removeTweens(this),
        this.visible = this.isPlay = !1,
        this.alpha = 0
    },
    t.LENGTH_SHORT = 3e3,
    t.LENGTH_LONG = 5e3,
    t
} (BaseSington);
__reflect(Toast.prototype, "Toast");
var AudioManager = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.cachePoolUtil = CachePoolUtil.build(),
        t
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.init = function(e) {
        return this.getInstance().init(e)
    },
    t.prototype.init = function(e) {
        if (!this.cachePoolUtil.hasCacheObject(e)) {
            var t = document.getElementById(e);
            t ? this.cachePoolUtil.cacheObject(this.createAudioObject(t, 1), e) : console.warn("In the AudioManager,The audio by id:" + e + " is undefined")
        }
        return this
    },
    t.play = function(e, t) {
        return void 0 === t && (t = 1),
        this.getInstance().play(e, t)
    },
    t.prototype.play = function(e, t) {
        void 0 === t && (t = 1);
        var n = this.cachePoolUtil.getObject(e);
        if (!n) return console.warn("The id " + e + " of audio is undefined,by play"),
        this;
        var i = n.audio;
        if (i.load(), i.volume = n.volume, i.loop = !1, 0 > t) i.loop = !0,
        i.play();
        else if (t > 1) {
            var o = 0,
            r = function() {
                t > o ? (i.play(), o++) : i.removeEventListener("ended", r)
            };
            i.addEventListener("ended", r)
        } else i.play();
        return this
    },
    t.pause = function(e) {
        return this.getInstance().pause(e)
    },
    t.prototype.pause = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        if (!t) return console.warn("The id " + e + " of audio is undefined,by pause"),
        this;
        var n = t.audio;
        return ! n.paused && n.pause(),
        this
    },
    t.stop = function(e) {
        return this.getInstance().stop(e)
    },
    t.prototype.stop = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        if (!t) return console.warn("The id " + e + " of audio is undefined,by stop"),
        this;
        var n = t.audio;
        return ! n.paused && n.stop(),
        n.load(),
        this
    },
    t.setVolume = function(e, t) {
        return this.getInstance().setVolume(e, t)
    },
    t.prototype.setVolume = function(e, t) {
        var n = this.cachePoolUtil.getObject(e);
        return n ? (n.audio.volume = n.volume = t, this) : (console.warn("The id " + e + " of audio is undefined,by setVolume"), this)
    },
    t.setAllVolume = function(e) {
        return this.getInstance().setAllVolume(e)
    },
    t.prototype.setAllVolume = function(e) {
        return this.cachePoolUtil.forSomething(function(t) {
            return t.audio.volume = t.volume = e
        },
        this),
        this
    },
    t.getDuration = function(e) {
        return this.getInstance().getDuration(e)
    },
    t.prototype.getDuration = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.audio.duration: (console.warn("The id " + e + " of audio is undefined,by getDuration"), 0)
    },
    t.getCurrentTime = function(e) {
        return this.getInstance().getCurrentTime(e)
    },
    t.prototype.getCurrentTime = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.audio.currentTime: (console.warn("The id " + e + " of audio is undefined,by getCurrentTime"), 0)
    },
    t.getAudio = function(e) {
        return this.getInstance().getAudio(e)
    },
    t.prototype.getAudio = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.audio: (console.warn("The id " + e + " of audio is undefined,by getAudio"), null)
    },
    t.prototype.createAudioObject = function(e, t) {
        return {
            audio: e,
            volume: t
        }
    },
    t
} (BaseSington);
__reflect(AudioManager.prototype, "AudioManager");
var BgmManager = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.fixedX = 0,
        t.fixedY = 0,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        this.touchEnabled = !1,
        this.stopRes = "dft_music_stop_png",
        this.playRes = "dft_music_play_png",
        this.createImage(),
        this.createLabel();
        var i = this.audio = document.getElementsByTagName("audio")[0];
        i || t.soundRes || (this.visible = !1),
        this.musicIco.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this),
        EventManager.addEventListener(EventManager.HTML_IS_SHOW, this.onVisibilityChange, this),
        EventManager.addEventListener(EventManager.HTML_IS_HIDE, this.onVisibilityChange, this)
    },
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.prototype.createImage = function() {
        var e = RES.getRes(this.stopRes),
        t = this.musicIco = new eui.Image(e);
        t.width = this.width = e.textureWidth,
        t.height = this.height = e.textureHeight,
        Tool.setAnchorOffsetCenter(t),
        this.addChild(t)
    },
    t.prototype.createLabel = function() {
        var e = this.musicText = new eui.Label;
        e.size = 30,
        e.width = 100,
        e.height = this.musicIco.height,
        e.textColor = 16777215,
        e.fontFamily = "Microsoft YaHei",
        e.textAlign = "center",
        e.verticalAlign = "middle",
        e.touchEnabled = !1,
        this.addChild(e)
    },
    t.fixedPosition = function(e, t, n) {
        return void 0 === e && (e = 20),
        void 0 === t && (t = 20),
        void 0 === n && (n = 0),
        this.getInstance().fixedPosition(e, t, n)
    },
    t.prototype.fixedPosition = function(e, t, n) {
        var i = this;
        switch (void 0 === e && (e = 20), void 0 === t && (t = 20), void 0 === n && (n = 0), n) {
        case 0:
            this.x = e,
            this.y = t;
            break;
        case 1:
            Tool.setAnchorOffsetCenter(this),
            egret.Tween.get(this).to({
                scaleX: 0,
                scaleY: 0
            },
            300, egret.Ease.backIn).call(function(n) {
                i.x = e + i.anchorOffsetX,
                i.y = t + i.anchorOffsetY
            }).to({
                scaleX: 1,
                scaleY: 1
            },
            300, egret.Ease.backOut);
            break;
        case 2:
            Tool.setAnchorOffsetCenter(this);
            var o = new egret.Point(this.x, this.y),
            r = new egret.Point((e + this.x) / 2, this.y - 200),
            a = new egret.Point(e, t);
            BezierCurveEffects.build([o, r, a], this, 600)
        }
        var s = egret.MainContext.instance.stage.$children[0];
        return e > s.width / 2 - this.musicIco.width / 2 ? (this.textStartX = -120, this.textPlayX = -100) : (this.textStartX = 70, this.textPlayX = 50),
        this.fixedX = e,
        this.fixedY = t,
        this
    },
    t.reFixedPosition = function() {
        return this.getInstance().reFixedPosition()
    },
    t.prototype.reFixedPosition = function() {
        return this.x = this.fixedX,
        this.y = this.fixedY,
        this
    },
    t.changeMusic = function(e) {
        this.getInstance().changeMusic(e)
    },
    t.prototype.changeMusic = function(e) {
        var n = this;
        if (this.audio) {
            var i = this.audio;
            if ("iOS" != egret.Capabilities.os) var o = 1,
            r = 0,
            a = setInterval(function(t) {
                i.volume -= .1,
                o--,
                r >= o && (clearInterval(a), n.changeAudio(e))
            },
            100);
            else this.changeAudio(e)
        } else if (t.soundRes) {
            var s = t.soundRes;
            SoundManager.turnDown(s).call(function(n) {
                var i = SoundManager.getSoundObject(s);
                SoundManager.setVolume(e, 0).play(e, 0, i.repeatCount).turnUp(e),
                t.soundRes = e
            })
        }
    },
    t.prototype.changeAudio = function(e) {
        var n = this.audio;
        n.pause(),
        n.src = e,
        n.load(),
        n.volume = 1,
        t.isClickPause || t.status != Constants.STATUS_PLAY || this.play()
    },
    t.play = function(e) {
        void 0 === e && (e = !0),
        this.getInstance().play(e)
    },
    t.prototype.play = function(e) {
        var n = this;
        if (void 0 === e && (e = !0), this.audio && this.audio.src) {
            var i = this.audio;
            i.loop = e,
            DeviceUtil.isIOS() ? setTimeout(function(e) {
                i.play(),
                n._play()
            },
            100) : (i.play(), this._play())
        } else t.soundRes && (SoundManager.play(t.soundRes, 0, e ? -1 : 1), this._play())
    },
    t.prototype._play = function() {
        this.musicIco.texture = RES.getRes(this.playRes),
        t.status == Constants.STATUS_STOP && t.rotate && egret.startTick(this.musicTick, this),
        t.textAnim && this.startTextAnim("播放"),
        t.status = Constants.STATUS_PLAY,
        t.isPlaying = !0
    },
    t.clickPlay = function() {
        this.getInstance().clickPlay()
    },
    t.prototype.clickPlay = function() {
        this.play(),
        t.isClickPause = !1
    },
    t.showClickPlay = function() {
        this.show(),
        this.getInstance().clickPlay()
    },
    t.show = function() { (this.pause || t.soundRes) && (this.getInstance().visible = !0)
    },
    t.pause = function() {
        this.getInstance().pause()
    },
    t.prototype.pause = function() {
        var e = this;
        if (this.audio) if (this.audio.paused && t.status == Constants.STATUS_STOP) {
            var n = function(t) {
                document.removeEventListener("mediaReady", n),
                e.audio.pause(),
                e._pause()
            };
            document.addEventListener("mediaReady", n)
        } else this.audio.pause(),
        this._pause();
        else t.soundRes && (SoundManager.pause(t.soundRes), this._pause())
    },
    t.prototype._pause = function() {
        this.musicIco.texture = RES.getRes(this.stopRes),
        t.textAnim && this.startTextAnim("暂停"),
        t.status = Constants.STATUS_PAUSE,
        t.isPlaying = !1
    },
    t.clickPause = function() {
        this.getInstance().clickPause()
    },
    t.prototype.clickPause = function() {
        this.pause(),
        t.isClickPause = !0
    },
    t.hideClickPause = function() {
        this.hide(),
        this.getInstance().clickPause()
    },
    t.hide = function() {
        this.getInstance().visible = !1
    },
    t.prototype.onTap = function(e) {
        t.status == Constants.STATUS_STOP || t.isClickPause ? (this.play(), t.isClickPause = !1) : (this.pause(), t.isClickPause = !0)
    },
    t.prototype.onVisibilityChange = function(e) {
        if (t.status != Constants.STATUS_STOP && !t.isClickPause) switch (e.type) {
        case EventManager.HTML_IS_SHOW:
            this.play();
            break;
        case EventManager.HTML_IS_HIDE:
            this.pause()
        }
    },
    t.prototype.musicTick = function(e) {
        return ! 0
    },
    t.prototype.startTextAnim = function(e) {
        var t = this.musicText;
        egret.Tween.removeTweens(t),
        t.x = this.textStartX,
        t.alpha = 0,
        t.text = e,
        egret.Tween.get(t).to({
            x: this.textPlayX,
            alpha: 1
        },
        300).wait(400).to({
            x: t.x,
            alpha: 0
        },
        300)
    },
    t.status = -1,
    t.isClickPause = !1,
    t.isPlaying = !1,
    t.rotate = !0,
    t.textAnim = !0,
    t
} (BaseSington);
__reflect(BgmManager.prototype, "BgmManager");
var EventManager = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.HTML_IS_SHOW = "EventManager.HTML_IS_SHOW",
    t.HTML_IS_HIDE = "EventManager.HTML_IS_HIDE",
    t.ON_CONTAINER_ADDED = "EventManager.ON_CONTAINER_ADDED",
    t.ON_CONTAINER_REMOVED = "EventManager.ON_CONTAINER_REMOVED",
    t.ON_EDIT_TEXT_ADDED = "EventManager.ON_EDIT_TEXT_ADDED",
    t.ON_EDIT_TEXT_REMOVED = "EventManager.ON_EDIT_TEXT_REMOVED",
    t.ON_IMAGE_ADDED = "EventManager.ON_IMAGE_ADDED",
    t.ON_IMAGE_REMOVED = "EventManager.ON_IMAGE_REMOVED",
    t.ON_IIEM_RENDERER_ADDED = "EventManager.ON_IIEM_RENDERER_ADDED",
    t.ON_IIEM_RENDERER_REMOVED = "EventManager.ON_IIEM_RENDERER_REMOVED",
    t.ON_SCROLLER_ADDED = "EventManager.ON_SCROLLER_ADDED",
    t.ON_SCROLLER_REMOVED = "EventManager.ON_SCROLLER_REMOVED",
    t.ON_UI_ADDED = "EventManager.ON_UI_ADDED",
    t.ON_UI_REMOVED = "EventManager.ON_UI_REMOVED",
    t.POP_IS_SHOW = "EventManager.POP_IS_SHOW",
    t.POP_IS_HIDE = "EventManager.POP_IS_HIDE",
    t.ITEM_TO_RESUME = "EventManager.ITEM_TO_RESUME",
    t.ITEM_TO_PAUSE = "EventManager.ITEM_TO_PAUSE",
    t.BEGIN = "EventManager.BEGIN",
    t.RUNNING = "EventManager.RUNNING",
    t.COMPLETE = "EventManager.COMPLETE",
    t.TOUCH_BEGIN = "EventManager.TOUCH_BEGIN",
    t.TOUCH_MOVE = "EventManager.TOUCH_MOVE",
    t.TOUCH_END = "EventManager.TOUCH_END",
    t.ON_SELECT_TAP = "EventManager.ON_SELECT_TAP",
    t.ON_ITEM_TOUCH_BEGIN = "EventManager.ON_ITEM_TOUCH_BEGIN",
    t.ON_ITEM_TOUCH_END = "EventManager.ON_ITEM_TOUCH_END",
    t.ON_ITEM_TOUCH_EXECUTE = "EventManager.ON_ITEM_TOUCH_EXECUTE",
    t.RELOCATION = "EventManager.RELOCATION",
    t
} (BaseSington);
__reflect(EventManager.prototype, "EventManager");
var Constants = function() {
    function e() {}
    return e.STATUS_STOP = -1,
    e.STATUS_PAUSE = 0,
    e.STATUS_PLAY = 1,
    e.OUTTIME_60 = 6e4,
    e.OUTTIME_30 = 3e4,
    e.OUTTIME_10 = 1e4,
    e.TEXT_TIMEOUT = "链接超时！请检查您的网络！",
    e.TEXT_NOT_JSON = "非JSON格式！",
    e
} ();
__reflect(Constants.prototype, "Constants");
var HttpManager = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return e.getInstance.apply(this, t)
    },
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t);
        var i = egret.MainContext.instance.stage.$children[0];
        i.addChild(this),
        this.width = i.width,
        this.height = i.height,
        this.visible = !1,
        this.alpha = 0;
        var o = new eui.Rect(this.width, this.height);
        o.touchEnabled = !0,
        o.fillAlpha = .75,
        this.addChild(o),
        DeviceUtil.isIOS() ? this.createIOSView() : this.createAndroidView()
    },
    t.prototype.createAndroidView = function() {
        var e = this,
        t = new eui.Rect;
        t.width = 420,
        t.height = 130,
        t.ellipseWidth = 30,
        t.fillAlpha = .75,
        this.addChild(t),
        Tool.setCenterOfParent(t);
        var n = Tool.createBitmapByName("dft_json.dft_com_adr");
        n.x = t.x + 20,
        n.y = t.y + (t.height - n.height) / 2,
        this.addChild(n),
        Tool.setAnchorOffsetCenter(n);
        var i = this.label = this.createLabel();
        i.textAlign = "left",
        i.size = i.height = 28,
        i.x = n.x + n.width / 2 + 20,
        i.verticalCenter = .5,
        this.startAnim = function(t) {
            i.text = t,
            egret.Tween.removeTweens(n),
            egret.Tween.removeTweens(e),
            egret.Tween.get(n, {
                loop: !0
            }).to({
                rotation: 360
            },
            2e3),
            egret.Tween.get(e).to({
                alpha: 1
            },
            200)
        },
        this.stopAnim = function() {
            egret.Tween.removeTweens(n),
            egret.Tween.removeTweens(e),
            egret.Tween.get(e).to({
                alpha: 0
            },
            200)
        },
        this.addChild(i)
    },
    t.prototype.createIOSView = function() {
        var e = this,
        t = new eui.Rect;
        t.width = t.height = 205,
        t.ellipseWidth = 20,
        t.fillAlpha = .75,
        t.x = (this.width - t.width) / 2,
        t.y = (this.height - t.height) / 2 - 55,
        this.addChild(t);
        for (var n = new BitmapMovie,
        i = [], o = 1; 12 > o; o++) i.push(RES.getRes("dft_json.dft_com_ios_" + o));
        n.setResource(i),
        n.width = n.height = 34,
        n.x = (this.width - n.width) / 2,
        n.y = (this.height - n.height) / 2 - 75,
        Tool.setAnchorOffsetCenter(n),
        n.scaleX = n.scaleY = 2.01,
        n.frame = 11,
        this.addChild(n);
        var r = this.label = this.createLabel();
        r.textAlign = "center",
        r.width = this.width,
        r.height = r.size = 24,
        r.y = (this.height - 50) / 2 + 20,
        this.startAnim = function(t) {
            r.text = t,
            n.play(),
            egret.Tween.removeTweens(e),
            egret.Tween.get(e).to({
                alpha: 1
            },
            200)
        },
        this.stopAnim = function() {
            n.stop(),
            egret.Tween.removeTweens(e),
            egret.Tween.get(e).to({
                alpha: 0
            },
            200)
        },
        this.addChild(r)
    },
    t.prototype.createLabel = function() {
        var e = this.label = new eui.Label;
        return e.textColor = 16777215,
        e.fontFamily = "Microsoft YaHei",
        e.verticalAlign = "middle",
        e.touchEnabled = !1,
        e
    },
    t.showView = function(e) {
        void 0 === e && (e = "加载中"),
        this.getInstance().showView(e)
    },
    t.prototype.showView = function(e) {
        this.parent.addChild(this),
        this.visible = !0,
        this.startAnim.call(this, e)
    },
    t.hideView = function() {
        this.getInstance().hideView()
    },
    t.prototype.hideView = function() {
        this.visible = !1,
        this.stopAnim.call(this)
    },
    t.SEND = function(e, t, n) {
        void 0 === e && (e = "http://httpbin.org/post"),
        this.getInstance().SEND(e, t, n)
    },
    t.prototype.SEND = function(e, t, n) {
        void 0 === e && (e = "http://httpbin.org/post");
        var i = LocationProperty.splitParam(e);
        this.createRequest(i.url, egret.HttpMethod.POST, t, n).send(i.paramURL)
    },
    t.POST = function(e, t, n, i) {
        void 0 === e && (e = "http://httpbin.org/post"),
        this.getInstance().POST(e, t, n, i)
    },
    t.prototype.POST = function(e, t, n, i) {
        void 0 === e && (e = "http://httpbin.org/post"),
        this.createRequest(e, egret.HttpMethod.POST, n, i).send(t)
    },
    t.GET = function(e, t, n, i) {
        void 0 === e && (e = "http://httpbin.org/post"),
        this.getInstance().GET(e, t, n, i)
    },
    t.prototype.GET = function(e, t, n, i) {
        void 0 === e && (e = "http://httpbin.org/post"),
        this.createRequest(e + t, egret.HttpMethod.GET, n, i).send()
    },
    t.checkJson = function(e) {
        return this.getInstance().checkJson(e)
    },
    t.prototype.checkJson = function(e) {
        if (e.info) return this.logError(e.info),
        null;
        var t = e.response.trim();
        return JudgementUtil.isJSON(t) ? JSON.parse(t) : (this.logError(Constants.TEXT_NOT_JSON), null)
    },
    t.prototype.createRequest = function(e, t, n, i) {
        var o = new egret.HttpRequest;
        return o.responseType = egret.HttpResponseType.TEXT,
        o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        o.once(egret.Event.COMPLETE,
        function(e) {
            clearTimeout(o.timeoutId),
            n && n.call(i, e),
            o.abort(),
            o = null
        },
        this),
        o.timeoutId = setTimeout(function(e) {
            o.info = Constants.TEXT_TIMEOUT,
            o.dispatchEventWith(egret.Event.COMPLETE)
        },
        Constants.OUTTIME_60),
        o.once(egret.IOErrorEvent.IO_ERROR,
        function(e) {
            o.info = egret.IOErrorEvent.IO_ERROR,
            o.dispatchEventWith(egret.Event.COMPLETE)
        },
        this),
        o.open(e, t),
        o
    },
    t.prototype.logError = function(e) {
        console.warn("info:", e)
    },
    t
} (BaseSington);
__reflect(HttpManager.prototype, "HttpManager");
var PopManager = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function(t) {
        return void 0 === t && (t = !1),
        e.getInstance.call(this, t)
    },
    t.addPop = function(e, t, n) {
        void 0 === t && (t = 1),
        void 0 === n && (n = 0),
        this.getInstance().addPop(e, t, n)
    },
    t.prototype.addPop = function(e, n, i) {
        void 0 === n && (n = 1),
        void 0 === i && (i = 0),
        this.width = Mode.screenWidth,
        this.height = Mode.screenHeight,
        t.addChild(e);
        var o = this.currentChild;
        o.touchEnabled = !1,
        void 0 != o.touchChildren && (o.touchChildren = !1);
        var r, a, s, c = egret.MainContext.instance.stage.$children[0];
        switch (n) {
        case 1:
            a = 300,
            s = egret.Ease.backOut;
            break;
        case 2:
            a = 600,
            s = egret.Ease.elasticOut;
            break;
        case 3:
            o.x = -c.width,
            r = {
                x: 0
            };
            break;
        case 4:
            o.x = c.width,
            r = {
                x: 0
            };
            break;
        case 5:
            o.y = -o.height,
            r = {
                y: 0
            };
            break;
        case 6:
            o.y = c.height,
            r = {
                y: 0
            }
        }
        1 == n || 2 == n ? (Tool.setCenterOfParent(o), Tool.setAnchorOffsetCenter(o), o.alpha = 0, egret.Tween.get(o).to({
            alpha: 1
        },
        300), o.scaleX = o.scaleY = .5, r = {
            scaleX: 1,
            scaleY: 1
        }) : (3 == n || 4 == n || 5 == n || 6 == n) && (a = 500, s = egret.Ease.cubicOut);
        var h = 0;
        if (i || 0 == i) {
            var l = this.createBackground();
            this.addChildAt(l, this.numChildren - 1),
            o.popBackground = l,
            h = 100,
            l.fillColor = i,
            egret.Tween.get(l).to({
                alpha: 1
            },
            200)
        }
        r ? egret.Tween.get(o).wait(h).to(r, a, s).call(this.showPop, this, [o]) : this.showPop(o)
    },
    t.removePop = function(e, t) {
        void 0 === t && (t = 1),
        this.getInstance().removePop(e, t)
    },
    t.prototype.removePop = function(e, t) {
        var n = this;
        void 0 === t && (t = 1);
        var i, o, r, a = this.cachePoolUtil ? this.cachePoolUtil.cacheObject(e) : e;
        a.touchEnabled = !1,
        void 0 != a.touchChildren && (a.touchChildren = !1);
        var s = egret.MainContext.instance.stage.$children[0];
        switch (t) {
        case 1:
            o = 300,
            r = egret.Ease.backIn;
            break;
        case 2:
            o = 600,
            r = egret.Ease.elasticIn;
            break;
        case 3:
            i = {
                x: s.width
            };
            break;
        case 4:
            i = {
                x: -s.width
            };
            break;
        case 5:
            i = {
                y: s.height
            };
            break;
        case 6:
            i = {
                y: -a.height
            }
        }
        1 == t || 2 == t ? (i = {
            alpha: 0,
            scaleX: 0,
            scaleY: 0
        },
        egret.Tween.get(a).wait(150).to({
            alpha: 0
        },
        150)) : (3 == t || 4 == t || 5 == t || 6 == t) && (o = 500, r = egret.Ease.cubicIn),
        i ? egret.Tween.get(a).to(i, o, r).call(this.hidePop, this, [a]) : this.hidePop(a);
        var c = a.popBackground;
        c && egret.Tween.get(c).wait(o - 200).to({
            alpha: 0
        },
        200).call(function(e) {
            return n.removeChild(c)
        })
    },
    t.removeOldPop = function(e, t, n) {
        void 0 === e && (e = 1),
        this.getInstance().removeOldPop(e, t, n)
    },
    t.prototype.removeOldPop = function(e, t, n) {
        void 0 === e && (e = 1),
        this.currentChild && this.currentChild.parent && (t && (EventManager.removeEventListener(EventManager.POP_IS_HIDE, t, n), EventManager.once(EventManager.POP_IS_HIDE, t, n)), this.removePop(this.currentChild, e))
    },
    t.prototype.showPop = function(e) {
        e.touchEnabled = !0,
        void 0 != e.touchChildren && (e.touchChildren = !0),
        EventManager.dispatchEventWith(EventManager.POP_IS_SHOW)
    },
    t.prototype.hidePop = function(e) {
        Tool.restoreAnchorOffset(e),
        t.removeChild(e),
        EventManager.dispatchEventWith(EventManager.POP_IS_HIDE)
    },
    t.prototype.createBackground = function() {
        var e = egret.MainContext.instance.stage.$children[0],
        t = new eui.Rect(e.width, e.height);
        return t.fillAlpha = .75,
        t.alpha = 0,
        t
    },
    t
} (BaseUIManager);
__reflect(PopManager.prototype, "PopManager");
var SoundManager = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.cachePoolUtil = CachePoolUtil.build(),
        t
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.init = function(e) {
        return this.getInstance().init(e)
    },
    t.prototype.init = function(e) {
        if (!this.cachePoolUtil.hasCacheObject(e)) {
            var n = RES.getRes(e + "_mp3");
            if (!n) return console.warn("The res " + e + " of Sound is undefined,by init"),
            this;
            var i = n.play(0, 1);
            i.stop(),
            this.cachePoolUtil.cacheObject(new SoundObject(e, n, i), e)
        }
        return t.hasInit = !0,
        this
    },
    t.play = function(e, t, n) {
        return this.getInstance().play(e, t, n)
    },
    t.prototype.play = function(e, t, n) {
        var i = this.cachePoolUtil.getObject(e);
        if (!i) return console.warn("The res " + e + " of SoundObject is undefined,by play"),
        this;
        n && (i.repeatCount = n);
        var o = i.channel = i.sound.play(t | i.currentTime, i.repeatCount);
        return o.volume = i.volume,
        i.status = Constants.STATUS_PLAY,
        this
    },
    t.pause = function(e) {
        return this.getInstance().pause(e)
    },
    t.prototype.pause = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        if (!t) return console.warn("The res " + e + " of SoundObject is undefined,by pause"),
        this;
        var n = t.channel;
        return t.currentTime = this.getCurrentTime(e),
        n.isStopped || n.stop(),
        t.status = Constants.STATUS_PAUSE,
        this
    },
    t.stop = function(e) {
        return this.getInstance().stop(e)
    },
    t.prototype.stop = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        if (!t) return console.warn("The res " + e + " of SoundObject is undefined,by stop"),
        this;
        var n = t.channel;
        return n.isStopped || n.stop(),
        t.currentTime = 0,
        t.status = Constants.STATUS_STOP,
        this
    },
    t.setVolume = function(e, t) {
        return this.getInstance().setVolume(e, t)
    },
    t.prototype.setVolume = function(e, t) {
        var n = this.cachePoolUtil.getObject(e);
        return n ? n.channel.isStopped ? this: (t > 1 && (t = 1), 0 > t && (t = 0), n.channel.volume = n.volume = t, this) : (console.warn("The res " + e + " of SoundObject is undefined,by setVolume"), this)
    },
    t.turnDown = function(e, t) {
        return void 0 === t && (t = 100),
        this.getInstance().turnDown(e, t)
    },
    t.prototype.turnDown = function(e, t) {
        void 0 === t && (t = 100);
        var n = this.cachePoolUtil.getObject(e);
        if (!n) return console.warn("The res " + e + " of SoundObject is undefined,by turnDown"),
        null;
        for (var i, o = 10 * n.volume,
        r = this.setVolume,
        a = 1,
        s = o + 1; s > a; a++) i = egret.Tween.get(this).wait(t * a).call(r, this, [e, (o - a) / 10]);
        return i
    },
    t.turnUp = function(e, t) {
        return void 0 === t && (t = 100),
        this.getInstance().turnUp(e, t)
    },
    t.prototype.turnUp = function(e, t) {
        void 0 === t && (t = 100);
        var n = this.cachePoolUtil.getObject(e);
        if (!n) return console.warn("The res " + e + " of SoundObject is undefined,by turnUp"),
        null;
        for (var i, o = 10 * n.volume,
        r = this.setVolume,
        a = o,
        s = 11; s > a; a++) i = egret.Tween.get(this).wait(t * a).call(r, this, [e, (a + 1) / 10]);
        return i
    },
    t.setAllVolume = function(e) {
        return this.getInstance().setAllVolume(e)
    },
    t.prototype.setAllVolume = function(e) {
        var t = this;
        return this.cachePoolUtil.forSomething(function(n) {
            return t.setVolume(n.resName, e)
        },
        this),
        this
    },
    t.turnAllDown = function(e, t) {
        return void 0 === t && (t = 100),
        this.getInstance().turnAllDown(e, t)
    },
    t.prototype.turnAllDown = function(e, t) {
        var n = this;
        void 0 === t && (t = 100);
        var i;
        return this.cachePoolUtil.forSomething(function(e) {
            return i = n.turnDown(e.resName, t)
        },
        this),
        i
    },
    t.turnAllUp = function(e, t) {
        return void 0 === t && (t = 100),
        this.getInstance().turnAllUp(e, t)
    },
    t.prototype.turnAllUp = function(e, t) {
        var n = this;
        void 0 === t && (t = 100);
        var i;
        return this.cachePoolUtil.forSomething(function(e) {
            return i = n.turnUp(e.resName, t)
        },
        this),
        i
    },
    t.getDuration = function(e) {
        return this.getInstance().getDuration(e)
    },
    t.prototype.getDuration = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.sound.length: (console.warn("The res " + e + " of SoundObject is undefined,by getDuration"), null)
    },
    t.getCurrentTime = function(e) {
        return this.getInstance().getCurrentTime(e)
    },
    t.prototype.getCurrentTime = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.channel.position: (console.warn("The res " + e + " of SoundObject is undefined,by getCurrentTime"), null)
    },
    t.getSound = function(e) {
        return this.getInstance().getSound(e)
    },
    t.prototype.getSound = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.sound: (console.warn("The res " + e + " of SoundObject is undefined,by getSound"), null)
    },
    t.getChannel = function(e) {
        return this.getInstance().getChannel(e)
    },
    t.prototype.getChannel = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t.channel: (console.warn("The res " + e + " of SoundObject is undefined,by getChannel"), null)
    },
    t.getSoundObject = function(e) {
        return this.getInstance().getSoundObject(e)
    },
    t.prototype.getSoundObject = function(e) {
        var t = this.cachePoolUtil.getObject(e);
        return t ? t: (console.warn("The res " + e + " of SoundObject is undefined,by getSound"), null)
    },
    t.addEndedListener = function(e, t, n) {
        this.getInstance().addEndedListener(e, t, n)
    },
    t.prototype.addEndedListener = function(e, t, n) {
        var i = this.cachePoolUtil.getObject(e);
        if (!i) return console.warn("The res " + e + " of SoundObject is undefined,by addEndedListener"),
        null;
        var o = i.channel;
        o.removeEventListener(egret.Event.SOUND_COMPLETE, t, n),
        o.addEventListener(egret.Event.SOUND_COMPLETE, t, n)
    },
    t.removeEndedListener = function(e, t, n) {
        this.getInstance().removeEndedListener(e, t, n)
    },
    t.prototype.removeEndedListener = function(e, t, n) {
        var i = this.cachePoolUtil.getObject(e);
        return i ? void i.channel.removeEventListener(egret.Event.SOUND_COMPLETE, t, n) : (console.warn("The res " + e + " of SoundObject is undefined,by removeEndedListener"), null)
    },
    t.hasInit = !1,
    t
} (BaseSington);
__reflect(SoundManager.prototype, "SoundManager");
var SoundObject = function() {
    function e(e, t, n) {
        this.volume = 1,
        this.currentTime = 0,
        this.repeatCount = 1,
        this.status = -1,
        this.resName = e,
        this.sound = t,
        this.channel = n
    }
    return e
} ();
__reflect(SoundObject.prototype, "SoundObject");
var BezierCurveEffects = function(e) {
    function t() {
        return e.call(this) || this
    }
    return __extends(t, e),
    t.build = function(e, n, i, o) {
        void 0 === i && (i = 500),
        void 0 === o && (o = null);
        var r = new t;
        return r.points = e,
        r.playObject = n,
        egret.Tween.get(r).to({
            t: 1
        },
        i, o)
    },
    Object.defineProperty(t.prototype, "t", {
        get: function() {
            return 0
        },
        set: function(e) {
            var t = this.points;
            if (! (t.length < 3)) {
                for (var n = this.playObject,
                i = t.length,
                o = 0,
                r = 0,
                a = 0; i > a; a++) {
                    var s = t[a];
                    o += s.x * Math.pow(1 - e, i - 1 - a) * Math.pow(e, a) * MathUtil.comb(i - 1, a),
                    r += s.y * Math.pow(1 - e, i - 1 - a) * Math.pow(e, a) * MathUtil.comb(i - 1, a)
                }
                n.x = o,
                n.y = r,
                this.dispatchEventWith(EventManager.RUNNING, !1, {
                    x: o,
                    y: r
                })
            }
        },
        enumerable: !0,
        configurable: !0
    }),
    t
} (egret.DisplayObject);
__reflect(BezierCurveEffects.prototype, "BezierCurveEffects");
var TouchStarEffects = function() {
    function e() {}
    return e.build = function(e) {
        for (var t, n, i, o, r = this.starColor || 16777215,
        a = this.starRadius || 7,
        s = this.diffusionDistance || 14,
        c = egret.MainContext.instance.stage,
        h = e.stageX,
        l = e.stageY,
        d = 4,
        u = .1,
        p = function() {
            var e = new egret.Shape;
            t = 2 * Math.PI * Math.random();
            var p = Math.sin(t) * s,
            g = Math.cos(t) * s;
            e.x = h + p,
            e.y = l + g,
            n = e.graphics,
            n.lineStyle(2, Number(RandomUtil.getRandomColor())),
            n.moveTo(a, 0),
            n.beginFill(r);
            for (var f = 1; 11 > f; f++) i = a,
            f % 2 && (i = a / 2),
            o = 2 * Math.PI / 10 * f,
            n.lineTo(Math.cos(o) * i, Math.sin(o) * i);
            c.addChild(e),
            egret.Tween.get(e).to({
                x: h + d * p,
                y: l + d * g,
                scaleX: u,
                scaleY: u,
                alpha: u
            },
            500).call(function(t) {
                return e.parent.removeChild(e)
            })
        },
        g = 0, f = this.roundCount || 16; f > g; g++) p()
    },
    e
} ();
__reflect(TouchStarEffects.prototype, "TouchStarEffects");
var FacePPApi = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.getDetectData = function(e, t, n, i, o, r) {
        void 0 === n && (n = "eGGRs3SqoOBLr4chaSUXA7lMd93BtGTe"),
        void 0 === i && (i = "tg5fL5Xw9Hvm32UL-MJCpTByCRTjZ7FG"),
        this.getInstance().getDetectData(e, t, n, i, o, r)
    },
    t.prototype.getDetectData = function(e, n, i, o, r, a) {
        var s = this;
        void 0 === i && (i = "eGGRs3SqoOBLr4chaSUXA7lMd93BtGTe"),
        void 0 === o && (o = "tg5fL5Xw9Hvm32UL-MJCpTByCRTjZ7FG"),
        Tool.getFaceData(n,
        function(c) {
            if (!c) return void r.call(a, t.STATUS_TIMEOUT);
            if (0 != c.ret) return void r.call(a, t.STATUS_NOFACE);
            var h = "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/MergeFace/api.php?a=Merge",
            l = "&api_key=" + i + "&api_secret=" + o + "&base64_1=" + encodeURIComponent(encodeURIComponent(e)) + "&base64_2=" + encodeURIComponent(encodeURIComponent(n));
            HttpManager.POST(h, l,
            function(e) {
                var n = HttpManager.checkJson(e.target);
                return n && 100 == n.error && 200 == n.data.status ? void r.call(a, t.STATUS_SUCCESS, n.data.base64) : void r.call(a, t.STATUS_TIMEOUT)
            },
            s)
        },
        this)
    },
    t.STATUS_TIMEOUT = -1,
    t.STATUS_NOFACE = 0,
    t.STATUS_SUCCESS = 1,
    t
} (BaseSington);
__reflect(FacePPApi.prototype, "FacePPApi");
var IFlyIatApi = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.useVad = !1,
        t.serverUrl = "https://h5.voiceads.cn/api/vipShop/iat?fileType=2",
        t.nlpEnable = !1,
        t.playParamDft = ["appid=5818057a,appidkey=8241541bcbd6915c,ent=cantonese16k,auf=worker/L16;rate=16000,aue=speex-wb;", "appid=5818057a,appidkey=8241541bcbd6915c,ent=sms16k,auf=worker/L16;rate=16000,aue=speex-wb;"],
        t.playParamNlp = ["appid=5818057a,appidkey=8241541bcbd6915c,ent=cantonese16k,openqa_db=16415,auf=worker/L16;rate=16000,aue=speex-wb;", "appid=5818057a,appidkey=8241541bcbd6915c,ent=sms16k,openqa_db=16415,auf=worker/L16;rate=16000,aue=speex-wb;"],
        t.isPlaying = !1,
        t.nlpResults = [{
            type: "讯飞智能",
            linkUrl: "https://www.xfyun.cn/"
        },
        {
            type: "广告平台",
            linkUrl: "https://www.voiceads.cn/"
        }],
        t
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.init = function() {
        return this.getInstance().init()
    },
    t.prototype.init = function() {
        if (this.session) return this;
        if ("https:" != window.location.protocol) return console.warn("IFlyIatSession调用必须得是https"),
        this;
        if (!window.loadIFlyIatJs) return console.warn("window.loadIFlyIatJs must be true"),
        this;
        if (!window.IFlyIatSession) return console.warn("IFlyIatSession引用失败"),
        this;
        EventManager.removeEventListener(EventManager.HTML_IS_HIDE, this.HTML_IS_HIDE, this);
        var e = this,
        n = new Object;
        return n.params = {
            useVad: this.useVad,
            serverUrl: this.serverUrl
        },
        n.callback = {
            onVolume: function(t) {
                e.onVolume.call(e, t)
            },
            onError: function(t) {
                e.onError.call(e, t)
            },
            onProcess: function(t) {
                e.onProcess.call(e, t)
            }
        },
        0 == t.version ? n.callback.onResult = function(t, n, i) {
            e.onResult0.call(e, t, n, i)
        }: n.callback.onResult = function(t) {
            e.onResult1.call(e, t)
        },
        this.session = new window.IFlyIatSession(n),
        EventManager.addEventListener(EventManager.HTML_IS_HIDE, this.HTML_IS_HIDE, this),
        this
    },
    t.prototype.HTML_IS_HIDE = function(e) {
        this.release()
    },
    t.addIFlyIatListener = function(e) {
        return this.getInstance().init().addIFlyIatListener(e)
    },
    t.prototype.addIFlyIatListener = function(e) {
        return this.session.iIFlyIatApi = e,
        this
    },
    t.removeIFlyIatListener = function(e) {
        this.getInstance().init().removeIFlyIatListener(e)
    },
    t.prototype.removeIFlyIatListener = function(e) {
        this.session.iIFlyIatApi = null,
        this.session = null
    },
    t.isSupport = function() {
        return this.getInstance().init().isSupport()
    },
    t.prototype.isSupport = function() {
        return this.session.isSupport()
    },
    t.play = function(e) {
        void 0 === e && (e = 1),
        this.getInstance().init().play(e)
    },
    t.prototype.play = function(e) {
        this.isPlaying && this.stop(),
        this.session.start({
            params: this.nlpEnable ? this.playParamNlp[e] : this.playParamDft[e]
        })
    },
    t.stop = function() {
        this.getInstance().init().stop()
    },
    t.prototype.stop = function() {
        this.session.stop()
    },
    t.cancel = function() {
        this.getInstance().init().cancel()
    },
    t.prototype.cancel = function() {
        this.session.cancel()
    },
    t.release = function() {
        this.getInstance().init().release()
    },
    t.prototype.release = function() {
        this.session && (this.isPlaying && this.stop(), this.session.kill())
    },
    t.prototype.onResult0 = function(e, n, i) {
        var o, r = t.RESULT_TYPE_FAIL,
        a = "";
        if (null != i) if (r = t.RESULT_TYPE_NLP, 0 == i.ret) o = n + "(语义结果为:" + i.ret + "," + i.msg + ")";
        else {
            for (var s = this.nlpResults,
            c = 0,
            h = s.length; h > c; c++) {
                var l = s[c];
                if (0 == n.indexOf(l.type)) {
                    o = n + "(语义结果为:" + i.ret + "," + i.msg + ")",
                    a = l.linkUrl;
                    break
                }
            }
            o = n + "(语义分析失败，错误码" + i.ret + "," + i.msg + ")"
        } else e && "0" != e ? o = "ifly result=>error code : " + e + ", error description : " + n: (r = t.RESULT_TYPE_SUCCESS, o = n);
        if (this.dispatchEventWith(t.ON_RESULT, !1, {
            type: r,
            msg: o,
            linkUrl: a
        }), this.session) {
            var d = this.session.iIFlyIatApi;
            d && d.onIFlyIatResult(r, o, a)
        }
    },
    t.prototype.onResult1 = function(e) {
        var n, i = t.RESULT_TYPE_FAIL,
        o = "";
        if (0 != e.code) n = "ifly data=>error code : " + e.code + ", error description : " + e.msg;
        else {
            200 == e.data.code && (i = t.RESULT_TYPE_SUCCESS);
            var r = 0 == e.code ? Number(e.data.strLen) : 0;
            n = r
        }
        if (this.dispatchEventWith(t.ON_RESULT, !1, {
            type: i,
            msg: n,
            linkUrl: o
        }), this.session) {
            var a = this.session.iIFlyIatApi;
            a && a.onIFlyIatResult(i, n, o)
        }
    },
    t.prototype.onVolume = function(e) {
        if (this.dispatchEventWith(t.ON_VOLUME, !1, e), this.session) {
            var n = this.session.iIFlyIatApi;
            n && n.onIFlyIatVolume(e)
        }
    },
    t.prototype.onError = function(e) {
        var n = t.ERROR_TYPE_DFT;
        switch (e) {
        case "connectError":
            n = t.ERROR_TYPE_CNT;
            break;
        case "initMediaError":
            n = t.ERROR_TYPE_IME
        }
        if (this.dispatchEventWith(t.ON_ERROR, !1, n), this.session) {
            var i = this.session.iIFlyIatApi;
            i && i.onIFlyIatError(n)
        }
    },
    t.prototype.onProcess = function(e) {
        var n = t.PRO_TYPE_DFT;
        switch (e) {
        case "lowVolume":
            n = t.PRO_TYPE_LOW;
            break;
        case "onStart":
            n = t.PRO_TYPE_START;
            break;
        case "normalVolume":
            n = t.PRO_TYPE_NORMAL;
            break;
        case "started":
            n = t.PRO_TYPE_STARTED,
            this.isPlaying = !0;
            break;
        case "onStop":
            n = t.PRO_TYPE_STOP;
            break;
        case "onEnd":
            n = t.PRO_TYPE_STOPPED,
            this.isPlaying = !1
        }
        if (this.dispatchEventWith(t.ON_PRO, !1, n), this.session) {
            var i = this.session.iIFlyIatApi;
            i && i.onIFlyIatProgress(n)
        }
    },
    t.version = window.IFlyIatVer || (window.IFly ? window.IFly.ver: 0) || 0,
    t.ON_RESULT = "IFlyIatApi.ON_RESULT",
    t.RESULT_TYPE_FAIL = -1,
    t.RESULT_TYPE_SUCCESS = 0,
    t.RESULT_TYPE_NLP = 1,
    t.ON_VOLUME = "IFlyIatApi.ON_VOLUME",
    t.ON_ERROR = "IFlyIatApi.ON_ERROR",
    t.ERROR_TYPE_DFT = -1,
    t.ERROR_TYPE_CNT = 0,
    t.ERROR_TYPE_IME = 1,
    t.ON_PRO = "IFlyIatApi.ON_PRO",
    t.PRO_TYPE_DFT = -1,
    t.PRO_TYPE_LOW = 0,
    t.PRO_TYPE_START = 1,
    t.PRO_TYPE_STARTED = 2,
    t.PRO_TYPE_STOP = 3,
    t.PRO_TYPE_STOPPED = 4,
    t.PRO_TYPE_NORMAL = 5,
    t
} (BaseSington);
__reflect(IFlyIatApi.prototype, "IFlyIatApi");
var IFlyVTMUtil = function() {
    function e() {
        var e = this;
        this.msgs = [],
        this.checkVTM_TO_Delay = 200,
        this.checkVTM_TO_Ids = [],
        this.isChecks = [],
        window.IFlyVTMLoaded ? this.vtm = window._VTM: document.addEventListener("IFlyVTMLoaded",
        function(t) {
            return e.vtm = window._VTM
        })
    }
    return e.getInstance = function() {
        return this.instance || (this.instance = new e),
        this.instance
    },
    e.push = function(e, t, n) {
        void 0 === t && (t = "button"),
        void 0 === n && (n = {}),
        this.getInstance().push(e, t, n)
    },
    e.prototype.push = function(e, t, n) {
        var i = this;
        void 0 === t && (t = "button"),
        void 0 === n && (n = {}),
        this.msgs.push({
            active_id: e + "",
            action_type: t,
            action_param: n
        });
        var o = e + t; ! this.isChecks[o] && this.msgs.length && (EventManager.once(o + "-IFlyVTMUtil.checkVTM.OK",
        function(e) {
            return i.vtm.push(i.msgs.shift())
        },
        this), this.checkVTM(o))
    },
    e.prototype.checkVTM = function(e) {
        return this.vtm ? (egret.clearTimeout(this.checkVTM_TO_Ids.shift()), this.isChecks[e] = 0, void EventManager.dispatchEventWith(e + "-IFlyVTMUtil.checkVTM.OK")) : (console.log("novtm"), this.checkVTM_TO_Ids.push(egret.setTimeout(this.checkVTM, this, this.checkVTM_TO_Delay, e)), void(this.isChecks[e] = 1))
    },
    e
} ();
__reflect(IFlyVTMUtil.prototype, "IFlyVTMUtil");
var WeChatApi = function(e) {
    function t() {
        return e.call(this) || this
    }
    return __extends(t, e),
    t.getInstance = function() {
        return e.getInstance.call(this)
    },
    t.config = function(e, t) {
        this.getInstance().config(e, t)
    },
    t.prototype.config = function(e, t) {
        var n = window.wx;
        return n ? (n.ready(function(e) {
            n.checkJsApi({
                jsApiList: ["chooseImage"],
                success: function(e) {
                    e.checkResult.chooseImage && (console.log("wx.checkJsApi success"), document.dispatchEvent(new Event("wxConfigReady"))),
                    console.log("wx.checkJsApi result:", e.checkResult)
                },
                fail: function(e) {
                    console.warn("wx.checkJsApi fail:", e)
                }
            })
        }), n.error(function(e) {
            console.warn("wx.config error:", e)
        }), void n.config({
            debug: t,
            appId: e.appId,
            timestamp: e.timestamp,
            nonceStr: e.nonceStr,
            signature: e.signature,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "updateAppMessageShareData", "updateTimelineShareData", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "onVoicePlayEnd", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
        })) : void console.warn("微信jssdk引用失败")
    },
    t.editShareData = function(e) {
        this.getInstance().editShareData(e)
    },
    t.prototype.editShareData = function(e) {
        function n(n) {
            var r = t[n] = new WeChatApiObject;
            r.title = e.title,
            r.desc = e.desc,
            r.imgUrl = e.imgUrl,
            r.link = e.link;
            var a, s, c;
            switch (n) {
            case "onMenuShareAppMessage":
                a = "wechat_friend",
                s = t.COMPLETE_TYPE_FRIEND,
                c = t.TRIGGER_TYPE_FRIEND;
                break;
            case "onMenuShareTimeline":
                a = "wechat_moments",
                s = t.COMPLETE_TYPE_MOMENTS,
                c = t.TRIGGER_TYPE_MOMENTS;
                break;
            case "onMenuShareQQ":
                a = "qq",
                s = t.COMPLETE_TYPE_QQ,
                c = t.TRIGGER_TYPE_QQ;
                break;
            case "onMenuShareQZone":
                a = "qzone",
                s = t.COMPLETE_TYPE_QZONE,
                c = t.TRIGGER_TYPE_QZONE
            }
            r.complete = function(e) {
                o && o.clickShare(a),
                t.shareCompleteType = s,
                t.dispatchEventWith(t.SHARE_COMPLETED)
            },
            r.trigger = function(n) {
                t.shareTriggerType = c,
                t.dispatchEventWith(t.SHARE_TRIGGERED),
                r.title = e.title,
                r.desc = e.desc,
                r.imgUrl = e.imgUrl,
                r.link = e.link
            },
            i[n](r)
        }
        var i = window.wx;
        if (!i) return void console.warn("微信jssdk引用失败");
        var o = window.MtaH5;
        n("onMenuShareAppMessage"),
        n("onMenuShareTimeline"),
        n("onMenuShareQQ"),
        n("onMenuShareQZone")
    },
    t.scanQRCode = function(e, t) {
        this.getInstance().scanQRCode(e, t)
    },
    t.prototype.scanQRCode = function(e, t) {
        var n = window.wx;
        if (!n) return console.warn("微信jssdk引用失败"),
        void(e && e.call(t));
        var i = e ? 1 : 0;
        n.scanQRCode({
            needResult: i,
            scanType: ["qrCode", "barCode"],
            success: function(n) {
                e && e.call(t, n.resultStr)
            }
        })
    },
    t.startRecord = function(e, t) {
        this.getInstance().startRecord(e, t)
    },
    t.prototype.startRecord = function(e, t) {
        var n = window.wx;
        return n ? void n.startRecord({
            success: function(n) {
                DeviceUtil.isAndroid() && e.call(t, n.localId)
            },
            complete: function(n) {
                DeviceUtil.isIOS() && e.call(t, n.localId)
            }
        }) : (console.warn("微信jssdk引用失败"), void(e && e.call(t)))
    },
    t.stopRecord = function(e, t) {
        this.getInstance().stopRecord(e, t)
    },
    t.prototype.stopRecord = function(e, t) {
        var n = window.wx;
        return n ? (n.stopRecord({
            success: function(n) {
                DeviceUtil.isAndroid() && e && e.call(t, n.localId)
            },
            complete: function(n) {
                DeviceUtil.isIOS() && e && e.call(t, n.localId)
            }
        }), void n.onVoiceRecordEnd({
            complete: function(n) {
                e && e.call(t, n.localId)
            }
        })) : (console.warn("微信jssdk引用失败"), void(e && e.call(t)))
    },
    t.playVoice = function(e) {
        this.getInstance().playVoice(e)
    },
    t.prototype.playVoice = function(e) {
        window.wx && window.wx.playVoice({
            localId: e
        })
    },
    t.pauseVoice = function(e) {
        this.getInstance().pauseVoice(e)
    },
    t.prototype.pauseVoice = function(e) {
        window.wx && window.wx.pauseVoice({
            localId: e
        })
    },
    t.stopVoice = function(e) {
        this.getInstance().stopVoice(e)
    },
    t.prototype.stopVoice = function(e) {
        window.wx && window.wx.stopVoice({
            localId: e
        })
    },
    t.onVoicePlayEnd = function(e, t) {
        this.getInstance().onVoicePlayEnd(e, t)
    },
    t.prototype.onVoicePlayEnd = function(e, t) {
        var n = window.wx;
        return n ? void n.onVoicePlayEnd({
            success: function(n) {
                DeviceUtil.isAndroid() && e.call(t, n.localId)
            },
            complete: function(n) {
                DeviceUtil.isIOS() && e.call(t, n.localId)
            }
        }) : (console.warn("微信jssdk引用失败"), void(e && e.call(t)))
    },
    t.uploadVoice = function(e, t, n) {
        this.getInstance().uploadVoice(e, t, n)
    },
    t.prototype.uploadVoice = function(e, t, n) {
        var i = window.wx;
        return i ? void i.uploadVoice({
            localId: e,
            isShowProgressTips: 1,
            complete: function(e) {
                t.call(n, e.serverId)
            }
        }) : (console.warn("微信jssdk引用失败"), void(t && t.call(n)))
    },
    t.translateVoice = function(e, t, n) {
        this.getInstance().translateVoice(e, t, n)
    },
    t.prototype.translateVoice = function(e, t, n) {
        var i = window.wx;
        return i ? void i.translateVoice({
            localId: e,
            isShowProgressTips: 1,
            complete: function(e) {
                t.call(n, e.translateResult)
            }
        }) : (console.warn("微信jssdk引用失败"), void(t && t.call(n)))
    },
    t.openLocation = function(e, t, n, i) {
        void 0 === i && (i = !0),
        this.getInstance().openLocation(e, t, n, i)
    },
    t.prototype.openLocation = function(e, t, n, i) {
        void 0 === i && (i = !0);
        var o = window.wx;
        if (!o) return console.warn("微信jssdk引用失败"),
        void(t && t.call(n));
        if (e) o.openLocation({
            latitude: e.latitude,
            longitude: e.longitude,
            name: e.name || "",
            address: e.address || "",
            scale: e.scale || 20,
            infoUrl: e.infoUrl || "",
            success: function(e) {
                t && t.call(n, e)
            },
            fail: function(e) {
                console.warn("打开微信地图失败。", e)
            }
        });
        else {
            o.getLocation({
                type: i ? "gcj02": "wgs84",
                success: function(e) {
                    o.openLocation({
                        latitude: e.latitude,
                        longitude: e.longitude,
                        success: function(e) {
                            t && t.call(n, e)
                        }
                    })
                },
                cancel: function(e) {
                    console.warn("用户拒绝授权获取地理位置。", e)
                }
            })
        }
    },
    t.chooseImage = function(e, t) {
        this.getInstance().chooseImage(e, t)
    },
    t.prototype.chooseImage = function(e, t) {
        var n = window.wx;
        return n ? void n.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(n) {
                e.call(t, n.localIds[0])
            }
        }) : (console.warn("微信jssdk引用失败"), void(e && e.call(t)))
    },
    t.getLocalImgData = function(e, t) {
        this.getInstance().getLocalImgData(e, t)
    },
    t.prototype.getLocalImgData = function(e, t) {
        var n = this,
        i = window.wx;
        return i ? void this.chooseImage(function(o) {
            var r = n;
            i.getLocalImgData({
                localId: o,
                success: function(n) {
                    var i = n.localData;
                    DeviceUtil.isAndroid() ? (i = "data:image/jpeg;base64," + i, Tool.getTextureByLoadBase64(i,
                    function(n) {
                        e.call(t, n, Tool.getBase64ByTexture(n, "jpeg"), o)
                    },
                    r)) : (i = "data:image/jpeg;base64," + i.split("base64,")[1], Tool.getTextureByLoadBase64(i,
                    function(n) {
                        e.call(t, n, i, o)
                    },
                    r))
                }
            })
        },
        this) : (console.warn("微信jssdk引用失败"), void(e && e.call(t)))
    },
    t.uploadImage = function(e, t, n) {
        this.getInstance().uploadImage(e, t, n)
    },
    t.prototype.uploadImage = function(e, t, n) {
        var i = window.wx;
        return i ? void i.uploadImage({
            localId: e,
            isShowProgressTips: 0,
            success: function(e) {
                t.call(n, e.serverId)
            }
        }) : (console.warn("微信jssdk引用失败"), void(t && t.call(n)))
    },
    t.prototype.addCard = function(e, t, n) {
        var i = window.wx;
        return i ? void i.addCard({
            cardList: [{
                cardId: e.cardId,
                cardExt: {
                    code: "",
                    openid: "",
                    timestamp: e.timestamp,
                    signature: e.signature,
                    nonce_str: e.nonceStr
                }
            }],
            success: function(e) {
                t && t.call(n, e)
            },
            cancel: function(e) {
                t && t.call(n, e)
            },
            fail: function(e) {
                t && t.call(n, e)
            },
            complete: function(e) {
                t && t.call(n, e)
            }
        }) : (console.warn("微信jssdk引用失败"), void(t && t.call(n)))
    },
    t.chooseWXPay = function(e, t, n) {
        this.getInstance().chooseWXPay(e, t, n)
    },
    t.prototype.chooseWXPay = function(e, t, n) {
        var i = window.WeixinJSBridge;
        return i ? void i.invoke("getBrandWCPayRequest", {
            appId: e.appId,
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            "package": e["package"],
            signType: e.signType,
            paySign: e.paySign
        },
        function(e) {
            t && t.call(n, e)
        }) : (console.warn("微信jssdk引用失败"), void(t && t.call(n)))
    },
    t.SHARE_COMPLETED = "shareComplete",
    t.COMPLETE_TYPE_FRIEND = "onMenuSendAppMessage:ok",
    t.COMPLETE_TYPE_MOMENTS = "onMenuShareTimeline:ok",
    t.COMPLETE_TYPE_QQ = "onMenuShareQQ:ok",
    t.COMPLETE_TYPE_QZONE = "onMenuShareQZone:ok",
    t.SHARE_TRIGGERED = "shareTriggered",
    t.TRIGGER_TYPE_FRIEND = "onMenuSendAppMessage:ok",
    t.TRIGGER_TYPE_MOMENTS = "onMenuShareTimeline:ok",
    t.TRIGGER_TYPE_QQ = "onMenuShareQQ:ok",
    t.TRIGGER_TYPE_QZONE = "onMenuShareQZone:ok",
    t
} (BaseSington);
__reflect(WeChatApi.prototype, "WeChatApi");
var WeChatApiObject = function() {
    function e() {
        this.isCancel = !1,
        this.isFail = !1
    }
    return e
} ();
__reflect(WeChatApiObject.prototype, "WeChatApiObject");
var WeChatPayData = function() {
    function e() {}
    return e.createWeChatPayData = function(t, n, i, o, r, a) {
        var s = new e;
        return s.appId = t,
        s.timeStamp = n,
        s.nonceStr = i,
        s["package"] = o,
        s.signType = r,
        s.paySign = a,
        s
    },
    e
} ();
__reflect(WeChatPayData.prototype, "WeChatPayData");
var CachePoolUtil = function() {
    function e() {
        this.objectCachePool = [],
        this.objectCachePool.keys = []
    }
    return e.build = function() {
        return new e
    },
    e.prototype.cacheObject = function(t, n) {
        return void 0 === n && (n = ""),
        this.hasCacheObject(t) ? this.getObject(t[e.TAG]) : this.objectCachePool[this.pushObject(t, n)]
    },
    e.prototype.replaceObject = function(t, n, i) {
        void 0 === i && (i = "");
        try {
            var o = 0;
            switch (!0) {
            case this.hasCacheObject(t) && this.hasCacheObject(n) : var r = this.objectCachePool,
                a = r.keys,
                s = e.TAG,
                c = a.indexOf(t[s]),
                h = a.indexOf(n[s]);
                u = [a[h], a[c]],
                a[c] = u[0],
                a[h] = u[1],
                p = [r[h], r[c]],
                r[c] = p[0],
                r[h] = p[1],
                o = c;
                break;
            case this.hasCacheObject(t) && !this.hasCacheObject(n) : var c = a.indexOf(t[e.TAG]),
                l = this.createCacheObject(n, i),
                r = this.objectCachePool;
                r.keys[c] = l.key,
                r[c] = l.o,
                o = c;
                break;
            case ! this.hasCacheObject(t) && this.hasCacheObject(n) : this.releaseObject(n[e.TAG]);
            default:
                o = this.pushObject(n, i)
            }
            return o
        } catch(d) {
            console.warn("In the CachePoolUtil.replaceObject," + d)
        }
        var u, p
    }, e.prototype.unshiftObject = function(e, t) {
        void 0 === t && (t = "");
        var n = this.objectCachePool,
        i = (n.keys, this.createCacheObject(e, t));
        return n.keys.unshift(i.key),
        n.unshift(i.o),
        0
    },
    e.prototype.pushObject = function(e, t) {
        void 0 === t && (t = "");
        var n = this.objectCachePool,
        i = n.length,
        o = this.createCacheObject(e, t, i);
        return n.keys.push(o.key),
        n.push(o.o),
        i
    },
    e.prototype.shiftObject = function() {
        var e = this.objectCachePool,
        t = e.keys;
        return t.shift(),
        e.shift()
    },
    e.prototype.popObject = function() {
        var e = this.objectCachePool,
        t = e.keys;
        return t.pop(),
        e.pop()
    },
    e.prototype.releaseObject = function(e) {
        var t = this.getObject(e);
        if (t) {
            var n = this.objectCachePool,
            i = n.keys,
            o = i.indexOf(e);
            return i.splice(o, 1),
            n.splice(o, 1),
            t
        }
        return null
    },
    e.prototype.getObject = function(e) {
        var t = this.objectCachePool;
        return "string" == typeof e ? t[t.keys.indexOf(e)] : t[e]
    },
    e.prototype.getPool = function() {
        return this.objectCachePool
    },
    e.prototype.hasCacheObject = function(t) {
        return t && void 0 != t[e.TAG]
    },
    e.prototype.releaseAll = function() {
        this.objectCachePool = [],
        this.objectCachePool.keys = []
    },
    e.prototype.forSomething = function(e, t) {
        for (var n = this.objectCachePool,
        i = 0,
        o = n.length; o > i; i++) e.call(t, n[i])
    },
    e.prototype.createCacheObject = function(t, n, i) {
        void 0 === n && (n = ""),
        void 0 === i && (i = 0);
        try {
            var o, r, a = this.objectCachePool;
            a.keys;
            return "object" == typeof t ? (o = n || t.__proto__.__class__ + i, r = t, r[e.TAG] = o) : (o = n || t.prototype.__class__ + i, r = new t, t[e.TAG] = o),
            {
                key: o,
                o: r
            }
        } catch(s) {
            console.warn("In the CachePoolUtil.createCacheObject," + s)
        }
    },
    e.TAG = "CachePoolUtilKey",
    e
} ();
__reflect(CachePoolUtil.prototype, "CachePoolUtil");
var CollisionUtil = function() {
    function e() {}
    return e.hitTest1 = function(e, t) {
        var n = e.target;
        n.hitTest1LocalToGlobal || (n.hitTest1LocalToGlobal = new egret.Point);
        var i = n.localToGlobal(n.anchorOffsetX, n.anchorOffsetY, n.hitTest1LocalToGlobal),
        o = t.target;
        o.hitTest1LocalToGlobal || (o.hitTest1LocalToGlobal = new egret.Point);
        var r = o.localToGlobal(o.anchorOffsetX, o.anchorOffsetY, o.hitTest1LocalToGlobal);
        n.hitTest1Rectangle || (n.hitTest1Rectangle = new egret.Rectangle),
        n.hitTest1Rectangle.setTo(i.x, i.y, n.width * (e.scaleX ? e.scaleX: 1), n.height * (e.scaleY ? e.scaleY: 1));
        var a = n.hitTest1Rectangle;
        o.hitTest1Rectangle || (o.hitTest1Rectangle = new egret.Rectangle),
        o.hitTest1Rectangle.setTo(r.x, r.y, o.width * (t.scaleX ? t.scaleX: 1), o.height * (t.scaleY ? t.scaleY: 1));
        var s = o.hitTest1Rectangle,
        c = a.intersection(s);
        return 0 != c.x && 0 != c.y && 0 != c.width && 0 != c.height
    },
    e.hitTest2 = function(e, t) {
        var n = e.target,
        i = n.width,
        o = n.height;
        n.hitTest2LocalToGlobal || (n.hitTest2LocalToGlobal = new egret.Point);
        var r = n.localToGlobal(n.anchorOffsetX + i / 2, n.anchorOffsetY + o / 2, n.hitTest2LocalToGlobal),
        a = o > i ? i * (e.scaleX ? e.scaleX: 1) : o * (e.scaleY ? e.scaleY: 1),
        s = t.target,
        c = s.width,
        h = s.height;
        s.hitTest2LocalToGlobal || (s.hitTest2LocalToGlobal = new egret.Point);
        var l = s.localToGlobal(s.anchorOffsetX + c / 2, s.anchorOffsetY + h / 2, s.hitTest2LocalToGlobal),
        d = h > c ? c * (t.scaleX ? t.scaleX: 1) : h * (t.scaleY ? t.scaleY: 1);
        return egret.Point.distance(r, l) <= a + d
    },
    e.hitTest3 = function(e, t, n) {
        var i = e.texture;
        if (!i) return void console.warn("obj1 has no texture!!");
        var o = e.hitTest3PixelsPoints;
        if (!o) {
            o = e.hitTest3PixelsPoints = [];
            var r = i.getPixels(0, 0, i.textureWidth, i.textureHeight);
            e.hitTest3LocalToGlobal || (e.hitTest3LocalToGlobal = new egret.Point);
            for (var a = e.localToGlobal(e.anchorOffsetX, e.anchorOffsetY, e.hitTest3LocalToGlobal), s = 0, c = 0, h = 4 * i.textureWidth, l = 3, d = r.length; d > l; l += 4) l >= h * (c + 1) && (s = 0, c++),
            r[l] > 200 && o.push({
                x: a.x + s,
                y: a.y + c
            }),
            s++
        }
        for (var l = 0,
        d = o.length; d > l; l++) {
            var u = o[l];
            if (t.hitTestPoint(u.x, u.y, n)) return this.setHitPoint(e, u.x, u.y),
            !0
        }
        return ! 1
    },
    e.setHitPoint = function(e, t, n) {
        var i = this.globalHitPointName,
        o = e[i]; ! o && (o = e[i] = new egret.Point),
        o.setTo(t, n)
    },
    e.globalHitPointName = "globalHitPoint",
    e
} ();
__reflect(CollisionUtil.prototype, "CollisionUtil");
var DateTimer = function(e) {
    function t(t, n) {
        void 0 === n && (n = 0);
        var i = e.call(this) || this;
        return i.delay = t,
        i.repeatCount = n,
        i
    }
    return __extends(t, e),
    t.prototype.start = function() {
        this.previous = egret.getTimer(),
        this.accTime = 0,
        egret.startTick(this.update, this)
    },
    t.prototype.reset = function() {
        this.previous = egret.getTimer(),
        this.accTime = 0,
        this.currentCount = 0
    },
    t.prototype.stop = function() {
        egret.stopTick(this.update, this)
    },
    t.prototype.update = function() {
        for (this.curTime = egret.getTimer(), this.passTime = this.curTime - this.previous, this.previous = this.curTime, this.accTime += this.passTime; this.accTime >= this.delay;) this.accTime -= this.delay,
        this.currentCount++,
        this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER)),
        this.repeatCount > 0 && this.currentCount == this.repeatCount && (this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER_COMPLETE)), this.stop());
        return ! 1
    },
    t
} (egret.EventDispatcher);
__reflect(DateTimer.prototype, "DateTimer");
var DateUtil = function() {
    function e() {}
    return e.format_1_1 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t)
    },
    e.format_1_2 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds())
    },
    e.format_1_3 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_4 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_5 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_6 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_7 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t)
    },
    e.format_1_8 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t)
    },
    e.format_1_9 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t)
    },
    e.format_1_10 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds())
    },
    e.format_1_11 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds())
    },
    e.format_1_12 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds())
    },
    e.format_1_13 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_14 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_15 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_16 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_17 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_18 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_19 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_20 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_21 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getEnDay(n.getDay())
    },
    e.format_1_22 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["-", "-", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_23 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["/", "/", ""]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_24 = function(e, t) {
        void 0 === t && (t = !1);
        var n = new Date(e);
        return "" + this.getYMD(n.getFullYear(), n.getMonth(), n.getDate(), ["年", "月", "日"]) + "	" + this.getHMS(n.getHours(), n.getMinutes(), n.getSeconds(), t) + this.getMilliseconds(n.getMilliseconds()) + "	" + this.getZnDay(n.getDay())
    },
    e.format_1_25 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["-", "-", ""])
    },
    e.format_1_26 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["/", "/", ""])
    },
    e.format_1_27 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["年", "月", "日"])
    },
    e.format_1_28 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["-", "-", ""]) + "	" + this.getEnDay(t.getDay())
    },
    e.format_1_29 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["/", "/", ""]) + "	" + this.getEnDay(t.getDay())
    },
    e.format_1_30 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["年", "月", "日"]) + "	" + this.getEnDay(t.getDay())
    },
    e.format_1_31 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["-", "-", ""]) + "	" + this.getZnDay(t.getDay())
    },
    e.format_1_32 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["/", "/", ""]) + "	" + this.getZnDay(t.getDay())
    },
    e.format_1_33 = function(e) {
        var t = new Date(e);
        return "" + this.getYMD(t.getFullYear(), t.getMonth(), t.getDate(), ["年", "月", "日"]) + "	" + this.getZnDay(t.getDay())
    },
    e.getYMD = function(e, t, n, i) {
        var o = e,
        r = t + 1,
        a = n;
        return "" + o + i[0] + (10 > r ? "0" + r: r) + i[1] + (10 > a ? "0" + a: a) + i[2]
    },
    e.getHMS = function(e, t, n, i) {
        void 0 === i && (i = !1);
        var o = e,
        r = t,
        a = n;
        return o -= i && o > 12 ? 12 : 0,
        "" + (10 > o ? "0" + o: o) + ":" + (10 > r ? "0" + r: r) + ":" + (10 > a ? "0" + a: a)
    },
    e.getMilliseconds = function(e) {
        return "." + e
    },
    e.getEnDay = function(e) {
        var t = e,
        n = "";
        switch (t) {
        case 0:
            n = "Sun";
            break;
        case 1:
            n = "Mon";
            break;
        case 2:
            n = "Tue";
            break;
        case 3:
            n = "Wed";
            break;
        case 4:
            n = "Thu";
            break;
        case 5:
            n = "Fri";
            break;
        case 6:
            n = "Sat"
        }
        return n
    },
    e.getZnDay = function(e) {
        var t = e,
        n = "";
        switch (t) {
        case 0:
            n = "星期日";
            break;
        case 1:
            n = "星期一";
            break;
        case 2:
            n = "星期二";
            break;
        case 3:
            n = "星期三";
            break;
        case 4:
            n = "星期四";
            break;
        case 5:
            n = "星期五";
            break;
        case 6:
            n = "星期六"
        }
        return n
    },
    e
} ();
__reflect(DateUtil.prototype, "DateUtil");
var DeviceUtil = function() {
    function e() {}
    return e.checkIDE = function(e, t) {
        return String(window.navigator.userAgent.toLowerCase().match(e)) == t
    },
    e.findIDE = function(e) {
        return - 1 != window.navigator.userAgent.indexOf(e)
    },
    e.isBrowserQQ = function() {
        return this.findIDE("MQQBrowser")
    },
    e.isBrowserIE = function() {
        return this.findIDE("MSIE")
    },
    e.isBrowserFirefox = function() {
        return this.findIDE("Firefox")
    },
    e.isBrowserChrome = function() {
        return this.findIDE("Chrome")
    },
    e.isBrowserSafari = function() {
        return this.findIDE("Safari")
    },
    e.isBrowserOpera = function() {
        return this.findIDE("Opera")
    },
    e.isWeChat = function() {
        return this.checkIDE(/MicroMessenger/i, "micromessenger") && !this.findIDE("wxwork")
    },
    e.isWeChatWork = function() {
        return this.checkIDE(/MicroMessenger/i, "micromessenger") && this.findIDE("wxwork")
    },
    e.isQQ = function() {
        return this.checkIDE(/QQ/i, "qq")
    },
    e.isWeibo = function() {
        return this.checkIDE(/WeiBo/i, "weibo")
    },
    e.isIFly = function() {
        return this.checkIDE(/iflytek_mmp/i, "iflytek_mmp")
    },
    e.isWeb = function() {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB
    },
    e.isNative = function() {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
    },
    e.isWinPC = function() {
        return "Windows PC" == egret.Capabilities.os
    },
    e.isMac = function() {
        return "Mac OS" == egret.Capabilities.os
    },
    e.isMobile = function() {
        return egret.Capabilities.isMobile
    },
    e.isAndroid = function() {
        return "Android" == egret.Capabilities.os
    },
    e.isWeChatAndroid = function() {
        return this.isWeChat() && this.isAndroid()
    },
    e.isIOS = function() {
        return "iOS" == egret.Capabilities.os
    },
    e.isWinPhone = function() {
        return "Windows Phone" == egret.Capabilities.os
    },
    e.isIPhoneX = function() {
        return this.isIOS() && (375 == document.body.clientWidth && 812 == document.body.clientHeight || 812 == document.body.clientWidth && 375 == document.body.clientHeight)
    },
    e.isIOS12 = function() {
        return this.isIOS() && this.findIDE("12_2")
    },
    e.isWeChatIPhoneX = function() {
        return this.isWeChat() && this.isIOS() && (document.body.clientWidth > 723 || document.body.clientHeight > 723)
    },
    e.isHUAWEI = function() {
        return this.isAndroid() && (this.checkIDE(/HUAWEI/i, "huawei") || this.checkIDE(/HONOR/i, "honor"))
    },
    e.isSamsung = function() {
        return this.isAndroid() && this.checkIDE(/SM-/i, "sm0")
    },
    e.isMi = function() {
        return this.isAndroid() && (this.checkIDE(/MI/i, "mi") || this.checkIDE(/Redmi/i, "redmi"))
    },
    e.isOPPO = function() {
        return this.isAndroid() && this.checkIDE(/OPPO/i, "oppo")
    },
    e.isVIVO = function() {
        return this.isAndroid() && this.checkIDE(/VIVO/i, "vivo")
    },
    e.isNexus = function() {
        return this.isAndroid() && this.checkIDE(/Nexus/i, "nexus")
    },
    e.isWeChatDevTools = function() {
        return this.findIDE("wechatdevtools")
    },
    e.isBaiduApp = function() {
        return this.checkIDE(/baidu/i, "baidu")
    },
    e.isTaobaoApp = function() {
        return this.checkIDE(/TaoBrowser/i, "taobrowser") || this.checkIDE(/taobao_/i, "taobao_") || this.checkIDE(/AliApp/i, "aliapp")
    },
    e
} ();
__reflect(DeviceUtil.prototype, "DeviceUtil");
var Effects = function() {
    function e() {}
    return e.centerSize = function(e) {
        return Tool.setAnchorOffsetCenter(e),
        egret.Tween.get(e).wait(10).to({
            scaleX: .95,
            scaleY: .95,
            alpha: .5
        },
        200).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        },
        200).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.defaultOpenTween_1 = function(e) {
        return Tool.setAnchorOffsetCenter(e),
        e.alpha = 0,
        e.scaleX = e.scaleY = .95,
        egret.Tween.get(e).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        },
        300).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.defaultCloseTween_1 = function(e) {
        return Tool.setAnchorOffsetCenter(e),
        egret.Tween.get(e).to({
            scaleX: .95,
            scaleY: .95,
            alpha: 0
        },
        300).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.playAnimation = function(e, t) {
        if (t) for (var n in e.items) e.items[n].props = {
            loop: !0
        };
        e.play()
    },
    e.loopTweenGroup = function(e) {
        function t() {
            e.play( - 1)
        }
        e.loop = t,
        e.addEventListener(egret.Event.COMPLETE, t, this),
        e.play( - 1)
    },
    e.stopTweenGroup = function(e) {
        e.stop();
        var t = e.loop;
        t && e.removeEventListener(egret.Event.COMPLETE, t, this)
    },
    e.typewriter = function(e, t, n, i, o) {
        for (var r = n || 50,
        a = 0,
        s = t.length; s > a; a++) egret.setTimeout(function(n, r) {
            e.text += t[a],
            r == s - 1 && i && i.call(o)
        },
        this, r * a, a)
    },
    e.typewriterTween = function(e, t, n) {
        for (var i, o = n || 50,
        r = 1,
        a = t.length + 1; a > r; r++) i = egret.Tween.get(e).wait(o * r).call(function(t) {
            return e.text = t
        },
        this, [t.substring(0, r)]);
        return i
    },
    e.recycleTextTween = function(e, t, n) {
        for (var i, o = n || 50,
        r = t.length,
        a = 0; r > a; r--) i = egret.Tween.get(e).wait(o * r).call(function(t) {
            return e.text = t
        },
        this, [t.substring(0, r)]);
        return i
    },
    e.Q_BounceTween_H = function(e) {
        e.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            return egret.Tween.removeTweens(e)
        },
        this),
        egret.Tween.get(e, {
            loop: !0
        }).wait(200).to({
            scaleX: 1.2,
            scaleY: .95
        },
        2e3, egret.Ease.circOut).to({
            scaleX: 1,
            scaleY: 1
        },
        500, egret.Ease.elasticOut).wait(800)
    },
    e.Q_BounceTween_V = function(e) {
        e.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            return egret.Tween.removeTweens(e)
        },
        this),
        egret.Tween.get(e, {
            loop: !0
        }).wait(200).to({
            scaleX: 1.05,
            scaleY: 1.1
        },
        2e3, egret.Ease.circOut).to({
            scaleX: 1,
            scaleY: 1
        },
        500, egret.Ease.elasticOut).wait(800)
    },
    e.buttonBackOut = function(e, t) {
        return egret.Tween.get(e).wait(t || 0).to({
            scaleX: 1,
            scaleY: 1
        },
        300, egret.Ease.backOut)
    },
    e.buttonBackIn = function(e, t) {
        return egret.Tween.get(e).wait(t || 0).to({
            scaleX: 0,
            scaleY: 0
        },
        300, egret.Ease.backIn)
    },
    e.setPointLeft = function(e, t, n, i) {
        e.alpha = 0;
        var o = e.x;
        return e.x -= t,
        egret.Tween.get(e).wait(i || 0).to({
            x: o,
            alpha: 1
        },
        n, egret.Ease.quadInOut)
    },
    e.setPointDown = function(e, t, n, i) {
        e.alpha = 0;
        var o = e.y;
        return e.y -= t,
        egret.Tween.get(e).wait(i || 0).to({
            y: o,
            alpha: 1
        },
        n, egret.Ease.quadInOut)
    },
    e.setScale = function(e, t, n, i) {
        return Tool.setAnchorOffsetCenter(e),
        e.alpha = 0,
        e.scaleX = e.scaleY = 2,
        e.rotation = t,
        egret.Tween.get(e).wait(i || 0).to({
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            alpha: 1
        },
        500, egret.Ease.circOut).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.leftToMiddle = function(e, t) {
        return void 0 === t && (t = 0),
        e.x = -e.width - e.anchorOffsetX,
        egret.Tween.get(e).wait(t).to({
            x: 0
        },
        400, egret.Ease.quadInOut)
    },
    e.topToMiddle = function(e, t) {
        return void 0 === t && (t = 0),
        e.y = -e.height - e.anchorOffsetY,
        egret.Tween.get(e).wait(t).to({
            y: 0
        },
        400, egret.Ease.quadInOut)
    },
    e.rightToMiddle = function(e, t) {
        return void 0 === t && (t = 0),
        e.x = egret.MainContext.instance.stage.$children[0].width + e.anchorOffsetX,
        egret.Tween.get(e).wait(t).to({
            x: 0
        },
        400, egret.Ease.quadInOut)
    },
    e.bottomToMiddle = function(e, t) {
        return void 0 === t && (t = 0),
        e.y = egret.MainContext.instance.stage.$children[0].height + e.anchorOffsetY,
        egret.Tween.get(e).wait(t).to({
            y: 0
        },
        400, egret.Ease.quadInOut)
    },
    e.middleToLeft = function(e, t) {
        return void 0 === t && (t = 0),
        egret.Tween.get(e).wait(t).to({
            x: -e.width - e.anchorOffsetX
        },
        400, egret.Ease.quadInOut)
    },
    e.middleToTop = function(e, t) {
        return void 0 === t && (t = 0),
        egret.Tween.get(e).wait(t).to({
            y: -e.height - e.anchorOffsetY
        },
        400, egret.Ease.quadInOut)
    },
    e.middleToRight = function(e, t) {
        return void 0 === t && (t = 0),
        egret.Tween.get(e).wait(t).to({
            x: egret.MainContext.instance.stage.$children[0].width + e.anchorOffsetX
        },
        400, egret.Ease.quadInOut)
    },
    e.middleToBottom = function(e, t) {
        return void 0 === t && (t = 0),
        egret.Tween.get(e).wait(t).to({
            y: egret.MainContext.instance.stage.$children[0].height + e.anchorOffsetY
        },
        400, egret.Ease.quadInOut)
    },
    e.zoomCenterInX = function(e) {
        var t = e.width / 2,
        n = e.x,
        i = e.anchorOffsetX;
        return e.x += t - i,
        e.anchorOffsetX = t,
        egret.Tween.get(e).to({
            scaleX: 0
        },
        200, egret.Ease.cubicIn).call(function(t) {
            e.x = n,
            e.anchorOffsetX = i
        })
    },
    e.zoomCenterOutX = function(e) {
        var t = e.width / 2,
        n = e.x,
        i = e.anchorOffsetX;
        return e.x += t - i,
        e.anchorOffsetX = t,
        egret.Tween.get(e).to({
            scaleX: 1
        },
        200, egret.Ease.cubicOut).call(function(t) {
            e.x = n,
            e.anchorOffsetX = i
        })
    },
    e.zoomCenterInY = function(e) {
        var t = e.width / 2,
        n = e.y,
        i = e.anchorOffsetY;
        return e.y += t - i,
        e.anchorOffsetY = t,
        egret.Tween.get(e).to({
            scaleX: 0
        },
        200, egret.Ease.cubicIn).call(function(t) {
            e.y = n,
            e.anchorOffsetY = i
        })
    },
    e.zoomCenterOutY = function(e) {
        var t = e.width / 2,
        n = e.y,
        i = e.anchorOffsetY;
        return e.y += t - i,
        e.anchorOffsetY = t,
        egret.Tween.get(e).to({
            scaleX: 1
        },
        200, egret.Ease.cubicOut).call(function(t) {
            e.y = n,
            e.anchorOffsetY = i
        })
    },
    e.poomPop = function(e) {
        return Tool.setAnchorOffsetCenter(e),
        e.scaleX = e.scaleY = .5,
        egret.Tween.get(e).to({
            scaleX: 1,
            scaleY: 1
        },
        500, egret.Ease.bounceOut).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.narrowPop = function(e) {
        return Tool.setAnchorOffsetCenter(e),
        e.scaleX = e.scaleY = 2,
        egret.Tween.get(e).to({
            scaleX: 1,
            scaleY: 1
        },
        500, egret.Ease.bounceIn).call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.startFlicker = function(e, t) {
        e.alpha = 1,
        egret.Tween.get(e, {
            loop: !0
        }).to({
            alpha: 0
        },
        t).to({
            alpha: 1
        },
        t)
    },
    e.stopFlicker = function(e) {
        e.alpha = 1,
        egret.Tween.removeTweens(e)
    },
    e.flickerTween = function(e, t) {
        var n = 1,
        i = 600,
        o = 0;
        t && (n = t.times || 1, i = t.duration / 2 || 600, o = t.wait / 2 || 0),
        Tool.setAnchorOffsetCenter(e),
        Tool.setAnchorOffsetCenter;
        for (var r = egret.Tween.get(e), a = 0; n > a; a++) r.to({
            alpha: 1
        },
        i).wait(o * (a + 1)).to({
            alpha: 0
        },
        i).wait(o * (a + 1));
        return r.call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.shakeTween = function(e, t) {
        var n = 1,
        i = 5,
        o = 25,
        r = 0;
        t && (n = t.times || 1, i = t.angle || 5, o = t.duration / 4 || 25, r = t.wait || 0),
        Tool.setAnchorOffsetCenter(e);
        for (var a = egret.Tween.get(e), s = 0; n > s; s++) a.to({
            rotation: i
        },
        o).to({
            rotation: 0
        },
        o).to({
            rotation: -i
        },
        o).to({
            rotation: 0
        },
        o).wait(r * (s + 1));
        return a.call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.scaleTween = function(e, t) {
        var n = 1,
        i = 1.2,
        o = 400,
        r = 0,
        a = 0;
        t && (n = t.times || 1, i = t.size || 1.2, o = t.duration / 2 || 400, r = t.wait / 2 || 0, a = t.speedup / 2 || 0),
        Tool.setAnchorOffsetCenter(e);
        for (var s = egret.Tween.get(e), c = 0; n > c; c++) s.to({
            scaleX: i,
            scaleY: i
        },
        o).wait(r * (c + 1)).to({
            scaleX: 1,
            scaleY: 1
        },
        o).wait(r * (c + 1)),
        o > a && (o -= a);
        return s.call(function(t) {
            return Tool.restoreAnchorOffset(e)
        })
    },
    e.shockTween = function(e, t) {
        var n = 1,
        i = MathUtil.getRadiusFromWH(e.width, e.height),
        o = .05 * i,
        r = 50,
        a = 0;
        t && (n = t.times || 1, o = t.distance || o, r = t.duration / 8 || r, a = t.wait || 0);
        for (var s = egret.Tween.get(e), c = 0; n > c; c++) s.to({
            x: e.x - o,
            y: e.y - o
        },
        r).to({
            x: e.x,
            y: e.y
        },
        r).to({
            x: e.x + o,
            y: e.y + o
        },
        r).to({
            x: e.x,
            y: e.y
        },
        r).to({
            x: e.x - o,
            y: e.y + o
        },
        r).to({
            x: e.x,
            y: e.y
        },
        r).to({
            x: e.x + o,
            y: e.y - o
        },
        r).to({
            x: e.x,
            y: e.y
        },
        r).wait(a * (c + 1));
        return s
    },
    e.flashlightTween = function(e, t) {
        var n = egret.MainContext.instance.stage,
        i = new eui.Rect(n.width, n.height);
        i.fillColor = 16777215,
        i.alpha = .3,
        n.addChild(i);
        var o = e.onShow,
        r = e.onWait,
        a = e.onHide;
        egret.Tween.get(i).to({
            alpha: 1
        },
        500, egret.Ease.circIn).call(function(e) {
            return o && o.call(t)
        },
        t).wait(500).call(function(e) {
            return r && r.call(t)
        },
        t).to({
            alpha: 0
        },
        1e3, egret.Ease.circIn).call(function(e) {
            return i.parent.removeChild(i)
        }).call(function(e) {
            return a && a.call(t)
        },
        t)
    },
    e.countDownTween = function(e, t) {
        var n = e;
        return Tool.setAnchorOffsetCenter(n),
        n.scaleX = n.scaleY = 5,
        egret.Tween.get(n).wait(t || 0).to({
            alpha: 1,
            scaleX: 3,
            scaleY: 3
        },
        200, egret.Ease.circIn).to({
            scaleX: 2.8,
            scaleY: 2.8
        },
        800).call(function(e) {
            return egret.Tween.get(n).to({
                scaleX: 0,
                scaleY: 0
            },
            300)
        })
    },
    e.gridTweenShow = function(e, t) {
        function n() {
            if (T && E) {
                _.parent.removeChild(_);
                for (var e = 0,
                t = h.length; t > e; e++) h[e].visible = !0
            }
        }
        e.validateNow();
        var i, o, r, a, s;
        i = t.oW,
        o = t.oH || i,
        r = t.wait || 0,
        a = t.duration || 400,
        s = t.ease || egret.Ease.backOut;
        for (var c = Tool.getGridTexture(e, i, o), h = e.$children, l = 0, d = h.length; d > l; l++) h[l].visible = !1;
        var u = e.width,
        p = e.height,
        g = u / 2,
        f = p / 2,
        _ = new eui.Group;
        _.width = u,
        _.height = p,
        Tool.setAnchorOffsetCenter(_),
        e.addChild(_);
        for (var l = 0,
        d = c.length; d > l; l++) {
            var v = c[l],
            x = new eui.Image;
            x.texture = v.tr,
            Tool.setAnchorOffsetCenter(x),
            x.x = g,
            x.y = f,
            _.addChild(x)
        }
        _.scaleX = _.scaleY = 0;
        var T = !1,
        E = !1;
        return egret.Tween.get(_).wait(r).to({
            rotation: 360,
            scaleX: 1,
            scaleY: 1
        },
        250).call(function(e) {
            for (var t, i = _.$children,
            o = 0,
            r = i.length; r > o; o++) {
                var h = c[o];
                t = egret.Tween.get(i[o]).to({
                    x: h.cX,
                    y: h.cY
                },
                a, s)
            }
            t.call(function(e) {
                T = !0,
                n()
            })
        }).wait(a).call(function(e) {
            E = !0,
            n()
        })
    },
    e.gridTweenHide = function(e, t) {
        e.validateNow();
        var n, i, o, r, a;
        n = t.oW,
        i = t.oH || n,
        o = t.wait || 0,
        r = t.duration || 400,
        a = t.ease || egret.Ease.backIn;
        for (var s = Tool.getGridTexture(e, n, i), c = e.$children, h = 0, l = c.length; l > h; h++) c[h].visible = !1;
        var d = e.width,
        u = e.height,
        p = d / 2,
        g = u / 2,
        f = new eui.Group;
        f.width = d,
        f.height = u,
        Tool.setAnchorOffsetCenter(f),
        e.addChild(f);
        for (var _, h = 0,
        l = s.length; l > h; h++) {
            var v = s[h],
            x = new eui.Image;
            x.texture = v.tr,
            Tool.setAnchorOffsetCenter(x),
            x.x = v.cX,
            x.y = v.cY,
            f.addChild(x),
            _ = egret.Tween.get(x).wait(o).to({
                x: p,
                y: g
            },
            r, a)
        }
        return _.call(function(e) {
            egret.Tween.get(f).to({
                rotation: 360,
                scaleX: 0,
                scaleY: 0
            },
            250).call(function(e) {
                return f.parent.removeChild(f)
            })
        }).wait(260)
    },
    e.pageTurnTween = function(e, t) {
        function n() {
            var e = new eui.Rect;
            return e.width = g,
            e.height = f,
            Tool.setAnchorOffsetCenter(e),
            e.x = h,
            e.y = l,
            e.rotation = p,
            e
        }
        e.validateNow();
        var i, o, r;
        t ? (i = t.wait || 0, o = t.duration || 1e3, r = t.ease || null) : (i = 0, o = 1e3, r = null);
        var a = Tool.getTextureByRectangle(e),
        s = e.width,
        c = e.height,
        h = s / 2,
        l = c / 2,
        d = new eui.Image;
        d.width = s,
        d.height = c,
        d.x = 2 * s,
        d.y = 2 * c,
        d.scaleX = d.scaleY = -1,
        d.texture = a,
        e.addChild(d);
        var u = Math.atan(s / c),
        p = MathUtil.radianToAngle(u),
        g = s * Math.cos(u) * 2,
        f = s / Math.sin(u),
        _ = n();
        _.alpha = 0,
        _.x -= g * Math.cos(u),
        _.y -= g * Math.sin(u);
        var v = n(),
        x = n();
        return e.mask = v,
        d.mask = x,
        e.addChild(_),
        e.addChild(v),
        e.addChild(x),
        egret.Tween.get(v).to({
            x: _.x,
            y: _.y
        },
        o),
        egret.Tween.get(x).to({
            x: _.x,
            y: _.y
        },
        o),
        egret.Tween.get(d).to({
            x: 0,
            y: 0
        },
        o).call(function(t) {
            e.mask = null,
            e.removeChild(d),
            e.removeChild(_),
            e.removeChild(v),
            e.removeChild(x)
        })
    },
    e
} ();
__reflect(Effects.prototype, "Effects");
var ElementEventUtil = function() {
    function e(e) {
        this.callbackObj = e
    }
    return e.build = function(t) {
        return new e(t)
    },
    e.prototype.addEventListener = function(e, t) {
        for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
        if (!n.length) return void console.warn("elements.length can not be 0");
        for (var o = this.getTarget(e, t), r = o.pool, a = o.listener, s = 0, c = n.length; c > s; s++) {
            var h = n[s];
            h.addEventListener(e, a),
            -1 == r.indexOf(h) && r.push(h)
        }
    },
    e.prototype.removeEventListener = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (!t.length) return void console.warn("elements.length can not be 0");
        for (var i = this.getTarget(e), o = i.pool, r = i.listener, a = 0; a < o.length;) {
            for (var s = 0,
            c = !1; s < t.length;) {
                var h = o[a];
                t[s] == h ? (h.removeEventListener(e, r), o.splice(a, 1), t.slice(s, 1), c = !0) : s++
            } ! c && a++
        }
    },
    e.prototype.getTarget = function(e, t) {
        var n = this;
        return ! this[e + "Pool"] && (this[e + "Pool"] = []),
        !this[e + "Listener"] && t && (this[e + "Listener"] = function(i) {
            var o = n[e + "Event"]; ! o && (o = n[e + "Event"] = new egret.Event(e)),
            o.eTarget = i.target,
            t.call(n.callbackObj, o),
            i.preventDefault()
        }),
        {
            pool: this[e + "Pool"],
            listener: this[e + "Listener"]
        }
    },
    e
} ();
__reflect(ElementEventUtil.prototype, "ElementEventUtil");
var Encrypt = function() {
    function Encrypt() {}
    return Encrypt.bindEncrvptValName = function(name, host) {
        host.__Encrypt__ = new Encrypt,
        host.__Encrypt__.bindEncrvptValNameLogic || eval("var encode_version = 'sojson.v5', mcjhz = '__0x3b72f',  __0x3b72f=['5LuM6ICx5Ym/6ZmUGMKwwqnDgyxiMTMs','S8KYw65owq7DuhlSUg==','w4oPbT4vDsOtw7/Cn8KCw7TCqMOqBsOefw4gbMKPM24o','w75WwrfDtMOww5g=','w6nCiVjDpHI=','w4TDsXTCvcOD','w6TDmW7CjQ==','w6Ahah4i','P8KbVMKUTw4qwp4r'];(function(_0x4ea5eb,_0x36782b){var _0x517dcf=function(_0x129cf8){while(--_0x129cf8){_0x4ea5eb['push'](_0x4ea5eb['shift']());}};_0x517dcf(++_0x36782b);}(__0x3b72f,0x1b1));var _0x37fc=function(_0x191f92,_0x25bbec){_0x191f92=_0x191f92-0x0;var _0x17bee8=__0x3b72f[_0x191f92];if(_0x37fc['initialized']===undefined){(function(){var _0x542ca5=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2c98aa='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x542ca5['atob']||(_0x542ca5['atob']=function(_0x2a632b){var _0xf10502=String(_0x2a632b)['replace'](/=+$/,'');for(var _0x2a58bb=0x0,_0xaf2b55,_0x17f79f,_0x23ba5f=0x0,_0x937dc5='';_0x17f79f=_0xf10502['charAt'](_0x23ba5f++);~_0x17f79f&&(_0xaf2b55=_0x2a58bb%0x4?_0xaf2b55*0x40+_0x17f79f:_0x17f79f,_0x2a58bb++%0x4)?_0x937dc5+=String['fromCharCode'](0xff&_0xaf2b55>>(-0x2*_0x2a58bb&0x6)):0x0){_0x17f79f=_0x2c98aa['indexOf'](_0x17f79f);}return _0x937dc5;});}());var _0x7ea9c6=function(_0x39f717,_0x178ef4){var _0x170338=[],_0x1c72ef=0x0,_0x2342b2,_0x3c97c8='',_0x58e321='';_0x39f717=atob(_0x39f717);for(var _0x446fa6=0x0,_0x1629d4=_0x39f717['length'];_0x446fa6<_0x1629d4;_0x446fa6++){_0x58e321+='%'+('00'+_0x39f717['charCodeAt'](_0x446fa6)['toString'](0x10))['slice'](-0x2);}_0x39f717=decodeURIComponent(_0x58e321);for(var _0x4e7bce=0x0;_0x4e7bce<0x100;_0x4e7bce++){_0x170338[_0x4e7bce]=_0x4e7bce;}for(_0x4e7bce=0x0;_0x4e7bce<0x100;_0x4e7bce++){_0x1c72ef=(_0x1c72ef+_0x170338[_0x4e7bce]+_0x178ef4['charCodeAt'](_0x4e7bce%_0x178ef4['length']))%0x100;_0x2342b2=_0x170338[_0x4e7bce];_0x170338[_0x4e7bce]=_0x170338[_0x1c72ef];_0x170338[_0x1c72ef]=_0x2342b2;}_0x4e7bce=0x0;_0x1c72ef=0x0;for(var _0x127456=0x0;_0x127456<_0x39f717['length'];_0x127456++){_0x4e7bce=(_0x4e7bce+0x1)%0x100;_0x1c72ef=(_0x1c72ef+_0x170338[_0x4e7bce])%0x100;_0x2342b2=_0x170338[_0x4e7bce];_0x170338[_0x4e7bce]=_0x170338[_0x1c72ef];_0x170338[_0x1c72ef]=_0x2342b2;_0x3c97c8+=String['fromCharCode'](_0x39f717['charCodeAt'](_0x127456)^_0x170338[(_0x170338[_0x4e7bce]+_0x170338[_0x1c72ef])%0x100]);}return _0x3c97c8;};_0x37fc['rc4']=_0x7ea9c6;_0x37fc['data']={};_0x37fc['initialized']=!![];}var _0x16d4eb=_0x37fc['data'][_0x191f92];if(_0x16d4eb===undefined){if(_0x37fc['once']===undefined){_0x37fc['once']=!![];}_0x17bee8=_0x37fc['rc4'](_0x17bee8,_0x25bbec);_0x37fc['data'][_0x191f92]=_0x17bee8;}else{_0x17bee8=_0x16d4eb;}return _0x17bee8;};Encrypt[_0x37fc('0x0','pSS&')][_0x37fc('0x1','3w9*')]=function(_0x5232f5,_0x3c195c){var _0xd4b97e={'HGiDH':'__n__','GKBbs':_0x37fc('0x2','r*nn')};var _0x4fc364='5|3|0|2|1|4'[_0x37fc('0x3',')uUa')]('|'),_0x2c9e9c=0x0;while(!![]){switch(_0x4fc364[_0x2c9e9c++]){case'0':var _0x19b833=this['getRandomString'](0x10);continue;case'1':_0x3c195c[_0xd4b97e[_0x37fc('0x4','Q)OW')]]=_0x19b833;continue;case'2':_0x3c195c[_0x19b833]=_0x5232f5;continue;case'3':if(_0x24ba29){if(_0x3c195c[_0x3c195c[_0x24ba29]]!=_0x5232f5)throw _0xd4b97e['GKBbs'];delete _0x3c195c[_0x3c195c[_0x24ba29]];}continue;case'4':Encrypt[_0x37fc('0x5','Q)OW')]=_0x3c195c;continue;case'5':var _0x24ba29=_0x3c195c[_0xd4b97e[_0x37fc('0x6','3w9*')]];continue;}break;}};;if(!(typeof encode_version!==_0x37fc('0x7','AR9e')&&encode_version==='sojson.v5')){window['alert'](_0x37fc('0x8','CGVU'));};encode_version = 'sojson.v5';"),
        host.__Encrypt__.bindEncrvptValNameLogic(name, host)
    },
    Encrypt.sendEncrvptVal = function(url, callback, callbackObj) {
        Encrypt.host.__Encrypt__.sendEncrvptValLogic || eval("var encode_version = 'sojson.v5', imerv = '__0x3b730',  __0x3b730=['w5gww5FgMMOF','w7vDncOOW13ChsK7','DUPCpV/CocOfw7zDuVrDpMKPw4d+w4h5G8OsasOLFXHDqXLDnkp9w4rDjW88E8OnUypRwo4=','PzXCrMKSHhgLwo7DiMOicQ==','w5w7wqjClGY=','wqrCicOqwp/CnsKmBQ==','w5oAw69vAg==','XFLCpmHDjg==','wqVrdcK0BQ==','RcKrO8OR','wp0WMCXCvMO8','wqnDmSzDqnM=','w5bDj8KcfA==','wr7DjcKKIxdL','KMOVwqfCjcKj','w5nChMOcwr3Clg==','w7JAL1nCvg==','wrZFwrIiw4s=','wrzCjcOvwos=','wpTDihnDnEF2','wqksJDzCjw==','w6HDmW7DgQ==','VkXCjETDv8Kt','wq/CjcOpwoQ=','RFbDlWw=','aEnCl8O8w4DDrcKSwpwKcEseK2zDuixqw69gwrTCow==','w4zDmmDDkcOG','WwjDn8KlRA==','PMOvH1I=','wprDvsOsBsKrwprDuV1s','w7LCuMOLwr3Cp8Kuw59DwozCusKYYw==','HMO8cw==','wqnDnMKIOAZdG8OdTgl2w7U=','wp/DiMKRBiU=','w65yEVfDhg==','w6fDgsKjXhI=','wosMMiPCsMO/Xg==','wpwHICTCrMO8Xg==','woTDnxTDhA==','VMO2VsKf','wo9yw4QCw5c=','RC0CKmfDucOmKMOZNMKHQxkQH8Kqw6fDt2hjbA==','w4wqwqjCkQ==','w4dNw4jCmw==','fT3DrMKHRQNRwpTChQ==','JsOFwrPCk8KUwrzDgRNYw6Bdw40=','w7hLwqw=','woFGwrocw74=','w5vChMOxwrrCug==','w4JhA1LCtw==','SGnCt8Ocw6DDjcKy','GQhgwpB0','w5Y3JMOqw5A=','Jis+','dFfDhiPDtMKhw6MTS8O6wpXDpHXCuMOgw6k2SHEXw7l+FMKJwrlAfMOGwq3Dt8KGw63Cq8OWwoIV','w6rDusK5EMK7','SjHDmMKYZQ==','w6cqwqnCsVQ=','e8ODcMO4','wobCt8OFPQ==','w7/DqMKJOsKR','woQDBA==','wpjDu8OpCcKw','TMO0X8O4w60=','wp3CosOYwrjCosKFJcO8worDu8OpKBbCs8KdIcK8Sxkgw6o=','wrXCvcO2wqzCjg==','WCIsAkY=','w4fDssOAU1w=','w4XDj8Kacw==','w5BHOGrDlA==','N8OhAEo=','FsKOw6cDwqwle0jCpA==','Mi7ChcOTw5NRw5/CshE='];(function(_0x5032bc,_0x824bb){var _0xa030a9=function(_0x3d677d){while(--_0x3d677d){_0x5032bc['push'](_0x5032bc['shift']());}};_0xa030a9(++_0x824bb);}(__0x3b730,0x16c));var _0x5d5b=function(_0x124aeb,_0x4a46c6){_0x124aeb=_0x124aeb-0x0;var _0x32bd0=__0x3b730[_0x124aeb];if(_0x5d5b['initialized']===undefined){(function(){var _0x4134=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x3df7e2='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4134['atob']||(_0x4134['atob']=function(_0x370016){var _0x5b2e61=String(_0x370016)['replace'](/=+$/,'');for(var _0x46c98f=0x0,_0x1f7595,_0x18268a,_0x39a0e5=0x0,_0x58faa4='';_0x18268a=_0x5b2e61['charAt'](_0x39a0e5++);~_0x18268a&&(_0x1f7595=_0x46c98f%0x4?_0x1f7595*0x40+_0x18268a:_0x18268a,_0x46c98f++%0x4)?_0x58faa4+=String['fromCharCode'](0xff&_0x1f7595>>(-0x2*_0x46c98f&0x6)):0x0){_0x18268a=_0x3df7e2['indexOf'](_0x18268a);}return _0x58faa4;});}());var _0x2c3b51=function(_0x2ddf90,_0x545f99){var _0x8ff33b=[],_0x240b98=0x0,_0xbb5371,_0x518e05='',_0xf240a8='';_0x2ddf90=atob(_0x2ddf90);for(var _0x840d=0x0,_0x57badd=_0x2ddf90['length'];_0x840d<_0x57badd;_0x840d++){_0xf240a8+='%'+('00'+_0x2ddf90['charCodeAt'](_0x840d)['toString'](0x10))['slice'](-0x2);}_0x2ddf90=decodeURIComponent(_0xf240a8);for(var _0x33c25c=0x0;_0x33c25c<0x100;_0x33c25c++){_0x8ff33b[_0x33c25c]=_0x33c25c;}for(_0x33c25c=0x0;_0x33c25c<0x100;_0x33c25c++){_0x240b98=(_0x240b98+_0x8ff33b[_0x33c25c]+_0x545f99['charCodeAt'](_0x33c25c%_0x545f99['length']))%0x100;_0xbb5371=_0x8ff33b[_0x33c25c];_0x8ff33b[_0x33c25c]=_0x8ff33b[_0x240b98];_0x8ff33b[_0x240b98]=_0xbb5371;}_0x33c25c=0x0;_0x240b98=0x0;for(var _0x150950=0x0;_0x150950<_0x2ddf90['length'];_0x150950++){_0x33c25c=(_0x33c25c+0x1)%0x100;_0x240b98=(_0x240b98+_0x8ff33b[_0x33c25c])%0x100;_0xbb5371=_0x8ff33b[_0x33c25c];_0x8ff33b[_0x33c25c]=_0x8ff33b[_0x240b98];_0x8ff33b[_0x240b98]=_0xbb5371;_0x518e05+=String['fromCharCode'](_0x2ddf90['charCodeAt'](_0x150950)^_0x8ff33b[(_0x8ff33b[_0x33c25c]+_0x8ff33b[_0x240b98])%0x100]);}return _0x518e05;};_0x5d5b['rc4']=_0x2c3b51;_0x5d5b['data']={};_0x5d5b['initialized']=!![];}var _0x50cd21=_0x5d5b['data'][_0x124aeb];if(_0x50cd21===undefined){if(_0x5d5b['once']===undefined){_0x5d5b['once']=!![];}_0x32bd0=_0x5d5b['rc4'](_0x32bd0,_0x4a46c6);_0x5d5b['data'][_0x124aeb]=_0x32bd0;}else{_0x32bd0=_0x50cd21;}return _0x32bd0;};Encrypt[_0x5d5b('0x0','K%kX')]['sendEncrvptValLogic']=function(_0x2c8997,_0x214913,_0x29b839){var _0x222b22={'eUJDW':function _0x4ac5b9(_0xda88ef,_0x1e39be){return _0xda88ef+_0x1e39be;},'ycKQD':_0x5d5b('0x1',']HYi'),'TVClR':function _0x3f81a9(_0x22c205,_0x5768ec){return _0x22c205!=_0x5768ec;},'qqwfu':'hIY','mQmFu':function _0x55f9d0(_0x4be219,_0x491022){return _0x4be219&&_0x491022;},'YAmzx':function _0x486840(_0x5552d0,_0x22b92a){return _0x5552d0(_0x22b92a);},'PAshj':_0x5d5b('0x2',')[jL'),'JUsfu':function _0x578cb0(_0x1503dc,_0x3aae56){return _0x1503dc+_0x3aae56;},'slpUk':_0x5d5b('0x3','Yh#&')};var _0x3893e2=_0x5d5b('0x4','j]h8')[_0x5d5b('0x5','Umzx')]('|'),_0x358ea4=0x0;while(!![]){switch(_0x3893e2[_0x358ea4++]){case'0':this[_0x5d5b('0x6','Hzwa')](_0x222b22[_0x5d5b('0x7',']HYi')](_0x2c8997,_0x222b22[_0x5d5b('0x8','xPEK')]),'',function(_0x5927bb){if(!_0x5927bb||_0x5927bb[_0x5d5b('0x9','yWcN')]!=0x64||!_0x5927bb['data']||!_0x5927bb[_0x5d5b('0xa','WVDO')][_0x5d5b('0xb','h2d]')]||_0x2dc533[_0x5d5b('0xc','fk^T')](_0x5927bb[_0x5d5b('0xd','LWTO')][_0x5d5b('0xe','GvYO')],0xc8)){if(_0x2dc533[_0x5d5b('0xf','HXd3')]===_0x2dc533[_0x5d5b('0x10','vy(3')]){if(!_0x5927bb||_0x2dc533[_0x5d5b('0x11','!pAt')](_0x5927bb[_0x5d5b('0x12','3i4v')],0x64)||!_0x5927bb[_0x5d5b('0x13','Hzwa')]||!_0x5927bb['data'][_0x5d5b('0x14','fk^T')]||_0x2dc533[_0x5d5b('0x15','h2d]')](_0x5927bb[_0x5d5b('0x16','Q*wY')][_0x5d5b('0x17','xPEK')],0xc8)){console[_0x5d5b('0x18','Hzwa')](_0x5927bb?_0x5927bb[_0x5d5b('0x19','VGdJ')]||_0x5d5b('0x1a','tQU2'):_0x2dc533[_0x5d5b('0x1b','Q*wY')]);if(_0x2dc533[_0x5d5b('0x1c','j]h8')](_0x214913,_0x29b839))_0x214913[_0x5d5b('0x1d','(eD%')](_0x29b839);return;}var _0x56e039=_0x5927bb['data'];var _0x10a4ab=JSON[_0x5d5b('0x1e','0q@Q')]({'data':_0x4002a8});var _0x543e33=_0xff0438[_0x5d5b('0x1f','vy(3')](_0x56e039[_0x5d5b('0x20','x$3W')]);var _0x474021=_0xff0438[_0x5d5b('0x21','GvYO')](_0x56e039['iv']);var _0x16f0c6=_0x2dc533[_0x5d5b('0x22','GvYO')](_0x2dc533[_0x5d5b('0x23','FtF4')],_0x2dc533['LkZgv'](encodeURIComponent,_0x2dc533[_0x5d5b('0x24','LWTO')](encodeURIComponent,_0xff0438[_0x5d5b('0x25','h2d]')](_0x10a4ab,_0x543e33,_0x474021))));_0xff0438[_0x5d5b('0x26','h2d]')](_0x2dc533['RqzQG'](_0x2c8997,_0x2dc533['rjkVd']),_0x16f0c6,function(_0x43718f){var _0x2a363c={'JBsSu':function _0x521406(_0x8d42bb,_0x108962){return _0x8d42bb&&_0x108962;}};if(_0x2a363c['JBsSu'](_0x214913,_0x29b839))_0x214913[_0x5d5b('0x27','fk^T')](_0x29b839,_0x43718f);});}else{console[_0x5d5b('0x28','!O%c')](_0x5927bb?_0x5927bb['info']||_0x2dc533[_0x5d5b('0x29','J(77')]:_0x5d5b('0x2a','bigb'));if(_0x2dc533['IiKdw'](_0x214913,_0x29b839))_0x214913[_0x5d5b('0x2b','Umzx')](_0x29b839);return;}}var _0x12d505=_0x5927bb[_0x5d5b('0x2c','[$2t')];var _0x4acd9c=JSON[_0x5d5b('0x2d','j]h8')]({'data':_0x4002a8});var _0x50e302=_0xff0438[_0x5d5b('0x2e','HXd3')](_0x12d505[_0x5d5b('0x2f','Gv0#')]);var _0x937887=_0xff0438[_0x5d5b('0x1f','vy(3')](_0x12d505['iv']);var _0x1ded0f=_0x2dc533[_0x5d5b('0x30','3i4v')](_0x2dc533[_0x5d5b('0x31','vy(3')],_0x2dc533[_0x5d5b('0x32','!pAt')](encodeURIComponent,_0x2dc533['BItZI'](encodeURIComponent,_0xff0438[_0x5d5b('0x33','tQU2')](_0x4acd9c,_0x50e302,_0x937887))));_0xff0438['request'](_0x2dc533[_0x5d5b('0x34','r6bq')](_0x2c8997,_0x2dc533[_0x5d5b('0x35','h39a')]),_0x1ded0f,function(_0x2b9be5){var _0x2d579f={'ADsFx':function _0x611f93(_0x6c4983,_0x374b8b){return _0x6c4983!==_0x374b8b;},'DxFvN':_0x5d5b('0x36','BqCR'),'AAVlI':'mdq','HamLF':function _0x5637e3(_0x559c5a,_0x5138e3){return _0x559c5a&&_0x5138e3;},'IPATm':_0x5d5b('0x37','VGdJ')};if(_0x2d579f[_0x5d5b('0x38','PdzQ')](_0x2d579f[_0x5d5b('0x39','j]h8')],_0x2d579f['AAVlI'])){if(_0x2d579f[_0x5d5b('0x3a','Umzx')](_0x214913,_0x29b839))_0x214913[_0x5d5b('0x3b',')LVX')](_0x29b839,_0x2b9be5);}else{console[_0x5d5b('0x3c','kjzo')](_0x2d579f['IPATm']);return;}});});continue;case'1':var _0x2dc533={'NgTBG':function _0x3c6570(_0x28ad02,_0x35fc69){return _0x222b22[_0x5d5b('0x3d','PdzQ')](_0x28ad02,_0x35fc69);},'juwqS':_0x5d5b('0x3e','h2d]'),'OYtoU':_0x222b22[_0x5d5b('0x3f','0q@Q')],'GNumF':function _0x2ecc8c(_0x9cbc6c,_0x2a125c){return _0x222b22[_0x5d5b('0x40',')LVX')](_0x9cbc6c,_0x2a125c);},'IbzqU':_0x5d5b('0x41','Hzwa'),'UAAKo':function _0x28f1a0(_0x42bd32,_0x20247f){return _0x222b22[_0x5d5b('0x42','Hzwa')](_0x42bd32,_0x20247f);},'RqzQG':function _0xc88a32(_0x496810,_0x191a16){return _0x496810+_0x191a16;},'MYYhy':'&encrypted=','LkZgv':function _0x40956f(_0xf7e687,_0x30ba26){return _0x222b22[_0x5d5b('0x43','bigb')](_0xf7e687,_0x30ba26);},'UlKCg':function _0x31acbf(_0x127a6c,_0x3325a6){return _0x222b22[_0x5d5b('0x44',')[jL')](_0x127a6c,_0x3325a6);},'rjkVd':_0x222b22['PAshj'],'IiKdw':function _0x474b34(_0x58d88d,_0x30dcff){return _0x58d88d&&_0x30dcff;},'woYfO':function _0x20b596(_0x918649,_0x249733){return _0x918649(_0x249733);},'BItZI':function _0x1e6276(_0x26fa89,_0x5aa20d){return _0x222b22['YAmzx'](_0x26fa89,_0x5aa20d);},'gFBEM':function _0x26c523(_0x158d6d,_0x40f3d4){return _0x222b22['JUsfu'](_0x158d6d,_0x40f3d4);}};continue;case'2':var _0xff0438=this;continue;case'3':var _0x4002a8=_0x391a48[_0x391a48[_0x391a48['__n__']]];continue;case'4':if(!_0x4002a8&&_0x222b22['TVClR'](_0x4002a8,0x0)){console[_0x5d5b('0x45','LWTO')](_0x222b22[_0x5d5b('0x46','FtF4')]);return;}continue;case'5':var _0x391a48=Encrypt[_0x5d5b('0x47','(eD%')];continue;}break;}};;if(!(typeof encode_version!=='undefined'&&encode_version===_0x5d5b('0x48','iPmT'))){window['alert']('不能删除sojson.v5');};encode_version = 'sojson.v5';"),
        Encrypt.host.__Encrypt__.sendEncrvptValLogic(url, callback, callbackObj)
    },
    Encrypt.prototype.encrypt = function(word, key, vd) {
        return window.CryptoJS ? (this.encryptLogic || eval("var encode_version = 'sojson.v5', dldox = '__0x3b732',  __0x3b732=['fGNx','OcK1TlsxAQ==','N8KPwrw1FA==','csK0wpg=','Q0kBMMKBMg==','bzkuwo4t','wrY2wpQ=','GArCj1jDp8ORag==','EAvCiE8=','VWHDqA==','A8KNwpw=','fcOjGTHCv37CgsOfwqZBAQ==','CQvCv17DrMOIcDI=','amJ4w7rCp8O2wqB4w4o=','R1LDiMObw6I=','5Luj6IGP5Yqa6Zudw7/CpFHDlCvDm8OEwpw7','byozwoknw6hbwq1Q','w4Qgw7hJNVB3WAFnGxE=','BMKcwrc2BT/DvCg=','QlJiwpFs'];(function(_0x1d346d,_0x24f171){var _0x3a6b21=function(_0x3c4223){while(--_0x3c4223){_0x1d346d['push'](_0x1d346d['shift']());}};_0x3a6b21(++_0x24f171);}(__0x3b732,0x74));var _0x5bfc=function(_0x4b16e8,_0x5cccb9){_0x4b16e8=_0x4b16e8-0x0;var _0x3d19a7=__0x3b732[_0x4b16e8];if(_0x5bfc['initialized']===undefined){(function(){var _0x1058d9=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x1821d2='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1058d9['atob']||(_0x1058d9['atob']=function(_0xc58392){var _0x4d2108=String(_0xc58392)['replace'](/=+$/,'');for(var _0x2fa6b4=0x0,_0xe66769,_0x446a77,_0x252264=0x0,_0x5ca913='';_0x446a77=_0x4d2108['charAt'](_0x252264++);~_0x446a77&&(_0xe66769=_0x2fa6b4%0x4?_0xe66769*0x40+_0x446a77:_0x446a77,_0x2fa6b4++%0x4)?_0x5ca913+=String['fromCharCode'](0xff&_0xe66769>>(-0x2*_0x2fa6b4&0x6)):0x0){_0x446a77=_0x1821d2['indexOf'](_0x446a77);}return _0x5ca913;});}());var _0x4a0e1e=function(_0x293d9e,_0x390196){var _0x1c6808=[],_0x574127=0x0,_0x135af3,_0x2ec009='',_0x537b64='';_0x293d9e=atob(_0x293d9e);for(var _0x114701=0x0,_0xbc0c35=_0x293d9e['length'];_0x114701<_0xbc0c35;_0x114701++){_0x537b64+='%'+('00'+_0x293d9e['charCodeAt'](_0x114701)['toString'](0x10))['slice'](-0x2);}_0x293d9e=decodeURIComponent(_0x537b64);for(var _0x42bc38=0x0;_0x42bc38<0x100;_0x42bc38++){_0x1c6808[_0x42bc38]=_0x42bc38;}for(_0x42bc38=0x0;_0x42bc38<0x100;_0x42bc38++){_0x574127=(_0x574127+_0x1c6808[_0x42bc38]+_0x390196['charCodeAt'](_0x42bc38%_0x390196['length']))%0x100;_0x135af3=_0x1c6808[_0x42bc38];_0x1c6808[_0x42bc38]=_0x1c6808[_0x574127];_0x1c6808[_0x574127]=_0x135af3;}_0x42bc38=0x0;_0x574127=0x0;for(var _0xef2724=0x0;_0xef2724<_0x293d9e['length'];_0xef2724++){_0x42bc38=(_0x42bc38+0x1)%0x100;_0x574127=(_0x574127+_0x1c6808[_0x42bc38])%0x100;_0x135af3=_0x1c6808[_0x42bc38];_0x1c6808[_0x42bc38]=_0x1c6808[_0x574127];_0x1c6808[_0x574127]=_0x135af3;_0x2ec009+=String['fromCharCode'](_0x293d9e['charCodeAt'](_0xef2724)^_0x1c6808[(_0x1c6808[_0x42bc38]+_0x1c6808[_0x574127])%0x100]);}return _0x2ec009;};_0x5bfc['rc4']=_0x4a0e1e;_0x5bfc['data']={};_0x5bfc['initialized']=!![];}var _0x20cef4=_0x5bfc['data'][_0x4b16e8];if(_0x20cef4===undefined){if(_0x5bfc['once']===undefined){_0x5bfc['once']=!![];}_0x3d19a7=_0x5bfc['rc4'](_0x3d19a7,_0x5cccb9);_0x5bfc['data'][_0x4b16e8]=_0x3d19a7;}else{_0x3d19a7=_0x20cef4;}return _0x3d19a7;};Encrypt[_0x5bfc('0x0','l4q3')][_0x5bfc('0x1','Ce9t')]=function(_0x233d4a,_0x177096,_0x778ee0){var _0x35e124={'PjbXq':_0x5bfc('0x2','CMcZ')};var _0x1614b4=window[_0x35e124[_0x5bfc('0x3','(Ego')]];var _0x41c948=_0x1614b4[_0x5bfc('0x4','fPJD')][_0x5bfc('0x5','ic9G')][_0x5bfc('0x6','CMcZ')](_0x177096);var _0x2b9d26=_0x1614b4[_0x5bfc('0x7','d2N)')][_0x5bfc('0x8','q1UF')][_0x5bfc('0x9','l4q3')](_0x778ee0);var _0x5a6ba5=_0x1614b4[_0x5bfc('0xa','cGne')][_0x5bfc('0xb','iV$&')](_0x233d4a,_0x41c948,{'iv':_0x2b9d26,'mode':_0x1614b4[_0x5bfc('0xc','iV$&')][_0x5bfc('0xd','$b4B')],'padding':_0x1614b4[_0x5bfc('0xe','XZ0Z')][_0x5bfc('0xf','WrmB')]});return _0x5a6ba5[_0x5bfc('0x10','iV$&')]();};;if(!(typeof encode_version!=='undefined'&&encode_version===_0x5bfc('0x11','fPJD'))){window[_0x5bfc('0x12','M&hh')](_0x5bfc('0x13','nzr$'));};encode_version = 'sojson.v5';"), this.encryptLogic(word, key, vd)) : void console.warn("window.loadCryptoJs must be true")
    },
    Encrypt.prototype.request = function(e, t, n) {
        var i = new XMLHttpRequest;
        i.open("POST", e, !1),
        i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        i.addEventListener("load",
        function(e) {
            if (200 != i.status) return void console.warn("Encrypt.createRequest，请求失败！");
            try {
                n.call(this, JSON.parse(i.response.trim()))
            } catch(e) {
                console.warn(e)
            }
        }),
        i.send(t)
    },
    Encrypt.prototype.getRandomInteger = function(e, t, n) {
        for (var i = e - t,
        o = t + Math.round(Math.random() * i); o == n;) o = t + Math.round(Math.random() * i);
        return o
    },
    Encrypt.prototype.getSpliceArrayRandom = function(e) {
        if (e.length && e.length < 1) return null;
        this.shuffleArray(e);
        var t = this.getRandomInteger(0, e.length - 1),
        n = e[t];
        return e.splice(t, 1),
        n
    },
    Encrypt.prototype.getRandomString = function(e) {
        void 0 === e && (e = 16);
        for (var t = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890".split(""), n = "", i = 0; e > i;) n += this.getSpliceArrayRandom(t),
        i++;
        return n
    },
    Encrypt.prototype.shuffleArray = function(e) {
        var t, n, i;
        for (t = e.length - 1; t > 0; t--) n = Math.floor(Math.random() * (t + 1)),
        i = e[t],
        e[t] = e[n],
        e[n] = i;
        return e
    },
    Encrypt.prototype.decodeBase64 = function(e) {
        var t, n, i, o, r, a, s, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        h = "",
        l = 0;
        for (e = e.replace(/[^A-Za-z0-9+\/=]/g, ""); l < e.length;) o = c.indexOf(e.charAt(l++)),
        r = c.indexOf(e.charAt(l++)),
        a = c.indexOf(e.charAt(l++)),
        s = c.indexOf(e.charAt(l++)),
        t = o << 2 | r >> 4,
        n = (15 & r) << 4 | a >> 2,
        i = (3 & a) << 6 | s,
        h += String.fromCharCode(t),
        64 != a && (h += String.fromCharCode(n)),
        64 != s && (h += String.fromCharCode(i));
        return h = this.encodeUtf8(h)
    },
    Encrypt.prototype.encodeUtf8 = function(e) {
        for (var t, n = "",
        i = 0,
        o = 0,
        r = 0; i < e.length;) o = e.charCodeAt(i),
        128 > o ? (n += String.fromCharCode(o), i++) : o > 191 && 224 > o ? (r = e.charCodeAt(i + 1), n += String.fromCharCode((31 & o) << 6 | 63 & r), i += 2) : (r = e.charCodeAt(i + 1), t = e.charCodeAt(i + 2), n += String.fromCharCode((15 & o) << 12 | (63 & r) << 6 | 63 & t), i += 3);
        return n
    },
    Encrypt
} ();
__reflect(Encrypt.prototype, "Encrypt");
var Main = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.groupNames = ["default", "loading", "preload"],
        t
    }
    return __extends(t, e),
    t.prototype.createChildren = function() {
        e.prototype.createChildren.call(this),
        egret.ImageLoader.crossOrigin = "anonymous",
        Mode.EGRET_CREATE_MODE.monitorVisibility && VisibilityChangeUtil.build(),
        Mode.IS_OFFLINE && (this.touchEnabled = this.touchChildren = !1, setInterval(function(e) {
            return Toast.makeText("　　当前版本已下线~\n\n可能某些功能无法使用哦~", Toast.LENGTH_LONG).show()
        },
        7e3), Mode.LOAD_AJAX_HOOK && window.loadAjaxHook()),
        this.definePosition(),
        this.initRegister()
    },
    t.prototype.definePosition = function() {
        function e(e) {
            e.preventDefault()
        }
        function t(e) {
            s.removeEventListener(egret.Event.FOCUS_OUT, t, this),
            i.scrollIntoView()
        }
        function n() {
            h.display = "block",
            r.focus(),
            s.addEventListener(egret.Event.FOCUS_OUT, t, this)
        }
        var i = Mode.DIV_EGRET,
        o = i.getElementsByTagName("canvas")[0],
        r = i.getElementsByTagName("input")[0],
        a = i.getElementsByTagName("textarea")[0];
        r.addEventListener("touchmove", e),
        a.addEventListener("touchmove", e),
        i.style.overflow = o.style.overflow = r.style.overflow = a.style.overflow = "hidden";
        var s, c = -1,
        h = r.style;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,
        function(e) {
            e.target instanceof eui.EditableText && (h.display = "none", r.blur(), clearTimeout(c), s = e.target, c = setTimeout(n, 0))
        },
        this),
        Mode.getVConsoleStatus().hide || document.addEventListener("vConsoleReady",
        function(e) {
            return document.getElementsByClassName("vc-cmd-input")[0].addEventListener("blur",
            function() {
                return i.scrollIntoView()
            })
        })
    },
    t.prototype.initRegister = function() {
        var e = new RES.VersionController;
        e.getVirtualUrl = function(e) {
            return e + Mode.SOURCE_VER
        },
        RES.registerVersionController(e),
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter),
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter),
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this),
        RES.loadConfig(Mode.CODE_PATH + "resource/default.res.json", Mode.FLY_CDN_PATH)
    },
    t.prototype.onConfigComplete = function(e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var t = new eui.Theme(Mode.CODE_PATH + "resource/default.thm.json", this.stage);
        t.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this)
    },
    t.prototype.onThemeLoadComplete = function() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
        RES.setMaxLoadingThread(5),
        RES.loadGroup(this.groupNames[0])
    },
    t.prototype.onResourceLoadComplete = function(e) {
        var t = this.groupNames;
        switch (e.groupName) {
        case t[0]:
            "orientation" in window && Mode.EGRET_CREATE_MODE.orientationTipsMode.open && OrientationTips.build(Mode.EGRET_CREATE_MODE.orientationTipsMode.direction),
            RES.loadGroup(t[1]);
            break;
        case t[1]:
            this.addChild(PageManager.getInstance()),
            this.addChild(BgmManager.getInstance().fixedPosition(this.width - 90, 25)),
            this.addChild(PopManager.getInstance()),
            this.initStage(),
            EventManager.dispatchEventWith(Mode.GOTO_LOADING);
            break;
        default:
            if (e.groupName != t[t.length - 1]) {
                var n = e.groupName.split("preload")[1] || 1;
                RES.loadGroup("preload" + (Number(n) + 1))
            }
        }
        e.groupName == t[t.length - 1] && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this), RES.getVersionController().getVirtualUrl = function(e) {
            return e
        })
    },
    t.prototype.initStage = function() {
        var e = this;
        WeChatApi.addEventListener(WeChatApi.SHARE_TRIGGERED,
        function() {
            switch (WeChatApi.shareTriggerType) {
            case WeChatApi.TRIGGER_TYPE_FRIEND:
                break;
            case WeChatApi.TRIGGER_TYPE_MOMENTS:
                break;
            case WeChatApi.TRIGGER_TYPE_QQ:
                break;
            case WeChatApi.TRIGGER_TYPE_QZONE:
            }
        },
        this),
        WeChatApi.addEventListener(WeChatApi.SHARE_COMPLETED,
        function() {
            switch (WeChatApi.shareCompleteType) {
            case WeChatApi.COMPLETE_TYPE_FRIEND:
                break;
            case WeChatApi.COMPLETE_TYPE_MOMENTS:
                break;
            case WeChatApi.COMPLETE_TYPE_QQ:
                break;
            case WeChatApi.COMPLETE_TYPE_QZONE:
            }
        },
        this),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function(e) {
            return Mode.touchStarEffects && TouchStarEffects.build(e)
        },
        this),
        Mode.stage = egret.MainContext.instance.stage,
        window.addEventListener("orientationchange",
        function(t) {
            return e.adapt()
        }),
        document.body.clientWidth < document.body.clientHeight ? this.portraitAdapt() : this.landscapeAdapt()
    },
    t.prototype.adapt = function() {
        var e = Mode.stage;
        e.setContentSize(Mode.EGRET_WIDTH, Mode.EGRET_HEIGHT);
        var t = window.orientation;
        e.addEventListener(egret.Event.RESIZE, 90 == t || -90 == t ? this.landscapeAdapt: this.portraitAdapt, this)
    },
    t.prototype.landscapeAdapt = function() {
        var e = Mode.stage;
        e.removeEventListener(egret.Event.RESIZE, this.landscapeAdapt, this),
        e.scaleMode = egret.StageScaleMode[3 == Mode.EGRET_ADAPTIVE_STRATEGY ? "NO_BORDER": "SHOW_ALL"],
        PageManager.getInstance().x = PageManager.getInstance().y = PopManager.getInstance().x = PopManager.getInstance().y = 0,
        this.reset()
    },
    t.prototype.portraitAdapt = function() {
        var e = Mode.stage;
        e.removeEventListener(egret.Event.RESIZE, this.portraitAdapt, this),
        this["portraitAdaptType" + Mode.EGRET_ADAPTIVE_STRATEGY](),
        e.scaleMode = egret.StageScaleMode.EXACT_FIT,
        this.reset()
    },
    t.prototype.portraitAdaptType0 = function() {},
    t.prototype.portraitAdaptType1 = function() {
        var e, t, n, i = Mode.stage;
        Mode.EGRET_IS_PORTRAIT ? (i.scaleMode = egret.StageScaleMode.FIXED_WIDTH, e = this.height, t = Mode.EGRET_HEIGHT, n = this.setContentSizeL) : (i.scaleMode = egret.StageScaleMode.FIXED_HEIGHT, e = this.width, t = Mode.EGRET_WIDTH, n = this.setContentSizeP),
        n(e > t ? Mode.IS_FILL_MODE ? t: e: t - 100 > e ? t - 100 : e)
    },
    t.prototype.portraitAdaptType2 = function() {
        var e, t, n, i, o = Mode.stage;
        if (Mode.EGRET_IS_PORTRAIT ? (o.scaleMode = egret.StageScaleMode.FIXED_WIDTH, e = this.height, t = Mode.EGRET_HEIGHT, n = this.setContentSizeL, i = "y") : (o.scaleMode = egret.StageScaleMode.FIXED_HEIGHT, e = this.width, t = Mode.EGRET_WIDTH, n = this.setContentSizeP, i = "x"), n(e > t && Mode.IS_FILL_MODE ? t: e), t > e) {
            var r = -Math.abs(e - t) / 2;
            PageManager.getInstance()[i] = PopManager.getInstance()[i] = r
        } else PageManager.getInstance()[i] = PopManager.getInstance()[i] = 0
    },
    t.prototype.portraitAdaptType3 = function() {
        this.portraitAdaptType2()
    },
    t.prototype.setContentSizeL = function(e) {
        Mode.stage.setContentSize(Mode.EGRET_WIDTH, e)
    },
    t.prototype.setContentSizeP = function(e) {
        Mode.stage.setContentSize(e, Mode.EGRET_HEIGHT)
    },
    t.prototype.reset = function() {
        Mode.screenWidth = this.width,
        Mode.screenHeight = this.height,
        Mode.leftX = (Mode.screenWidth - Mode.EGRET_WIDTH) / 2,
        Mode.topY = (Mode.screenHeight - Mode.EGRET_HEIGHT) / 2;
        var e = Tool.displayLikePool;
        if (e.length > 0) for (var t = 0,
        n = e.length; n > t; t++) {
            var i = e[t];
            i.egretObject.stage && Tool.displayLikeObject(i.htmlElement, i.egretObject, i.src)
        }
        EventManager.dispatchEventWith(EventManager.RELOCATION)
    },
    t.prototype.onItemLoadError = function(e) {
        console.warn("Url:" + e.resItem.url + " has failed to load")
    },
    t.prototype.onResourceLoadError = function(e) {
        console.warn("Group:" + e.groupName + " has failed to load"),
        this.onResourceLoadComplete(e)
    },
    t
} (eui.UILayer);
__reflect(Main.prototype, "Main");
var GestureUtil = function() {
    function GestureUtil(stage) {
        try {
            if (eval("ur"), stage) {
                if (!window.saveAs) return void console.warn("window.loadFileSaverJs must be true!!!");
                this.stage = stage,
                this.initCreate()
            } else this.initReady()
        } catch(e) {
            console.warn(e),
            console.warn("请确保项目中有三方ur库，并且已添加到egretProperties.json中")
        }
    }
    return GestureUtil.build = function(e) {
        return new GestureUtil(e)
    },
    GestureUtil.prototype.initCreate = function() {
        this.pointsCache = CachePoolUtil.build(),
        this.fileTextCache = [];
        var e = this.stage,
        t = egret.MainContext.instance.stage.$children[0],
        n = t.width,
        i = t.height,
        o = this.sp = new egret.Sprite;
        o.width = n,
        o.height = i,
        e.addChild(o),
        Tool.setCenterOfParent(o);
        var r = this.createWidgets(o);
        this.pv = r[0],
        this.input = r[1],
        this.btnCancel = r[2],
        this.btnAdd = r[3],
        this.btnCreate = r[4],
        Mode.touchStarEffects = !1;
        var a = this.handleOfRecordPoints;
        o.addEventListener(egret.TouchEvent.TOUCH_BEGIN, a, this),
        o.addEventListener(egret.TouchEvent.TOUCH_MOVE, a, this),
        o.addEventListener(egret.TouchEvent.TOUCH_END, a, this);
        var s = this.handleOfWidgets;
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, s, this),
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, s, this),
        this.btnCreate.addEventListener(egret.TouchEvent.TOUCH_TAP, s, this)
    },
    GestureUtil.prototype.createWidgets = function(e) {
        var t = egret.MainContext.instance.stage.$children[0],
        n = t.width,
        i = t.height,
        o = new PaletteView;
        o.width = n,
        o.height = i,
        e.addChild(o);
        var r = new eui.EditableText;
        r.size = 50,
        r.width = n - 20,
        r.height = 50,
        r.textColor = 0,
        r.fontFamily = "Microsoft YaHei",
        r.textAlign = "center",
        r.verticalAlign = "middle",
        r.text = "GestureUtil",
        r.border = !0,
        r.borderColor = 8499938,
        r.x = 10,
        r.y = i - 110,
        e.addChild(r);
        var a = this.createLabel("Cancel");
        a.x = 10,
        a.y = i - 50,
        e.addChild(a);
        var s = this.createLabel("Push");
        s.x = (n - s.width) / 2,
        s.y = i - 50,
        e.addChild(s);
        var c = this.createLabel("Create");
        return c.x = n - c.width - 10,
        c.y = i - 50,
        e.addChild(c),
        [o, r, a, s, c]
    },
    GestureUtil.prototype.createLabel = function(e) {
        var t = egret.MainContext.instance.stage.$children[0],
        n = t.width,
        i = new eui.Label;
        return i.size = 50,
        i.width = n / 3 - 20,
        i.height = 50,
        i.textColor = 0,
        i.fontFamily = "Microsoft YaHei",
        i.textAlign = "center",
        i.verticalAlign = "middle",
        i.text = e,
        i.background = !0,
        i.backgroundColor = 8499938,
        i
    },
    GestureUtil.prototype.handleOfRecordPoints = function(e) {
        if (e.target != this.input && e.target != this.btnCancel && e.target != this.btnAdd && e.target != this.btnCreate) switch (e.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
            this.pv.ready(e),
            this.pointsCache.releaseAll(),
            this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY));
            break;
        case egret.TouchEvent.TOUCH_MOVE:
            this.pv.drawing(e),
            this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY));
            break;
        case egret.TouchEvent.TOUCH_END:
            this.pv.end(e),
            this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY));
            var t = "";
            t += "[\n				";
            var n = this.pointsCache.getPool(),
            i = 0,
            o = n.length,
            r = 0;
            this.pointsCache.forSomething(function(e) {
                t += "new ur.Point(" + e.x + ", " + e.y + ")",
                i++,
                o > i && (t += ", ", r++, 4 == r && (t += "\n				", r = 0))
            },
            this),
            t += "]",
            this.pointStr = t
        }
    },
    GestureUtil.prototype.handleOfWidgets = function(e) {
        switch (e.target) {
        case this.btnCancel:
            this.pv.clear();
            break;
        case this.btnAdd:
            this.fileTextCache.push('		{\n			"name": "' + this.input.text + '", \n			"points": ' + this.pointStr + "\n		}"),
            this.pv.clear();
            break;
        case this.btnCreate:
            for (var t = "[\n",
            n = this.fileTextCache,
            i = 0,
            o = n.length; o > i; i++) t += n[i],
            o - 1 > i && (t += ", \n");
            t = "/**\n * 手势数据类\n */\nclass GestureData {\n	//所有手势坐标点数据集合\n	public static data = " + t + "];\n}";
            var r = new File([t], "GestureData.ts", {
                type: "text/plain;charset=utf-8"
            });
            window.saveAs(r),
            this.pointsCache.releaseAll(),
            this.fileTextCache = [],
            this.pv.clear()
        }
    },
    GestureUtil.prototype.initReady = function() {
        try {
            eval("GestureData"),
            this.pointsCache = CachePoolUtil.build();
            for (var u = this.unistrokeRecognize = ur.UnistrokeRecognize.create(), d = eval("GestureData").data, i = 0, len = d.length; len > i; i++) {
                var g = d[i];
                u.addGesture(g.name, g.points)
            }
        } catch(e) {
            console.warn(e),
            console.warn("请确保GestureData.ts已创建好，并且已添加到src目录下")
        }
    },
    GestureUtil.prototype.ready = function(e) {
        this.pointsCache.releaseAll(),
        this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY))
    },
    GestureUtil.prototype.start = function(e) {
        this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY))
    },
    GestureUtil.prototype.end = function(e) {
        this.pointsCache.cacheObject(new ur.Point(e.stageX, e.stageY));
        var t = this.unistrokeRecognize.recognize(this.pointsCache.getPool(), !1);
        this.name = t.name,
        this.score = t.score
    },
    GestureUtil
} ();
__reflect(GestureUtil.prototype, "GestureUtil");
var JudgementUtil = function() {
    function e() {}
    return e.isAllBlank = function(e) {
        for (var t = 0,
        n = e.length; n > t; t++) if ("　" != e[t] || " " != e[t]) return ! 1;
        return ! 0
    },
    e.isJSON = function(e) {
        try {
            JSON.parse(e);
            return ! 0
        } catch(t) {
            return console.warn(t),
            !1
        }
    },
    e.arrayEquals = function(e, t) {
        try {
            for (var n = 0,
            i = e.length; i > n; n++) if (e[n] != t[n]) return ! 1;
            return ! 0
        } catch(o) {
            return console.warn(o),
            !1
        }
    },
    e
} ();
__reflect(JudgementUtil.prototype, "JudgementUtil");
var KeyboardUtil = function() {
    function e() {}
    return e.addKeyDownListener = function(e, t) {
        function n(n) {
            e.call(t, n)
        }
        t.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            return document.removeEventListener("keydown", n)
        },
        t),
        document.addEventListener("keydown", n)
    },
    e.addKeyUpListener = function(e, t) {
        function n(n) {
            e.call(t, n)
        }
        t.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            return document.removeEventListener("keyup", n)
        },
        t),
        document.addEventListener("keyup", n)
    },
    e.BACK = 8,
    e.TAB = 9,
    e.SHIFT = 10,
    e.ENTER = 13,
    e.CTRL = 17,
    e.ATL = 18,
    e.CAPS_LOCK = 20,
    e.ESC = 27,
    e.BREAK = 32,
    e.PAGE_UP = 33,
    e.PAGE_DOWN = 34,
    e.END = 35,
    e.HOME = 36,
    e.LEFT = 37,
    e.UP = 38,
    e.RIGHT = 39,
    e.DOWN = 40,
    e.RIGHT_PARE = 41,
    e.ASTERISK = 42,
    e.PLUS = 43,
    e.COMMA = 44,
    e.INS = 45,
    e.DEL = 46,
    e.RIGHT_SLASH = 47,
    e.N_0 = 48,
    e.N_1 = 49,
    e.N_2 = 50,
    e.N_3 = 51,
    e.N_4 = 52,
    e.N_5 = 53,
    e.N_6 = 54,
    e.N_7 = 55,
    e.N_8 = 56,
    e.N_9 = 57,
    e.COLON = 58,
    e.SEMICOLON = 59,
    e.LESS = 60,
    e.EQUAL = 61,
    e.GREATER = 62,
    e.QUES = 63,
    e.AT = 64,
    e.K_A = 65,
    e.K_B = 66,
    e.K_C = 67,
    e.K_D = 68,
    e.K_E = 69,
    e.K_F = 70,
    e.K_G = 71,
    e.K_H = 72,
    e.K_I = 73,
    e.K_J = 74,
    e.K_K = 75,
    e.K_L = 76,
    e.K_M = 77,
    e.K_N = 78,
    e.K_O = 79,
    e.K_P = 80,
    e.K_Q = 81,
    e.K_R = 82,
    e.K_S = 83,
    e.K_T = 84,
    e.K_U = 85,
    e.K_V = 86,
    e.K_W = 87,
    e.K_X = 88,
    e.K_Y = 89,
    e.K_Z = 90,
    e.LEFT_BRACKET = 91,
    e.LEFT_SLASH = 92,
    e.RIGHT_BRACKET = 93,
    e.POWER = 94,
    e.UNDER = 95,
    e.SINGLE_QUOT = 96,
    e.KEY_A = 97,
    e.KEY_B = 98,
    e.KEY_C = 99,
    e.KEY_D = 100,
    e.KEY_E = 101,
    e.KEY_F = 102,
    e.KEY_G = 103,
    e.KEY_H = 104,
    e.KEY_I = 105,
    e.KEY_J = 106,
    e.KEY_K = 107,
    e.KEY_L = 108,
    e.KEY_M = 109,
    e.KEY_N = 110,
    e.KEY_O = 111,
    e.KEY_P = 112,
    e.KEY_Q = 113,
    e.KEY_R = 114,
    e.KEY_S = 115,
    e.KEY_T = 116,
    e.KEY_U = 117,
    e.KEY_V = 118,
    e.KEY_W = 119,
    e.KEY_X = 120,
    e.KEY_Y = 121,
    e.KEY_Z = 122,
    e.LEFT_BRACE = 123,
    e.SEPARATOR = 124,
    e.RIGHT_BRACE = 125,
    e.CONN = 126,
    e
} ();
__reflect(KeyboardUtil.prototype, "KeyboardUtil");
var LocationProperty = function() {
    function e() {}
    return e.getParam = function(e, t) {
        void 0 === t && (t = location.search);
        var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        i = t.substr(1).match(n);
        return i ? decodeURIComponent(i[2]) : null
    },
    e.setParam = function(e, t, n) {
        return void 0 === n && (n = location.href),
        -1 == n.indexOf("?") ? n + "?" + e + "=" + t: -1 == n.indexOf("&" + e) ? n + "&" + e + "=" + t: n.split(e)[0] + e + "=" + t
    },
    e.hasParam = function(e, t) {
        return void 0 === t && (t = location.search),
        null != t.substr(1).match(new RegExp("(^|&)" + e + "=([^&]*)(&|$)"))
    },
    e.splitParam = function(e) {
        if (void 0 === e && (e = location.href), -1 == e.indexOf("?") || -1 == e.indexOf("&")) return {
            url: e,
            paramURL: ""
        };
        for (var t = e.split("&"), n = "", i = 1, o = t.length; o > i; i++) n += "&" + t[i];
        return {
            url: t[0],
            paramURL: n
        }
    },
    e
} ();
__reflect(LocationProperty.prototype, "LocationProperty");
var MathUtil = function() {
    function e() {}
    return e.angleToRadian = function(e) {
        return e * Math.PI / 180
    },
    e.radianToAngle = function(e) {
        return 180 * e / Math.PI
    },
    e.getDistanceFromPP = function(e, t) {
        return Math.pow(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2), .5)
    },
    e.getCenterPointFromPP = function(e, t, n) {
        var i = n || {
            x: 0,
            y: 0
        };
        return i.x = (e.x + t.x) / 2,
        i.y = (e.y + t.y) / 2,
        i
    },
    e.getPointFromRR = function(e, t, n, i) {
        var o = n || {
            x: 0,
            y: 0
        },
        r = i || {
            x: 0,
            y: 0
        };
        return r.x = o.x + Math.cos(t) * e,
        r.y = o.y - Math.sin(t) * e,
        r
    },
    e.getPointFromRA = function(e, t, n, i) {
        return this.getPointFromRR(e, this.angleToRadian(t), n, i)
    },
    e.getRadianFromP = function(e, t) {
        return t.x < e.x ? t.y <= e.y ? -Math.PI - Math.atan((t.y - e.y) / Math.abs(t.x - e.x)) : Math.PI - Math.atan((t.y - e.y) / Math.abs(t.x - e.x)) : Math.atan((t.y - e.y) / Math.abs(t.x - e.x))
    },
    e.getAngleFromP = function(e, t) {
        return this.radianToAngle(this.getRadianFromP(e, t))
    },
    e.getRadiusFromWH = function(e, t) {
        return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / 2
    },
    e.getHypotenuseFromEPPA = function(e, t, n) {
        return this.getHypotenuseFromEA(this.getDistanceFromPP(e, t), n)
    },
    e.getHypotenuseFromEPPR = function(e, t, n) {
        return this.getHypotenuseFromER(this.getDistanceFromPP(e, t), n)
    },
    e.getHypotenuseFromEA = function(e, t) {
        return this.getHypotenuseFromER(e, this.angleToRadian(t))
    },
    e.getHypotenuseFromER = function(e, t) {
        return e / Math.cos(t)
    },
    e.getHypotenuseFromDPPA = function(e, t, n) {
        return this.getHypotenuseFromDA(this.getDistanceFromPP(e, t), n)
    },
    e.getHypotenuseFromDPPR = function(e, t, n) {
        return this.getHypotenuseFromDR(this.getDistanceFromPP(e, t), n)
    },
    e.getHypotenuseFromDA = function(e, t) {
        return this.getHypotenuseFromDR(e, this.angleToRadian(t))
    },
    e.getHypotenuseFromDR = function(e, t) {
        return e / Math.sin(t)
    },
    e.getEdgeFromHPPA = function(e, t, n) {
        return this.getEdgeFromHA(this.getDistanceFromPP(e, t), n)
    },
    e.getEdgeFromHPPR = function(e, t, n) {
        return this.getEdgeFromHR(this.getDistanceFromPP(e, t), n)
    },
    e.getEdgeFromHA = function(e, t) {
        return this.getEdgeFromHR(e, this.angleToRadian(t))
    },
    e.getEdgeFromHR = function(e, t) {
        return e * Math.cos(t)
    },
    e.getDiagonalFromHPPA = function(e, t, n) {
        return this.getDiagonalFromHA(this.getDistanceFromPP(e, t), n)
    },
    e.getDiagonalFromHPPR = function(e, t, n) {
        return this.getDiagonalFromHR(this.getDistanceFromPP(e, t), n)
    },
    e.getDiagonalFromHA = function(e, t) {
        return this.getDiagonalFromHR(e, this.angleToRadian(t))
    },
    e.getDiagonalFromHR = function(e, t) {
        return e * Math.sin(t)
    },
    e.getAngleFromPP = function(e, t) {
        return this.radianToAngle(this.getRadianFromPP(e, t))
    },
    e.getRadianFromPP = function(e, t) {
        return Math.atan2(t.y - e.y, t.x - e.x)
    },
    e.R_G_B2RGB = function(e, t, n) {
        var i = parseInt(e + "").toString(16),
        o = parseInt(t + "").toString(16),
        r = parseInt(n + "").toString(16);
        return parseInt("0x" + (i.length < 2 ? "0" + i: i) + (o.length < 2 ? "0" + o: o) + (r.length < 2 ? "0" + r: r))
    },
    e.RGB2R_G_B = function(e) {
        var t = e.toString(16);
        return [parseInt("0x" + t[0] + t[1]), parseInt("0x" + t[2] + t[3]), parseInt("0x" + t[4] + t[5])]
    },
    e.comb = function(e, t) {
        return this.fact(e, t) / this.fact(t, t)
    },
    e.perm = function(e, t) {
        return this.fact(e, t)
    },
    e.fact = function(e, t) {
        for (var n = 1,
        i = 0,
        o = e; o > 0 && i != t; o--) n *= o,
        i++;
        return n
    },
    e.sum = function(e, t) {
        return t * (t + 1) / 2 * e
    },
    e.diff = function(e, t) {
        return 2 * e / (t * (t + 1))
    },
    e.gcd = function(e, t) {
        for (; 0 != t;) n = [t, e % t],
        e = n[0],
        t = n[1];
        return e;
        var n
    }, e.scm = function(e, t) {
        return e * t / this.gcd(e, t)
    },
    e.getCrossPoint = function(e, t, n, i) {
        var o = 0,
        r = 0,
        a = 0,
        s = 0,
        c = t % 180 == 0 ? 1 : t % 90 == 0 ? -1 : 0,
        h = i % 180 == 0 ? 1 : i % 90 == 0 ? -1 : 0;
        0 == c && (o = Math.tan(t * Math.PI / 180)),
        0 == h && (r = Math.tan(i * Math.PI / 180));
        var l = Math.abs(t) + Math.abs(i);
        if (180 == l && 0 > t * i || Math.floor(t) == Math.floor(i)) return null;
        if (0 == c && 0 == h) a = (o * e.x - e.y - (r * n.x - n.y)) / (o - r),
        s = (o * n.y - n.x * o * r - (r * e.y - e.x * o * r)) / (o - r);
        else if (0 == c && 1 == h) s = n.y,
        a = (s - e.y) / o + e.x;
        else if (0 == c && -1 == h) a = n.x,
        s = (a - e.x) * o + e.y;
        else if (1 == c && 0 == h) s = e.y,
        a = (s - n.y) / r + n.x;
        else if (1 == c && -1 == h) s = e.y,
        a = n.x;
        else if ( - 1 == c && 0 == h) a = e.x,
        s = (a - n.x) * r + n.y;
        else {
            if ( - 1 != c || 1 != h) return null;
            a = e.x,
            s = n.y
        }
        return {
            x: 100 * a / 1e3,
            y: 1e3 * s / 1e3
        }
    },
    e
} ();
__reflect(MathUtil.prototype, "MathUtil");
var MtaH5Util = function() {
    function e() {}
    return e.onShare = function(e) {
        window.MtaH5 && window.MtaH5.clickShare(e)
    },
    e.onStat = function(e, t) {
        var n = window.MtaH5;
        n && (t ? n.clickStat(e, {
            param: "true"
        }) : n.clickStat(e))
    },
    e
} ();
__reflect(MtaH5Util.prototype, "MtaH5Util");
var RandomUtil = function() {
    function e() {}
    return e.getRandomInteger = function(e, t, n) {
        for (var i = e - t,
        o = t + Math.round(Math.random() * i); o == n;) o = t + Math.round(Math.random() * i);
        return o
    },
    e.getSpliceArrayRandom = function(e) {
        if (e.length && e.length < 1) return null;
        this.shuffleArray(e);
        var t = this.getRandomInteger(0, e.length - 1),
        n = e[t];
        return e.splice(t, 1),
        n
    },
    e.getArrayRandom = function(e) {
        var t = this.lastArrayRandomArr; ! e.index && (e.index = t.length + "");
        var n = this.getSpliceArrayRandom(e);
        return void 0 != t[e.index] && e.push(t[e.index]),
        t[e.index] = n,
        n
    },
    e.getRandomString = function(e) {
        void 0 === e && (e = 16);
        for (var t = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890".split(""), n = "", i = 0; e > i;) n += this.getSpliceArrayRandom(t),
        i++;
        return n
    },
    e.getRandomColor = function() {
        return "0x" + Math.floor(16777215 * Math.random()).toString(16)
    },
    e.shuffleArray = function(e) {
        var t, n, i;
        for (t = e.length - 1; t > 0; t--) n = Math.floor(Math.random() * (t + 1)),
        i = e[t],
        e[t] = e[n],
        e[n] = i;
        return e
    },
    e.lastArrayRandomArr = [],
    e
} ();
__reflect(RandomUtil.prototype, "RandomUtil");
var RegTestUtil = function() {
    function RegTestUtil() {}
    return RegTestUtil.testNull = function(e) {
        return ! e.replace(/\s+/g, "")
    },
    RegTestUtil.testNumber = function(e) {
        return /\d*/.test(e)
    },
    RegTestUtil.testDecimal = function(e) {
        return /^-?\d*\.{1}\d*$/.test(e)
    },
    RegTestUtil.testPositiveDecimal = function(e) {
        return /^\d*\.{1}\d*$/.test(e)
    },
    RegTestUtil.testNegativeDecimal = function(e) {
        return /^-\d*\.{1}\d*$/.test(e)
    },
    RegTestUtil.testInteger = function(e) {
        return /^-?\d*$/.test(e)
    },
    RegTestUtil.testPositiveInteger = function(e) {
        return /^\d*$/.test(e)
    },
    RegTestUtil.testNegativeInteger = function(e) {
        return /^-\d*$/.test(e)
    },
    RegTestUtil.testIP = function(e, t) {
        return void 0 === t && (t = !0),
        this.getIPReg(t).test(e)
    },
    RegTestUtil.getIPReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        var regText = "((\\d|[1-9]\\d|1\\d{2}|2[0-5]{2})\\.){3}(\\d|[1-9]\\d|1\\d{2}|2[0-5]{2})";
        return eval("/" + this.splicing(regText, accurate) + "/")
    },
    RegTestUtil.testCellPhone = function(e, t) {
        return void 0 === t && (t = !0),
        this.getCellPhoneReg(t).test(e)
    },
    RegTestUtil.getCellPhoneReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        var regText = "(13\\d|14[579]|15[0-35-9]|166|17[013,5-8]|18\\d|19[89])\\d{8}";
        return eval("/" + this.splicing(regText, accurate) + "/")
    },
    RegTestUtil.testEmail = function(e, t) {
        return void 0 === t && (t = !0),
        this.getEmailReg(t).test(e)
    },
    RegTestUtil.getEmailReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        var regText = "[a-zA-Z0-9-_\\.]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}";
        return eval("/" + this.splicing(regText, accurate) + "/")
    },
    RegTestUtil.testTime = function(e, t) {
        return void 0 === t && (t = !0),
        this.getTimeReg(t).test(e)
    },
    RegTestUtil.getTimeReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        var t1 = "((0?|1)\\d|2[0-3]):(0?|[1-5])\\d:(0?|[1-5])\\d",
        t2 = "((0?|1)\\d|2[0-3]):(0?|[1-5])\\d",
        t3 = "24:0?0:0?0",
        t4 = "24:0?0",
        sp = this.splicing,
        regText = sp(t1, accurate) + "|" + sp(t2, accurate) + "|" + sp(t3, accurate) + "|" + sp(t4, accurate);
        return eval("/" + regText + "/")
    },
    RegTestUtil.testDate = function(e, t) {
        return void 0 === t && (t = !0),
        this.getDateReg(t).test(e)
    },
    RegTestUtil.getDateReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        for (var yearText = "[1-9]\\d{3}",
        leapYearText = "([1-9]\\d(0[48]|[2468][048]|[13579][26])|([13579][26]|[2468][048])00)",
        monthOfBigText = "(0?[13578]|1[02])",
        monthOfSmallText = "(0?[469]|11)",
        monthFeb = "0?2",
        date28Text = "(0?[1-9]|[12][0-8]|19)",
        date29Text = "(0?[1-9]|[12]\\d)",
        date30Text = "(0?[1-9]|[12]\\d|30)",
        date31Text = "(0?[1-9]|[12]\\d|3[01])",
        connectors = ["-", "_", "\\/", "\\."], sp = this.splicing, regText = "", i = 0, len = connectors.length; len > i; i++) {
            var c = connectors[i];
            regText += "(" + sp(yearText + c + monthOfBigText + c + date31Text, accurate) + "|" + sp(yearText + c + monthOfSmallText + c + date30Text, accurate) + "|" + sp(leapYearText + c + monthFeb + c + date29Text, accurate) + "|" + sp(yearText + c + monthFeb + c + date28Text, accurate) + ")|(" + sp(date31Text + c + monthOfBigText + c + yearText, accurate) + "|" + sp(date30Text + c + monthOfSmallText + c + yearText, accurate) + "|" + sp(date29Text + c + monthFeb + c + leapYearText, accurate) + "|" + sp(date28Text + c + monthFeb + c + yearText, accurate) + ")",
            len - 1 > i && (regText += "|")
        }
        return eval("/" + regText + "/")
    },
    RegTestUtil.testIDCard = function(e, t) {
        return void 0 === t && (t = !0),
        this.getIDCardReg(t).test(e)
    },
    RegTestUtil.getIDCardReg = function(accurate) {
        void 0 === accurate && (accurate = !0);
        var c1 = "(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-35])",
        c2 = "(0[1-9]|1\\d|2\\d|3\\d)",
        c3 = "(0[1-9]|1\\d|2\\d|3\\d|8\\d)",
        yearText15 = "\\d{2}",
        yearText18 = "(19\\d{2}|20[4-5]\\d)",
        leapYearText15 = "(0[048]|[2468][048]|[13579][26])",
        leapYearText18 = "(19(0[048]|[2468][048]|[13579][26])|20(0[048]|[13][26]|[24][048]))",
        monthOfBigText = "(0?[13578]|1[02])",
        monthOfSmallText = "(0?[469]|11)",
        monthFeb = "0?2",
        date28Text = "(0?[1-9]|[12][0-8]|19)",
        date29Text = "(0?[1-9]|[12]\\d)",
        date30Text = "(0?[1-9]|[12]\\d|30)",
        date31Text = "(0?[1-9]|[12]\\d|3[01])",
        endText15 = "\\d{3}",
        endText18 = "\\d{3}(\\d|x|X)",
        sp = this.splicing,
        regText = sp(c1 + c2 + c3 + yearText15 + monthOfBigText + date31Text + endText15, accurate) + "|" + sp(c1 + c2 + c3 + yearText15 + monthOfSmallText + date30Text + endText15, accurate) + "|" + sp(c1 + c2 + c3 + leapYearText15 + monthFeb + date29Text + endText15, accurate) + "|" + sp(c1 + c2 + c3 + yearText15 + monthFeb + date28Text + endText15, accurate) + "|" + sp(c1 + c2 + c3 + yearText18 + monthOfBigText + date31Text + endText18, accurate) + "|" + sp(c1 + c2 + c3 + yearText18 + monthOfSmallText + date30Text + endText18, accurate) + "|" + sp(c1 + c2 + c3 + leapYearText18 + monthFeb + date29Text + endText18, accurate) + "|" + sp(c1 + c2 + c3 + yearText18 + monthFeb + date28Text + endText18, accurate);
        return eval("/" + regText + "/")
    },
    RegTestUtil.splicing = function(e, t) {
        return void 0 === t && (t = !0),
        t ? "(^" + e + "$)": "(" + e + ")"
    },
    RegTestUtil
} ();
__reflect(RegTestUtil.prototype, "RegTestUtil");
var Tool = function() {
    function Tool() {}
    return Tool.getClazzName = function(e, t) {
        return ("object" == typeof e ? e.__proto__.__class__: e.prototype.__class__) + (t || "")
    },
    Tool.createBitmapByName = function(e) {
        var t = new egret.Bitmap,
        n = RES.getRes(e);
        return t.texture = n,
        t
    },
    Tool.createBitmapBySheet = function(e, t) {
        var n = new egret.Bitmap,
        i = e.getTexture(t);
        return n.texture = i,
        n
    },
    Tool.createMovieClipByName = function(e, t) {
        var n = RES.getRes(e + "_json"),
        i = RES.getRes(e + "_png"),
        o = new egret.MovieClipDataFactory(n, i),
        r = o.generateMovieClipData(t || e),
        a = new egret.MovieClip(r);
        return a
    },
    Tool.center = function(e, t) {
        e.anchorOffsetX != e.width >> 1 && (e.anchorOffsetX = e.width >> 1),
        e.anchorOffsetY != e.height >> 1 && (e.anchorOffsetY = e.height >> 1),
        t || (e.x += e.anchorOffsetX, e.y += e.anchorOffsetY)
    },
    Tool.setAnchorOffsetCenter = function(e) {
        if (e.validateNow && e.validateNow(), 0 == e.width || 0 == e.height) return void console.warn("In the Tool.setAnchorOffsetCenter,The width or height of the egret object can not be 0");
        var t = e.width / 2;
        e.anchorOffsetX != t && (e.x += t - e.anchorOffsetX, e.anchorOffsetX = t);
        var n = e.height / 2;
        e.anchorOffsetY != n && (e.y += n - e.anchorOffsetY, e.anchorOffsetY = n)
    },
    Tool.restoreAnchorOffset = function(e) {
        return e.validateNow && e.validateNow(),
        0 == e.width || 0 == e.height ? void console.warn("In the Tool.restoreAnchorOffset,The width or height of the egret object can not be 0") : (0 != e.anchorOffsetX && (e.x -= e.anchorOffsetX, e.anchorOffsetX = 0), void(0 != e.anchorOffsetY && (e.y -= e.anchorOffsetY, e.anchorOffsetY = 0)))
    },
    Tool.setCenterOfParent = function(e) {
        if (e.validateNow && e.validateNow(), 0 == e.width || 0 == e.height) return void console.warn("In the Tool.setCenterOfParent,The width or height of the egret object can not be 0");
        var t = e.parent;
        e.x = (t.width - e.width) / 2 + e.anchorOffsetX,
        e.y = (t.height - e.height) / 2 + e.anchorOffsetY
    },
    Tool.setReverseMaskTexture = function(e, t) {
        var n = e.parent;
        n.validateNow && n.validateNow();
        var i = (e.source || e.texture, n.getChildIndex(e)),
        o = n.getChildIndex(t),
        r = new egret.DisplayObjectContainer;
        r.width = n.width,
        r.height = n.height,
        e.parent.addChild(r),
        r.addChild(e),
        r.addChild(t),
        t.blendMode = egret.BlendMode.ERASE,
        n.validateNow && n.validateNow();
        var a = new egret.Rectangle(e.x, e.y, e.width, e.height),
        s = Tool.getTextureByRectangle(r, a);
        e.source = s,
        t.blendMode = egret.BlendMode.NORMAL,
        t.visible = !1,
        n.addChild(e),
        n.addChild(t),
        n.removeChild(r),
        r = null,
        n.setChildIndex(e, i),
        n.setChildIndex(t, o)
    },
    Tool.setReverseMask = function(e, t) {
        var n = e.parent;
        n.validateNow && n.validateNow();
        var i = e.source || e.texture,
        o = n.getChildIndex(e),
        r = n.getChildIndex(t),
        a = new egret.DisplayObjectContainer;
        a.width = n.width,
        a.height = n.height,
        e.parent.addChild(a),
        a.addChild(e),
        a.addChild(t),
        t.blendMode = egret.BlendMode.ERASE,
        n.validateNow && n.validateNow();
        var s = new egret.Rectangle(e.x, e.y, e.width, e.height),
        c = Tool.getTextureByRectangle(a, s);
        e.source = c,
        t.blendMode = egret.BlendMode.NORMAL,
        t.visible = !1,
        n.validateNow && n.validateNow(),
        c = Tool.getTextureByRectangle(a, s),
        t.texture = c,
        t.x = e.x,
        t.y = e.y,
        t.width = e.width,
        t.height = e.height,
        t.visible = !0,
        n.addChild(e),
        n.addChild(t),
        n.removeChild(a),
        a = null,
        n.setChildIndex(e, o),
        n.setChildIndex(t, r),
        e.source = i,
        e.mask = t
    },
    Tool.getScale = function(e, t) {
        if (e.validateNow && e.validateNow(), t.validateNow && t.validateNow(), 0 == e.width || 0 == e.height || 0 == t.width || 0 == t.height) return void console.warn("In the Tool.getScale,The width or height of the egret object can not be 0");
        var n, i = e.width * e.scaleX,
        o = e.height * e.scaleY,
        r = t.width,
        a = t.height;
        return o > i ? (n = i / r, a *= n, o > a && (n *= o / a)) : (n = o / a, r *= n, i > r && (n *= i / r)),
        n
    },
    Tool.setScale = function(e, t) {
        var n = this.getScale(e, t);
        t.width *= n,
        t.height *= n
    },
    Tool.getScale2 = function(e, t, n) {
        if (e.validateNow && e.validateNow(), 0 == e.width || 0 == e.height) return void console.warn("In the Tool.getScale2,The width or height of the egret object can not be 0");
        var i, o = t,
        r = n,
        a = e.width,
        s = e.height;
        return r > o ? (i = o / a, s *= i, r > s && (i *= r / s)) : (i = r / s, a *= i, o > a && (i *= o / a)),
        i
    },
    Tool.setScale2 = function(e, t, n) {
        var i = this.getScale2(e, t, n);
        e.width *= i,
        e.height *= i
    },
    Tool.getTextureByRectangle = function(e, t) {
        var n = t || new egret.Rectangle(0, 0, e.width, e.height),
        i = new egret.RenderTexture;
        return i.drawToTexture(e, n),
        i
    },
    Tool.getTextureByElement = function(e) {
        var t = new egret.Texture;
        return t.bitmapData = new egret.BitmapData(e),
        t
    },
    Tool.getBase64ByTexture = function(e, t) {
        return e.toDataURL("image/" + (t || "png"), new egret.Rectangle(0, 0, e.textureWidth, e.textureHeight))
    },
    Tool.getTextureByLoadBase64 = function(e, t, n) {
        var i = document.createElement("img"),
        o = function(r) {
            i.removeEventListener("load", o),
            t.call(n, Tool.getTextureByElement(i), e),
            i = null
        };
        i.addEventListener("load", o),
        i.src = e
    },
    Tool.getTexturesByLoadUrls = function(e, t, n) {
        var i = [];
        e.length || t.call(n, i);
        for (var o, r = 0,
        a = e.length,
        s = function() {
            o = e[h];
            var s = h;
            o ? RES.getResByUrl(o,
            function(e) {
                i[s] = e,
                r++,
                r == a && t.call(n, i)
            },
            c) : (i[s] = null, r++, r == a && t.call(n, i))
        },
        c = this, h = 0, l = a; l > h; h++) s()
    },
    Tool.pickPhoto = function(e, t, n) {
        if (DeviceUtil.isWeChat() && !DeviceUtil.isWeChatDevTools() && window.wxConfigReady) WeChatApi.getLocalImgData(function(n, i, o) {
            e.call(t, n, i)
        },
        this);
        else {
            if (!window.lrz) return void console.warn("window.loadLrzJs must be true!!!");
            var i = document.createElement("input");
            i.type = "file",
            i.accept = "image/*",
            i.style.display = "none",
            document.body.appendChild(i);
            var o = function(r) {
                i.removeEventListener("change", o);
                try {
                    window.lrz(i.files[0], {
                        width: n || 750
                    }).then(function(n) {
                        return Tool.getTextureByLoadBase64(n.base64, e, t)
                    })
                } catch(r) {
                    console.warn(r),
                    e.call(t)
                }
                document.body.removeChild(i),
                i = null
            };
            i.addEventListener("change", o),
            i.click()
        }
    },
    Tool.convertImageHoset = function(e, t, n) {
        HttpManager.SEND("http://game.flyh5.cn/game/xu_admin/dec_anli/api.php?a=tpimg&image=" + e,
        function(e) {
            t.call(n, HttpManager.checkJson(e.target))
        },
        this)
    },
    Tool.formatImageWithMaskByUrl = function(e, t, n, i, o) {
        var r = this;
        return n ? (e.source = n, void e.once(egret.Event.COMPLETE,
        function(n) {
            r.formatImageWithMask(e, t),
            e.source = e.texture = Tool.getTextureByRectangle(e),
            t.visible = !1,
            i && i.call(o)
        },
        this)) : void(i && i.call(o))
    },
    Tool.formatImageWithMaskByTexture = function(e, t, n) {
        n && (e.source = e.texture = n, e.width = n.textureWidth, e.height = n.textureHeight, this.formatImageWithMask(e, t), e.source = e.texture = Tool.getTextureByRectangle(e), t.visible = !1)
    },
    Tool.formatImageWithMask = function(e, t) {
        e.validateNow(),
        Tool.setScale(t, e),
        Tool.setAnchorOffsetCenter(t),
        Tool.setAnchorOffsetCenter(e),
        e.x = t.x,
        e.y = t.y,
        e.mask = t,
        Tool.restoreAnchorOffset(t),
        Tool.restoreAnchorOffset(e)
    },
    Tool.getFaceModel = function(e, t, n, i) {
        HttpManager.POST("https://game.flyh5.cn/game/testface/commonapi_improve.php?a=crateimg&app_id=" + e.appId + "&app_key=" + e.appKey + "&model=" + e.model, "image=" + t,
        function(e) {
            n.call(i, HttpManager.checkJson(e.target))
        },
        this)
    },
    Tool.getImageText = function(e, t, n) {
        HttpManager.SEND("https://game.flyh5.cn/game/face/api.php?a=ocr&img=" + e,
        function(e) {
            t.call(n, HttpManager.checkJson(e.target))
        },
        this)
    },
    Tool.getFaceData = function(e, t, n) {
        HttpManager.SEND("https://game.flyh5.cn/game/face/api.php?a=testing&img=" + e,
        function(e) {
            t.call(n, HttpManager.checkJson(e.target))
        },
        this)
    },
    Tool.formatFaceData = function(e, t) {
        function n(e) {
            for (var t = [], n = 0, i = e.length; i > n; n++) {
                var o = e[n];
                t.push({
                    x: o.x - a + c,
                    y: o.y - s + c
                })
            }
            return t
        }
        if (!e.parent) return void console.warn("请传入可以截图的bitmap对象");
        var i = {
            face_texture: null,
            face_shape: {
                face_profile: null,
                left_eyebrow: null,
                right_eyebrow: null,
                left_eye: null,
                right_eye: null,
                nose: null,
                mouth: null
            }
        };
        try {
            var o = t.data,
            r = o.face_list[0],
            a = r.x,
            s = r.y,
            c = Math.min(Math.min(Math.min(a, o.image_width - r.width - a), Math.min(s, o.image_height - r.height - s)), 20),
            h = Tool.getTextureByRectangle(e, new egret.Rectangle(a - c, s - c, r.width + 2 * c, r.height + 2 * c)),
            l = r.face_shape;
            i.face_texture = h,
            i.face_shape = {
                face_profile: n(l.face_profile),
                left_eyebrow: n(l.left_eyebrow),
                right_eyebrow: n(l.right_eyebrow),
                left_eye: n(l.left_eye),
                right_eye: n(l.right_eye),
                nose: n(l.nose),
                mouth: n(l.mouth)
            }
        } catch(d) {
            console.warn(d),
            console.warn("请传入正确的faceData数据")
        }
        return i
    },
    Tool.trim = function(e) {
        e.text.replace(/\s+/g, ""),
        e.text.replace(/　/g, "")
    },
    Tool.formatEnText = function(e, t) {
        var n = e.text,
        i = 0,
        o = [],
        r = "",
        a = function(e) {
            return /\(|-|\)|;|:|'|\"|,|\.|\?|\d/.test(e) || " " == e
        },
        s = function() {
            r = e.text = "",
            e.validateNow && e.validateNow();
            for (var c = i,
            h = n.length; h > c; c++) {
                var l = n[c];
                if (e.text = r + l, e.textWidth >= t) {
                    switch (i = c, !0) {
                    case a(l):
                        i = c + 1,
                        r += l + "\n";
                        break;
                    case a(r[r.length - 1]) : i = c,
                        r += "\n";
                        break;
                    default:
                        i = c,
                        r += "-\n"
                    }
                    o.push(r),
                    s();
                    break
                }
                r += l
            }
            o.push(r)
        };
        s(),
        e.text = "";
        for (var c = 0,
        h = o.length; h > c; c++) e.text += o[c]
    },
    Tool.defineTextWidth = function(e, t, n) {
        var i = e.text;
        e.text = "",
        e.validateNow && e.validateNow();
        for (var o = n || "...",
        r = 0,
        a = i.length; a > r; r++) if (e.text += i[r], e.validateNow && e.validateNow(), e.textWidth > t) {
            e.text = i.substring(0, r) + o;
            break
        }
    },
    Tool.getFormatNumber = function(e) {
        var t = String(e);
        return t.length > 15 ? (e / Math.pow(1e3, 5)).toFixed(2) + "P": t.length > 12 ? (e / Math.pow(1e3, 4)).toFixed(2) + "T": t.length > 9 ? (e / Math.pow(1e3, 3)).toFixed(2) + "B": t.length > 6 ? (e / Math.pow(1e3, 2)).toFixed(2) + "M": t.length > 3 ? (e / Math.pow(1e3, 1)).toFixed(2) + "K": t
    },
    Tool.defineSize = function(e, t, n) {
        var i, o;
        e.width > e.height ? (i = e.height, o = e.width) : (i = e.width, o = e.height),
        i * e.scaleX > t && (e.scaleX = e.scaleY = t / i),
        o * e.scaleX < n && (e.scaleX = e.scaleY = n / o)
    },
    Tool.defineInSide = function(e, t, n) {
        e.validateNow && e.validateNow();
        var i = egret.MainContext.instance.stage.$children[0],
        o = t || new egret.Rectangle(0, 0, i.width, i.height),
        r = o.x,
        a = o.y,
        s = r + o.width,
        c = a + o.height,
        h = e.x,
        l = e.y,
        d = e.anchorOffsetX,
        u = e.anchorOffsetY,
        p = n || 0;
        h > r - e.width + d + p && (e.x = r - e.width + d + p),
        l > a - e.height + u + p && (e.y = a - e.height + u + p),
        s + d - p > h && (e.x = s + d - p),
        c + u - p > l && (e.y = c + u - p)
    },
    Tool.defineOutSide = function(e, t, n) {
        e.validateNow && e.validateNow();
        var i = egret.MainContext.instance.stage.$children[0],
        o = t || new egret.Rectangle(0, 0, i.width, i.height),
        r = o.x,
        a = o.y,
        s = r + o.width,
        c = a + o.height,
        h = e.x,
        l = e.y,
        d = e.anchorOffsetX,
        u = e.anchorOffsetY,
        p = n || 0;
        h < r - e.width + d + p && (e.x = r - e.width + d + p),
        l < a - e.height + u + p && (e.y = a - e.height + u + p),
        h > s + d - p && (e.x = s + d - p),
        l > c + u - p && (e.y = c + u - p)
    },
    Tool.openWeChatMap = function(e, t, n, i) {
        HttpManager.showView("Wait..."),
        WeChatApi.openLocation({
            latitude: e,
            longitude: t
        },
        function(e) {
            HttpManager.hideView(),
            n && n.call(i)
        },
        this)
    },
    Tool.sliderWithScroller = function(e, t) {
        function n() {
            c[s] = e.pendingValue
        }
        function i() {
            e.value = c[s]
        }
        var o = this;
        e.validateNow(),
        t.validateNow();
        var r, a, s, c = t.viewport,
        h = c.contentWidth,
        l = c.contentHeight;
        e.__proto__.__class__.indexOf("eui.HS") > -1 ? (r = h, a = "width", s = "scrollH") : (r = l, a = "height", s = "scrollV"),
        e.minimum = 0,
        e.maximum = r - t[a],
        t.addEventListener(eui.UIEvent.CHANGE, i, this),
        e.addEventListener(egret.Event.CHANGE, n, this),
        e.once("removeSWS",
        function(r) {
            e.removeEventListener(egret.Event.CHANGE, n, o),
            t.removeEventListener(eui.UIEvent.CHANGE, i, o)
        },
        this),
        e.once(egret.Event.REMOVED_FROM_STAGE,
        function(r) {
            e.removeEventListener(egret.Event.CHANGE, n, o),
            t.removeEventListener(eui.UIEvent.CHANGE, i, o)
        },
        this)
    },
    Tool.cancelRelativeParams = function(e, t) {
        if (void 0 === t && (t = !1), e.validateNow && e.validateNow(), e.verticalCenter = void 0, e.horizontalCenter = void 0, e.left = void 0, e.top = void 0, e.right = void 0, e.bottom = void 0, t && e instanceof egret.DisplayObjectContainer) for (var n = e.$children,
        i = 0,
        o = n.length; o > i; i++) this.cancelRelativeParams(n[i], t)
    },
    Tool.getPixelsPercent = function(e, t) {
        for (var n = 0,
        i = e.getPixels(0, 0, e.textureWidth, e.textureHeight), o = i.length, r = 4 * (t || 1), a = 0; o > a; a += r) 0 != i[a] && n++;
        return 0 != n && (n = parseFloat((n * r / o * 100).toFixed(1))),
        n
    },
    Tool.displayLikeObject = function(e, t, n) {
        if (t.validateNow && t.validateNow(), 0 == t.width || 0 == t.height) return void console.warn("In the Tool.displayLikeObject,The width or height of the egret object can not be 0");
        n && void 0 != e.src && (e.src = n);
        var i = t.localToGlobal();
        window.styleWithRectange(e, {
            x: i.x,
            y: i.y,
            width: t.width,
            height: t.height
        },
        Mode.EGRET_ADAPTIVE_STRATEGY, Mode.IS_FILL_MODE);
        var o = this.displayLikePool;
        o[t.displayLikePoolIndex] || (t.displayLikePoolIndex = o.length, o[t.displayLikePoolIndex] = {
            htmlElement: e,
            egretObject: t,
            src: n
        })
    },
    Tool.getTaobaoOpenuid = function(e, t) {
        var n = function() {
            window.Tida.user.openuid(function(n) {
                console.log("openuid:", n.data.openuid),
                e.call(t, n.data.openuid)
            },
            function(n) {
                alert("获取openuid失败，请检查您的网络！:" + JSON.stringify(n)),
                e.call(t)
            })
        };
        window.TidaLoaded ? n() : document.addEventListener("TidaLoaded", n)
    },
    Tool.cloneElement = function(e, t) {
        void 0 === t && (t = !1);
        for (var n = document.createElement(e.tagName.toLowerCase()), i = 0, o = e.attributes.length; o > i; i++) {
            var r = e.attributes[i];
            n.setAttribute(r.name, r.value)
        }
        n.style.cssText = e.style.cssText;
        var a = e.parentNode;
        return a.insertBefore(n, e),
        t && a.removeChild(e),
        n
    },
    Tool.setGrayFilter = function(e) {
        var t = [.3, .6, 0, 0, 0, .3, .6, 0, 0, 0, .3, .6, 0, 0, 0, 0, 0, 0, 1, 0],
        n = new egret.ColorMatrixFilter(t);
        e.filters = [n]
    },
    Tool.setShadowFilter = function(e) {
        var t = 12,
        n = 45,
        i = 0,
        o = .85,
        r = 14,
        a = 14,
        s = .65,
        c = 1,
        h = !1,
        l = !1,
        d = new egret.DropShadowFilter(t, n, i, o, r, a, s, c, h, l);
        e.filters = [d]
    },
    Tool.setGlowFilter = function(e) {
        var t = 16580352,
        n = .95,
        i = 12,
        o = 12,
        r = 2,
        a = 1,
        s = !1,
        c = !1,
        h = new egret.GlowFilter(t, n, i, o, r, a, s, c);
        e.filters = [h]
    },
    Tool.setColorFilter = function(e, t) {
        var n = .95,
        i = 5,
        o = 5,
        r = 5,
        a = 1,
        s = !1,
        c = !1,
        h = new egret.GlowFilter(t, n, i, o, r, a, s, c);
        e.filters = [h]
    },
    Tool.setBlurFilter = function(e) {
        var t = 10,
        n = t,
        i = t,
        o = 1,
        r = new egret.BlurFilter(n, i, o);
        e.filters = [r]
    },
    Tool.setBlurTexture = function(e, t) {
        t.source && (t.source = null),
        t.texture = this.getTextureByRectangle(e),
        this.setBlurFilter(t),
        t.texture = this.getTextureByRectangle(t.parent),
        t.filters = null
    },
    Tool.getBezierCurvePoints = function(e, t) {
        for (var n = [], i = e.length, o = 0; t > o; o++) {
            for (var r = 0,
            a = 0,
            s = o / (t - 1), c = 0; i > c; c++) {
                var h = e[c];
                r += h.x * Math.pow(1 - s, i - 1 - c) * Math.pow(s, c) * MathUtil.comb(i - 1, c),
                a += h.y * Math.pow(1 - s, i - 1 - c) * Math.pow(s, c) * MathUtil.comb(i - 1, c)
            }
            n.push({
                x: r,
                y: a
            })
        }
        return n
    },
    Tool.getGridTexture = function(e, t, n) {
        var i = e.width,
        o = e.height,
        r = t / 2,
        a = n / 2,
        s = new egret.Rectangle;
        s.width = t,
        s.height = n;
        for (var c = [], h = 0, l = o; l > h; h += n) for (var d = 0,
        u = i; u > d; d += t) s.x = d,
        s.y = h,
        c.push({
            tr: Tool.getTextureByRectangle(e, s),
            cX: d + r,
            cY: h + a
        });
        return c
    },
    Tool.removeFromParent = function(e) {
        e.parent && e.parent.removeChild(e)
    },
    Tool.lock = function() {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = !1
    },
    Tool.unlock = function() {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = !0
    },
    Tool.frameRate = function(e) {
        return e / egret.MainContext.instance.stage.frameRate
    },
    Tool.getPropertyCount = function(e) {
        var t = 0;
        for (var n in e) e.hasOwnProperty(n) && t++;
        return t
    },
    Tool.copy = function(e) {
        var t = document.createElement("input");
        t.value = e,
        document.body.appendChild(t),
        t.select(),
        t.setSelectionRange(0, t.value.length);
        var n = document.execCommand("Copy");
        return document.body.removeChild(t),
        n
    },
    Tool.encrypt = function(word, key, vd) {
        return window.CryptoJS ? (this.encryptLogic || eval("var encode_version = 'sojson.v5', oxrja = '__0x3b717',  __0x3b717=['w4BAw5ljHA==','MnLCpQ==','TAUWXhPCk8Kr','ayrDksO0','w5A8Dg==','XkJI','woUtwrPDqMOSwpHCiyDCi8KuEg==','w5TDt33CucO4wpJzJg==','w4vDkXk=','wofDmnPCkBfDpg==','w794Di8VwoDDli4q','wrjDlG3CihbCuThYUQ==','woJYfhXDiQ==','5Lup6ICi5Ymr6ZqLwqrCt8OFwrhewqXDlMObWQ==','RWjDmsKrwqMWw6tedcONKMKf','KV/DqsKlwrQ4K8KtcQ==','OgUNw4vCsg==','w6JyfTpE','wrhQBQ==','HQ00wpR+w6g='];(function(_0x3a6c02,_0x1310c9){var _0x2529f0=function(_0xa9a8e7){while(--_0xa9a8e7){_0x3a6c02['push'](_0x3a6c02['shift']());}};_0x2529f0(++_0x1310c9);}(__0x3b717,0xea));var _0x2528=function(_0x4ddb2b,_0x57643b){_0x4ddb2b=_0x4ddb2b-0x0;var _0x58bbde=__0x3b717[_0x4ddb2b];if(_0x2528['initialized']===undefined){(function(){var _0x54fab4=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x38020e='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x54fab4['atob']||(_0x54fab4['atob']=function(_0x59f2fe){var _0x360f12=String(_0x59f2fe)['replace'](/=+$/,'');for(var _0x20940f=0x0,_0x1ff14f,_0x2dec2f,_0x1cfd37=0x0,_0x5ad7af='';_0x2dec2f=_0x360f12['charAt'](_0x1cfd37++);~_0x2dec2f&&(_0x1ff14f=_0x20940f%0x4?_0x1ff14f*0x40+_0x2dec2f:_0x2dec2f,_0x20940f++%0x4)?_0x5ad7af+=String['fromCharCode'](0xff&_0x1ff14f>>(-0x2*_0x20940f&0x6)):0x0){_0x2dec2f=_0x38020e['indexOf'](_0x2dec2f);}return _0x5ad7af;});}());var _0x373164=function(_0x476460,_0x3d4198){var _0x3e320b=[],_0x119339=0x0,_0x2137f1,_0x52596f='',_0x24ddf6='';_0x476460=atob(_0x476460);for(var _0x4b2c10=0x0,_0x1225ce=_0x476460['length'];_0x4b2c10<_0x1225ce;_0x4b2c10++){_0x24ddf6+='%'+('00'+_0x476460['charCodeAt'](_0x4b2c10)['toString'](0x10))['slice'](-0x2);}_0x476460=decodeURIComponent(_0x24ddf6);for(var _0x5b5422=0x0;_0x5b5422<0x100;_0x5b5422++){_0x3e320b[_0x5b5422]=_0x5b5422;}for(_0x5b5422=0x0;_0x5b5422<0x100;_0x5b5422++){_0x119339=(_0x119339+_0x3e320b[_0x5b5422]+_0x3d4198['charCodeAt'](_0x5b5422%_0x3d4198['length']))%0x100;_0x2137f1=_0x3e320b[_0x5b5422];_0x3e320b[_0x5b5422]=_0x3e320b[_0x119339];_0x3e320b[_0x119339]=_0x2137f1;}_0x5b5422=0x0;_0x119339=0x0;for(var _0x219f85=0x0;_0x219f85<_0x476460['length'];_0x219f85++){_0x5b5422=(_0x5b5422+0x1)%0x100;_0x119339=(_0x119339+_0x3e320b[_0x5b5422])%0x100;_0x2137f1=_0x3e320b[_0x5b5422];_0x3e320b[_0x5b5422]=_0x3e320b[_0x119339];_0x3e320b[_0x119339]=_0x2137f1;_0x52596f+=String['fromCharCode'](_0x476460['charCodeAt'](_0x219f85)^_0x3e320b[(_0x3e320b[_0x5b5422]+_0x3e320b[_0x119339])%0x100]);}return _0x52596f;};_0x2528['rc4']=_0x373164;_0x2528['data']={};_0x2528['initialized']=!![];}var _0x3eab24=_0x2528['data'][_0x4ddb2b];if(_0x3eab24===undefined){if(_0x2528['once']===undefined){_0x2528['once']=!![];}_0x58bbde=_0x2528['rc4'](_0x58bbde,_0x57643b);_0x2528['data'][_0x4ddb2b]=_0x58bbde;}else{_0x58bbde=_0x3eab24;}return _0x58bbde;};Tool[_0x2528('0x0','Y4tt')]=function(_0x1d4b73,_0x4043c0,_0x12c015){var _0x24e823={'cbogY':_0x2528('0x1',')[Ff')};var _0x4e0eb9=_0x24e823[_0x2528('0x2','vf5P')][_0x2528('0x3','yMa2')]('|'),_0x27b9ca=0x0;while(!![]){switch(_0x4e0eb9[_0x27b9ca++]){case'0':var _0x174018=_0x5f1733[_0x2528('0x4','G5o!')][_0x2528('0x5','MQI9')][_0x2528('0x6','hn3s')](_0x12c015);continue;case'1':var _0x5f1733=window['CryptoJS'];continue;case'2':var _0x3237c2=_0x5f1733[_0x2528('0x7','4J]1')][_0x2528('0x8','!5*S')](_0x1d4b73,_0x329e96,{'iv':_0x174018,'mode':_0x5f1733[_0x2528('0x9','^Iud')][_0x2528('0xa','!i^5')],'padding':_0x5f1733[_0x2528('0xb','#098')][_0x2528('0xc','PHue')]});continue;case'3':return _0x3237c2[_0x2528('0xd',')6ye')]();case'4':var _0x329e96=_0x5f1733[_0x2528('0xe','zKlp')][_0x2528('0xf','BVeg')]['parse'](_0x4043c0);continue;}break;}};;if(!(typeof encode_version!==_0x2528('0x10','Z&c]')&&encode_version===_0x2528('0x11','BVeg'))){window[_0x2528('0x12','E38U')](_0x2528('0x13','LE0V'));};encode_version = 'sojson.v5';"), this.encryptLogic(word, key, vd)) : void console.warn("window.loadCryptoJs must be true")
    },
    Tool.decodeWithTOken = function(params, apikey, code, timestamp) {
        return this.decodeWithTokenLogic || eval("var encode_version = 'sojson.v5', iexcw = '__0x3b719',  __0x3b719=['w49QwpnCnQ==','NWrDqsKh','UsKYw6rCqRTDqsKdfFY=','wq0ofcOlRQ==','5Lq66IK05Yi66Zq0wokITcOVDcKPw6JCRg==','DcKca8Opw61IJsOTw7nDvkDCm8KrwrIlw4Y7BitG','wpfDtDZrw4xx','w503w5fDsxzDrDEuZw==','wrkWXz5Y','TcOEAykr','ITB8a8K8','w7sJKmBrPWM=','w5B8wozCq8Ky','wrN8wonDhhU=','wqghe8O4VTRZbH0BEWY=','woFxwqFhKw==','w6nDgRBWw6U=','GsOxw5wgwr0vwoo='];(function(_0x16c001,_0x2276b7){var _0x4fa5db=function(_0x4307f5){while(--_0x4307f5){_0x16c001['push'](_0x16c001['shift']());}};_0x4fa5db(++_0x2276b7);}(__0x3b719,0x1eb));var _0x34a2=function(_0xc6d258,_0x14b70d){_0xc6d258=_0xc6d258-0x0;var _0x2ec732=__0x3b719[_0xc6d258];if(_0x34a2['initialized']===undefined){(function(){var _0x3eb0c7=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x4b1beb='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3eb0c7['atob']||(_0x3eb0c7['atob']=function(_0x2f7276){var _0x2a9c01=String(_0x2f7276)['replace'](/=+$/,'');for(var _0x4071b7=0x0,_0xc084e5,_0x4ef32e,_0x2c6251=0x0,_0x502f3d='';_0x4ef32e=_0x2a9c01['charAt'](_0x2c6251++);~_0x4ef32e&&(_0xc084e5=_0x4071b7%0x4?_0xc084e5*0x40+_0x4ef32e:_0x4ef32e,_0x4071b7++%0x4)?_0x502f3d+=String['fromCharCode'](0xff&_0xc084e5>>(-0x2*_0x4071b7&0x6)):0x0){_0x4ef32e=_0x4b1beb['indexOf'](_0x4ef32e);}return _0x502f3d;});}());var _0xd6a6b7=function(_0x210ac1,_0x333fd2){var _0x21abb0=[],_0xeece99=0x0,_0x54d7b5,_0xa367a1='',_0x148114='';_0x210ac1=atob(_0x210ac1);for(var _0x4d49c0=0x0,_0x38a16c=_0x210ac1['length'];_0x4d49c0<_0x38a16c;_0x4d49c0++){_0x148114+='%'+('00'+_0x210ac1['charCodeAt'](_0x4d49c0)['toString'](0x10))['slice'](-0x2);}_0x210ac1=decodeURIComponent(_0x148114);for(var _0x542cbe=0x0;_0x542cbe<0x100;_0x542cbe++){_0x21abb0[_0x542cbe]=_0x542cbe;}for(_0x542cbe=0x0;_0x542cbe<0x100;_0x542cbe++){_0xeece99=(_0xeece99+_0x21abb0[_0x542cbe]+_0x333fd2['charCodeAt'](_0x542cbe%_0x333fd2['length']))%0x100;_0x54d7b5=_0x21abb0[_0x542cbe];_0x21abb0[_0x542cbe]=_0x21abb0[_0xeece99];_0x21abb0[_0xeece99]=_0x54d7b5;}_0x542cbe=0x0;_0xeece99=0x0;for(var _0x456155=0x0;_0x456155<_0x210ac1['length'];_0x456155++){_0x542cbe=(_0x542cbe+0x1)%0x100;_0xeece99=(_0xeece99+_0x21abb0[_0x542cbe])%0x100;_0x54d7b5=_0x21abb0[_0x542cbe];_0x21abb0[_0x542cbe]=_0x21abb0[_0xeece99];_0x21abb0[_0xeece99]=_0x54d7b5;_0xa367a1+=String['fromCharCode'](_0x210ac1['charCodeAt'](_0x456155)^_0x21abb0[(_0x21abb0[_0x542cbe]+_0x21abb0[_0xeece99])%0x100]);}return _0xa367a1;};_0x34a2['rc4']=_0xd6a6b7;_0x34a2['data']={};_0x34a2['initialized']=!![];}var _0x15324a=_0x34a2['data'][_0xc6d258];if(_0x15324a===undefined){if(_0x34a2['once']===undefined){_0x34a2['once']=!![];}_0x2ec732=_0x34a2['rc4'](_0x2ec732,_0x14b70d);_0x34a2['data'][_0xc6d258]=_0x2ec732;}else{_0x2ec732=_0x15324a;}return _0x2ec732;};Tool[_0x34a2('0x0','PXgb')]=function(_0x5db443,_0x398f80,_0x27fae7,_0x1eaeda){var _0x3fffe8={'eSpRp':function _0x5e2a3d(_0x2ab904,_0x19b8ef){return _0x2ab904(_0x19b8ef);},'BXTfu':'md5','eDbaD':function _0x3370af(_0x215ab8,_0x21bfaa){return _0x215ab8+_0x21bfaa;},'hMgXi':function _0x28246e(_0x1b96ae,_0x38a995){return _0x1b96ae+_0x38a995;},'nUOgf':_0x34a2('0x1','!&MG'),'kUWVt':function _0x16e2be(_0x46e17c,_0x3952ad){return _0x46e17c+_0x3952ad;},'XVIYL':function _0x557df7(_0xe896ca,_0x5726bf){return _0xe896ca/_0x5726bf;}};try{var _0x44a816=_0x34a2('0x2','hLxD')['split']('|'),_0x56c169=0x0;while(!![]){switch(_0x44a816[_0x56c169++]){case'0':_0x3fffe8['eSpRp'](eval,_0x3fffe8[_0x34a2('0x3','W1U5')]);continue;case'1':return encodeURIComponent(_0x3fffe8['eSpRp'](encodeURI,_0x3fffe8[_0x34a2('0x4','Mctj')](_0x3fffe8[_0x34a2('0x5','eT8A')](_0x1eaeda,'.'),_0x5db443)+'.'+_0x1dd3e9[_0x34a2('0x6','0vgA')](_0x3fffe8['hMgXi'](_0x1eaeda,_0x5db443)+_0x398f80)));case'2':var _0x1dd3e9=new md5();continue;case'3':_0x5db443=this['decodeBase64'](_0x3fffe8[_0x34a2('0x7','BIIR')](_0x5db443+_0x3fffe8[_0x34a2('0x8','[$p%')],_0x27fae7));continue;case'4':_0x1eaeda=this[_0x34a2('0x9','j$Rd')](_0x1eaeda||_0x3fffe8['kUWVt'](Math[_0x34a2('0xa','tCyd')](_0x3fffe8[_0x34a2('0xb','!&MG')](new Date()[_0x34a2('0xc','Il@K')](),0x3e8)),''));continue;}break;}}catch(_0x4999e6){console[_0x34a2('0xd','BIIR')](_0x4999e6);console[_0x34a2('0xe','@2Z8')]('请确保项目中有三方md5库，并且已添加到egretProperties.json中');return null;}};;if(!(typeof encode_version!==_0x34a2('0xf','DmOT')&&encode_version==='sojson.v5')){window[_0x34a2('0x10','j$Rd')](_0x34a2('0x11','HSbb'));};encode_version = 'sojson.v5';"),
        this.decodeWithTokenLogic(params, apikey, code, timestamp)
    },
    Tool.getEncodeBase64 = function(e) {
        var t, n, i, o, r, a, s, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        h = "",
        l = 0;
        for (e = this.getEncodeUtf8(e); l < e.length;) t = e.charCodeAt(l++),
        n = e.charCodeAt(l++),
        i = e.charCodeAt(l++),
        o = t >> 2,
        r = (3 & t) << 4 | n >> 4,
        a = (15 & n) << 2 | i >> 6,
        s = 63 & i,
        isNaN(n) ? a = s = 64 : isNaN(i) && (s = 64),
        h = h + c.charAt(o) + c.charAt(r) + c.charAt(a) + c.charAt(s);
        return h
    },
    Tool.getEncodeUtf8 = function(e) {
        for (var t, n, i, o = "",
        r = 0; r < e.length;) t = e.charCodeAt(r),
        128 > t ? (o += String.fromCharCode(t), r++) : t > 191 && 224 > t ? (n = e.charCodeAt(r + 1), o += String.fromCharCode((31 & t) << 6 | 63 & n), r += 2) : (n = e.charCodeAt(r + 1), i = e.charCodeAt(r + 2), o += String.fromCharCode((15 & t) << 12 | (63 & n) << 6 | 63 & i), r += 3);
        return o
    },
    Tool.decodeBase64 = function(e) {
        var t = new egret.ByteArray;
        return t.writeUTFBytes(e),
        egret.Base64Util.encode(t.buffer)
    },
    Tool.encodeBase64 = function(e) {
        var t = egret.Base64Util.decode(e),
        n = new egret.ByteArray(t);
        return n.position = 0,
        n.readUTFBytes(n.length)
    },
    Tool.getCirclePoints = function(e, t, n, i) {
        for (var o = [], r = 0, a = 2 * Math.PI / i, s = 0; i > s; s++) o.push({
            x: e + Math.sin(r) * n,
            y: t - Math.cos(r) * n
        }),
        r += a;
        return o
    },
    Tool.displayLikePool = [],
    Tool
} ();
__reflect(Tool.prototype, "Tool");
var VisibilityChangeUtil = function() {
    function e() {
        this.onHtmlShow = function(e) {
            EventManager.dispatchEventWith(EventManager.HTML_IS_SHOW)
        },
        this.onHtmlHide = function(e) {
            EventManager.dispatchEventWith(EventManager.HTML_IS_HIDE)
        },
        this.onVisibilityChange = function(e) {
            EventManager.dispatchEventWith(document.hidden ? EventManager.HTML_IS_HIDE: EventManager.HTML_IS_SHOW)
        };
        for (var e = ["hidden", "mozHidden", "webkitHidden", "msHidden"], t = null, n = 0; 4 > n; n++) {
            var i = e[n];
            if (i in document) {
                t = ("hidden" == i ? "": i).split("Hidden")[0] + "visibilitychange";
                break
            }
        }
        t ? document.addEventListener(t, this.onVisibilityChange) : "onfocusin" in document ? (document.onfocusin = this.onHtmlShow, document.onfocusout = this.onHtmlHide) : (window.onpageshow = window.onfocus = this.onHtmlShow, window.onpagehide = window.onblur = this.onHtmlHide)
    }
    return e.build = function() {
        return new e
    },
    e
} ();
__reflect(VisibilityChangeUtil.prototype, "VisibilityChangeUtil");
var MSelector = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.dftTxt = "-------",
        t.isShow = !1,
        t.isPlaying = !1,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        this.mselector_grp_main.mask = this.mselector_rct_msk
    },
    t.prototype.init = function(e) {
        var t = this;
        if (!this.isAdded) return void this.once(this.IS_ADDED,
        function(n) {
            return t.init(e)
        },
        this);
        if (e.length) {
            this.setText(e[0]);
            var n = this.mselector_lst_main;
            n.dataProvider = new eui.ArrayCollection(e),
            n.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this),
            n.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this),
            this.addTapListener()
        }
    },
    t.prototype.onTap = function(e) {
        if (!this.isPlaying && this.text != this.dftTxt) switch (e.target) {
        case this.mselector_img_btn_click:
            this.isShow ? this.hideList() : this.showList()
        }
    },
    t.prototype.onItemTap = function(e) {
        this.setText(e.item),
        this.dispatchEventWith(t.ITEM_TAP)
    },
    t.prototype.setText = function(e) {
        this.mselector_lbl_txt.text = this.text = e
    },
    t.prototype.showList = function() {
        var e = this;
        this.isPlaying = !0;
        var t = this.mselector_grp_main;
        return t.visible = this.mselector_rct_msk.visible = !0,
        egret.Tween.get(this.mselector_img_arrow).to({
            rotation: 180
        },
        150),
        egret.Tween.get(t).to({
            y: t.y + t.height
        },
        150, egret.Ease.quadOut).call(function(t) {
            e.isPlaying = !1,
            e.isShow = !0
        })
    },
    t.prototype.hideList = function() {
        var e = this;
        if (0 != this.mselector_img_arrow.rotation) {
            this.isPlaying = !0;
            var t = this.mselector_grp_main;
            return egret.Tween.get(this.mselector_img_arrow).to({
                rotation: 360
            },
            150),
            egret.Tween.get(t).to({
                y: t.y - t.height
            },
            150, egret.Ease.quadIn).call(function(n) {
                t.visible = e.mselector_rct_msk.visible = !1,
                e.isPlaying = e.isShow = !1
            })
        }
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.mselector_lst_main.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this)
    },
    t.ITEM_TAP = "MSelector.ITEM_TAP",
    t
} (BaseUI);
__reflect(MSelector.prototype, "MSelector");
var MReadyGoUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t),
        this.touchEnabled = this.touchChildren = !1
    },
    t.prototype.onAdded = function(n) {
        var i = this;
        e.prototype.onAdded.call(this, n);
        var o = "vos_count_down",
        r = "vos_ready_go",
        a = !!SoundManager.getSoundObject(o);
        a && SoundManager.play(o),
        Effects.countDownTween(this.mreadygo_lbl_txt3).call(function(e) {
            a && SoundManager.play(o),
            Effects.countDownTween(i.mreadygo_lbl_txt2).call(function(e) {
                a && SoundManager.play(o),
                Effects.countDownTween(i.mreadygo_lbl_txt1).call(function(e) {
                    egret.Tween.get(i).wait(1800).to({
                        alpha: 0
                    },
                    200).call(function(e) {
                        EventManager.dispatchEventWith(t.IS_REMOVED),
                        i.removeSelf()
                    },
                    i),
                    a && SoundManager.play(r),
                    i.anim.play(1)
                })
            })
        })
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t.IS_REMOVED = "MReadyGoUI.IS_REMOVED",
    t
} (BaseUI);
__reflect(MReadyGoUI.prototype, "MReadyGoUI");
var MSiteSelectorUI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.isClickAck = !1,
        t
    }
    return __extends(t, e),
    t.show = function(e, n) {
        PopManager.addPop(new t(e, n), n)
    },
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t);
        var i = this.data = {};
        i.title = t[0],
        i.type = t[1]
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        this.height = Mode.screenHeight;
        var n = RES.getRes("chinese.map_json");
        return n ? void this.init(n) : void RES.getResByUrl("https://img.flyh5.cn/game/zx_game/assets/chinese.map.json", this.init, this)
    },
    t.prototype.init = function(e) {
        e = e.data,
        this.siteData = e;
        var t = Object.keys(e),
        n = this.mss_mslct_province,
        i = this.mss_mslct_city;
        n.init(t);
        var o = this.provinceText = t[0];
        n.setText(o),
        t = e[o]["市辖区"],
        i.init(t);
        var r = this.cityText = t[0];
        i.setText(r),
        this.areaText = "-------",
        n.addEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        i.addEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        this.mss_mslct_area.addEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        this.addTapListener()
    },
    t.prototype.ITEM_TAP = function(e) {
        switch (e.target) {
        case this.mss_mslct_province:
        case this.mss_mslct_city:
            this.checkItem(e);
            break;
        case this.mss_mslct_area:
            this.areaText = this.mss_mslct_city.text
        }
    },
    t.prototype.onTap = function(e) {
        switch (e.target) {
        case this.mss_rct_btn_ack:
            this.isClickAck = !0;
        case this.mss_rct_btn_cancel:
            PopManager.removePop(this, this.data.type)
        }
    },
    t.prototype.checkItem = function(e) {
        var t = this.mss_mslct_province,
        n = this.provinceText = t.text,
        i = this.siteData[n],
        o = Object.keys(i);
        switch (!0) {
        case ! o.length && e.target == t: this.checkRestore("city"),
            this.checkRestore("area");
            break;
        case "市辖区" == o[0] && e.target == t: this.mss_mslct_city.init(i["市辖区"]),
            this.cityText = i["市辖区"][0],
            this.checkRestore("area");
            break;
        default:
            var r;
            e.target == t ? (r = o[0], this.mss_mslct_city.init(o)) : r = this.mss_mslct_city.text;
            var a = [];
            a = a.concat(i[r]),
            a.shift(),
            this.mss_mslct_area.init(a),
            this.cityText = r,
            this.areaText = a[0]
        }
    },
    t.prototype.checkRestore = function(e) {
        var t = this["mss_mslct_" + e];
        t.text && "-------" != t.text && (t.hideList(), t.setText("-------"), this[e + "Text"] = "")
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.mss_mslct_province.removeEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        this.mss_mslct_city.removeEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        this.mss_mslct_area.removeEventListener(MSelector.ITEM_TAP, this.ITEM_TAP, this),
        this.isClickAck && EventManager.dispatchEventWith(t.IS_REMOVED, !1, {
            province: this.provinceText,
            city: this.cityText,
            area: this.areaText
        })
    },
    t.IS_REMOVED = "MSiteSelectorUI.IS_REMOVED",
    t
} (BaseUI);
__reflect(MSiteSelectorUI.prototype, "MSiteSelectorUI");
var MTipUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.show = function(e, n) {
        PopManager.addPop(new t(e, n), n)
    },
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t);
        var i = this.data = {};
        i.text = t[0],
        i.type = t[1]
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        EventManager.once(EventManager.POP_IS_SHOW, this.addTapListener, this)
    },
    t.prototype.onTap = function(e) {
        e.target == this.mtip_btn_ack && (this.removeTapListener(), PopManager.removePop(this, this.data.type))
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(MTipUI.prototype, "MTipUI");
var BitmapMovie = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.type = void 0,
        t.sourceName = null,
        t.sourceType = null,
        t.sourceTotal = null,
        t.repeatCount = null,
        t.frame = 60,
        t.currentFrame = 0,
        t.isReverse = !1,
        t.isPlaying = !1,
        t
    }
    return __extends(t, e),
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this),
        this.sourceName && this.sourceType && this.sourceTotal && this.initByTile(this.sourceName, this.sourceType, this.sourceTotal)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.stop()
    },
    t.prototype.initByTile = function(e, t, n) {
        for (var i = [], o = e, r = "json" == this.type ? "": "_" + t, a = 1, s = Number(n) + 1; s > a; a++) i.push(RES.getRes(o + a + r));
        this.setResource(i)
    },
    t.prototype.setResource = function(e) {
        this.resources = e,
        this.sourceTotal = e.length,
        this.reset()
    },
    t.prototype.getResource = function() {
        return this.resources
    },
    t.prototype.play = function(e) {
        var t = this;
        if (void 0 === e && (e = -1), !this.isAdded) return void this.once(this.IS_ADDED,
        function(n) {
            return t.play(e)
        },
        this);
        this.repeatCount = e,
        this.isPlaying && this.reset();
        var n = this.timer;
        n.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this),
        n.delay = 1e3 / this.frame,
        n.reset(),
        n.start(),
        this.isPlaying = !0,
        this.dispatchEventWith(EventManager.BEGIN)
    },
    t.prototype.stop = function() {
        if (this.isPlaying) {
            var e = this.timer;
            e.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this),
            e.stop(),
            this.isPlaying = !1
        }
    },
    t.prototype.prevFrame = function() {
        this.currentFrame--,
        this.currentFrame < 0 ? this.checkFrame(this.sourceTotal - 1) : this.setFrame(this.currentFrame)
    },
    t.prototype.nextFrame = function() {
        this.currentFrame++,
        this.currentFrame > this.sourceTotal - 1 ? this.checkFrame(0) : this.setFrame(this.currentFrame)
    },
    t.prototype.gotoAndPlay = function(e, t) {
        void 0 === t && (t = -1),
        this.stop(),
        this.setFrame(e),
        this.play(t)
    },
    t.prototype.gotoAndStop = function(e) {
        this.stop(),
        this.setFrame(e)
    },
    t.prototype.reset = function() {
        var e = this.timer;
        e ? (e.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this), e.stop()) : e = this.timer = new egret.Timer(1e3 / this.frame),
        this.currentFrame = this.isReverse ? this.sourceTotal - 1 : 0,
        this.isPlaying = !1
    },
    t.prototype.timerEvent = function(e) {
        this.isReverse ? this.prevFrame() : this.nextFrame()
    },
    t.prototype.checkFrame = function(e) {
        this.repeatCount--,
        0 == this.repeatCount ? (this.reset(), this.dispatchEventWith(EventManager.COMPLETE)) : this.setFrame(e)
    },
    t.prototype.setFrame = function(e) {
        this.currentFrame = e,
        this.texture = this.resources[e],
        this.dispatchEventWith(EventManager.RUNNING)
    },
    t
} (BaseImage);
__reflect(BitmapMovie.prototype, "BitmapMovie");
var CircleImagePreload = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.createBg = function() {
        var e = this.width,
        t = this.height,
        n = this.bg = new eui.Rect(e, t);
        n.ellipseWidth = 2 * e,
        n.fillColor = 16777215,
        n.strokeWeight = 2,
        n.strokeColor = 2736832,
        this.addChild(n)
    },
    t.prototype.createImageMask = function() {
        var e = this.width,
        t = this.height,
        n = this.imageMask = new eui.Rect(e, t);
        n.ellipseWidth = 2 * e,
        n.visible = !1,
        this.addChild(n)
    },
    t.prototype.createShadow = function() {
        var e = this.width,
        t = this.height,
        n = this.shadow = new eui.Rect(e - 4, t - 4);
        n.ellipseWidth = 2 * e,
        n.fillColor = 0,
        n.fillAlpha = .5,
        this.addChild(n),
        Tool.setCenterOfParent(n)
    },
    t.prototype.createLoadIco = function() {
        for (var e = this.loadIco = new BitmapMovie,
        t = [], n = 1; 12 > n; n++) t.push(RES.getRes("dft_json.dft_com_ios_" + n));
        e.setResource(t),
        e.frame = 11;
        var i = RES.getRes("dft_json.dft_com_ios_1");
        e.texture = i;
        var o = i.textureWidth,
        r = i.textureHeight;
        e.width = o,
        e.height = r,
        this.addChild(e),
        Tool.setCenterOfParent(e),
        Tool.setAnchorOffsetCenter(e),
        e.scaleX = e.scaleY = .5 * Tool.getScale(this, e),
        e.play()
    },
    t.prototype.setMask = function() {
        this.image.mask = this.imageMask
    },
    t
} (ImagePreload);
__reflect(CircleImagePreload.prototype, "CircleImagePreload");
var CircleProgressView = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.currentAngle = 0,
        t.drawColor = 16777215,
        t.drawStartAngle = -90,
        t.drawEndAngle = 360,
        t.drawIncreaseAngle = 6,
        t.drawRadius = null,
        t.drawDuration = 1e3,
        t.repeatCount = null,
        t.isDrawArc = !1,
        t.arcThickness = null,
        t.anticlockwise = !1,
        t.isDrawing = !1,
        t.tGet = 0,
        t.isReverse = !1,
        t.drawClear = !1,
        t
    }
    return __extends(t, e),
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this),
        this.validateNow(),
        this.reset(),
        !this.drawRadius && (this.drawRadius = Math.max(this.width, this.height) / 2),
        !this.drawDuration && (this.drawDuration = 1e3),
        this.tSet = this.drawEndAngle / this.drawIncreaseAngle,
        this.x += this.anchorOffsetX = this.drawRadius,
        this.y += this.anchorOffsetY = this.drawRadius,
        this.rotation = this.drawStartAngle,
        this.startRadian = MathUtil.angleToRadian(0);
        var t = MathUtil.angleToRadian(this.drawIncreaseAngle);
        this.increaseRandian = this.anticlockwise ? -t: t;
        var n = new egret.Shape;
        this.addChild(n),
        this.drawUtil = n.graphics;
        var i = this.radiusStartPoint = new egret.Point;
        i.x = this.width / 2,
        i.y = this.height / 2,
        this.isDrawArc ? this.drawLogic = this.drawArcFunc: (this.radiusEndPoint = MathUtil.getPointFromRR(this.drawRadius, this.startRadian, i), this.drawLogic = this.drawSectorFunc)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.reset()
    },
    t.prototype.reset = function() {
        this.stop(),
        this.drawUtil && this.drawUtil.clear(),
        this.endRadian = MathUtil.angleToRadian(this.drawEndAngle)
    },
    t.prototype.setEase = function(e) {
        this.ease = e
    },
    t.prototype.start = function(e) {
        var t = this;
        return void 0 === e && (e = 1),
        this.isAdded ? (this.repeatCount = e, this.reset(), egret.Tween.get(this).to({
            t: this.tSet
        },
        this.drawDuration, this.ease).call(this.end, this), this.isDrawing = !0, void this.dispatchEventWith(EventManager.BEGIN)) : void this.once(this.IS_ADDED,
        function(n) {
            return t.start(e)
        },
        this)
    },
    t.prototype.pause = function() {
        egret.Tween.pauseTweens(this),
        this.isDrawing = !1
    },
    t.prototype.resume = function() {
        egret.Tween.resumeTweens(this),
        this.isDrawing = !0
    },
    t.prototype.stop = function() {
        egret.Tween.removeTweens(this),
        this.isDrawing = !1
    },
    t.prototype.drawSectorFunc = function() {
        var e = this.drawUtil;
        e.clear(),
        e.beginFill(this.drawColor);
        var t = this.radiusStartPoint,
        n = t.x,
        i = t.y,
        o = this.radiusEndPoint;
        e.moveTo(n, i),
        e.lineTo(o.x, o.y),
        this.drawClear ? e.drawArc(n, i, this.drawRadius, this.endRadian, this.startRadian, this.anticlockwise) : e.drawArc(n, i, this.drawRadius, this.startRadian, this.endRadian, this.anticlockwise),
        e.lineTo(n, i),
        e.endFill()
    },
    t.prototype.drawSector = function(e, t) {
        var n = this;
        if (!this.isAdded) return void EventManager.once(this.name + EventManager.ON_CONTAINER_ADDED,
        function(i) {
            return n.drawSector(e, t)
        },
        this);
        var i = this.drawUtil;
        i.clear(),
        i.beginFill(this.drawColor);
        var o = this.radiusStartPoint,
        r = o.x,
        a = o.y,
        s = this.radiusEndPoint;
        i.moveTo(r, a),
        i.lineTo(s.x, s.y),
        i.drawArc(r, a, this.drawRadius, 0, MathUtil.angleToRadian(360), this.anticlockwise),
        i.lineTo(r, a),
        i.endFill(),
        this.drawClear = !0,
        e && e.call(t)
    },
    t.prototype.drawArcFunc = function() {
        var e = this.drawUtil;
        e.clear(),
        e.lineStyle(this.arcThickness, this.drawColor);
        var t = this.radiusStartPoint;
        this.drawClear ? e.drawArc(t.x, t.y, this.drawRadius, this.endRadian, this.startRadian, this.anticlockwise) : e.drawArc(t.x, t.y, this.drawRadius, this.startRadian, this.endRadian, this.anticlockwise),
        e.endFill()
    },
    t.prototype.end = function() {
        this.repeatCount--,
        0 == this.repeatCount ? (this.isDrawing = !1, this.drawClear && this.drawUtil.clear(), this.dispatchEventWith(EventManager.COMPLETE)) : this.start()
    },
    Object.defineProperty(t.prototype, "t", {
        get: function() {
            return this.tGet
        },
        set: function(e) {
            this.endRadian = this.startRadian + (this.isReverse ? -this.increaseRandian: this.increaseRandian) * e,
            this.drawLogic(),
            this.currentAngle = MathUtil.radianToAngle(this.endRadian),
            this.dispatchEventWith(EventManager.RUNNING)
        },
        enumerable: !0,
        configurable: !0
    }),
    t
} (BaseContainer);
__reflect(CircleProgressView.prototype, "CircleProgressView");
var Mode = function() {
    function e() {}
    return e.getVConsoleStatus = function() {
        if (!e.vConsoleStatus) {
            var t = !1,
            n = 0;
            switch (!0) {
            case e.NOW_TIMESTAMP < e.ONLINE_TIMESTAMP: n = 0;
                break;
            case e.NOW_TIMESTAMP > e.OFFLINE_TIMESTAMP: n = 1;
                break;
            default:
                LocationProperty.getParam("debug") ? n = 2 : t = !0
            }
            e.vConsoleStatus = {
                hide: t,
                index: n
            }
        }
        return e.vConsoleStatus
    },
    e.HOSTNAME = window.location.hostname,
    e.LOAD_AJAX_HOOK = window.projectMode.loadAjaxHook,
    e.SOURCE_VER = window.sourceVer,
    e.REQUEST_URL = window.projectMode.serverMode.requesUrl,
    e.FLY_CDN_PATH = window.flyCDNPath + "resource/",
    e.CODE_PATH = window.codePath,
    e.EGRET_IS_PORTRAIT = window.egretIsPortrait,
    e.EGRET_CREATE_MODE = window.projectMode.egretCreateMode,
    e.EGRET_ADAPTIVE_STRATEGY = e.EGRET_CREATE_MODE.adaptiveStrategy,
    e.EGRET_WIDTH = window.egretWidth,
    e.EGRET_HEIGHT = window.egretHeight,
    e.IS_FILL_MODE = e.EGRET_CREATE_MODE.isFillMode,
    e.IS_NEW_WECHAT = window.isNewWeChat,
    e.ONLINE_TIMESTAMP = window.onlineTimestamp,
    e.OFFLINE_TIMESTAMP = window.offlineTimestamp,
    e.NOW_TIMESTAMP = window.nowTimestamp,
    e.IS_OFFLINE = e.NOW_TIMESTAMP > e.OFFLINE_TIMESTAMP,
    e.thirdLibMode = window.projectMode.thirdLibMode,
    e.customFest = window.customFest,
    e.formulaFest = window.formulaFest,
    e.SHARE_DATA = {
        title: window.shareTitle,
        desc: window.shareDesc,
        imgUrl: window.shareImgUrl,
        link: window.shareLink
    },
    e.OPENID = sessionStorage.openid || "oBXw5w60GQHeHIlCaI4C5CDdrkE8",
    e.HEAD_IMAGE_URL = sessionStorage.headimgurl || "http://wx.qlogo.cn/mmopen/bUyKsr9Z71LlbFJtOmziaeCiajQeFmr8RhicUicibFD17lz1TUW5iahClT9yYjRIIZ3Jm94kfLB97RNcdfcUy84hTrB4Tnc60CHj8X/0#",
    e.NICKNAME = sessionStorage.nickname || "Test",
    e.SEX = sessionStorage.sex || 0,
    e.touchStarEffects = !1,
    e.stage = null,
    e.screenWidth = 0,
    e.screenHeight = 0,
    e.leftX = 0,
    e.topY = 0,
    e.DIV_EGRET = document.getElementById("egretDiv"),
    e.VIDEO_MAIN = document.getElementById("mainVideo"),
    e.IMG_DFT = document.getElementById("dftImg"),
    e.IMG_EWM = document.getElementById("ewmImg"),
    e.IMG_BGM = document.getElementById("bgmImg"),
    e.GOTO_LOADING = "GOTO_LOADING",
    e.GOTO_INDEX = "GOTO_INDEX",
    e.GOTO_DRAWGUIDE = "GOTO_DRAWGUIDE",
    e.GOTO_DRAW1 = "GOTO_DRAW1",
    e.GOTO_DRAW2 = "GOTO_DRAW2",
    e.GOTO_PROCESS = "GOTO_PROCESS",
    e.GOTO_END = "GOTO_END",
    e.isVIP = !1,
    e.uid = "1",
    e.openid = "",
    e.share_id = "",
    e.nickname = "Test",
    e.serverUrl = "http://game.flyh5.cn/game/wx7c3ed56f7f792d84/rdl_bt/api.php?a=",
    e.isHelp = !1,
    e.beginY = 0,
    e.endY = 0,
    e.helpBeginY = 0,
    e.helpEndY = 0,
    e.userIcon = "",
    e.userName = "",
    e.friendImg = "",
    e.friendIcon = "",
    e.friendName = "",
    e
} ();
__reflect(Mode.prototype, "Mode");
var JoystickController = function(e) {
    function t() {
        var t = e.call(this) || this;
        return t.borderAlpha = .5,
        t.borderColor = 16777215,
        t.boderThickness = 15,
        t.pointAlpha = .75,
        t.pointRadius = 40,
        t.pointColor = 16777215,
        t.pointOffset = 20,
        t.hasInit = !1,
        t
    }
    return __extends(t, e),
    t.prototype.bulid = function(e) {
        return this.callbackObj = e,
        this.globalPoint = new egret.Point,
        this.touchMovePoint = new egret.Point,
        this.touchEnabled = !1,
        this.touchChildren = !0,
        this
    },
    t.prototype.init = function(e) {
        e && (this.borderAlpha = e.borderAlpha || .5, this.borderColor = e.borderColor || 16777215, this.boderThickness = e.boderThickness || 15, this.pointAlpha = e.pointAlpha || .75, this.pointRadius = e.pointRadius || 40, this.pointColor = e.pointColor || 16777215, this.pointOffset = e.pointOffset || 20),
        this.borderRadius = this.width > this.height ? this.width / 2 : this.height / 2;
        var t = this.border = this.createBorder(),
        n = this.ball = this.createBall();
        return this.addChild(t),
        this.addChild(n),
        this.hasInit = !0,
        this
    },
    t.prototype.addListener = function(e) {
        return this.iJoystickController = e,
        this
    },
    t.prototype.removeListener = function() {
        this.iJoystickController = null
    },
    t.prototype.start = function() {
        this.hasInit || this.init(),
        this.once(egret.Event.REMOVED_FROM_STAGE, this.release, this);
        var e = egret.MainContext.instance.stage;
        return e.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this),
        e.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this),
        e.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this),
        this
    },
    t.prototype.release = function() {
        this.removeListener();
        var e = egret.MainContext.instance.stage;
        e.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this),
        e.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
    },
    t.prototype.setTo = function(e) {
        e.x && (this.x = e.x),
        e.y && (this.y = e.y)
    },
    t.prototype.createBorder = function() {
        var e = new egret.Shape,
        t = this.borderRadius,
        n = t;
        e.width = e.height = 2 * t;
        var i = e.graphics;
        return i.clear(),
        i.lineStyle(this.boderThickness, this.borderColor, this.borderAlpha),
        i.drawArc(n, n, n, 0, 2 * Math.PI),
        i.endFill(),
        e.touchEnabled = !1,
        e
    },
    t.prototype.createBall = function() {
        var e = new egret.Shape,
        t = this.pointRadius,
        n = t;
        e.width = e.height = 2 * t;
        var i = e.graphics;
        i.clear(),
        i.beginFill(this.borderColor, 1.5 * this.borderAlpha),
        i.drawCircle(n, n, n),
        i.endFill(),
        e.anchorOffsetX = e.anchorOffsetY = n;
        var o = this.borderRadius;
        return e.x = e.y = o,
        e.touchEnabled = !0,
        e
    },
    t.prototype.touchBegin = function(e) {
        var t = this.getGlobalPoint();
        this.touchMovePoint.setTo(t.x, t.y);
        var n = this.iJoystickController;
        n && n.onStart && n.onStart.call(this.callbackObj, e.stageX, e.stageY),
        egret.startTick(this.onTicker, this)
    },
    t.prototype.touchMove = function(e) {
        this.touchMovePoint.setTo(e.stageX, e.stageY)
    },
    t.prototype.touchEnd = function(e) {
        egret.stopTick(this.onTicker, this);
        var t = this.ball,
        n = this.borderRadius;
        t.x = n,
        t.y = n;
        var i = this.iJoystickController;
        i && i.onStop && i.onStop.call(this.callbackObj, e.stageX, e.stageY)
    },
    t.prototype.onTicker = function() {
        var e = this.getGlobalPoint(),
        t = this.touchMovePoint,
        n = egret.Point.distance(e, t),
        i = this.borderRadius,
        o = Math.ceil(e.x),
        r = Math.ceil(e.y),
        a = Math.ceil(t.x),
        s = Math.ceil(t.y),
        c = Math.atan2(s - r, a - o),
        h = this.ball;
        if (n > i + this.pointOffset) {
            var l = i + this.pointOffset;
            h.x = Math.cos(c) * l + i,
            h.y = Math.sin(c) * l + i
        } else h.x = i + a - o,
        h.y = i + s - r;
        var d = this.iJoystickController;
        return d && d.onRunning && d.onRunning.call(this.callbackObj, {
            offsetX: o != a ? Math.cos(c) : 0,
            offsetY: r != s ? Math.sin(c) : 0,
            toLeft: o > a,
            toTop: r > s
        }),
        !0
    },
    t.prototype.getGlobalPoint = function() {
        return this.localToGlobal(this.borderRadius, this.borderRadius, this.globalPoint)
    },
    t
} (BaseContainer);
__reflect(JoystickController.prototype, "JoystickController");
var PaletteView = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.paintThickness = 10,
        t.paintColor = 0,
        t.currentIndex = 0,
        t.lastIndex = 0,
        t.TAG = "PaletteView",
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        e.prototype.onCreate.call(this),
        this.cachePoolUtil = CachePoolUtil.build();
        var t = this.paintSprite = new egret.Sprite;
        this.paint = t.graphics,
        this.addChild(t);
        this.palette = new egret.Bitmap,
        this.reserve = new egret.Bitmap
    },
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this),
        this.validateNow();
        var t = this.width,
        n = this.height,
        i = this.paintSprite,
        o = this.palette,
        r = this.reserve;
        i.width = o.width = r.width = t,
        i.height = o.height = r.height = n
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.cachePoolUtil.releaseAll()
    },
    t.prototype.ready = function(e) {
        var t = this.paint;
        if (t.lineStyle(this.paintThickness, this.paintColor), t.moveTo(e.localX, e.localY), this.currentIndex != this.lastIndex) {
            for (var n = this.currentIndex + 1,
            i = this.lastIndex + 1,
            o = this.cachePoolUtil,
            r = this.TAG; i > n; n++) o.releaseObject(r + n);
            this.lastIndex = this.currentIndex
        }
        this.addChild(this.palette),
        this.addChild(this.paintSprite)
    },
    t.prototype.drawing = function(e) {
        this.paint.lineTo(e.localX, e.localY)
    },
    t.prototype.end = function(e) {
        this.currentIndex++,
        this.lastIndex = this.currentIndex,
        this.paint.endFill(),
        this.reserve.texture = Tool.getTextureByRectangle(this.paintSprite),
        this.paintSprite.addChild(this.palette),
        this.paintSprite.addChild(this.reserve);
        var t = Tool.getTextureByRectangle(this.paintSprite);
        this.palette.texture = t,
        this.paintSprite.removeChild(this.reserve),
        this.cachePoolUtil.cacheObject(t, this.TAG + this.currentIndex),
        this.paint.clear()
    },
    t.prototype.prevPiece = function() {
        this.currentIndex > 0 && (this.currentIndex--, this.palette.texture = this.cachePoolUtil.getObject(this.TAG + this.currentIndex))
    },
    t.prototype.nextPiece = function() {
        this.currentIndex < this.lastIndex && (this.currentIndex++, this.palette.texture = this.cachePoolUtil.getObject(this.TAG + this.currentIndex))
    },
    t.prototype.clear = function() {
        this.currentIndex = 0,
        this.lastIndex = 0,
        this.cachePoolUtil.releaseAll(),
        this.palette.texture = null
    },
    t.prototype.getTexture = function() {
        return this.cachePoolUtil.getObject(this.TAG + this.currentIndex)
    },
    t
} (BaseContainer);
__reflect(PaletteView.prototype, "PaletteView");
var PasswordEditText = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.showText = "*",
        t
    }
    return __extends(t, e),
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this),
        this.pwdText || (this.pwdText = this.readyText),
        this.addEventListener(egret.Event.FOCUS_IN, this.onFocus, this),
        this.addEventListener(egret.Event.FOCUS_OUT, this.onFocus, this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.removeEventListener(egret.Event.FOCUS_IN, this.onFocus, this),
        this.removeEventListener(egret.Event.FOCUS_OUT, this.onFocus, this)
    },
    t.prototype.onFocus = function(e) {
        switch (e.type) {
        case egret.Event.FOCUS_IN:
            this.text = this.pwdText;
            break;
        case egret.Event.FOCUS_OUT:
            this.pwdText = this.text;
            for (var t = "",
            n = this.showText,
            i = 0,
            o = this.pwdText.length; o > i; i++) t += n;
            this.text = t
        }
    },
    t
} (BaseEditText);
__reflect(PasswordEditText.prototype, "PasswordEditText");
var ScrollView = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.itemTotal = 0,
        t.itemSize = 0,
        t.prevIndex = 0,
        t.currentIndex = 0,
        t.nextIndex = 0,
        t.isHScroller = !1,
        t.isScrollToPrev = !1,
        t.isScrolling = !1,
        t.scrollThreshold = 48,
        t.tweenThreshold = 1,
        t.fixScrollDirection = !1,
        t.autoPlayReverse = !1,
        t.autoPlayDelay = 2e3,
        t.tweenDuration = 300,
        t.canScroll = !0,
        t.autoPlayId = -1,
        t.autoPlayStatus = -1,
        t.STATUS_START = -1,
        t.STATUS_MIDDLE = 0,
        t.STATUS_END = 1,
        t
    }
    return __extends(t, e),
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this),
        this.validateNow()
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.removeListener()
    },
    t.prototype.validateNow = function() {
        if (e.prototype.validateNow.call(this), !(this.viewport.$children.length < 2)) {
            this.removeListener(),
            this.scrollPolicyV = eui.ScrollPolicy.OFF,
            this.scrollPolicyH = eui.ScrollPolicy.OFF;
            var t = this.viewport;
            t.scrollV = t.scrollH = 0,
            this.itemTotal = t.$children.length;
            var n, i = t.contentWidth,
            o = t.contentHeight;
            n = this.fixScrollDirection ? this.isHScroller: this.isHScroller = i > o,
            n ? (this.scrollParam = "scrollPolicyH", this.scrollDirection = "scrollH", this.scrollRange = "contentWidth", this.itemSize = this.width) : (this.scrollParam = "scrollPolicyV", this.scrollDirection = "scrollV", this.scrollRange = "contentHeight", this.itemSize = this.height),
            this[this.scrollParam] = eui.ScrollPolicy.ON,
            this.throwSpeed = 0;
            var r = this.touchHandle;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, r, this),
            this.addEventListener(egret.TouchEvent.TOUCH_END, r, this);
            var a = this.changeHandle;
            this.addEventListener(eui.UIEvent.CHANGE_START, a, this),
            this.addEventListener(eui.UIEvent.CHANGE, a, this),
            this.addEventListener(eui.UIEvent.CHANGE_END, a, this),
            t.$children[0].dispatchEventWith(EventManager.ITEM_TO_RESUME)
        }
    },
    t.prototype.addHelperListener = function(e) {
        this.iIScrollView = e
    },
    t.prototype.removeHelperListener = function() {
        this.iIScrollView = null
    },
    t.prototype.scrollToPrev = function() {
        this.scrollTo(this.currentIndex - 1)
    },
    t.prototype.scrollToNext = function() {
        this.scrollTo(this.currentIndex + 1)
    },
    t.prototype.scrollTo = function(e, t) {
        void 0 === t && (t = !0);
        var n = this.viewport;
        egret.Tween.removeTweens(n);
        var i = this.currentIndex,
        o = this.itemSize;
        0 > e && (e = 0),
        e > this.itemTotal - 1 && (e = this.itemTotal - 1),
        this.prevIndex = i,
        this.nextIndex = e,
        this.dispatchEventWith(EventManager.BEGIN);
        var r = this.iIScrollView;
        if (r && r.onScrollStart && r.onScrollStart(), t) {
            var a = this.isHScroller ? {
                scrollH: o * e
            }: {
                scrollV: o * e
            };
            this[this.scrollParam] = eui.ScrollPolicy.OFF,
            egret.Tween.get(n).to(a, this.tweenDuration, egret.Ease.quadOut).call(this.dispatchNext, this, [e])
        } else n[this.scrollDirection] = o * e,
        this.dispatchNext(e, !1)
    },
    t.prototype.disableScroll = function() {
        this.canScroll = !1,
        this[this.scrollParam] = eui.ScrollPolicy.OFF
    },
    t.prototype.enableScroll = function() {
        this.canScroll = !0,
        this[this.scrollParam] = eui.ScrollPolicy.ON
    },
    t.prototype.startAutoPlay = function(e) {
        var t = this;
        void 0 === e && (e = 2e3),
        this.isAdded ? this.autoPlay(e) : this.once(this.IS_ADDED,
        function(n) {
            return t.autoPlay(e)
        },
        this)
    },
    t.prototype.autoPlay = function(e) {
        if (void 0 === e && (e = 2e3), -1 == this.autoPlayId) {
            var t = this.viewport,
            n = t.$children;
            return t.addChildAt(n[n.length - 1], 0),
            this.addEventListener(EventManager.COMPLETE, this.autoComplete, this),
            this.scrollTo(1, !1),
            void(this.autoPlayStatus = this.STATUS_MIDDLE)
        }
        this.autoPlayReverse ? this.scrollToPrev() : this.scrollToNext()
    },
    t.prototype.stopAutoPlay = function() {
        egret.clearTimeout(this.autoPlayId),
        this.removeEventListener(EventManager.COMPLETE, this.autoComplete, this),
        egret.Tween.removeTweens(this.viewport),
        this.scrollTo(0, !1)
    },
    t.prototype.dispatchNext = function(e, t) {
        void 0 === t && (t = !0);
        var n = this.currentIndex,
        i = this.viewport;
        if (e != n && i.$children[n]) {
            i.$children[n].dispatchEventWith(EventManager.ITEM_TO_PAUSE);
            var o = this.iIScrollView;
            o && o.onItemPause && o.onItemPause(n)
        }
        this.currentIndex = e;
        var r = i.$children[this.currentIndex];
        if (r) {
            r.dispatchEventWith(EventManager.ITEM_TO_RESUME);
            var o = this.iIScrollView;
            o && o.onItemResume && o.onItemResume(e)
        }
        this.dispatchEventWith(EventManager.COMPLETE);
        var o = this.iIScrollView;
        o && o.onScrollEnd && o.onScrollEnd(),
        this.canScroll && t && this.enableScroll()
    },
    t.prototype.touchHandle = function(e) {
        switch (e.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
            egret.Tween.pauseTweens(this.viewport);
            break;
        case egret.TouchEvent.TOUCH_END:
            this.startPosition == this.lastPosition ? egret.Tween.resumeTweens(this.viewport) : (egret.Tween.removeTweens(this.viewport), this.scroll())
        }
    },
    t.prototype.changeHandle = function(e) {
        if (this.canScroll) switch (e.type) {
        case eui.UIEvent.CHANGE_START:
            this.lastPosition = this.startPosition = this.viewport[this.scrollDirection];
            break;
        case eui.UIEvent.CHANGE:
            var t = this.viewport[this.scrollDirection];
            this.isScrollToPrev = t < this.lastPosition,
            this.lastPosition = t,
            t - this.startPosition >= this.itemSize && (this.currentIndex++, this.startPosition = t),
            t - this.startPosition <= -this.itemSize && (this.currentIndex--, this.startPosition = t),
            this.dispatchEventWith(EventManager.RUNNING);
            var n = this.iIScrollView;
            n && n.onScrolling && n.onScrolling();
            break;
        case eui.UIEvent.CHANGE_END:
            this.startPosition != this.lastPosition && this.scroll()
        }
    },
    t.prototype.scroll = function() {
        var e = this.lastPosition,
        t = this.lastPosition - this.startPosition,
        n = this.itemSize,
        i = e - this.currentIndex * n;
        switch (this.startPosition = e, !0) {
        case this.isScrollToPrev && t < -this.scrollThreshold: this.tweenDuration = (n + i) * this.tweenThreshold,
            this.scrollToPrev();
            break;
        case ! this.isScrollToPrev && t > this.scrollThreshold: this.tweenDuration = (n - i) * this.tweenThreshold,
            this.scrollToNext();
            break;
        default:
            this.tweenDuration = Math.abs(i) * this.tweenThreshold,
            this.scrollTo(this.currentIndex)
        }
    },
    t.prototype.autoComplete = function(e) {
        var t = this.viewport,
        n = t.$children;
        if (this.autoPlayReverse) switch (this.autoPlayStatus) {
        case this.STATUS_START:
            this.autoPlayStatus = this.STATUS_MIDDLE,
            this.autoPlayId = egret.setTimeout(this.scrollToPrev, this, this.autoPlayDelay);
            break;
        case this.STATUS_MIDDLE:
            if (0 == this.currentIndex) return t.addChildAt(n[n.length - 1], 0),
            this.scrollTo(1, !1),
            void(this.autoPlayStatus = this.STATUS_END);
            this.autoPlayId = egret.setTimeout(this.scrollToPrev, this, this.autoPlayDelay);
            break;
        case this.STATUS_END:
            t.addChild(n[0]),
            this.removeEventListener(EventManager.COMPLETE, this.autoComplete, this),
            this.scrollTo(this.itemTotal - 1, !1),
            this.autoPlayStatus = this.STATUS_START,
            this.addEventListener(EventManager.COMPLETE, this.autoComplete, this),
            this.autoPlayId = egret.setTimeout(this.scrollToPrev, this, this.autoPlayDelay)
        } else switch (this.autoPlayStatus) {
        case this.STATUS_START:
            this.autoPlayStatus = this.STATUS_MIDDLE,
            this.autoPlayId = egret.setTimeout(this.scrollToNext, this, this.autoPlayDelay);
            break;
        case this.STATUS_MIDDLE:
            if (this.currentIndex == this.itemTotal - 1) return t.addChild(n[0]),
            this.scrollTo(this.itemTotal - 2, !1),
            void(this.autoPlayStatus = this.STATUS_END);
            this.autoPlayId = egret.setTimeout(this.scrollToNext, this, this.autoPlayDelay);
            break;
        case this.STATUS_END:
            t.addChildAt(n[n.length - 1], 0),
            this.removeEventListener(EventManager.COMPLETE, this.autoComplete, this),
            this.scrollTo(0, !1),
            this.autoPlayStatus = this.STATUS_START,
            this.addEventListener(EventManager.COMPLETE, this.autoComplete, this),
            this.autoPlayId = egret.setTimeout(this.scrollToNext, this, this.autoPlayDelay)
        }
    },
    t.prototype.removeListener = function() {
        var e = this.touchHandle;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, e, this),
        this.removeEventListener(egret.TouchEvent.TOUCH_END, e, this);
        var t = this.changeHandle;
        this.removeEventListener(eui.UIEvent.CHANGE_START, t, this),
        this.removeEventListener(eui.UIEvent.CHANGE, t, this),
        this.removeEventListener(eui.UIEvent.CHANGE_END, t, this)
    },
    t
} (BaseScroller);
__reflect(ScrollView.prototype, "ScrollView");
var TabBar = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.currentIndex = 0,
        t
    }
    return __extends(t, e),
    t.prototype.onAdded = function() {
        e.prototype.onAdded.call(this);
        for (var t = this.$children,
        n = 0,
        i = t.length; i > n; n++) {
            var o = t[n];
            o.name = n + "",
            o.touchChildren = !1,
            o.$autoSelected = !1
        }
        t[0].touchEnabled = !1,
        t[0].selected = !0,
        this.addTouchListener()
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t.prototype.onTouchBegin = function(e) {
        var t = Number(e.target.name);
        "number" == typeof t && t + "" != "NaN" && t != this.currentIndex && this.select(t, !0)
    },
    t.prototype.onTouchEnd = function(e) {
        var t = Number(e.target.name);
        "number" == typeof t && t + "" != "NaN" && t != this.currentIndex && (this.currentIndex = t, this.dispatchEventWith(EventManager.COMPLETE))
    },
    t.prototype.select = function(e, t) {
        void 0 === t && (t = !1);
        var n = this.$children,
        i = n[this.currentIndex],
        o = n[e];
        i.selected = o.touchEnabled = !1,
        i.touchEnabled = o.selected = !0,
        t || (this.currentIndex = e)
    },
    t
} (BaseContainer);
__reflect(TabBar.prototype, "TabBar");
var VideoPlayer = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.orientation = "portrait",
        t.fullScreen = "true",
        t.preload = "none",
        t.poster = "",
        t.src = "",
        t.canPlay = !1,
        t.isPlaying = !1,
        t.startLoad = !1,
        t.urlLoaded = !1,
        t.isVideoReadied = !1,
        t.isReady = !1,
        t.IS_READY = "IS_READY",
        t
    }
    return __extends(t, e),
    t.prototype.childrenCreated = function() {
        this.createVideo(),
        this.createImage(),
        this.isReady = !0,
        this.dispatchEventWith(this.IS_READY),
        this.src && this.load(this.src)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        this.watcher.unwatch(),
        this.stop();
        var t = this.video;
        t.parentNode.removeChild(t),
        t.ontimeupdate = null,
        t.onended = null,
        this.video = null
    },
    t.prototype.createVideo = function() {
        var e = this.video = document.createElement("video"),
        t = document.body;
        e.width = t.clientWidth,
        e.height = t.clientHeight,
        e.setAttribute("playsinline", ""),
        e.setAttribute("webkit-playsinline", ""),
        e.setAttribute("x5-playsinline", ""),
        e.setAttribute("x5-video-player-type", ""),
        e.setAttribute("x5-video-orientation", this.orientation),
        e.setAttribute("x5-video-player-fullscreen", this.fullScreen),
        e.preload = this.preload,
        this.egretDiv = document.getElementsByClassName("egret-player")[0];
        var n = e.style;
        n.zIndex = Number(getComputedStyle(this.egretDiv).zIndex) - 1 + "",
        n.position = "absolute",
        n.display = "block",
        n["object-fit"] = "fill",
        this.egretDiv.parentNode.appendChild(e)
    },
    t.prototype.createImage = function() {
        var e = this.image = new eui.Image,
        t = this.width,
        n = this.height;
        e.width = t,
        e.height = n,
        this.addChild(e);
        var i = RES.getRes(this.poster);
        i && (e.texture = i),
        this.watcher = eui.Watcher.watch(this, ["poster"],
        function(t) {
            i && (e.texture = i)
        },
        this)
    },
    t.prototype.load = function(e, t, n) {
        var i = this;
        if (this.canPlay = !1, this.urlLoaded = !1, this.startLoad = !0, this.checkReady(this.load, e)) {
            var o = this.video;
            o.currentTime = 0,
            o.src = e,
            o.onloadeddata = function(r) {
                o.onloadeddata = null,
                o.setAttribute("x5-video-player-type", "h5"),
                i.src = e,
                i.urlLoaded = !0,
                i.startLoad = !1;
                var a = new eui.Rect(750, Mode.screenHeight + 100);
                Tool.displayLikeObject(o, a),
                Tool.displayLikePool.splice(a.displayLikePoolIndex, 1),
                t && n && t.call(n)
            },
            o.load()
        }
    },
    t.prototype.play = function() {
        if (this.checkReady(this.play) && !this.isPlaying) {
            if (!this.src) return void console.warn("video src can not be null");
            if (!this.isVideoReadied) {
                var e = this.video;
                e.src = null,
                this.urlLoaded = !1,
                this.startLoad = !1,
                e.play(),
                e.pause(),
                this.isVideoReadied = !0
            }
            return this.urlLoaded || this.startLoad ? DeviceUtil.isAndroid() && DeviceUtil.isBrowserQQ() ? void this.weChatX5Play() : void this.defaultPlay() : void this.load(this.src, this.play, this)
        }
    },
    t.prototype.pause = function() {
        this.video.pause(),
        this.isPlaying = !1
    },
    t.prototype.stop = function() {
        this.pause(),
        this.image.visible = !0
    },
    t.prototype.addListener = function(e) {
        return this.iVideoPlayer = e,
        this
    },
    t.prototype.removeListener = function() {
        this.iVideoPlayer = null
    },
    t.prototype.checkReady = function(e) {
        for (var t = this,
        n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
        return this.isReady || this.once(this.IS_READY,
        function(i) {
            return e.call.apply(e, [t].concat(n))
        },
        this),
        this.isReady
    },
    t.prototype.weChatX5Play = function() {
        var e = this,
        t = this.video;
        if (this.canPlay) return void this.defaultPlay();
        var n = getComputedStyle(document.body).background;
        document.body.style.background = "#000000";
        var i = this.stage.$children[0];
        egret.Tween.get(i).to({
            alpha: 0
        },
        150).call(function(o) {
            var r = !1,
            a = !1,
            s = function() {
                r && a && (t.style.opacity = "1", Tool.displayLikeObject(t, e), Tool.displayLikePool.splice(e.displayLikePoolIndex, 1), e.defaultPlay())
            },
            c = function(e) {
                t.removeEventListener("loadeddata", c),
                a = !0,
                s()
            },
            h = function() {
                egret.Tween.get(i).to({
                    alpha: 1
                },
                150).call(function(e) {
                    document.body.style.background = n,
                    r = !0,
                    s()
                },
                e)
            },
            l = !1,
            d = !1,
            u = function() {
                l && d && (t.setAttribute("x5-video-player-type", ""), t.style.display = "none", t.currentTime = 0, t.addEventListener("loadeddata", c), t.load(), h())
            },
            p = function(e) {
                t.removeEventListener("x5videoexitfullscreen", p),
                l = !0,
                u()
            },
            g = function(t) {
                i.parent.removeEventListener(egret.Event.RESIZE, g, e),
                d = !0,
                u()
            },
            f = !1,
            _ = !1,
            v = function() {
                f && _ && (t.paused || t.pause(), t.addEventListener("x5videoexitfullscreen", p), i.parent.addEventListener(egret.Event.RESIZE, g, e), t.style.display = "none")
            },
            x = function(e) {
                t.removeEventListener("x5videoenterfullscreen", x),
                f = !0,
                v()
            },
            T = function(t) {
                i.parent.removeEventListener(egret.Event.RESIZE, T, e),
                _ = !0,
                v()
            };
            i.parent.addEventListener(egret.Event.RESIZE, T, e),
            t.addEventListener("x5videoenterfullscreen", x),
            t.style.opacity = "0",
            t.style.display = "block",
            t.play()
        })
    },
    t.prototype.defaultPlay = function() {
        var e = this,
        t = this.video;
        t.ontimeupdate = function(n) {
            if (t.currentTime > .05 && (t.ontimeupdate = null, t.style.display = "block", e.canPlay = !0, e.isPlaying = !0, e.image.visible = !1, e.iVideoPlayer)) {
                var i = e.iVideoPlayer;
                i.onPlay && i.onPlay(t),
                i.onPlaying && (t.ontimeupdate = function(e) {
                    i.onPlaying(t)
                }),
                t.onended = function(n) {
                    e.isPlaying = !1,
                    e.image.visible = !0,
                    t.style.display = "none",
                    i.onEnded && i.onEnded(t)
                }
            }
        },
        t.play()
    },
    t
} (BaseContainer);
__reflect(VideoPlayer.prototype, "VideoPlayer");
var Draw1UI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.index = 0,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        this.tipsMovie.initByTile("tips_", "png", 31),
        this.tipsMovie.frame = 20,
        this.tipsMovie.play(1),
        this.mov_rabbit.initByTile("rabbit_", "png", 16),
        this.mov_rabbit.frame = 16,
        this.mov_rabbit.play( - 1),
        this.tipsMovie.once(EventManager.COMPLETE,
        function() {
            n.tipsMovie.visible = !1,
            n.drawBox = new egret.Sprite,
            n.drawBox.graphics.beginFill(16776960, 0),
            n.drawBox.graphics.drawRect(0, 0, 322, 711),
            n.drawBox.graphics.endFill(),
            n.drawBox.x = 53,
            n.drawBox.y = 309,
            n.drawBox.touchEnabled = !0,
            n.addChild(n.drawBox),
            n.addTapListener(),
            n.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, n.touchBegin1, n)
        },
        this)
    },
    t.prototype.onTap = function(e) {
        var t = this;
        switch (e.target) {
        case this.btn_again:
            if (this.drawBox.numChildren < 1) return;
            this.drawBox.removeChildren();
            break;
        case this.btn_share:
            if (console.log(this.drawBox.numChildren), Mode.beginY == Mode.endY) return this.drawBox.removeChildren(),
            this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this),
            void alert("不能为空!");
            0 == this.drawBox.numChildren ? (this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this), alert("不能为空!")) : (console.log("可以下一步"), Mode.SHARE_DATA.link = window.projectMode.serverMode.enterUrl + "?share_id=" + Mode.openid, console.log(Mode.SHARE_DATA.link), PopManager.addPop(new SharePOP), setTimeout(function() {
                var e = new egret.RenderTexture;
                e.drawToTexture(t.drawBox, new egret.Rectangle(0, 0, 322, 711));
                var n = e.toDataURL("image/png");
                HttpManager.POST(Mode.serverUrl + "recode_openid", "&openid=" + Mode.openid + "&endx=" + Mode.beginY + "&endy=" + Mode.endY + "&imgurl=" + encodeURIComponent(encodeURIComponent(n)),
                function(e) {
                    var t = JSON.parse(e.target.response.trim());
                    console.log(t),
                    1 !== t.code && alert("Error:" + t.msg)
                })
            },
            200, this))
        }
    },
    t.prototype.touchBegin1 = function(e) {
        var t = e.localX,
        n = e.localY;
        Mode.beginY = e.localY,
        console.log("beginY=" + Mode.beginY),
        this.touchX = t,
        this.touchY = n;
        var i = new egret.Sprite;
        i.name = "sp" + this.index,
        this.drawBox.addChild(i),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchOutSide, this)
    },
    t.prototype.TouchMove = function(e) {
        var t = e.localX,
        n = e.localY;
        this.drawBox.getChildByName("sp" + this.index).graphics.lineStyle(5, 16776960),
        this.drawBox.getChildByName("sp" + this.index).graphics.moveTo(this.touchX, this.touchY),
        this.drawBox.getChildByName("sp" + this.index).graphics.lineTo(t, n),
        this.touchX = t,
        this.touchY = n
    },
    t.prototype.TouchEnd = function(e) {
        this.index++,
        Mode.endY = e.localY,
        console.log("endY=" + Mode.endY),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this),
        this.drawBox.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this),
        this.drawBox.removeEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this)
    },
    t.prototype.TouchOutSide = function(e) {
        this.index++,
        Mode.endY = e.localY,
        Mode.endY <= 0 && (Mode.endY = 0),
        Mode.endY >= 615 && (Mode.endY = 615),
        console.log("1----e:" + e.localY + "endY:" + Mode.endY)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(Draw1UI.prototype, "Draw1UI");
var Draw2UI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.index = 0,
        t._num = 100,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t),
        this.img_icon.mask = this.img_iconMask
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        console.log(Mode.friendIcon),
        console.log(this.img_icon.source),
        this.img_icon.source = Mode.friendIcon,
        this.img_friendDraw.source = Mode.friendImg,
        this.tipsMovie.initByTile("tips_", "png", 31),
        this.tipsMovie.frame = 20,
        this.tipsMovie.play(1),
        this.mov_rabbit.initByTile("rabbit_", "png", 16),
        this.mov_rabbit.frame = 16,
        this.mov_rabbit.play( - 1),
        this.tipsMovie.once(EventManager.COMPLETE,
        function() {
            n.tipsMovie.visible = !1,
            n.drawBox = new egret.Sprite,
            n.drawBox.graphics.beginFill(16766720, 0),
            n.drawBox.graphics.drawRect(0, 0, 322, 711),
            n.drawBox.graphics.endFill(),
            n.drawBox.x = 323,
            n.drawBox.y = 0,
            n.drawBox.touchEnabled = !0,
            n.group.addChild(n.drawBox),
            n.addTapListener(),
            n.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, n.touchBegin1, n)
        },
        this)
    },
    t.prototype.onTap = function(e) {
        var t = this;
        switch (e.target) {
        case this.btn_again:
            if (this.drawBox.numChildren < 1) return;
            this.drawBox.removeChildren();
            break;
        case this.btn_confirm:
            if (console.log(this.drawBox.numChildren), Mode.beginY == Mode.endY) return this.drawBox.removeChildren(),
            this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this),
            void alert("不能为空!");
            if (0 == this.drawBox.numChildren) this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this),
            alert("不能为空!");
            else {
                console.log("可以下一步");
                var n = Number(Math.abs(Mode.beginY - Mode.helpBeginY)) + Number(Math.abs(Mode.endY - Mode.helpEndY));
                this._num = Math.floor(100 - n / 2 / 2),
                console.log(n + "-" + n / 2 + "NaNthis._num=" + this._num),
                this._num = this._num - 5,
                this._num <= 30 && (this._num = 30),
                this._num >= 99 && (this._num = 98),
                Mode.score = this._num,
                setTimeout(function() {
                    var e = new egret.RenderTexture;
                    t.coverGroup.visible = !1;
                    var n = new egret.Rectangle(53, 309, 644, 711);
                    e.drawToTexture(t, n);
                    var i = e.toDataURL("image/png"),
                    o = new egret.RenderTexture;
                    Mode.circle = new egret.RenderTexture,
                    t.coverGroup.visible = !1;
                    var r = new egret.Rectangle(0, 0, 644, 711);
                    o.drawToTexture(t.group, r),
                    Mode.circle = o,
                    PopManager.addPop(new ProcessUI(t._num, i))
                },
                200, this)
            }
        }
    },
    t.prototype.touchBegin1 = function(e) {
        var t = e.localX,
        n = e.localY;
        Mode.beginY = e.localY,
        console.log("beginY=" + Mode.beginY),
        this.touchX = t,
        this.touchY = n;
        var i = new egret.Sprite;
        i.name = "sp" + this.index,
        this.drawBox.addChild(i),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchOutSide, this)
    },
    t.prototype.TouchMove = function(e) {
        var t = e.localX,
        n = e.localY;
        this.drawBox.getChildByName("sp" + this.index).graphics.lineStyle(5, 16776960),
        this.drawBox.getChildByName("sp" + this.index).graphics.moveTo(this.touchX, this.touchY),
        this.drawBox.getChildByName("sp" + this.index).graphics.lineTo(t, n),
        this.touchX = t,
        this.touchY = n
    },
    t.prototype.TouchEnd = function(e) {
        this.index++,
        Mode.endY = e.localY,
        console.log("endY=" + Mode.endY),
        this.drawBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin1, this),
        this.drawBox.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this),
        this.drawBox.removeEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this)
    },
    t.prototype.TouchOutSide = function(e) {
        this.index++,
        Mode.endY = e.localY,
        Mode.endY <= 0 && (Mode.endY = 0),
        Mode.endY >= 615 && (Mode.endY = 615),
        console.log("1----e:" + e.localY + "endY:" + Mode.endY)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(Draw2UI.prototype, "Draw2UI");
var DrawGuideUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        this.movie.initByTile("frame4_", "jpg", 40),
        this.movie.frame = 30,
        this.movie.play(1),
        this.addTapListener()
    },
    t.prototype.onTap = function(e) {
        switch (e.target) {
        case this.btn_start:
            console.log(Mode.isHelp),
            Mode.isHelp ? HttpManager.POST(Mode.serverUrl + "info", "&openid=" + Mode.openid + "&share_id=" + Mode.share_id,
            function(e) {
                var t = JSON.parse(e.target.response.trim());
                console.log(t),
                Mode.helpBeginY = t.data.endx,
                Mode.helpEndY = t.data.endy,
                Mode.friendImg = t.data.imgurl,
                Mode.userIcon = t.data.curr_header,
                Mode.friendIcon = t.data.headerimg,
                Mode.friendName = t.data.nickname,
                Mode.userName = t.data.curr_nickname,
                EventManager.dispatchEventWith(Mode.GOTO_DRAW2)
            },
            this) : EventManager.dispatchEventWith(Mode.GOTO_DRAW1);
            break;
        case this.btn_rule:
            PopManager.addPop(new RulePOP);
            break;
        case this.btn_rank:
            PopManager.addPop(new RankPOP)
        }
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(DrawGuideUI.prototype, "DrawGuideUI");
var EndUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t),
        this.img_icon1.mask = this.img_iconMask1,
        this.img_icon2.mask = this.img_iconMask2
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        setTimeout(function() {
            n.renderTexture = new egret.RenderTexture,
            n.imgRect = new egret.Rectangle(0, 0, 750, 1334),
            n.renderTexture.drawToTexture(n.group, n.imgRect),
            n.imageBase = n.renderTexture.toDataURL("image/png"),
            document.getElementById("savePhoto").src = n.imageBase,
            document.getElementById("savePhoto").style.display = "block",
            document.getElementById("savePhoto").style.opacity = "0"
        },
        500),
        document.getElementById("btn_start").style.display = "block",
        document.getElementById("btn_gift").style.display = "block",
        document.getElementById("btn_rank").style.display = "block",
        document.getElementById("btn_start").src = "resource/assets/img/preload/page7/page7_10.png",
        document.getElementById("btn_gift").src = "resource/assets/img/preload/page7/page7_8.png",
        document.getElementById("btn_rank").src = "resource/assets/img/preload/page7/page7_9.png",
        Tool.displayLikeObject(document.getElementById("btn_start"), this.btn_start),
        Tool.displayLikeObject(document.getElementById("btn_gift"), this.btn_gift),
        Tool.displayLikeObject(document.getElementById("btn_rank"), this.btn_rank),
        this.btn_start.visible = !1,
        this.btn_gift.visible = !1,
        this.btn_rank.visible = !1,
        document.getElementById("btn_start").addEventListener("click",
        function() {
            document.getElementById("savePhoto").style.display = "none",
            document.getElementById("btn_start").style.display = "none",
            document.getElementById("btn_gift").style.display = "none",
            document.getElementById("btn_rank").style.display = "none",
            Mode.isHelp = !1,
            EventManager.dispatchEventWith(Mode.GOTO_DRAW1)
        }),
        document.getElementById("btn_gift").addEventListener("click",
        function() {
            document.getElementById("savePhoto").style.display = "none",
            document.getElementById("btn_start").style.display = "none",
            document.getElementById("btn_gift").style.display = "none",
            document.getElementById("btn_rank").style.display = "none",
            PopManager.addPop(new GiftPOP),
            EventManager.addEventListener("popClose",
            function() {
                document.getElementById("savePhoto").style.display = "block",
                document.getElementById("btn_start").style.display = "block",
                document.getElementById("btn_gift").style.display = "block",
                document.getElementById("btn_rank").style.display = "block"
            },
            n)
        }),
        document.getElementById("btn_rank").addEventListener("click",
        function() {
            document.getElementById("savePhoto").style.display = "none",
            document.getElementById("btn_start").style.display = "none",
            document.getElementById("btn_gift").style.display = "none",
            document.getElementById("btn_rank").style.display = "none",
            PopManager.addPop(new RankPOP),
            EventManager.addEventListener("popClose",
            function() {
                document.getElementById("savePhoto").style.display = "block",
                document.getElementById("btn_start").style.display = "block",
                document.getElementById("btn_gift").style.display = "block",
                document.getElementById("btn_rank").style.display = "block"
            },
            n)
        }),
        this.img_icon1.source = Mode.friendIcon,
        this.img_icon2.source = Mode.userIcon,
        console.log(Mode.friendName),
        console.log(Mode.userName),
        this.txt_friendName.text = Mode.friendName,
        this.txt_userName.text = Mode.userName,
        this.txt_score.text = Mode.score,
        console.log("Mode.score=" + Mode.score),
        Mode.score >= 90 ? this.txt.source = "txt1_png": Mode.score >= 60 && Mode.score <= 89 ? this.txt.source = "txt2_png": Mode.score > 30 && Mode.score <= 59 ? this.txt.source = "txt3_png": Mode.score <= 30 && (this.txt.source = "txt4_png");
        var i = new egret.Bitmap(Mode.circle);
        i.x = 250,
        i.y = 627,
        i.width = 253,
        i.height = 259,
        this.group.addChildAt(i, 4),
        this.mov_rabbit.initByTile("rabbit_", "png", 16),
        this.mov_rabbit.frame = 16,
        this.mov_rabbit.play( - 1)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(EndUI.prototype, "EndUI");
var GiftPOP = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function() {
            EventManager.dispatchEventWith("popClose"),
            PopManager.removePop(n)
        },
        this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(GiftPOP.prototype, "GiftPOP");
var IndexUI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.video = document.getElementById("mainVideo"),
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        Tool.displayLikeObject(document.getElementById("muc"), this.img_music),
        this.img_music.visible = !1,
        Tool.displayLikeObject(document.getElementById("btn_skip"), this.btn_skip),
        this.btn_skip.visible = !1,
        document.getElementById("btn_skip").addEventListener("click",
        function() {
            document.getElementById("muc").style.display = "none",
            document.getElementById("btn_skip").style.display = "none",
            n.video.style.display = "none",
            console.log("GOTO_DRAWGUIDE_skip"),
            BgmManager.play(),
            SoundManager.pause("bgm1"),
            EventManager.dispatchEventWith(Mode.GOTO_DRAWGUIDE)
        }),
        this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function() {
            DeviceUtil.isAndroid() && (BgmManager.pause(), SoundManager.init("bgm1").play("bgm1")),
            n.cover.visible = !1,
            n.img_play.visible = !1,
            n.btn_play.visible = !1,
            document.getElementById("muc").style.display = "block",
            setTimeout(function() {
                document.getElementById("btn_skip").style.display = "block"
            },
            5e3),
            n.video.style.display = "block",
            n.video.play()
        },
        this),
        this.video.addEventListener("ended",
        function() {
            document.getElementById("muc").style.display = "none",
            document.getElementById("btn_skip").style.display = "none",
            n.video.style.display = "none",
            n.img.source = "frameEnd_png",
            n.img_go.visible = !0,
            BgmManager.play(),
            SoundManager.pause("bgm1"),
            n.addEventListener(egret.TouchEvent.TOUCH_BEGIN, n.touchBegin, n)
        })
    },
    t.prototype.touchBegin = function(e) {
        this.beginY = e.localY,
        console.log(this.beginY),
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this)
    },
    t.prototype.TouchEnd = function(e) {
        this.endY = e.localY,
        console.log(this.endY),
        this.beginY - this.endY >= 100 || this.beginY - this.endY <= -100 ? (this.video.style.display = "none", console.log("GOTO_DRAWGUIDE"), EventManager.dispatchEventWith(Mode.GOTO_DRAWGUIDE)) : this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(IndexUI.prototype, "IndexUI");
var LoadingUI = function(e) {
    function t() {
        var t = null !== e && e.apply(this, arguments) || this;
        return t.beforeRequestProgressMax = 100,
        t.defaultChecked = !1,
        t.defaultProgress = 0,
        t.beforeRequestCurrentProgress = 0,
        t.startRequest = !1,
        t.requestOffset = 0,
        t.requestProgress = 0,
        t.offset = 0,
        t.offsetRange = 0,
        t
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.call(this, t)
    },
    t.prototype.UIAdded = function() {
        e.prototype.UIAdded.call(this)
    },
    t.prototype.playAgain = function() {
        100 !== this.progess ? (this.loadingFrame.play(1), this.loadingFrame.addEventListener(EventManager.COMPLETE, this.playAgain, this)) : (Mode.openid = sessionStorage.openid, console.log("openid = " + Mode.openid), LocationProperty.getParam("share_id") && (console.log("share_id = " + LocationProperty.getParam("share_id")), Mode.share_id = LocationProperty.getParam("share_id"), Mode.share_id == Mode.openid ? (alert("不能分享给自己噢~"), Mode.isHelp = !1) : Mode.isHelp = !0), EventManager.dispatchEventWith(Mode.GOTO_INDEX))
    },
    t.prototype.onAdded = function() {
        if (e.prototype.onAdded.call(this), this.loadingFrame.frame = 20, this.loadingFrame.initByTile("loadingFrame", "jpg", 41), this.loadingFrame.play(1), this.loadingFrame.addEventListener(EventManager.COMPLETE, this.playAgain, this), this.beforeRequestProgressMax -= this.requestOffset, Mode.IMG_DFT) {
            var t = Mode.IMG_DFT.style,
            n = t.zIndex;
            t.zIndex = Number(getComputedStyle(Mode.DIV_EGRET).zIndex) - 1 + "",
            t.display = "none",
            t.zIndex = n
        }
        this.checkVConsole()
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this),
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this)
    },
    t.prototype.playBgm = function() {
        DeviceUtil.isMobile() && BgmManager.play()
    },
    t.prototype.loadResource = function() {
        this.checkDefault(),
        this.defaultChecked = !0,
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
        RES.loadGroup("preload")
    },
    t.prototype.onResourceProgress = function(e) {
        var t = e.itemsLoaded,
        n = e.itemsTotal;
        switch (e.groupName) {
        case "preload":
            this.setProgress(t, n)
        }
    },
    t.prototype.setProgress = function(e, t) {
        var n = this.getCurrentProgress(e, t);
        this.progess = n,
        this.loading_lbl_pros.text = n + "%"
    },
    t.prototype.httpRequest = function(e, t, n, i, o) {
        var r = this;
        o = o || "POST";
        var a = "POST" == o ? "&": "?",
        s = e.indexOf("http") > -1 ? e: Mode.REQUEST_URL + e;
        HttpManager[o](s, a + t,
        function(e) {
            var t = HttpManager.checkJson(e.target),
            o = t;
            n.call(i, o),
            r.checkRequest()
        },
        this)
    },
    t.prototype.request0 = function() {
        var e = Mode.customFest.game_value.val,
        t = "",
        n = "GET";
        this.httpRequest(e, t,
        function(e) {},
        this, n)
    },
    t.prototype.checkDefault = function() {
        this.defaultProgress++,
        this.setProgress(0, 0)
    },
    t.prototype.imageUrlRequest = function(e) {
        RES.getResByUrl(e, this.checkRequest, this)
    },
    t.prototype.checkRequest = function() {
        this.requestProgress++,
        this.setProgress(0, 0),
        this.requestProgress + this.beforeRequestCurrentProgress < 100 && this["request" + this.requestProgress]()
    },
    t.prototype.getCurrentProgress = function(e, t) {
        var n = 0;
        if (this.defaultChecked) if (this.startRequest) n = this.beforeRequestCurrentProgress + this.requestProgress;
        else {
            var i = this.defaultProgress;
            n = Math.floor(e / t * (this.beforeRequestProgressMax - i)) + i,
            n == this.beforeRequestProgressMax && (this.beforeRequestCurrentProgress = n, this.requestOffset > 0 && this.request0(), this.startRequest = !0)
        } else n = this.defaultProgress;
        return n
    },
    t.prototype.checkVConsole = function() {
        var e = this;
        this.checkDefault();
        var t = Mode.getVConsoleStatus();
        window.loadScript(Mode.CODE_PATH + "resource/js/third/VConsole-3.2.0.min.js" + Mode.SOURCE_VER, !1,
        function(n) {
            new window.VConsole;
            var i = function() {
                Mode.INPUT_DEBUG = document.getElementsByClassName("vc-cmd-input")[0],
                Mode.BUTTON_DEBUG = document.getElementsByClassName("vc-cmd-btn")[0],
                t.hide && (Mode.DIV_DEBUG.style.display = "none"),
                e.checkShare()
            },
            o = function() {
                return Mode.DIV_DEBUG = document.getElementById("__vconsole"),
                Mode.DIV_DEBUG ? void i() : void setTimeout(function(e) {
                    return o()
                },
                100)
            };
            o()
        },
        this)
    },
    t.prototype.checkShare = function() {
        var e = this;
        switch (this.checkDefault(), !0) {
        case DeviceUtil.isWeChat():
            window.mediaReady ? this.playBgm() : document.addEventListener("mediaReady", this.playBgm),
            window.wxConfigReady ? (window.wxConfigSuccessed && WeChatApi.editShareData(Mode.SHARE_DATA), this.checkFont()) : document.addEventListener("wxConfigReady",
            function(t) {
                window.wxConfigSuccessed && WeChatApi.editShareData(Mode.SHARE_DATA),
                e.checkFont()
            });
            break;
        case DeviceUtil.isTaobaoApp():
            Mode.REQUEST_URL = window.location.href.split("main.html")[0] + "api.php?a=";
            var t = function(e, t) {
                var n = document.createElement("meta");
                n.charset = "utf-8",
                n.setAttribute("id", "WV.Meta.Share." + e),
                n.setAttribute("value", t),
                document.head.appendChild(n)
            },
            n = function(e, t) {
                var n = document.createElement("meta");
                n.charset = "utf-8",
                n.setAttribute("name", e),
                n.content = t,
                document.head.appendChild(n)
            };
            t("Title", Mode.SHARE_DATA.title),
            t("Text", Mode.SHARE_DATA.desc),
            t("Image", Mode.SHARE_DATA.imgUrl),
            n("share-title", Mode.SHARE_DATA.title),
            n("share-intro", Mode.SHARE_DATA.desc),
            n("mobile-image", Mode.SHARE_DATA.imgUrl),
            this.checkFont();
            break;
        default:
            this.playBgm(),
            this.checkFont()
        }
    },
    t.prototype.checkFont = function() {
        var e = this;
        if (this.checkDefault(), !Mode.thirdLibMode.Font.load) return void this.checkOthers();
        var t = Mode.thirdLibMode.Font.key,
        n = 0,
        i = t.length,
        o = window.loadFont,
        r = window.flyCDNPath + Mode.thirdLibMode.Font.src,
        a = Mode.SOURCE_VER,
        s = function() {
            o(t[n], r, a,
            function(t) {
                return n++,
                i > n ? void s() : void e.checkOthers()
            },
            e)
        };
        s()
    },
    t.prototype.checkOthers = function() {
        var e = this,
        t = e.checkDefault,
        n = Mode.thirdLibMode,
        i = Object.keys(n),
        o = 1,
        r = i.length,
        a = window.loadScript,
        s = Mode.CODE_PATH,
        c = Mode.SOURCE_VER,
        h = function() {
            if (t.call(e), r > o) {
                var l = n[i[o]];
                return l.load ? void a(s + l.src + c, !1,
                function(e) {
                    o++,
                    h()
                }) : (o++, void h())
            }
            e.loadResource()
        };
        h()
    },
    t
} (BaseUI);
__reflect(LoadingUI.prototype, "LoadingUI");
var ProcessUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t),
        this._num = t[0],
        this.prem = t[1]
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        this.movie.initByTile("printer_", "png", 16),
        this.movie.frame = 16,
        this.movie.play( - 1),
        HttpManager.POST(Mode.serverUrl + "recode_res", "&openid=" + Mode.openid + "&link_openid=" + Mode.share_id + "&precent=" + this._num + "&img_all=" + encodeURIComponent(encodeURIComponent(this.prem)),
        function(e) {
            var t = JSON.parse(e.target.response.trim());
            console.log(t.msg),
            setTimeout(function() {
                EventManager.dispatchEventWith(Mode.GOTO_END),
                PopManager.removePop(n)
            },
            1500)
        },
        this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(ProcessUI.prototype, "ProcessUI");
var RankList = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t),
        this.obj = t[0]
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        console.log(1111111111),
        0 == this.obj.rank ? this.img_rank.source = "page11_23_png": 1 == this.obj.rank ? this.img_rank.source = "page11_21_png": 2 == this.obj.rank ? this.img_rank.source = "page11_19_png": this.img_rank.visible = !1,
        this.txt_rank.text = this.obj.rank + 1,
        console.log(this.obj.rank),
        this.txt_name.text = this.obj.name,
        this.img_icon.source = this.obj.icon,
        this.txt_score.text = this.obj.score + "%",
        this.img_photo.source = this.obj.img
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(RankList.prototype, "RankList");
var RankPOP = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        HttpManager.POST(Mode.serverUrl + "rank", "&openid=" + Mode.openid,
        function(e) {
            var t = JSON.parse(e.target.response.trim());
            console.log(t),
            console.log(1122);
            for (var i = 0; i < t.data.length; i++) {
                var o = new RankList({
                    rank: i,
                    name: t.data[i].nickname,
                    icon: t.data[i].headerimg,
                    score: t.data[i].precent,
                    img: t.data[i].img_all
                });
                n.group.addChild(o),
                o.touchEnabled = !0
            }
        }),
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function() {
            EventManager.dispatchEventWith("popClose"),
            PopManager.removePop(n)
        },
        this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(RankPOP.prototype, "RankPOP");
var RulePOP = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function() {
            PopManager.removePop(n)
        },
        this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(RulePOP.prototype, "RulePOP");
var SharePOP = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        var n = this;
        e.prototype.onAdded.call(this, t),
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,
        function() {
            PopManager.removePop(n)
        },
        this)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(SharePOP.prototype, "SharePOP");
var ShareUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t),
        this.init(),
        this.initObjects(),
        EventManager.once(EventManager.POP_IS_SHOW, this.startOpenTweens1, this),
        PopManager.addPop(this)
    },
    t.prototype.initObjects = function() {},
    t.prototype.startOpenTweens1 = function() {
        return this.addTapListener(),
        null
    },
    t.prototype.startCloseTweens1 = function() {
        return this.removeTapListener(),
        PopManager.removePop(this),
        null
    },
    t.prototype.onTap = function(e) {
        this.startCloseTweens1()
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t.prototype.init = function() {},
    t
} (BaseUI);
__reflect(ShareUI.prototype, "ShareUI");
var CopyIRUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t.prototype.dataChanged = function() {},
    t
} (BaseItemRenderer);
__reflect(CopyIRUI.prototype, "CopyIRUI");
var CopyUI = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    t.prototype.onCreate = function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        e.prototype.onCreate.apply(this, t)
    },
    t.prototype.onAdded = function(t) {
        e.prototype.onAdded.call(this, t)
    },
    t.prototype.onRemoved = function() {
        e.prototype.onRemoved.call(this)
    },
    t
} (BaseUI);
__reflect(CopyUI.prototype, "CopyUI");