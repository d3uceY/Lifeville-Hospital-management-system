import { Badge } from "@/components/ui/badge";

export function getDischargeConditionBadge(condition) {
    const conditionMap = {
        "stable": "bg-green-100 text-green-800 border-green-200",
        "recovered": "bg-emerald-100 text-emerald-800 border-emerald-200",
        "improved": "bg-blue-100 text-blue-800 border-blue-200",
        "referred": "bg-yellow-100 text-yellow-800 border-yellow-200",
        "left": "bg-gray-100 text-gray-800 border-gray-200",
        "on admission": "bg-sky-100 text-sky-800 border-sky-200",
        "deceased": "bg-red-100 text-red-800 border-red-200",
    };

    const badgeClass =
        conditionMap[condition?.toLowerCase()] ||
        "bg-muted text-muted-foreground"; // fallback

    return (
        <Badge className={`${badgeClass} capitalize`}>
            {condition || "on admission"}
        </Badge>
    );
}
