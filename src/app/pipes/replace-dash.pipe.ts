import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDash',
})
export class ReplaceDashPipe implements PipeTransform {
  transform(value: string, regexValue: string, replaceValue: string): any {
    const regex = new RegExp(regexValue, 'g');
    return value.replace(regex, replaceValue);
  }
}
