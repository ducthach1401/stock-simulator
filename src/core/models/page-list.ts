import { Expose } from 'class-transformer';
import { ObjectCopier } from './object-copier';

export class PageList<T> extends ObjectCopier {
  public readonly page: number;

  @Expose({ name: 'total_count' })
  public readonly totalCount: number | undefined;

  public readonly data: T[];

  constructor(page: number, totalCount: number | undefined, data: T[]) {
    super();
    this.page = page;
    this.totalCount = totalCount;
    this.data = data;
  }
}
