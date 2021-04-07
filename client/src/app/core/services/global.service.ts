import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  convertSpacesToHyphen(str: string) {
    return str.split(' ').join('-');
  }

  convertHypenToSpaces(str: string) {
    return str.split('-').join(' ');
  }
}
