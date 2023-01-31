import { MCX_API_URL } from "./constants"
import { Cookies } from "react-cookie"

interface SignIn {
    address:string
    nonce:number
    lifetime:number
    signature: string | null
    text:string
}
interface AuthText {
    text:string
    data:SignIn
}

interface SignInResult {
    token:string
}

interface ManifestEntry {
    address:string
    chainId:number
    alias:string
}

export const getAuthText = async (address:string, lifetime?:number):Promise<AuthText> => {
    let url = MCX_API_URL + "api/auth/v1/auth/"+address

    if (lifetime !== undefined) {
        url += "?lifetime="+lifetime
    }
    const resp = await fetch(url)

    const data:AuthText = await resp.json()

    return data
}

export const singInWithSig = async (data:SignIn):Promise<SignInResult> => {
    console.log(data)
    let url = MCX_API_URL + "api/auth/v1/"

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    const respData:SignInResult = await resp.json()

    localStorage.setItem('token', respData.token) 
    return respData
}

export const listManifests = async ():Promise<ManifestEntry[]> => {
    let url = MCX_API_URL + "api/v1alpha/manifest/"
    const token = getStoredToken()
    if (token == null) {
        document.location.reload()
    }

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        },
        credentials: 'include'
    })

    return resp.json()
}

export const getManifest = async (chainId:number, address:string):Promise<any> => {
    let url = MCX_API_URL + "api/v1alpha/manifest/" + chainId + "/" + address
    const token = getStoredToken()
    if (token == null) {
        document.location.reload()
    }

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        },
        credentials: 'include'
    })

    return resp.json()
}

export const getStoredToken = () => {
    return localStorage.getItem('token')
}