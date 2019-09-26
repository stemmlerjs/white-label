
import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { UserId } from "../../users/domain/userId";

interface TraderProps {
  userId: UserId;
  reputation: number;
}

export class Trader extends AggregateRoot<TraderProps> {
  private constructor (props: TraderProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public create (props: TraderProps, id?: UniqueEntityID): Result<Trader> {
    return null;
  }
}