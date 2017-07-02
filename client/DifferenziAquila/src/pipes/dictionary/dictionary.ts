import { Pipe, PipeTransform } from '@angular/core';
import {DictionaryService} from '../../providers/dictionary-service/dictionary-service';

/**
 * Generated class for the DictionaryPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dictionary'
})
export class DictionaryPipe implements PipeTransform {

  constructor(private sDict: DictionaryService) {}

  transform(value, ...args) {
    return this.sDict.get(value);
  }
}


