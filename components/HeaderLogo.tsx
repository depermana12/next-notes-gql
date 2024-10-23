import { SquareCode } from "lucide-react";

const HeaderLogo = () => {
  return (
    <div className="flex gap-3 items-center mt-3">
      <SquareCode size={30} />
      <h1 className="text-xl font-bold">inote</h1>{" "}
    </div>
  );
};

export default HeaderLogo;
