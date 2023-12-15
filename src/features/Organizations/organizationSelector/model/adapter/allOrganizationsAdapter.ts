import { Organization } from "@/entities/Organization";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const allOrganizationsAdapter = createEntityAdapter<Organization>({
    selectId: (organization) => organization.id,
});
