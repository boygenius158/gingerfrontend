// frontend/hoc/withAdmin.js

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAdmin = (Component) => {
  const WithAdminComponent = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session || session.role !== "admin") {
        router.push("/403"); // Redirect to "Access Denied" page
      }
    }, [session, status, router]);

    if (!session || session.role !== "admin") {
      return null; // Render nothing if not authorized
    }

    return <Component {...props} />;
  };

  return WithAdminComponent;
};

export default withAdmin;
    