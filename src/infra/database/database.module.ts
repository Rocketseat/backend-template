import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PrismaPostsRepository } from './prisma/repositories/prisma-posts-repository';
import { PostRepository } from './repositories/posts-repository';

import { PrismaPostTagsRepository } from './prisma/repositories/prisma-post-tags-repository';
import { PostTagsRepository } from './repositories/post-tags-repository';

import { PrismaTagsRepository } from './prisma/repositories/prisma-tags-repository';
import { TagRepository } from './repositories/tag-repository';

import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { UserRepository } from './repositories/users-repository';

import { PrismaLinksPreviewRepository } from './prisma/repositories/prisma-links-preview-repository';
import { LinkPreviewRepository } from './repositories/link-preview-repository';

@Module({
  providers: [
    PrismaService,
    { provide: PostTagsRepository, useClass: PrismaPostTagsRepository },
    { provide: PostRepository, useClass: PrismaPostsRepository },
    { provide: TagRepository, useClass: PrismaTagsRepository },
    { provide: UserRepository, useClass: PrismaUsersRepository },
    { provide: LinkPreviewRepository, useClass: PrismaLinksPreviewRepository },
  ],
  exports: [
    PrismaService,
    PostTagsRepository,
    PostRepository,
    TagRepository,
    UserRepository,
    LinkPreviewRepository,
  ],
})
export class DatabaseModule {}
