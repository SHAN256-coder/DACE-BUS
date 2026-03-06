export interface BoardingPoint {
  name: string;
  time: string;
}

export interface BusRoute {
  routeNumber: number;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  boardingPoints: BoardingPoint[];
  arrivalTime: string;
}
