import { ResourceType } from '../../../core/types/resource-type';
import { BlogsAttributes } from '../../application/dtos/blogs.attributes';


export type BlogUpdateInput = {
  data: {
    type: ResourceType.Blogs;
    id: string;
    attributes: BlogsAttributes;
  };
};
