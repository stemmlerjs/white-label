
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vinyl', {
    vinyl_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    artist_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'artist',
        key: 'artist_id'
       },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
  },{
    timestamps: true,
    underscored: true,
    tableName: 'vinyl'
  });
};
