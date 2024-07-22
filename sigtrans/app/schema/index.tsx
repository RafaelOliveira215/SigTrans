import { BSON } from "realm";

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  name!: string;
  date!: string;
  agent!: string;
  status!: string;
  static schema: Realm.ObjectSchema = {
    name: "Item",
    properties: {
      _id: { type: "objectId", default: () => new BSON.ObjectId() },
      name: "string",
      date: "string",
      agent: "string",
      status: "string",
      userId: "string",
    },
    primaryKey: "_id",
  };
}
