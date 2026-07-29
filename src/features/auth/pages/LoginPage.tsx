import {
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";

import { useAuthContext } from "../hooks/useAuthContext";
import { useToast } from "../../../components/ui/toast/useToast";

function LoginPage() {
  const navigate = useNavigate();

  const { login, isLoading } =
    useAuthContext();

  const { showToast } = useToast();

  const [email, setEmail] = useState(
    "admin@fareedahschool.com"
  );

  const [password, setPassword] =
    useState("admin123");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast({
        type: "error",
        message:
          "Please enter your email and password.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email,
        password,
      });

      showToast({
        type: "success",
        message: "Login successful.",
      });

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to log in.";

      showToast({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden bg-teal-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-100">
              CodeWithKay
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              School management made simpler.
            </h1>

            <p className="mt-5 max-w-md text-teal-100">
              Manage students, teachers,
              attendance, results, fees and
              school communication from one
              secure dashboard.
            </p>
          </div>

          <p className="text-sm text-teal-100">
            Fareedah School ERP
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold text-teal-700">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your login details to
                continue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="admin@fareedahschool.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting || isLoading
                }
                className="w-full rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </form>

            <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">
                Demo administrator
              </p>

              <p>
                Email:
                {" "}
                admin@fareedahschool.com
              </p>

              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;