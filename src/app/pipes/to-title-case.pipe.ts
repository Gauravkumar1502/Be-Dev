import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTitleCase',
  standalone: true
})
export class ToTitleCasePipe implements PipeTransform {

  transform(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
