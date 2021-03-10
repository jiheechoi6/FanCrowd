import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacesToHyphen',
})
export class SpacesToHyphenPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').join('-');
  }
}
