export interface IEvent {
  id: number;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  public: boolean;
  logo?: string;
}
