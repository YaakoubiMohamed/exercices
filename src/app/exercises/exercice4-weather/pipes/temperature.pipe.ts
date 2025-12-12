import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'C' | 'F' = 'C'): string {
    if (value === null || value === undefined) {
      return '--°' + unit;
    }
    
    let temp = value;
    if (unit === 'F') {
      temp = (value * 9/5) + 32;
    }
    return `${Math.round(temp)}°${unit}`;
  }
}
