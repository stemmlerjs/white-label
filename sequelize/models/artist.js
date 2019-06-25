
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('artist', {
    artist_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    artist_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  },{

    /**
     * Tell sequelize to add "createdAt" and "updatedAt" columns.
     */

    timestamps: true,
    
    /**
     * Force sequelize to use underscored auto-generated column names.
     * Therefore: createdAt, updatedAt => created_at, updated_at
     */

    underscored: true, 
    tableName: 'artist'
  });
};
