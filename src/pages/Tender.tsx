import { useMemo } from 'react'
import { 
    useParams, 
    Link,
} from "react-router-dom";
import { type JWKInterface } from 'arweave/node/lib/wallet'

import { 
    TenderHeader,
    TenderBids
} from '../components'

import { btnStyle } from "../lib/tailwindStyle";

import { 
    useChosenBid,
    useTender
} from "../lib/api"

type TenderProps = {
    wallet: JWKInterface | null
    publicAddress: string | null
}
const Tender = ({wallet, publicAddress}: TenderProps) => {

    const { taxId } = useParams<"taxId">()
    const tender = useTender(taxId!)
    const chosenBid = useChosenBid(tender)

    const isPublisherLoggedIn = useMemo(
        () => {
            return !!(publicAddress && publicAddress === tender?.owner)
        },
        [publicAddress, tender?.owner]
    )

    const isTenderOpen = useMemo(
        () => {
            if (! tender) {
                return false
            }
            const now = new Date()
            const dueDate = new Date(parseFloat(tender.dueDate))
            return now < dueDate
        },
        [tender]
    )
    
    return (
        <>
            {tender &&
                <>
                    <TenderHeader tender={tender} />
                    {isTenderOpen && !chosenBid && 
                        <Link 
                            to={isPublisherLoggedIn ? '#' : `/newBid/${tender.taxId}`}
                            title={isPublisherLoggedIn ? "You cannot bid your own tender" : "Write you answer"}
                            className={`${btnStyle} my-3 inline-block ${isPublisherLoggedIn ? "opacity-10" : ""}`}
                        >
                            Respond this tender
                        </Link>
                    }
                    <TenderBids {...{wallet,tender,chosenBid}} canChooseBidder={isPublisherLoggedIn} />
                </>
            }
        </>
    )
}

export default Tender