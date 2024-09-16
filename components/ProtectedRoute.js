// import React, { useEffect } from "react";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export const withAuth = (WrappedComponent) => {
//     const WithAuth = async (props) => {
//       const session = await getServerSession(authOptions);
//       console.log(session);
  
//       // Redirect to login page if not authenticated
//       if (!session) {
//         return redirect("/"); // Or your login route
//       }
  
//       return <WrappedComponent {...props} />;
//     };
  
//     return WithAuth;
//   };
  