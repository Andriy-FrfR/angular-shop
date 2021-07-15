import { DownloadUrl } from 'src/app/load/shared/interfaces/download-url.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortImgByIndex'
})
export class SortImgByIndexPipe implements PipeTransform {

  transform(arr: DownloadUrl[]): DownloadUrl[] {
    return arr.sort((a, b) => {
      return a.index - b.index;
    });
  }

}
