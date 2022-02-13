import { type RefObject } from 'react';
import { type JWKInterface } from 'arweave/node/lib/wallet'

import {
    PleaseLogin,
    TenderForm
} from '../components'

type NewTenderProps = {
    wallet: JWKInterface | null
    publicAddress: string | null
    loginBtnRef: RefObject<HTMLAnchorElement>
}
const NewTender = ({wallet, publicAddress, loginBtnRef}: NewTenderProps) => {

    return (
        <div>
            <h1>Publish your Tender</h1>
            <ol className="list-decimal list-inside mt-3 text-lg">
                <li>Set the bounty in Ar or Winston.</li>
                <li>Set the target date.</li>
                <li>Write your tender with clear subject and details.</li>
                <li>Once you receive some bids, pick the best answer, and the bidder will be rewarded.</li>

            </ol>
            {!wallet && 
                <PleaseLogin loginBtnRef={loginBtnRef} />
            }
            {wallet && publicAddress &&
                <TenderForm {...{publicAddress, wallet}} />
            }
        </div>
    )
}

export default NewTender