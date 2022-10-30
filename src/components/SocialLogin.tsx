export const SocialLogin = ({ handleLogin, social, svg }: any) => {
  return (
    <>
      <div>
        <a
          href="#"
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={handleLogin}
        >
          <span className="sr-only">{social}</span>
          {svg}
        </a>
      </div>
    </>
  );
};
