import { useEffect, useState } from "react";
import { Notify } from "../components/Notify";

export const useNotification = ({}) => {
  const [notification, setNotification] = useState({
    state: false,
    message: "",
  });

  useEffect(() => {});

  return <Notify {...notification} />;
};
