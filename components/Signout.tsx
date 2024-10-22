import { useRouter } from "next/navigation";
import { removeToken } from "@/app/utils/token";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = () => {
    removeToken();
    router.push("/");
  };

  return (
    <Button onClick={handleSignOut} variant="link">
      <LogOut />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
