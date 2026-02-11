import { useQuery } from "@tanstack/react-query";
import { getResults } from "../service/dashboardService";

export function useResults(){
    return useQuery({
        queryKey:["results"],
        queryFn:getResults,
    })
}