import api from "../config/api";
import { useState } from "react";
import Modal from "./Modal";

export const Card = ({ form, user, setFormList, formList }: any) => {
  const [deleteForm, setDeleteForm] = useState(false);
  const [saveForm, setSaveForm] = useState("");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-100">Agendados</h1>
          <p className="mt-2 text-sm text-gray-400">Lista de candidatos agendados</p>
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
                            <div className="text-sm font-medium text-gray-900">Nenhum agendamento</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Nome
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Telefone
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Data da entrevista
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Horário da entrevista
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Deletar</span>
                      </th>
                    </tr>
                  </thead>
                  {deleteForm && <Modal setDeleteForm={setDeleteForm} form={form} setFormList={setFormList} user={user} saveForm={saveForm} />}

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {formList.map((form: any) => (
                      <tr key={form.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{form.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.telephone}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{form.time}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              setDeleteForm(true);
                              setSaveForm(form);
                            }}
                          >
                            Delete<span className="sr-only">, {form.id}</span>
                          </a>
                        </td>
                      </tr>
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
