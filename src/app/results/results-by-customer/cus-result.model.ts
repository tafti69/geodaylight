import { CustomerResultByDate } from './customer-result-by-date.model';

export class CusResult {
  results: CustomerResultByDate[];
  total: number;
  totalHours: number;
  date: string;
  filterApplied: boolean;
}
