// hooks/useAdminRedirect.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function useAdminRedirect() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.role === "admin") {
      router.push("/admin");
    }
  }, [session, router]);
}
