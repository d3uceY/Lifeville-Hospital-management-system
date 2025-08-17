import { hasPermission } from "./hasPermission"

export const filterMenuItems = (items) => {
  return items
    .filter((item) => !item.roles || hasPermission(item.roles)) // top-level filtering
    .map((item) => ({
      ...item,
      items: item.items
        ? item.items.filter((sub) => !sub.roles || hasPermission(sub.roles)) // sub-level filtering
        : [],
    }))
}
