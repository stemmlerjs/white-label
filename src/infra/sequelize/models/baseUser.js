
module.exports = function(sequelize, DataTypes) {
  const BaseUser = sequelize.define('base_user', {
    base_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'base_user',
    indexes: [
      { unique: true, fields: ['user_email'] },
    ]
  });

  BaseUser.associate = (models) => {
    BaseUser.hasOne(models.Trader, { as: 'Trader', foreignKey: 'trader_base_id' })
  }

  return BaseUser;
};
