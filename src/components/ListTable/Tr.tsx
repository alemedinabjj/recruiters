interface ITrProps {
  form: IForm;
  setDeleteForm: (value: boolean) => void;
  setSaveForm: (value: any) => void;
}

interface IForm {
  id: string;
  name: string;
  email: string;
  telephone: string;
  date: string;
  time: string;
}

export function Tr({ form, setSaveForm, setDeleteForm }: ITrProps) {
  return (
    <tr key={form.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {form.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {form.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {form.telephone}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {form.date}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {form.time}
      </td>
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
  );
}
