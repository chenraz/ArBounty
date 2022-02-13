import { type Dispatch, type SetStateAction } from "react"

import { type JWKInterface } from 'arweave/node/lib/wallet'

import { 
    LoginForm,
    Wellcome
} from '../components'

type LoginProps = {
    setWallet: Dispatch<SetStateAction<JWKInterface | null>>
    publicAddress: string | null

}
const Login = ({setWallet, publicAddress}: LoginProps) => {

    return (
        <>
            {!publicAddress &&
                <LoginForm setWallet={setWallet} />
            }
            {publicAddress &&

                <Wellcome publicAddress={publicAddress} />
            }
        </>
    )
}

export default Login