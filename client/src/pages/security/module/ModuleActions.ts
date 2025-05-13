import { queryOptions } from "@tanstack/react-query"

export const getModuleOptions = () => {
  return queryOptions({
    queryKey: ['getModules'],
    queryFn: () => void
  });
}