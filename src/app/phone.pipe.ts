import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneFilter' })
export class PhoneFilterPipe implements PipeTransform {
  transform(value: string): string {
    return value ? (value = '+' + value) : '';
  }
}
