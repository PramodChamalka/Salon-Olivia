import Link from "next/link";

type UnauthorizedProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function Unauthorized({
  searchParams,
}: UnauthorizedProps) {
  const { reason } = await searchParams;
  const isInactive = reason === "inactive";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFFDF9] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-['Playfair_Display',Georgia,serif] text-[32px] font-bold text-[#333333] mb-3">
          {isInactive ? "Account Deactivated" : "Access Denied"}
        </h1>
        <p className="text-[#666666] mb-8">
          {isInactive
            ? "Your account has been deactivated. Please contact Salon Olivia if you believe this is a mistake."
            : "This area is restricted to salon administrators."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-[50px] px-8 bg-[#B76E79] text-white rounded-[10px] font-medium hover:bg-[#D4AF37] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
