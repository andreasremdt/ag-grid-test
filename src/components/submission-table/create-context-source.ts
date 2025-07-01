import type { TableContextSource } from "@/components/table";

const createContextSource = (): TableContextSource => ({
  get: async () => ({
    metadata: {
      providers: [],
      eventTypes: [],
      phases: [],
      formats: [],
      integrationModes: [],
    },
  }),
});

export default createContextSource;
