import { FakeArtistRepo } from "./fakeArtistRepo";
import { Artist } from "../../../domain/artist";
import { ArtistName } from "../../../domain/artistName";
import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";

let repo: FakeArtistRepo;
let artist: Artist;

describe('FakeAristRepo', () => {
  beforeEach(() => {
    repo = null;
  })

  it ('Should be able to add an artist', () => {
    repo = new FakeArtistRepo();

    repo.addFakeItem(
      Artist.create({ 
        name: ArtistName.create('The Smashing Pumpkins').getValue(),
        genres: []
      }).getValue()
    );

    expect(repo['_items'].length).toBe(1);
  })

  it('Should be able to find an artist by name', async () => {
    repo = new FakeArtistRepo();

    repo.addFakeItem(
      Artist.create({ 
        name: ArtistName.create('The Smashing Pumpkins').getValue(),
        genres: []
      }).getValue()
    );

    repo.addFakeItem(
      Artist.create({ 
        name: ArtistName.create('MF DOOM').getValue(),
        genres: []
      }).getValue()
    );

    artist = await repo.findByArtistName('The smashing pumpkins');

    expect(artist).toBeTruthy();

    artist = await repo.findByArtistName('mf doom');

    expect(artist).toBeTruthy();
    expect(artist.name.value).toEqual('MF DOOM')
  })

  it('Should be able to find an artist by id', async () => {
    repo = new FakeArtistRepo();

    repo.addFakeItem(
      Artist.create({ 
        name: ArtistName.create('The Smashing Pumpkins').getValue(),
        genres: []
      }, new UniqueEntityID('fake-uuid')).getValue()
    );

    repo.addFakeItem(
      Artist.create({ 
        name: ArtistName.create('MF DOOM').getValue(),
        genres: []
      }).getValue()
    );

    artist = await repo.findById('fake-uuid');

    expect(artist).toBeTruthy();
    expect(artist.name.value).toEqual('The Smashing Pumpkins');
  })
})