
import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { TraderId } from "../../trading/domain/traderId";
import { VinylCollection } from "./vinyl";
import { Guard } from "../../core/Guard";

interface CatalogProps {
  traderId: TraderId;
  items: VinylCollection;
}

export class Catalog extends Entity<CatalogProps> {
  private constructor (props: CatalogProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: CatalogProps, id?: UniqueEntityID): Result<Catalog> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.traderId, argumentName: 'traderId' },
      { argument: props.items, argumentName: 'items' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Catalog>(guardResult.message)
    } else {
      return Result.ok<Catalog>(new Catalog(props, id));
    }
  }
}