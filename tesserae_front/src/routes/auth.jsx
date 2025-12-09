import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import AuthenticationPage from "~/pages/authentication";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <main>
      <Title>LYSZT - Authentication</Title>
      <AuthenticationPage
        setLoginScreen={() => navigate("/")}
        setAuth={() => {}}
      />
    </main>
  );
}
