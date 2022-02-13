import { type Dispatch, type SetStateAction } from "react"
import { type JWKInterface } from 'arweave/node/lib/wallet'
import LogoutIcon from './Icons/LogoutIcon'

export const LOCAL_STORAGE_WALLET = 'LOCAL_STORAGE_WALLET'

type SetWalletProps = {
    setWallet: Dispatch<SetStateAction<JWKInterface | null>>,
}

type WalletProps = {
    wallet: JWKInterface | null
}

export const loginBtnStyle="flex flex-col items-center"

export const storeWallet = ({wallet, setWallet}: WalletProps & SetWalletProps) => {
    const  localStorage = globalThis.localStorage
    localStorage.setItem(LOCAL_STORAGE_WALLET,JSON.stringify(wallet))
    setWallet(wallet)

}

export const Logout = ({setWallet}: SetWalletProps) => {
    return (
        <button className={`${loginBtnStyle}`} onClick={() => storeWallet({wallet: null, setWallet})}>
            <LogoutIcon />
            Log out
        </button>
    )
}

export const LoginForm = ({setWallet}: SetWalletProps) => {
    return (
        <form className={"flex flex-col max-w-sm mx-auto mt-12 p-12 border border-dashed devide-dashed border-slate-900 dark:border-slate-100"}>
            <legend>
            <input type="file" id="file" onChange={(e) => {
                const file = e.target.files?.[0]

                if (!file) {
                    return
                }

                const reader = new FileReader()
                
                reader.onload = (e) => {
                    
                    const result = e.target?.result

                    if (!result || 'string' !== typeof result) { 
                        return
                    }

                    storeWallet({
                        wallet: JSON.parse(result),
                        setWallet
                    })
                }
                reader.readAsText(file)
            }}/>
            <p>Drop or click to choose a keyfile</p>
            </legend>

        </form>        
    )
}


