import { useState } from "react";
import { Eye, EyeOff, GraduationCap, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();


  return (
    <main className="flex min-h-screen bg-slate-100">
      <section className="hidden w-1/2 flex-col justify-between bg-teal-800 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Fareedah Children School</h2>
            <p className="text-sm text-teal-100">School Management Portal</p>
          </div>
        </div>

        <div className="max-w-lg">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">
            Learn. Grow. Excel.
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Managing school activities has never been easier.
          </h1>

          <p className="mt-6 text-lg leading-8 text-teal-100">
            Access student records, attendance, results, fees, announcements,
            assignments and more from one secure portal.
          </p>
        </div>

        <p className="text-sm text-teal-200">
          Powered by CodeWithKay School ERP
        </p>
      </section>

      <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white">
              <GraduationCap size={28} />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Fareedah Children School
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold text-teal-700">
                Welcome back
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Sign in to your account
              </h1>

              <p className="mt-2 text-slate-500">
                Enter your login details to access the portal.
              </p>
            </div>

           <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                navigate("/dashboard");
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="admin@fareedahschool.com"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-teal-700"
                />
                Remember me
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 focus:ring-4 focus:ring-teal-200"
              >
                Sign in
              </button>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Need help accessing your account?
              </p>

              <button className="mt-2 text-sm font-semibold text-teal-700 hover:text-teal-800">
                Contact school administration
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            © 2026 Fareedah Children School. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;