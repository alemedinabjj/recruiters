import api from "../config/api";

export const Card = ({ form, user, setFormList }: any) => {
  console.log(user.id);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nome</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Email</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Telefone</th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Data da entrevista
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Horário da entrevista
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">{form.name}</td>
                  <td className="py-4 px-6 border-b border-grey-light">{form.email}</td>
                  <td className="py-4 px-6 border-b border-grey-light">{form.telephone}</td>
                  <td className="py-4 px-6 border-b border-grey-light">{form.date.split("-").reverse().join("/")}</td>
                  <td className="py-4 px-6 border-b border-grey-light">{form.time}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-start justify-start py-4 px-6 ">
              <h3 className="text-blue-500  hover:text-blue-600">
                Mensagem:
                <br />
              </h3>
              <p className="ml-2 text-blue-600">{form.message}</p>
            </div>

            <div className="flex items-center justify-center py-4 px-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
                type="button"
                onClick={() => {
                  api.deleteForm(user, form);
                  setFormList((formList: any) => formList.filter((f: any) => f.id !== form.id));
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
