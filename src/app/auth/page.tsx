import { AuthPortal } from "../../components/AuthPortal";

function resolveMode(value?: string | string[]) {
  const mode = Array.isArray(value) ? value[0] : value;
  if (mode === "sign-up" || mode === "reset" || mode === "profile" || mode === "admin") {
    return mode;
  }

  return "sign-in";
}

export default function AuthPage({
  searchParams,
}: {
  searchParams?: { mode?: string | string[] };
}) {
  return <AuthPortal initialMode={resolveMode(searchParams?.mode)} />;
}