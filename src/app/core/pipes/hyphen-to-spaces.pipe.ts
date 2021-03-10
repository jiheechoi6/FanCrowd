import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenToSpaces',
})
export class HyphenToSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-').join(' ');
  }
}
