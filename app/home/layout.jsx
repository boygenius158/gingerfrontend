import UserSessionHandler from "@/components/UserSessionHandler";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <UserSessionHandler>
        <main>{children}</main>
      </UserSessionHandler>
    </div>
  );
};

export default DashboardLayout;
