
module.exports = function(sequelize, DataTypes) {
  const Genre = sequelize.define('genre', {
    genre_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'genre'
  });

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Artist, { as: 'ArtistGenres', through: models.TagArtistGenre, foreignKey: 'genre_id' });
    Genre.belongsToMany(models.Album, { as: 'AlbumGenres', through: models.TagAlbumGenre, foreignKey: 'genre_id' });
  }

  return Genre;
};
