import api from "../config/api";
import LOGINIMG from "../assets/login_img.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SocialLogin } from "../components/SocialLogin";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup.string().min(6, "Mínimo de 6 caracteres").required("Campo obrigatório"),
});

export const Login = () => {
  const { handleLoginData } = useAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGoogleLogin = async () => {
    let result = await api.googlePopup();

    result ? console.log(result.user) : console.log("error");

    try {
      handleLoginData(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubLogin = async () => {
    let result = await api.githubPopup();

    result ? console.log(result.user) : console.log("error");

    try {
      handleLoginData(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithEmailAndPass = async (e: any) => {
    let result = await api.loginWithEmailAndPass(e.email, e.password);

    result ? console.log(result.user) : console.log("error");

    try {
      handleLoginData(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex m-auto">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Faça login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Ou{" "}
                <Link to="/createaccount">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    crie sua conta
                  </a>
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sign in with</p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <SocialLogin social="Google" svg={<FcGoogle size="21" />} handleLogin={handleGoogleLogin} />

                    <SocialLogin social="Github" svg={<AiFillGithub size="21" />} handleLogin={handleGithubLogin} />

                    <SocialLogin social="Facebook" svg={<BsFacebook size="21" />} />
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form method="POST" className="space-y-6" onSubmit={handleSubmit(handleLoginWithEmailAndPass)}>
                  <div>
                    <Input type="email" label="Email address" {...register("email")} error={errors.email?.message} />
                  </div>

                  <div className="space-y-1">
                    <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />

                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img className="absolute inset-0 h-full w-full object-cover" src={LOGINIMG} alt="Wallpapper" />
        </div>
      </div>
    </>
  );
};
