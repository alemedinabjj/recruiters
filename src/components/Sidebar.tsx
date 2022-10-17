export const Sidebar = ({ user }: any) => {
  const Logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <aside className="bg-slate-800 text-white flex flex-col justify-between mx-auto px-10 py-4 rounded shadow-xl w-full sticky top-0">
      <div className="flex justify-center items-center gap-4 ">
        <img src={user.avatar} alt="Foto do usuário" className="rounded-full h-20 w-20" />
        <div>
          <h2>Olá, {user.name}! Seja bem-vindo ao Agendamento de Entrevistas.</h2>

          <p>Para agendar uma entrevista de um candidato, preencha o formulário abaixo e clique em "Agendar Entrevista".</p>
        </div>
      </div>
      <button
        onClick={Logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-end fixed bottom-10 right-10"
      >
        Sair
      </button>
    </aside>
  );
};
