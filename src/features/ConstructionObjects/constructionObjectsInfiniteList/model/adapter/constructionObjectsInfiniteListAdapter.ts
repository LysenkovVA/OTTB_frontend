import { ConstructionObject } from "@/entities/ConstructionObject";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const constructionObjectsInfiniteListAdapter =
    createEntityAdapter<ConstructionObject>({
        selectId: (constructionObject) => constructionObject.id,
    });
