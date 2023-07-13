import { FeaturedPost, Post } from "@prisma/client"

export interface IFeaturedPost extends FeaturedPost {
  post: Post
}
