export interface UserProps {
  user: {
    avatar: string | undefined;
    id: string;
    name: string;
    email: string;
    telephone: string;
    date: string;
    time: string;
  };
}

export interface IFormList {
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}
