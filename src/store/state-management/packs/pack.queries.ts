import * as Constants from "./constants";
import { packsServiceInstance } from "./users.service-instance";
import { MODELS } from "_types/index";
import { QUERIES } from "rise-core-frontend";

const getAllPacksQueries = (args: QUERIES.QueryPayload) => {
  const { queryOptions } = args;

  return QUERIES.useCustomQuery<MODELS.IPacksResponse[]>({
    queryKey: [Constants.PACKS_KEYS.GET_ALL_PACKS],
    queryFn: () => packsServiceInstance().get_all_packs(),
    options: queryOptions,
  });
};

export { getAllPacksQueries };
