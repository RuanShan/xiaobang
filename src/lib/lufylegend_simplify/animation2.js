import LGlobal from '@/lib/lufylegend/utils/LGlobal'
import LSprite from '@/lib/lufylegend/display/LSprite';
import LBitmap from '@/lib/lufylegend/display/LBitmap'
import LEvent from '@/lib/lufylegend/events/LEvent'
import { UNDEFINED } from '@/lib/lufylegend/utils/LConstant'

export default class LAnimation2 extends LSprite {

  constructor(ay, aC, ax, aA, aE, aD, aF, az, aB) {
    super()
    let aG = this;

    aG.type = "LAnimation2";
    aG.index = 0;
    aG.frameInc = 0;
    aG.loop = aA || "loop";
    aG.count = aB || 0;
    aG.fps = ax || 60 / 1000;
    if (Array.isArray(ay)) {
        aG.bitmapList = ay
    } else {
        aG.bitmapList = [ay]
    }
    aG.bitmap = new LBitmap(aG.bitmapList[0], aE, aD, aF, az);
    aG.imageArray = aC;
    aG.addChild(aG.bitmap);
    aG.index = 0;
    aG.addEventListener(LEvent.ENTER_FRAME, aG.onframe.bind(aG))
  }

  change(ay, aC, ax, aA, aE, aD, aF, az, aB) {
      var aG = this;
      if (ay) {
          if (Array.isArray(ay)) {
              aG.bitmapList = ay
          } else {
              aG.bitmapList = [ay]
          }
          aG.bitmap.bitmapData = aG.bitmapList[0]
      }
      aE && (aG.bitmap.x = aE);
      aD && (aG.bitmap.y = aD);
      aF && (aG.bitmap.width = aF);
      az && (aG.bitmap.height = az);
      aC && (aG.imageArray = aC);
      ax && (aG.fps = ax);
      aA && (aG.loop = aA);
      aG.index = 0;
      aG.frameInc = 0;
      aG.count = aB || 0
  }
  onframe() {
      var az = this,
      ax, aC = 0,
      aA = az.imageArray || az.bitmapList;
      if (az._ll_stop) {
          return
      }
      if (az.loop === "none") {
          return
      }
      if (az.bitmapList.length === 1 && (!aA || !Array.isArray(aA) || aA.length <= 1)) {
          return
      }
      if (az.index >= aA.length) {
          az.index = 0
      }
      az.frameInc += az.fps * LGlobal.delta;
      var ay = Math.floor(az.frameInc);
      var aB = az.index;
      az.index = ay % aA.length;
      if (az.bitmapList.length > 1 && az.index < az.bitmapList.length) {
          az.bitmap.bitmapData = az.bitmapList[az.index]
      }
      if (az.imageArray && Array.isArray(az.imageArray)) {
          ax = aA[az.index];
          if (typeof ax.dataIndex == "number" && Array.isArray(az.bitmapList) && ax.dataIndex < az.bitmapList.length) {
              az.bitmap.bitmapData = az.bitmapList[ax.dataIndex]
          }
          if (typeof ax.width != UNDEFINED && typeof ax.height != UNDEFINED) {
              az.bitmap.bitmapData.setProperties(ax.x, ax.y, ax.width, ax.height)
          } else {
              az.bitmap.bitmapData.setCoordinate(ax.x, ax.y)
          }
          if (typeof ax.sx != UNDEFINED) {
              aC = ax.sx
          }
          if (typeof ax.sy != UNDEFINED) {
              az.bitmap.y = ax.sy
          }
          if (typeof ax.mirror != UNDEFINED) {
              az.bitmap.rotateCenter = false;
              az.bitmap.scaleX = ax.mirror ? -1 : 1
          }
          az.bitmap.x = aC + (az.bitmap.scaleX == 1 ? 0 : az.bitmap.getWidth())
      }
      if (aB !== az.index && az.index === aA.length - 1) {
          az.dispatchEvent(LEvent.COMPLETE);
          if (typeof az.count == "number") {
              az.count++
          }
          if (typeof az.loop === "number") {
              az.loop--;
              if (az.loop <= 0) {
                  az.remove();
                  az.die()
              }
          }
      }
  }
  play() {
      this._ll_stop = false
  }
  stop() {
      this._ll_stop = true
  }
  clone() {
      var ay = this,
      ax = new ay.constructor(null, ay.bitmapList, ay.imageArray.slice(0));
      ax.copyProperty(ay);
      ax.childList.length = 0;
      ax.bitmap = ay.bitmap.clone();
      ax.addChild(ax.bitmap);
      return ax
  }
}
