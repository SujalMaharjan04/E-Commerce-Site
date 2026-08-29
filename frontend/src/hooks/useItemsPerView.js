import { useState, useEffect } from "react";

export function useItemsPerView() {
    const [itemsPerView, setItemsPerView] = useState(getItemsPerView())

    function getItemsPerView() {
        if (typeof window === 'undefined') return 3
        const width = window.innerWidth
        if (width < 640) return 1
        if (width < 1024) return 2
        return 3

    }

    useEffect(() => {
        function handleResize() {
            setItemsPerView(getItemsPerView())
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return itemsPerView
}