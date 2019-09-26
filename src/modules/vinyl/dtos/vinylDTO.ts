
interface GenreDTO {
  genre_id: string;
  name: string;
}

interface ArtistDTO {
  artist_id: string;
  name: string;
  artist_image: string;
  genres?: GenreDTO[];
}

export interface VinylDTO {
  vinyl_id: string;
  trader_id: string;
  title: string;
  artwork_image: string;
  artist: ArtistDTO;
  dateAdded: string;
  genres: GenreDTO[];
}