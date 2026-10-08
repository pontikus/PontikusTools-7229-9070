import { useEffect } from "react";
export function isEmbed() {
  return new URLSearchParams(window.location.search).get("embed") === "1";
}
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
