import { SortDir } from 'src/core/enums/sort-dir';

export class SortParams {
  sort: string;
  dir: SortDir;

  constructor(sort = 'id', dir: SortDir = SortDir.asc) {
    this.sort = sort;
    this.dir = dir;
  }
}
