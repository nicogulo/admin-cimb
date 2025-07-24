import {API_URL} from "@/config/config";

const AddAdminLog = async (action: string, before?: object | null, after?: object | null) => {
    const member = localStorage.getItem("admin");
    if (member) {
        const memberJson = JSON.parse(member);
        const res = await fetch(`${API_URL}/admin/activity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                admin_id: memberJson.id,
                action: action,
                before: before,
                after: after
            }),
        })
        await res.json()
    }
}

export default AddAdminLog