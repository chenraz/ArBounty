import { type Bid as BidInf } from '../../lib/domain'
import UserIcon from '../Icons/UserIcon'


type BidProps = {
    bid: BidInf
}

const Bid = ({bid}: BidProps) => {
    return (
        <>
            <div>
                <p className="flex">
                    <UserIcon />
                    User
                </p>
                <p className="block">
                    {bid.owner}
                </p>
            </div>
            <div 
                className="text-xl mt-2"
                dangerouslySetInnerHTML={{__html: bid.answer.replaceAll(/\n/g, '<br>')}} 
            />
        </>
    )
}

export default Bid