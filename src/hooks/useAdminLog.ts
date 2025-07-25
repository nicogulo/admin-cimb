import { useCallback } from "react"

import { API_URL } from "@config/config"

const useAdminLog = () => {
    const addLog = useCallback(async (action: string, before?: object | null, after?: object | null) => {
        try {
            const member = localStorage.getItem("admin")
            if (member) {
                const memberJson = JSON.parse(member)
                const res = await fetch(`${API_URL}/admin/activity`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        admin_id: memberJson.id,
                        action: action,
                        before: before,
                        after: after
                    })
                })

                if (!res.ok) {
                    // eslint-disable-next-line no-console
                    console.error("Failed to log admin activity:", res.statusText)
                }

                return await res.json()
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error logging admin activity:", error)
        }
    }, [])

    return { addLog }
}

export default useAdminLog
