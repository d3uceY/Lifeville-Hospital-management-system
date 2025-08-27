
export const filterMenuSearchItems = (items, user) => {
    return items
        .filter((item) => !item.roles || (user && item.roles.includes(user.role)))
        .map((item) => ({
            ...item,
            items: item.items
                ? item.items.filter((sub) => !sub.roles || (user && sub.roles.includes(user.role)))
                : [],
        }))
}
