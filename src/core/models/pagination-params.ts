export class PaginationParams {
  page: number;
  limit: number;
  needTotalCount: boolean;
  onlyCount: boolean;

  constructor(page = 1, limit = 10, needTotalCount = true, onlyCount = false) {
    this.page = page;
    this.limit = limit;
    this.onlyCount = onlyCount;
    this.needTotalCount = onlyCount ? true : needTotalCount;
  }
}
