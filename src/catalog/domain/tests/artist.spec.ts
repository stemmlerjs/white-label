import { Result } from "../../../core/Result";
import { Artist } from "../artist";
import { ArtistName } from "../artistName";

let artistOrError: Result<Artist>;
let artist: Artist;

describe('Artist', () => {
  beforeEach (() => {
    artist = null;
    artistOrError = null;
  })

  it ('Should be able to be created w/o genres', () => {
    artistOrError = Artist.create({
      name: ArtistName.create('Nick Cave & The Bad Seeds').getValue(),
      genres: []
    });

    expect(artistOrError.isSuccess).toBeTruthy();
  })
})