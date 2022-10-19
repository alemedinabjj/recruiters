import { Form } from "../components/Form";
import { Sidebar } from "../components/Sidebar";

export const Home = ({ user }: any) => {
  return (
    <>
      <Form user={user} />
    </>
  );
};
