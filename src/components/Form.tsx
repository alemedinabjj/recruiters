import { useEffect, useState } from "react";
import api from "../config/api";
import { Card } from "./Card";
import { v4 as uuidv4 } from "uuid";
import Notifications from "./Notifications";
import { UserProps, IFormList } from "../types/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";
import sendEmail from "../services/sendMail";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  telephone: yup.string().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
  time: yup.string().required("Campo obrigatório"),
});

export const Form = ({ user }: UserProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [formList, setFormList] = useState<IFormList[]>([]);
  const [success, setSuccess] = useState(false);

  const submitForm = async (values: any) => {
    const { name, email, telephone, message, date, time } = values;

    const newForm = {
      id: uuidv4(),
      name,
      email,
      telephone,
      message,
      date,
      time,
    };

    setFormList([...formList, newForm]);

    await api.addNewForm(
      {
        ...newForm,
      },
      user
    );

    sendEmail(values, user);
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  useEffect(() => {
    const getForm = async () => {
      const response = await api.showForm(user);
      const data = response[0].forms;

      const results = data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          telephone: item.telephone,
          date: item.date,
          time: item.time,
          message: item.message,
          // cv: item.cv,
        };
      });

      setFormList(results);
      console.log(response[0].forms.map((form: any) => form));
    };
    getForm();
  }, [user]);

  return (
    <>
      {success && <Notifications message="Entrevista salva!" text="A entrevista foi salva" />}
      <div className="w-full px-5 md:px-20 mx-auto max-w-7xl">
        <div className="md:flex w-full pt-6  mt-5 gap-7 px-4 sm:px-6 lg:px-8 py-10">
          <form action="index.html" method="POST" className="bg-white shadow-md rounded px-8 pb-8 pt-2  w-full" onSubmit={handleSubmit(submitForm)}>
            <Input label="Nome" id="name" type="text" error={errors.name?.message} {...register("name")} />
            <br />
            <Input label="Email" id="email" type="email" error={errors.email?.message} {...register("email")} />
            <br />
            <Input label="Telefone" id="telephone" type="text" error={errors.telephone?.message} {...register("telephone")} />
            <br />
            <Input label="Data" id="date" type="date" error={errors.date?.message} {...register("date")} />
            <br />
            <Input label="Horário" id="time" type="time" error={errors.time?.message} {...register("time")} />
            <br />

            <br />
            <label htmlFor="mensagem" className="block text-gray-700 text-sm font-bold mb-2">
              Mensagem (opcional):
            </label>
            <textarea
              id="mensagem"
              {...register("message")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <br />
            <input
              type="submit"
              value="Agendar Entrevista"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            />
          </form>
          <div className="w-full bg-black rounded text-white flex items-start flex-col">
            <div className="flex items-center">
              <div>
                <img
                  src={user?.avatar ? user?.avatar : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                  alt="logo"
                  className="w-32 h-32 rounded-full p-5 mx-auto object-cover"
                />
              </div>
              <div>
                <h1>Olá {user.name},</h1>
                <h3>
                  Você tem um total de <span className="text-blue-500">{formList.length}</span> agendamentos
                </h3>
              </div>
            </div>
            <div className="self-end px-20">
              <h3 className="text-2xl mb-5">Um breve tutorial de como agendar uma entrevista:</h3>
              <ul className="list-disc list-inside">
                <li>Insira o nome do candidato completo</li>
                <li>Insira o email do candidato</li>
                <li>Insira o telefone do candidato</li>
                <li>Insira a data da entrevista</li>
                <li>Insira o horário da entrevista</li>
                <li>Insira uma mensagem (opcional)</li>
                <li>Aperte o botão "Agendar Entrevista"</li>
              </ul>
            </div>
          </div>
        </div>
        <Card formList={formList} user={user} setFormList={setFormList} />;
      </div>
    </>
  );
};
