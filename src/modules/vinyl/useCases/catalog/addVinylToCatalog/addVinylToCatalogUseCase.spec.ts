// import { AddVinylToCatalogUseCase } from "./addVinylToCatalogUseCase";
// import { FakeVinylRepo } from "../../../repos/tests/fakes/fakeVinylRepo";
// import { TraderId } from "../../../../trading/domain/traderId";
// import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";
// import { Artist } from "../../../domain/artist";
// import { ArtistName } from "../../../domain/artistName";
// import { Vinyl, VinylCollection } from "../../../domain/vinyl";
// import { FakeArtistRepo } from "../../../repos/tests/fakes/fakeArtistRepo";
// import { Result } from "../../../../../core/logic/Result";

// let useCase: AddVinylToCatalogUseCase;
// let fakeVinylRepo: FakeVinylRepo;
// let fakeArtistRepo: FakeArtistRepo;
// let traderId: TraderId;
// let result: Result<Vinyl>;
// let collection: VinylCollection;

// describe('AddVinylToCatalogUseCase', () => {
//   beforeEach(() => {
//     traderId = TraderId.create(new UniqueEntityID('test-user'));
//     fakeVinylRepo = new FakeVinylRepo();
//     fakeArtistRepo = new FakeArtistRepo();

//     const nickCaveAndTheBadSeeds = Artist.create({
//       name: ArtistName.create('Nick Cave & The Bad Seeds').getValue(),
//       genres: []
//     }).getValue();

//     const sy = Artist.create({
//       name: ArtistName.create('Sonic Youth').getValue(),
//       genres: []
//     }).getValue();

//     const ghostFaceKillah = Artist.create({
//       name: ArtistName.create('Ghostface Killah').getValue(),
//       genres: []
//     }).getValue();

//     fakeVinylRepo.save(
//       Vinyl.create({
//         artist: nickCaveAndTheBadSeeds,
//         traderId
//       }).getValue()
//     )

//     fakeVinylRepo.save(
//       Vinyl.create({
//         title: 'Goo',
//         artist: sy,
//         genres: [],
//         traderId
//       }).getValue()
//     )

//     fakeVinylRepo.save(
//       Vinyl.create({
//         title: 'The Wallabee Champ',
//         artist: ghostFaceKillah,
//         genres: [],
//         traderId
//       }).getValue()
//     )

//     fakeArtistRepo.save(nickCaveAndTheBadSeeds);
//     fakeArtistRepo.save(sy);
//     fakeArtistRepo.save(ghostFaceKillah);
    
//     useCase = new AddVinylToCatalogUseCase(fakeVinylRepo, fakeArtistRepo);
//   })

//   it ('Should be able to add vinyl to a traders collection', async () => {

//     let errorOccurred = false;
//     try {
//       collection = await fakeVinylRepo.getVinylCollection(traderId.id.toString())
//       expect(collection.length).toEqual(3);

//       result = await useCase.execute({
//         traderId: traderId.id.toString(),
//         vinylName: 'Goo',
//         artistNameOrId: 'Sonic Youth',
//       });

//       expect(result.isSuccess).toBeTruthy();

//       collection = await fakeVinylRepo.getVinylCollection(traderId.id.toString())
//       expect(collection.length).toEqual(4);
      
//     } catch (err) {
//       errorOccurred = true;
//     }
    
//     expect(errorOccurred).toBeFalsy();

//   })
// })