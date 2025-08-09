import { useQuery } from "@tanstack/react-query";
import { getBills } from "../../providers/ApiProviders";

export default function Bills() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["bills"],
        queryFn: () => getBills(),
    });

    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Bills</h1>
            <ul>
                {data.data.map((bill) => (
                    <li key={bill.id}>{bill.name}</li>
                ))}
            </ul>
        </div>
    );
}
