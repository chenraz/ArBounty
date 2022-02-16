import {useTenders} from '../lib/api'

import {
    SpinnerIcon,
    TenderRow,
} from '../components'

const Tenders = () => {
    
    const tenders = useTenders()

    return (
        <div>
            <h1 className="mb-8">Tenders</h1>
            { !tenders && 
                <div className="flex justify-center">
                    <SpinnerIcon />
                </div>
            }

            { tenders && 0 === tenders.length &&
                <p>No tehnder were published yet.</p>
            }

            {tenders && 0 < tenders.length &&
            
                <ul>
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