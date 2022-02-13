import { type RefObject, useState } from 'react';
import { useParams } from 'react-router-dom'
import { type JWKInterface } from 'arweave/node/lib/wallet'
import { type Tender as TenderInf} from '../lib/domain'

import { 
    TenderHeader,
    PleaseLogin,
    BidForm
} from '../components'

import { useTender } from '../lib/api'

type NewBidProps = {
    wallet: JWKInterface | null
    publicAddress: string | null
    loginBtnRef: RefObject<HTMLAnchorElement>
}
const NewBid = ({wallet, publicAddress, loginBtnRef}: NewBidProps) => {

    const { taxId } = useParams<"taxId">()
    const tender = useTender(taxId!)

    return (
       <>
            {tender && 
                <TenderHeader tender={tender} />
            }
            {(!wallet || !publicAddress) && 
                <PleaseLogin loginBtnRef={loginBtnRef} />
            }
            {tender && wallet && publicAddress &&
                <>
                   <BidForm {...{tender,wallet, publicAddress}} />
                </>
            }         
       </>
    )
}

export default NewBid