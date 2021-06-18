module.exports = (sequelize, DataTypes) => {
  const FormaPagamento = sequelize.define('FormaPagamento', {
    nom_forma_pgto: {
      type: DataTypes.STRING
    }
  })

  return FormaPagamento
}
