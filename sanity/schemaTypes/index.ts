import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productTypes } from "./productTypes";
import { orderType } from "./orderType";
import { salesType } from "./salesType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productTypes, blockContentType, categoryType, orderType, salesType],
};
