import { useLocation } from "react-router-dom";

function PlaceholderPage() {
  const location = useLocation();

  const pageName =
    location.pathname
      .replace("/", "")
      .replace("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Page";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">{pageName}</h1>

      <p className="mt-3 text-slate-500">
        The {pageName.toLowerCase()} module will be developed in a later
        stage.
      </p>
    </section>
  );
}

export default PlaceholderPage;