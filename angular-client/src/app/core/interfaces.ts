export interface IUserInfo {
  _id: string;
  token: string;
  name: string;
}

export interface IHint {
  _id: string;
  title: string;
  tags: string[];
  author: string;
  user_id: string;
  slug: string;
  date: Date;
}
