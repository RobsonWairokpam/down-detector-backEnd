import { IPaginationQuery } from './pagination.interface';

export const convertPaginationQuery = (
  query: IPaginationQuery,
): { skip: number; take: number } => {
  const take = query.pageSize;
  const skip = Math.max(query.pageNo - 1, 0) * take;

  return {
    skip,
    take,
  };
};
