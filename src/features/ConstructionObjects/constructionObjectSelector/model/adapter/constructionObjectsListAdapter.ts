import { ConstructionObject } from "@/entities/ConstructionObject";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const constructionObjectsListAdapter =
    createEntityAdapter<ConstructionObject>({
        selectId: (entity) => entity.id,
    });
