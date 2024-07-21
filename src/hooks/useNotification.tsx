import NotificationHelper from "@/utils/helpers/notifications";
import { Options } from "@tauri-apps/api/notification";
import { ExternalToast } from "sonner";

const useNotification = () => {
  const notify = async (message: string | Options, data?: ExternalToast) => {
    await NotificationHelper.notify(message, data);
  };

  return { notify };
};

export default useNotification;
