import { Sale } from '../models/Sale';

export interface SaleChange extends Sale{
    columnChanged: string
}