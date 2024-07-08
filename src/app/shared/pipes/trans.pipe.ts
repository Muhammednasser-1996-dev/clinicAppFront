import { Pipe, PipeTransform } from '@angular/core';
import { Util } from 'src/app/app/utils/util';

@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  transform(value: any): any {
    return Util.trans(value ?? '');
  }

}
