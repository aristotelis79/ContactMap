import { IAddress } from './address.model';

export interface IMarker {
  fullName: string;
  addressIndex: number;
  address: IAddress;
}