export type Role = "ADMIN" | "USER" | "ANY";

export type RoleControl = {
  [key: string]: {
    views: PagePermission[];
    actions: ResourcePermission[];
  };
};

export type PermissionCategory = keyof RoleControl[Role];

type Page = "HOME" | "CART" | "ME" | "AUTH";
type Resource = "GAME" | "USER" | "ME" | "ORDER";
type Method =
  | "GET"
  | "ADD"
  | "EDIT"
  | "REMOVE"
  | "LOGIN"
  | "LOGOUT"
  | "SIGNUP"
  | "ADD_GAME"
  | "REMOVE_GAME";

export type ResourcePermission = `${Resource}:${Method}`;
export type PagePermission = `${Page}:VIEW`;

export const RBAC_ROLES: RoleControl = {
  ANY: {
    views: ["HOME:VIEW", "AUTH:VIEW"],
    actions: ["GAME:GET", "ME:SIGNUP", "ME:LOGIN"]
  },
  ADMIN: {
    views: ["HOME:VIEW", "CART:VIEW", "ME:VIEW"],
    actions: ["GAME:GET", "GAME:REMOVE", "GAME:ADD", "GAME:EDIT", "ME:LOGOUT"]
  },
  USER: {
    views: ["HOME:VIEW", "CART:VIEW", "ME:VIEW"],
    actions: [
      "GAME:GET",
      "ME:LOGOUT",
      "ME:EDIT",
      "ME:REMOVE",
      "ORDER:ADD_GAME",
      "ORDER:REMOVE_GAME"
    ]
  }
};
