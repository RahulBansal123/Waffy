import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Cancelled,
  Created,
  Drawn,
  Registered,
  Repaid,
  Seized,
  Underwritten
} from "../generated/Waffy/Waffy"

export function createCancelledEvent(id: BigInt): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return cancelledEvent
}

export function createCreatedEvent(id: BigInt, sender: Address): Created {
  let createdEvent = changetype<Created>(newMockEvent())

  createdEvent.parameters = new Array()

  createdEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return createdEvent
}

export function createDrawnEvent(id: BigInt): Drawn {
  let drawnEvent = changetype<Drawn>(newMockEvent())

  drawnEvent.parameters = new Array()

  drawnEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return drawnEvent
}

export function createRegisteredEvent(owner: Address, name: Bytes): Registered {
  let registeredEvent = changetype<Registered>(newMockEvent())

  registeredEvent.parameters = new Array()

  registeredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromFixedBytes(name))
  )

  return registeredEvent
}

export function createRepaidEvent(id: BigInt, sender: Address): Repaid {
  let repaidEvent = changetype<Repaid>(newMockEvent())

  repaidEvent.parameters = new Array()

  repaidEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  repaidEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return repaidEvent
}

export function createSeizedEvent(id: BigInt, seizer: Address): Seized {
  let seizedEvent = changetype<Seized>(newMockEvent())

  seizedEvent.parameters = new Array()

  seizedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  seizedEvent.parameters.push(
    new ethereum.EventParam("seizer", ethereum.Value.fromAddress(seizer))
  )

  return seizedEvent
}

export function createUnderwrittenEvent(
  id: BigInt,
  sender: Address,
  amount: BigInt
): Underwritten {
  let underwrittenEvent = changetype<Underwritten>(newMockEvent())

  underwrittenEvent.parameters = new Array()

  underwrittenEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  underwrittenEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  underwrittenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return underwrittenEvent
}
