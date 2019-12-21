require('../env')

const {
  SharedTerm, sequelize
} = require('../server/models')


SharedTerm.rebuildHierarchy()
