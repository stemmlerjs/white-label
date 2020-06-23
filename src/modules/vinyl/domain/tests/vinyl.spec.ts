// import { Vinyl } from "../vinyl";
// import { Result } from "../../../../core/logic/Result";
// import { Artist } from "../artist";
// import { ArtistName } from "../artistName";
// import { TraderId } from "../../../trading/domain/traderId";
// import { Genre } from "../genre";

// let vinylOrError: Result<Vinyl>;
// let vinyl: Vinyl;
// let artistOrError: Result<Artist>;
// let artist: Artist;

// describe ('Vinyl', () => {
//   beforeEach(() => {
//     vinylOrError = null;
//     vinyl = null;
//     artistOrError = Artist.create({ 
//       name: ArtistName.create('Sonic Youth').getValue(),
//       genres: []
//     });
//     artist = artistOrError.getValue();
//   })

//   it('Should be able to be created w/o genres', () => {
//     vinylOrError = Vinyl.create({ 
//       title: 'Goo',
//       artist: artist,
//       genres: [],
//       traderId: TraderId.create()
//     });

//     expect(vinylOrError.isSuccess).toBeTruthy();
//     vinyl = vinylOrError.getValue();
//     expect(vinyl).toBeTruthy();
//   });

//   it ('Should be able to add genres to a vinyl', () => {
//     vinylOrError = Vinyl.create({ 
//       title: 'Goo',
//       artist: artist,
//       genres: [],
//       traderId: TraderId.create()
//     });
//     vinyl = vinylOrError.getValue();

//     // Add several genres
//     vinyl.addGenre(Genre.create('Post-punk').getValue());
//     vinyl.addGenre(Genre.create('New wave').getValue());
//     vinyl.addGenre(Genre.create('No wave').getValue());

//     expect(vinyl.genres.length).toBe(3);
//   })

// })

describe("", () => {
  it("", () => {})
});