import { type Tender } from '../../lib/domain'
import UserIcon from '../Icons/UserIcon'
import CalendarIcon from '../Icons/Calendar'
import MoneyIcon from '../Icons/Money'

type TenderMetaProps = {
    tender: Tender
}
const TenderMeta = ({tender}: TenderMetaProps) => {

    const dueDate = new Date(parseFloat(tender.dueDate))

    return (
        <>
            <div>
                <p className="flex mb-1"> 
                    <MoneyIcon />
                    <span className="ml-1">Bounty</span>
                </p>
                <span>{tender.amount}</span>
                <span>{tender.coin}</span>
            </div>

            <div className="hidden md:flex">
                <p className="flex mb-1">
                    <CalendarIcon />
                    <span className="ml-1">Open until</span>
                </p>
                <p>
                    {`${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString()}`}
                </p>
            </div>

            <div className="hidden md:block"> 
                <p className="flex mb-1">
                    <UserIcon />
                    <span className="ml-1">User</span>
                </p>
                <p className="block">
                    {tender.owner}
                </p>
            </div>
        </>
    )
}

export default TenderMeta