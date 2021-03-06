
const m_debug = false

const Log = {
  tlog: function(logFlag, logStr) {
    // if (/log/.test(g_config.testCMD)) {
    //   HdGame.logStd(logFlag, logStr)
    // }
    this._log(logFlag, logStr)
  },
  tlogErr: function(logFlag, logStr) {
    this._log(logFlag, logStr, true)
  },
  _log: function(logFlag, logStr, isErr) {
    if (!m_debug) {
       return
    }

    let s = logFlag+':'+logStr
    console.debug( s )
  }
}

export default Log
