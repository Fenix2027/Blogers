import { ResourceType } from '../../../core/types/resource-type';
import { BlogsAttributes } from '../../application/dtos/blogs.attributes';


export type BlogUpdateInput = {
    id: string;
  name: string;
  description: string;
  websiteUrl: string;
};
