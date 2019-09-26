
module.exports = function(sequelize, DataTypes) {
  const TagAlbumGenre = sequelize.define('tag_album_genre', {
    tag_album_genre: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    album_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: false,
      references: {
        model: 'album',
        key: 'album_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      unique: 'unique-genre-per-album'
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
      unique: 'unique-genre-per-album'
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'tag_album_genre'
  });

  TagAlbumGenre.associate = (models) => {
    TagAlbumGenre.belongsTo(models.Album, { foreignKey: 'album_id', targetKey: 'album_id', as: 'Album' });
    TagAlbumGenre.belongsTo(models.Genre, { foreignKey: 'genre_id', targetKey: 'genre_id', as: 'Genre' });
  }

  return TagAlbumGenre;
};
