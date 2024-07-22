import { createRealmContext } from "@realm/react";
import { Item } from "../schema";

export const realmContext = createRealmContext({
  schema: [Item],
});
