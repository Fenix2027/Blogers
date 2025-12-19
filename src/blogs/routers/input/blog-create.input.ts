import { ResourceType } from '../../../core/types/resource-type';
import { BlogsAttributes } from '../../application/dtos/blogs.attributes';


export type BlogCreateInput = {
  data: {
    type: ResourceType.Blogs;
    attributes: BlogsAttributes;
  };
};
