import { Observable } from 'rxjs';

export interface DownloadUrlAsync {
  urlObs: Observable<string>;
  index: number;
}
