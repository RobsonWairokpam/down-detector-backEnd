export type IPaginationQuery = {
  pageNo: number;
  pageSize: number;
};

export type IPaginationData<T> = {
  data: T[];
  count: number;
  query: IPaginationQuery;
};

export interface ClassType<T = any> {
  new (...args: any[]): T;
}
