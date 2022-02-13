import { type JWKInterface } from 'arweave/node/lib/wallet'

import { type Tender, type Bid as BidInf } from '../../lib/domain'
import { useBids } from '../../lib/api'

import Bid from './Bid'
import ChooseBid from './ChooseBid'
import { AppIcon } from '../'

const NoBids = () => (
    <h2>No bids were pubblished to this tender yet</h2>
)

type TenderBidsProps = {
    tender: Tender,
    canChooseBidder: boolean,
    wallet: JWKInterface | null,
    chosenBid: string | boolean
}
const TenderBids = ({tender, canChooseBidder, wallet, chosenBid}: TenderBidsProps) => {
    const bids = useBids(tender)
    
    return (
        <>
            { bids && 0 < bids.length && 
                <>
                    <h2 className="text-3xl my-6 underline">Bids</h2>
                    { bids.map((bid,i) =>{
                        return (
                            <div className="border-b border-slate-500 pt-6 pb-9" key={i}>
                                <Bid bid={bid} />
                                { canChooseBidder && wallet && !chosenBid &&
                                    <ChooseBid {...{bid, tender, wallet}} />
                                }
                                { chosenBid && chosenBid === bid.taxId &&
                                    <span className="flex mt-2 font-bold text-green-700 dark:text-green-400">
                                        <AppIcon />
                                        <span className="ml-1">This is the winner bid</span>
                                    </span>
                                }
                            </div>
                        )
                    })}                     
                </>
            }
            { (!bids || !bids.length) && 
                <NoBids />
            }
        </>
    )
    
}

export default TenderBids