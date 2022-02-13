import {useTenders} from '../lib/api'

import {
    SpinnerIcon,
    TenderRow,
} from '../components'

const Tenders = () => {
    
    const tenders = useTenders()

    return (
        <div>
            <h1>Tenders</h1>
            { !tenders &&
                <div className="flex justify-center">
                    <SpinnerIcon />
                </div>
            }
            {tenders && 1 > tenders.length && 
                <p className="my-6">No tenders were found.</p>
            }
            {tenders && 0 < tenders.length &&
            
                <ul className="mt-8">
                    { tenders.map((tender, i) => (
                        <li key={i} className="my-6">
                            <TenderRow tender={tender} />
                        </li>
                    ))}
                </ul>

            }
            
        </div>
    )
}

export default Tenders