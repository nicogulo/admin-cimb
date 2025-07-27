import { NextApiRequest, NextApiResponse } from "next"

import { API_URL } from "@config/config"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(`${API_URL}/keycloak/realms/face-repository/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(req.body).toString()
    })

    console.log("Response status:", req)

    const data = await response.json()
    res.status(response.status).json(data)
}
