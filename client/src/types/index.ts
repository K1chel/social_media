export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  links: string[];
  followers: string[];
  following: string[];
  likedPosts: string[];
  savedPosts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: string;
  postedBy: IUser["_id"];
  text?: string;
  imageSrc?: string;
  likes: IUser["_id"][];
  saves: IUser["_id"][];
  comments: {
    text: string;
    commentBy: IUser["_id"];
  }[];
  createdAt: string;
  updatedAt: string;
}
