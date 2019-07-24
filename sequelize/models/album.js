
module.exports = function(sequelize, DataTypes) {
  const Album = sequelize.define('album', {
    album_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    artist_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'artist',
        key: 'artist_id'
      }, 
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year_released: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    artwork: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'album'
  });

  Album.associate = (models) => {
    Album.belongsTo(models.Artist, { foreignKey: 'album_id', sourceKey: 'album_id', as: 'Artist' })
    Album.belongsToMany(models.Genre, { as: 'AlbumGenres', through: models.TagAlbumGenre, foreignKey: 'genre_id'});
  }

  return Album;
};
