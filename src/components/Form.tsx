import { useEffect, useState } from "react";
import api from "../config/api";
import { Card } from "./Card";
import { v4 as uuidv4 } from "uuid";
import Notifications from "./Notifications";

interface IFormList {
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}

interface UserProps {
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

const EnviaMail = import.meta.env.VITE_API_ENVIAMAIL;

export const Form = ({ user }: UserProps) => {
  const initialValue = {
    name: "",
    email: "",
    telephone: "",
    message: "",
    date: "",
    time: "",
    // cv: "",
  };

  const [form, setForm] = useState(initialValue);
  const [formList, setFormList] = useState<IFormList[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, telephone, message, date, time } = form;
    e.preventDefault();

    if (name.length < 3) {
      setError(true);
      return;
    }

    if (name && email && telephone && date && time) {
      setFormList([...formList, form]);
      setForm(initialValue);
      setError(false);
      setSuccess(true);

      await api.addNewForm(
        {
          id: uuidv4(),
          name,
          email,
          telephone,
          message,
          date,
          time,
          // cv,
        },
        user
      );

      sendEmail();
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  console.log(regex.test(form.email));

  const sendEmail = async () => {
    const response = await fetch("https://enviamail.herokuapp.com/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": EnviaMail,
      },

      body: JSON.stringify({
        ToEmail: form.email,
        Subject: `Parabéns ${form.name}, sua entrevista foi agendada com sucesso!`,
        Message: `Olá ${form.name}, seu agendamento foi realizado com sucesso! <br />
          Segue abaixo os dados do seu agendamento:
          <br />
          Data: ${form.date}
          Horário: ${form.time}
          <br />

          <br />
          <br />

          ${form.message}
          Boa sorte!
          `,
      }),
    });
  };

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

  console.log(formList);

  return (
    <>
      {success && <Notifications />}
      <div className="w-full px-5 md:px-20 mx-auto">
        <div className="md:flex w-full pt-6  mt-5 gap-7">
          <form action="index.html" method="POST" className="bg-white shadow-md rounded px-8 pb-8 pt-2  w-full" onSubmit={submitForm}>
            <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">
              Nome:
            </label>
            <input
              type="text"
              name="nome"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                (error && form.name.length < 3 && "border-red-500 focus:border-red-500 focus:shadow-outline-red") ||
                "border-gray-300 focus:border-gray-300 focus:shadow-outline-gray"
              }`}
            />
            <br />
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              value={form.email}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                regex.test(form.email) && "border-green-500"
              }`}
            />
            <br />
            <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">
              Telefone:
            </label>
            <input
              type="tel"
              name="telefone"
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              required
              value={form.telephone}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                form.telephone.length === 11 && "border-green-500"
              }`}
            />
            <br />
            <label htmlFor="data" className="block text-gray-700 text-sm font-bold mb-2">
              Data da entrevista:
            </label>
            <input
              type="date"
              name="data"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              value={form.date}
              className="shadow appearance-none border rounded w-3/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <br />
            <label htmlFor="horario" className="block text-gray-700 text-sm font-bold mb-2">
              Horário da entrevista:
            </label>
            <input
              type="time"
              name="horario"
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
              value={form.time}
              className="shadow appearance-none border rounded w-3/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <br />
            {/* <label htmlFor="curriculo" className="block text-gray-700 text-sm font-bold mb-2">
            Currículo:
          </label>
          <input
            type="file"
            name="curriculo"
            id="curriculo"
            onChange={(e) => setForm({ ...form, cv: e.target.value })}
            required
            value={form.cv}
            className="shadow appearance-none border rounded w-3/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> */}
            <br />
            <label htmlFor="mensagem" className="block text-gray-700 text-sm font-bold mb-2">
              Mensagem (opcional):
            </label>
            <textarea
              name="mensagem"
              value={form.message}
              id="mensagem"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <br />
            <input
              type="submit"
              value="Agendar Entrevista"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </form>
          <div className="w-full bg-black rounded text-white flex items-start flex-col">
            <div className="flex items-center">
              <div>
                <img src={user.avatar} alt="logo" className="w-32 h-32 rounded-full p-5 mx-auto object-cover" />
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

        {
          // Render the Card component for each form in the formList array
          formList.map((form, index) => {
            return <Card key={index} form={form} user={user} setFormList={setFormList} />;
          })
        }
      </div>
    </>
  );
};
