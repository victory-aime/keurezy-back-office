import { applicationInstance } from "rise-core-frontend";
import { PacksService } from "_store/services";

export const packsServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error("[PacksService] No context found.");
  }
  return new PacksService(context);
};
