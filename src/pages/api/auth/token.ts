import { API_URL, PORT_KEYCLOCK } from "@config/config"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(`http://147.139.200.6/keycloak/realms/face-repository/protocol/openid-connect/token`, {
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
