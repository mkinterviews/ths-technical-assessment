import { useQueryStates } from "nuqs";

export const usePetFilters = () => {
  return useQueryStates({
    q: { defaultValue: "" },
    type: { defaultValue: "" },
  });
};
