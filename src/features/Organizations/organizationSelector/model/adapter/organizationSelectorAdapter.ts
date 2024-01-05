import { Organization } from "@/entities/Organization";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const organizationSelectorAdapter = createEntityAdapter<Organization>({
    selectId: (organization) => organization.id,
});
