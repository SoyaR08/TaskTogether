import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: number): number[] {
    value = Number(value); // Asegura que es un número
    if (isNaN(value) || value < 1) return [];
    return Array.from({ length: value }, (_, i) => i + 1);
  }

}
