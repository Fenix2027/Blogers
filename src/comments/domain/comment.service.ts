import { commentRepository } from '../infrastructure/comments.repository';
import { CommentsView } from '../types/comments.view';
import { CommentUpdateInput } from '../input/comment-update.input';
import { PostAttributes } from '../../posts/application/dtos/post-attributes';
import { blogsRepository } from '../../blogs/repositories/blogsRepository';
import { Post } from '../../posts/domain/post';
import { postRepository } from '../../posts/repositories/postRepository';
import { usersQwRepository } from '../../users/infrastructure/user.query.repository';
import { WithId } from 'mongodb';

export const commentService = {
  async findByIdOrFail(id:string): Promise<WithId<CommentsView>>  {

    return await commentRepository.findById(id);

  },
  async delete(id: string): Promise<void> {

    await commentRepository.delete(id);
    return;
  },
    async createComment(content: string, postId: string, userId: string): Promise<string> {
      // 1. Ищем пользователя-автора по userId (который пришел из JWT токена)
      const user = await usersQwRepository.findById(userId);

      if (!user) throw new Error('User not found');
     const x = new Date()
      const newComment: any = {
        postId: postId,// ОБЯЗАТЕЛЬНО сохраняем, к какому посту коммент
        content: content,
        commentatorInfo: {
          userId: user.id,
          userLogin: user.login,
        },
        createdAt: x.toISOString(),
      };

      // 2. Сохраняем в репозиторий
      const createdId = await commentRepository.create(newComment);
      return createdId;
    },

  async create(dto: PostAttributes): Promise<string> {
    const blog = await blogsRepository.findByIdOrFail(dto.blogId);
    const x = new Date();
    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      createdAt: x.toISOString(),
      blogId: blog._id.toString(),
      blogName: blog.name,
    };

    return postRepository.create(newPost);
  },


  async update(id: string, dto: CommentUpdateInput): Promise<void> {

    await commentRepository.update(id, dto);
    return;
  },
};