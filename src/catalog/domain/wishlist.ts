
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Entity } from "../../core/domain/Entity";
import { Result } from "../../core/Result";
import { TraderId } from "../../trading/domain/traderId";
import { VinylCollection } from "./vinyl";
import { Guard } from "../../core/Guard";

interface WishlistProps { 
  traderId: TraderId;
  items: VinylCollection;
}

export class Wishlist extends Entity<WishlistProps> {
  private constructor (props: WishlistProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: WishlistProps, id?: UniqueEntityID): Result<Wishlist> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.traderId, argumentName: 'traderId' },
      { argument: props.items, argumentName: 'items' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Wishlist>(guardResult.message)
    } else {
      return Result.ok<Wishlist>(new Wishlist(props, id))
    }
  }
}