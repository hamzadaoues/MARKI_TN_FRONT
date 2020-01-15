import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minimizeLength'
})
export class MinimizeLengthPipe implements PipeTransform {

  transform(description: string, length?: number): any {
    return length ?
      (description.length > length ? description.substr(0, length) + '...' : description)
      : (description.length > 100 ? description.substr(0, 100) + '...' : description);
  }
}
