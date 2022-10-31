import { HiFire } from "react-icons/hi";
import { Toast } from "flowbite-react";

interface Props {
  message: string;
}

export const Notify = ({ message }: Props) => {
  return (
    <Toast className="mx-2 my-2 fixed right-0 bottom-0 bg-[#262626] text-white">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#363636] text-blue-500 dark:bg-blue-800 dark:text-blue-200">
        <HiFire className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle className="bg-[#363636] text-white" />
    </Toast>
  );
};
