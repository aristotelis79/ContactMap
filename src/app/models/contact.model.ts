import { IAddress } from './address.model';

export interface IContact {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  addresses: IAddress[];
}