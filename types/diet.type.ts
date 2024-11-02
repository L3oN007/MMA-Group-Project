export interface IDiet {
  name: string;
  dietCost: number;
  description: string;
}

export interface IConsignment {
  isConsign: boolean;
  selectedDiet: IDiet | null;
  startDate: Date;
  endDate: Date;
  duration: number;
  estimatedCost: number;
}

export interface IConsignments {
  [fishId: string]: IConsignment;
}