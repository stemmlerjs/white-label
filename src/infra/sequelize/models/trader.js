
module.exports = function(sequelize, DataTypes) {
  const Trader = sequelize.define('trader', {
    trader_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    trader_base_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'base_user',
        key: 'base_user_id'
      }, 
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'trader'
  });

  Trader.associate = (models) => {
    Trader.belongsTo(models.BaseUser, { foreignKey: 'trader_base_id', targetKey: 'base_user_id', as: 'BaseUser' })
  }

  return Trader;
};
