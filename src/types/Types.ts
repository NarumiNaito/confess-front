export interface InputsLogin {
  email: string;
  password: string;
}

export interface InputsRegister {
  name: string;
  email: string;
  password: string;
  reenter: string;
}

export interface Post {
  id: number;
  category_name: string;
  content: string;
  forgives_count: number;
  is_like: boolean;
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

export interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}
