
import { useNavigate } from 'react-router-dom'
import { type JWKInterface } from 'arweave/node/lib/wallet'

import { type Bid, type Tender } from '../../lib/domain'
import { btnStyle } from '../../lib/tailwindStyle'
import { chooseBid } from '../../lib/api'

type ChooseBidProps = {
    bid: Bid
    tender: Tender
    wallet: JWKInterface
}
const ChooseBid = ({bid, tender, wallet}: ChooseBidProps) => {

    const navigate = useNavigate()

    return (
        <button className={`${btnStyle} mt-3`} onClick={async ()=>{
            const results = await chooseBid({...{bid,tender, wallet}})
            if (results) {
                navigate(`/tender/${tender.taxId}`)
            }
        }}>
            Choose this bid
        </button>
    )
}

export default ChooseBid