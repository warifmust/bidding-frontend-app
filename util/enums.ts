export enum BidStatus {
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export type IBidStatus = BidStatus.ONGOING | BidStatus.COMPLETED;
