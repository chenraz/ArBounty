import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { type Tender } from '../../lib/domain'
import { createTender } from '../../lib/api'
import { JWKInterface } from 'arweave/node/lib/wallet'

import { btnStyle, inputStyle, inputFullSize, formBaseStyle } from '../../lib/tailwindStyle'

import Input from './Input'


const tomorrow = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toJSON().substring(0,16)
}

type TenderFormProps = {
    publicAddress: string
    wallet: JWKInterface
}
const TenderForm = ({publicAddress, wallet}: TenderFormProps) => {

    const [ tender, setBid ] = useState<Tender>({
        owner: publicAddress,
        subject: "",
        amount: "",
        coin: "Ar",
        dueDate: ""
    })
    
    const navigate = useNavigate()

    return (
        <form 
            className="mt-9 text-lg" 
            onSubmit={async (e) => {
                e.preventDefault()
                const success = await createTender({...{tender,wallet}})
                if (success) {
                    navigate("/")
                }
            }
        }>
            <div>
                <label htmlFor="subject">Subject</label>
                <Input
                    className={`${inputFullSize}`}
                    name="subject"
                    required={true}
                    onChange={e => setBid(tender => ({
                        ...tender,
                        subject: e.target.value 
                    }))}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <Input 
                    className={`mr-6 w-10/12 ${inputStyle}`}
                    name="amount" 
                    required={true}
                    onChange={e => setBid(tender => ({
                        ...tender,
                        amount: e.target.value
                    }))}
                />
                <select 
                    className={`${formBaseStyle}`}
                    defaultValue="Ar" 
                    onChange={e=>{
                        const coin = e.target.value
                        if (coin !== "Ar" && coin !== "Winston") {
                            return
                        }

                        setBid({
                            ...tender,
                            coin
                        })
                    }}
                    style={{
                        width: "calc(16.666666% - 24px)"
                    }}
                >
                    <option value="Ar">Ar</option>
                    <option value="Winston">Windton</option>
                </select>
            </div>
            <div>
                <label htmlFor="dueDate">Due date</label>
                <Input
                    className={`${inputFullSize}`}
                    min={tomorrow()}
                    type="datetime-local" 
                    name="dueDate" 
                    required={true}
                    onChange={e => {
                        setBid(tender => ({
                            ...tender,
                            dueDate: `${new Date(e.target.value).getTime()}`
                        }))
                    }}
                />
            </div>
            <div>
                <label htmlFor="details">Details</label>
                <textarea
                    className={`${inputFullSize}`}
                    rows={8}
                    id="details" 
                    name="details"
                    onChange={e => setBid(tender => ({
                        ...tender,
                        details: e.target.value
                    }))}
                />
            </div>                
            <div>
                <button className={`mt-6 ${btnStyle}`} type="submit">Submit</button>
            </div>
        </form>        
    )
}

export default TenderForm