import { type Tender } from '../../lib/domain'
import { TenderMeta } from '..'

type TenderHeaderProps = {
    tender: Tender
}
const TenderHeader = ({tender}: TenderHeaderProps) => {
    return (
        <div>
            <h2 className="text-3xl mt-6 mb-3">{tender.subject}</h2>
        
            <div className="flex gap-12">
                <TenderMeta tender={tender} />
            </div>
            {tender.details &&
                <div className="my-6 text-xl" dangerouslySetInnerHTML={{__html: tender.details.replaceAll(/\n/g,"<br>")}}></div>
            }
        </div>
    )
}

export default TenderHeader