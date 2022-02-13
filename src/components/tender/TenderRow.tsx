import { Link } from 'react-router-dom'

import { type Tender } from '../../lib/domain'
import EyeIcon from '../Icons/Eye'

import { btnStyle } from '../../lib/tailwindStyle'
import TenderMeta from './TenderMeta'

type TenderHeaderProps = {
    tender: Tender
}
const TenderRow = ({tender}: TenderHeaderProps) => {

    return (
        <div className="border-t border-slate-300 dark:border-slate-700">
            <h2 className="text-2xl mt-4 mb-3">{tender.subject}</h2>
            <div className="md:flex justify-between">

                <TenderMeta tender={tender} />
                <Link className={`${btnStyle} inline-block`} to={`/tender/${tender.taxId}`}>
                    <p>
                        <EyeIcon />
                        <span className="ml-1">View</span>
                    </p>
                </Link>

            </div>
        </div>
    )
}

export default TenderRow