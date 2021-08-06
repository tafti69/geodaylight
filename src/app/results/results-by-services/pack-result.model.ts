import { PackResultByDate } from './pack-result-by-date.model';

export class PackResult {
  results: PackResultByDate[];
  total: number;
  totalHours: number;
  date: string;
}
