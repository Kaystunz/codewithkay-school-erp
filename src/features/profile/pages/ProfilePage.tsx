import {
  Camera,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

function ProfilePage() {
  const { user, updateProfile } =
    useAuthContext();

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] =
    useState("");
  const [profileImage, setProfileImage] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setPhone(user.phone);
    setAddress(user.address);
    setProfileImage(user.profileImage);
  }, [user]);

  if (!user) {
    return null;
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage(
        "Please select a valid image file."
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage(
        "Profile image must not exceed 2 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileImage(reader.result);
        setMessage("");
      }
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setMessage("Name is required.");
      return;
    }

    const phonePattern =
      /^[0-9+\-\s()]{7,20}$/;

    if (
      phone.trim() &&
      !phonePattern.test(phone.trim())
    ) {
      setMessage(
        "Please enter a valid phone number."
      );
      return;
    }

    updateProfile({
      name: trimmedName,
      phone,
      address,
      profileImage,
    });

    setMessage(
      "Profile updated successfully."
    );
  }

  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          My profile
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage your personal
          information.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user.name}
                  className="h-32 w-32 rounded-full border-4 border-teal-50 object-cover"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-teal-50 bg-teal-700 text-3xl font-bold text-white">
                  {initials}
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-teal-700 text-white shadow-sm transition hover:bg-teal-800"
                aria-label="Change profile image"
              >
                <Camera size={17} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              {user.name}
            </h2>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
              <ShieldCheck size={16} />
              {user.role}
            </div>
          </div>

          <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
            <div className="flex gap-3">
              <Mail
                className="mt-0.5 shrink-0 text-slate-400"
                size={18}
              />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-slate-700">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <UserRound
                className="mt-0.5 shrink-0 text-slate-400"
                size={18}
              />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account ID
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Personal information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your contact and personal
              details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative mt-2">
                  <UserRound
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    id="profile-name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setMessage("");
                    }}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative mt-2">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    id="profile-email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500 outline-none"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Email changes require administrator
                  approval.
                </p>
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Phone number
                </label>

                <div className="relative mt-2">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    id="profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setMessage("");
                    }}
                    placeholder="+234..."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-role"
                  className="text-sm font-semibold text-slate-700"
                >
                  Account role
                </label>

                <div className="relative mt-2">
                  <ShieldCheck
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    id="profile-role"
                    value={user.role}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-address"
                className="text-sm font-semibold text-slate-700"
              >
                Address
              </label>

              <div className="relative mt-2">
                <MapPin
                  className="absolute left-3 top-3.5 text-slate-400"
                  size={18}
                />

                <textarea
                  id="profile-address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setMessage("");
                  }}
                  rows={4}
                  placeholder="Enter your residential address"
                  className="w-full resize-none rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  message.includes("successfully")
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex justify-end border-t border-slate-100 pt-6">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                <Save size={18} />
                Save changes
              </button>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
}

export default ProfilePage;