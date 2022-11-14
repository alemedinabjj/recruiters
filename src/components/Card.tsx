import { useState } from "react";
import Modal from "./Modal";
import { Thead } from "./ListTable/Thead";
import { Tr } from "./ListTable/Tr";

interface ICardProps {
  form: IForm[];
  user: IUser;
  setFormList: (value: IForm[]) => void;
  formList: IForm[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}

interface IForm {
  id: string;
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}

export const Card = ({ form, user, setFormList, formList }: ICardProps) => {
  const [deleteForm, setDeleteForm] = useState(false);
  const [saveForm, setSaveForm] = useState("");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-100">Agendados</h1>
          <p className="mt-2 text-sm text-gray-400">
            Lista de candidatos agendados
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {formList.length <= 0 ? (
                <table className="min-w-full divide-y divide-gray-200 ">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="ml-4 ">
                            <div className="text-sm font-medium text-gray-900">
                              Nenhum agendamento
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <Thead
                    Name="Nome"
                    Email="Email"
                    Phone="Telefone"
                    Date="Data"
                    Time="Horário"
                    Delete="Deletar"
                  />
                  {deleteForm && (
                    <Modal
                      setDeleteForm={setDeleteForm}
                      form={form}
                      setFormList={setFormList}
                      user={user}
                      saveForm={saveForm}
                    />
                  )}

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {formList.map((form: any) => (
                      <Tr
                        form={form}
                        setDeleteForm={setDeleteForm}
                        setSaveForm={setSaveForm}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
