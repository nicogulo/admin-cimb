interface Auth {
    token?: string | null
    hash?: string | null
    expired: string
}

interface AuthModel extends Auth {
    isLoggedIn: boolean
}
