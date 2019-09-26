
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Entity } from "../../../core/domain/Entity";
import { TraderId } from "../../trading/domain/traderId";
import { VinylCollection, Vinyl } from "./vinyl";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface WishlistProps { 
  traderId: TraderId;
  items: VinylCollection;
}

export class Wishlist extends Entity<WishlistProps> {
  private constructor (props: WishlistProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private alreadyAdded (vinyl: Vinyl): boolean {
    const found = this.props.items.find((v) => v.id.equals(vinyl.id));
    return !!found === true;
  }

  public addItem (vinyl: Vinyl): void {
    if (!this.alreadyAdded(vinyl)) {
      this.props.items.push(vinyl);
    }
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