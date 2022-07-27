import {
  Registered,
  Seized,
  Underwritten,
  Waffy,
} from '../generated/Waffy/Waffy';
import { Account, Seized as SeizedSchema, Bid } from '../generated/schema';
import { FACTORY_ADDRESS, ZERO_BD, ONE_BD, ZERO_BI } from './constants';

export function handleRegistered(event: Registered): void {
  let user = Account.load(event.params.owner.toHex());
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;

  if (!user) {
    user = new Account(event.params.owner.toHex());
    user.blockNumber = event.block.number;
    user.owner = event.params.owner;
    user.name = event.params.name;
    user.date = dayStartTimestamp;

    user.save();
  }
}

export function handleUnderwritten(event: Underwritten): void {
  let bid = Bid.load(FACTORY_ADDRESS);

  if (bid === null) {
    bid = new Bid(FACTORY_ADDRESS);
    bid.totalBidsCreated = ZERO_BD;
    bid.bidsVolumeMATIC = ZERO_BI;
    bid.interestPaidMATIC = ZERO_BI;
  }

  const contract = Waffy.bind(event.address);

  const loan = contract.getLoan(event.params.id);
  const interest = loan.lastInterestPaid;

  bid.totalBidsCreated = bid.totalBidsCreated.plus(ONE_BD);
  bid.bidsVolumeMATIC = bid.bidsVolumeMATIC.plus(event.params.amount);
  bid.interestPaidMATIC = bid.interestPaidMATIC.plus(interest);
  bid.save();
}

export function handleSeized(event: Seized): void {
  const entity = new SeizedSchema(
    event.params.seizer.toHex() + '-' + event.params.id.toString()
  );

  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;

  entity.blockNumber = event.block.number;
  entity.index = event.params.id;
  entity.seizer = event.params.seizer;
  entity.date = dayStartTimestamp;

  entity.save();
}
