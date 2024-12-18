export interface InputsLogin {
  email: string;
  password: string;
}

export interface InputsDelete {
  id: string | undefined;
  email: string;
  password: string;
}

export interface InputsRegister {
  name: string;
  email: string;
  password: string;
  reenter: string;
}

export interface InputsProfile {
  name: string;
  image: string;
}
export interface Post {
  id: number;
  user_id: number;
  category_name: string;
  content: string;
  forgives_count: number;
  is_like: boolean;
  is_bookmarks: boolean;
  comment_count: number;
  name: string;
  image: string;
  created_at: string;
}

export interface Comment {
  id: number;
  user_id: string;
  post_id: string;
  content: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: string;
  post_id: string;
  forgive_id: number;
  comment_id: number;
  content: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  type: string;
  postName: string;
  userImage: string;
}
export interface PostInputs {
  category_id: string;
  content: string;
}

export interface CurrentPage {
  last_page: number;
}

export interface Comment {}

export interface ForgiveState {
  [key: number]: { forgive: boolean; forgiveCount: number };
}

export interface BookMarkState {
  [key: number]: { bookmark: boolean };
}

export interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}
