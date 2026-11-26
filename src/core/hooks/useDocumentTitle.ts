import { useEffect } from "react";

export function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title
            .replace(/[/\\:|]/g, "-")
            .replace(/[?*]/g, "")
            .replace(/</g, "(")
            .replace(/>/g, ")")
            .replace(/"/g, "'")
            .replace(/\p{Cc}+/gu, " ")
            .replace(/^[.\s]+|[.\s]+$/g, "");
    }, [title]);
}