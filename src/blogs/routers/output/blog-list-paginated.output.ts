import { BlogDataOutput } from './blog-data.output';

export type BlogListPaginatedOutput = {
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
  items: BlogDataOutput[];
};
