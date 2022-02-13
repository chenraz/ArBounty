
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { JWKInterface } from 'arweave/node/lib/wallet'

import { Tender, Bid } from '../../lib/domain'
import { btnStyle, inputFullSize } from '../../lib/tailwindStyle'
import { createBid } from '../../lib/api'

type BidFormProps = {
    tender: Tender
    wallet: JWKInterface
    publicAddress: string
}
const BidForm = ({tender, wallet, publicAddress}: BidFormProps) => {

    const [bid, setBid ] = useState<Bid>({
        owner: publicAddress,
        tenderId: tender.taxId || "",
        answer: ""
    })

    const navigate = useNavigate()

    return (
        <form
            className="mt-9 text-lg" 
            onSubmit={async (e) => {
                e.preventDefault()
                const success = await createBid({...{bid,wallet}})
                if (success) {
                    navigate(`/tender/${tender.taxId}`)
                }
            }
        }>
            <div>
                <label htmlFor="answer">Write your answer</label>
                <textarea 
                    className={`${inputFullSize}`}
                    id="answer"
                    rows={12}
                    name="answer"
                    required
                    onChange={e => setBid(bid => ({
                        ...bid,
                        answer: e.target.value
                    }))}                    
                />
            </div>
            <div>
                <button className={`mt-6 ${btnStyle}`} type="submit">Submit</button>
            </div>            
        </form>
    )
}

export default BidForm