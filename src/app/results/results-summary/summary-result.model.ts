import { Summary } from './summary.model';

export class SummaryResult {
  summaries: Summary[];
  total: number;
  year: string;
  totalHours: number;
  totalBank: number;
}
