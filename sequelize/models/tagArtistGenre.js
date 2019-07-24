
module.exports = function(sequelize, DataTypes) {
  const TagArtistGenre = sequelize.define('tag_artist_genre', {
    tag_artist_genre: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    artist_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: 'artist',
        key: 'artist_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      unique: 'unique-genre-per-artist'
    },
    genre_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: 'genre',
        key: 'genre_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      unique: 'unique-genre-per-artist'
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'tag_artist_genre'
  });

  TagArtistGenre.associate = (models) => {
    TagArtistGenre.belongsTo(models.Artist, { foreignKey: 'artist_id', targetKey: 'artist_id', as: 'Artist' });
    TagArtistGenre.belongsTo(models.Genre, { foreignKey: 'genre_id', targetKey: 'genre_id', as: 'Genre' });
  }

  return TagArtistGenre;
};
