import { MODELS } from "@/types";

export const groupFeaturesByCategory = (
  planFeatures?: MODELS.IPacksResponse["planFeatures"],
) => {
  if (!planFeatures) return {};

  return planFeatures.reduce(
    (acc, pf) => {
      const category = pf.feature.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(pf);

      return acc;
    },
    {} as Record<string, MODELS.IPacksResponse["planFeatures"][number][]>,
  );
};

export const groupedFeatures = (selectedPack?: MODELS.IPacksResponse) => {
  if (!selectedPack) return [];
  return groupFeaturesByCategory(selectedPack?.planFeatures);
};
