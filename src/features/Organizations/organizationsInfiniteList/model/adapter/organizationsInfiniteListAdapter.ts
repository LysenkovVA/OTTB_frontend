import { Organization } from "@/entities/Organization";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const organizationsInfiniteListAdapter =
    createEntityAdapter<Organization>({
        selectId: (organization) => organization.id,
    });
