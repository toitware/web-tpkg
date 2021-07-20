declare module "react-use-flexsearch" {
  type StoreItem = { id: string; path: string; title: string; excerpt: string };
  export function useFlexSearch(query: string, index: string, store: { [key: string]: StoreItem }): StoreItem[];
}
