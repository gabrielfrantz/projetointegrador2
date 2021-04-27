module.exports = (sequelize, DataTypes) => {
  const Assinatura = sequelize.define('Assinatura', {
    nom_assinatura: {
      type: DataTypes.STRING
    },
    vlr_assinatura: {
      type: DataTypes.DECIMAL
    },
    ind_periodo: {
      type: DataTypes.STRING
    },
    ind_visivel: {
      type: DataTypes.STRING
    }
  })

  return Assinatura
}
