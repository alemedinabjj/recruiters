import api from "../config/api";
import { useState } from "react";
import Modal from "./Modal";

export const Card = ({ form, user, setFormList, formList }: any) => {
  const [deleteForm, setDeleteForm] = useState(false);
  const [saveForm, setSaveForm] = useState("");

  console.log(saveForm);
  console.log(formList);

  //   return (
  //     <div>
  //       {deleteForm && <Modal setDeleteForm={setDeleteForm} form={form} setFormList={setFormList} user={user} />}
  //       <div className="flex flex-col items-center justify-center">
  //         <div className="w-full">
  //           <div className="bg-white shadow-md rounded my-6">
  //             <table className="text-left w-full border-collapse ">
  //               <thead>
  //                 <tr>
  //                   <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nome</th>
  //                   <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Email</th>
  //                   <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Telefone</th>
  //                   <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
  //                     Data da entrevista
  //                   </th>
  //                   <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
  //                     Horário da entrevista
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr className="hover:bg-grey-lighter">
  //                   <td className="py-4 px-6 border-b border-grey-light">{form.name}</td>
  //                   <td className="py-4 px-6 border-b border-grey-light">{form.email}</td>
  //                   <td className="py-4 px-6 border-b border-grey-light">{form.telephone}</td>
  //                   <td className="py-4 px-6 border-b border-grey-light">{form.date.split("-").reverse().join("/")}</td>
  //                   <td className="py-4 px-6 border-b border-grey-light">{form.time}</td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <h4 className="py-4 px-6">
  //               Faltam {Math.floor((new Date(form.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias para a entrevista de{" "}
  //               {form.name} no dia {form.date.split("-").reverse().join("/")} às {form.time} horas.
  //             </h4>
  //             <div className="flex items-start justify-start py-4 px-6 ">
  //               <h3 className="text-blue-500  hover:text-blue-600">
  //                 Mensagem:
  //                 <br />
  //               </h3>
  //               <p className="ml-2 text-blue-600">{form.message}</p>
  //             </div>

  //             <div className="flex items-center justify-center py-4 px-2">
  //               <button
  //                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
  //                 type="button"
  //                 onClick={() => {
  //                   setDeleteForm(true);
  //                 }}
  //               >
  //                 Excluir
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
