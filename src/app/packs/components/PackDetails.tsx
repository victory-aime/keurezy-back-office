import {
  BaseAccordion,
  BaseDrawer,
  BaseText,
  Icons,
  ModalOpenProps,
} from "@/components/custom";
import { Span, VStack } from "@chakra-ui/react";
import { groupedFeatures } from "./utils/groupedFeatured";
import { useTranslation } from "react-i18next";

export const PackDetails = ({
  isOpen,
  onChange,
  data,
  isLoading,
}: ModalOpenProps) => {
  const { t } = useTranslation();
  const accordionItems = Object.entries(groupedFeatures(data!)).map(
    ([category, features]) => ({
      label: t(`PERMISSIONS.MODULES.${category}`),
      content: (
        <VStack align="start">
          {features.map((pf) => (
            <BaseText key={pf.id}>
              •{t(`PERMISSIONS.FEATURE_LIST.${pf.feature.name.toUpperCase()}`)}{" "}
              —{"  "}
              {pf.enabled
                ? pf.limit
                  ? `Limite à: ${pf.limit}`
                  : "Illimité"
                : "Désactivé"}
            </BaseText>
          ))}
        </VStack>
      ),
    }),
  );
  return (
    <BaseDrawer
      title={"Informations sur le pack"}
      description={`Vous consultez le pack ${data?.name} ainsi que les modules et les fonctionnalités disponibles dans ce pack. Chaque module regroupe les actions et autorisations spécifiques que les utilisateurs peuvent effectuer.`}
      onChange={onChange}
      isOpen={isOpen}
      icon={<Icons.View />}
      iconBackgroundColor="gray.400"
      ignoreFooter
    >
      <BaseText>
        Liste des fonctionnalités:{" "}
        <Span color={"primary.500"}>{data?.name} </Span>
      </BaseText>
      <VStack mt={4}>
        <BaseAccordion
          items={accordionItems}
          multipleOpen
          isLoading={isLoading}
        />
      </VStack>
    </BaseDrawer>
  );
};
