
module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define('artist', {
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
    timestamps: true,
    underscored: true, 
    tableName: 'artist'
  });

  Artist.associate = (models) => {
    Artist.hasMany(models.Album, { foreignKey: 'artist_id', sourceKey: 'artist_id', as: 'Artist' })
    Artist.belongsToMany(models.Genre, { as: 'ArtistGenres', through: models.TagArtistGenre, foreignKey: 'genre_id'});
  }

  return Artist;
};
