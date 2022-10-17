import api from "../config/api";

export const Login = ({ handleLoginData }: any) => {
  const handleGoogleLogin = async () => {
    let result = await api.googlePopup();

    result ? console.log(result.user) : console.log("error");

    handleLoginData(result.user);
  };

  return (
    <section className="bg-slate-900 min-h-screen flex flex-col justify-center items-center">
      {/* <form action="index.html" method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">
          Senha:
        </label>
        <input
          type="password"
          name="senha"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Entrar
        </button>
      </form> */}

      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logar com Google
      </button>
    </section>
  );
};
