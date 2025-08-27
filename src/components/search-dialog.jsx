import { useState, useEffect, useMemo } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { filterMenuItems } from "../helpers/filterMenuItems"
import { useSidebar } from "./ui/sidebar"
import { filterMenuSearchItems } from "../helpers/filterMenuSearchItems"
import { useAuth } from "../providers/AuthContext"

export function SearchDialog({ data }) {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()
    const { state } = useSidebar();
    const { user } = useAuth();

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const allMenuItems = useMemo(() => {
        if (!user) return []

        const filteredNavMain = filterMenuSearchItems(data.navMain, user)
        const filteredClinical = filterMenuSearchItems(data.clinical, user)
        const filteredInventory = filterMenuSearchItems(data.inventory, user)
        const filteredSetup = filterMenuSearchItems(data.setup, user)

        const results = []

        const addItems = (items, category) => {
            items.forEach((item) => {
                if (item.url && item.url !== "#") {
                    results.push({
                        title: item.title,
                        url: item.url,
                        category,
                        tags: item.tags || [],
                        icon: item.icon,
                    })
                }

                if (item.items) {
                    item.items.forEach((subItem) => {
                        results.push({
                            title: subItem.title,
                            url: subItem.url,
                            category: `${category} > ${item.title}`,
                            tags: subItem.tags || [],
                            icon: item.icon,
                        })
                    })
                }
            })
        }

        addItems(filteredNavMain, "Dashboard")
        addItems(filteredClinical, "Clinical")
        addItems(filteredInventory, "Inventory")
        addItems(filteredSetup, "Setup")

        return results
    }, [])



    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return allMenuItems

        const query = searchQuery.toLowerCase()
        return allMenuItems.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(query)
            const categoryMatch = item.category.toLowerCase().includes(query)
            const tagsMatch = item.tags.some((tag) => tag.toLowerCase().includes(query))
            return titleMatch || categoryMatch || tagsMatch
        })
    }, [allMenuItems, searchQuery])

    const handleSelect = (url) => {
        setOpen(false)
        setSearchQuery("")
        navigate(url)
    }

    return (
        <>
            <div className="px-3 my-3">
                {
                state == "expanded" && (
                    <Button
                        variant="outline"
                        className="relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none "
                        onClick={() => setOpen(true)}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        <span className="hidden lg:inline-flex">Search navigation...</span>
                        <span className="inline-flex lg:hidden">Search...</span>
                        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                            <span className="text-xs">⌘</span> <span className="shrink-0">K</span>
                        </kbd>
                    </Button>
                )
                }
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search navigation..." value={searchQuery} onValueChange={setSearchQuery} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {filteredResults.length > 0 && (
                        <CommandGroup heading="Navigation">
                            {filteredResults.map((item, index) => {
                                const Icon = item.icon
                                return (
                                    <CommandItem
                                        key={`${item.url}-${index}`}
                                        value={`${item.title} ${item.category} ${item.tags.join(" ")}`}
                                        onSelect={() => handleSelect(item.url)}
                                        className="flex items-center gap-2 px-2 py-1.5"
                                    >
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex flex-col">
                                            <span className="text-sm">{item.title}</span>
                                            <span className="text-xs text-muted-foreground">{item.category}</span>
                                        </div>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}
