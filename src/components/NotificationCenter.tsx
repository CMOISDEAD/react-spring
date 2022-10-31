import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

export const NotificationCenter = () => {
  const { notifications } = useNotificationCenter();

  return (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <span>id: ad{notification.id}</span>
          <span>createdAt: {notification.createdAt}</span>
          <p>content: {notification.content}</p>
          {/* you get the idea, you are free to use the properties the way that best suits your needs */}
        </li>
      ))}
    </ul>
  );
};
