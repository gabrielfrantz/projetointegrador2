module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    id_assinatura_usuario: {
      type: DataTypes.INTEGER
    },
    id_forma_pgto: {
      type: DataTypes.INTEGER
    },
    vlr_pgto: {
      type: DataTypes.DECIMAL
    }
  })

  Pagamento.associate = models => {
    Pagamento.belongsTo(models.UsuarioAssinatura, {
      foreignKey: {
        allowNull: false
      }
    }),
    Pagamento.belongsTo(models.FormaPagamento, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Pagamento
}
