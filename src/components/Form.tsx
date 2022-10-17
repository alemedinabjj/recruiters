import { useEffect, useState } from "react";
import api from "../config/api";
import { Card } from "./Card";
import { v4 as uuidv4 } from "uuid";

interface IFormList {
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}

export const Form = ({ user }: any) => {
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

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, telephone, message, date, time } = form;
    e.preventDefault();

    if (name && email && telephone && message && date && time) {
      setFormList([...formList, form]);
      setForm(initialValue);

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
    }
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
      <div className=" md:w-1/2 mx-auto">
        <form action="index.html" method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5" onSubmit={submitForm}>
          <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            name="nome"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-3/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            value="Enviar"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </form>

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
