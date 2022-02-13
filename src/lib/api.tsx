import { useState, useEffect } from 'react'
import Arweave from 'arweave'

import { type Tender, type Bid } from './domain'
import { type JWKInterface } from 'arweave/node/lib/wallet'

export const APP_NAME = "ArBounty"
export const TAG_APP_NAME = "App-Name"

export const DATA_TYPE_TENDER = "Question"
export const TAG_DATA_TYPE = "Type"

export const TAG_TENDER_ID = "TenderId"
export const TAG_BID_CHOOSED = "bidChoosed"

const ArweaveInit = () => Arweave.init({
    host: process.env.REACT_APP_ARWEAVE_HOST,
    port: process.env.REACT_APP_ARWEAVE_PORT,
    protocol: process.env.REACT_APP_ARWEAVE_PROTO
})
const arweave = ArweaveInit()

type UsePublicAddressProps = {
    wallet: JWKInterface | null
}
export const usePublicAddress = ({wallet}: UsePublicAddressProps) => {

    const [ publicAddress, setPublicAddress ] = useState<string | null>(null)

    useEffect(
        () => {
            if (!wallet && publicAddress) {
                setPublicAddress(null)
            }
            if (wallet && !publicAddress) {
                arweave.wallets.jwkToAddress(wallet).then(address => {
                    setPublicAddress(address)
                })
            }
        },
        [wallet, publicAddress]
    )

    return publicAddress

}

export const fetchTransaction = async (taxId: string) => {
    const fetchUrl = `${process.env.REACT_APP_ARWEAVE_PROTO}://${process.env.REACT_APP_ARWEAVE_HOST}:${process.env.REACT_APP_ARWEAVE_PORT}/${taxId}`
    const txRes = await fetch(fetchUrl)
    const txDataText = await txRes.text()
    return JSON.parse(txDataText)
}

const fetchTransactions = async (tagName: string, tagValue: string) => {
    const query = `
        query {
            transactions(
                tags:[{name: "${TAG_APP_NAME}", values: "${APP_NAME}"},{name: "${tagName}", values: "${tagValue}"}]
            ) {
                edges {
                    cursor
                    node {
                        id
                    }
                }
            }
        }
    `

    const res = await arweave.api.post('graphql', {query})

    const transactionIds = res.data.data.transactions.edges || []
    const transactions = await Promise.all(transactionIds.map(async (tx: any)=>{
        const node = tx.node
        const taxId = node.id 

        return {
            ...await fetchTransaction(taxId),
            taxId,
        }
    }))

    return transactions
}

export const fetchTenders = async () => {
    return await fetchTransactions(TAG_DATA_TYPE, DATA_TYPE_TENDER)
}

export const fetchBids = async (tenderTaxId: string) => {
    return await fetchTransactions(TAG_TENDER_ID, tenderTaxId)
}

export const useTender = (taxId: string) => {
    const [tender, setTender ] = useState<Tender>()
    useEffect(
        () => {
            const fetchTender = async () => {
                if (taxId) {
                    const t = await fetchTransaction(taxId)
                    setTender({
                        ...t,
                        taxId
                    })
                }
        }
            if (!tender && taxId) {
                fetchTender()
            }
        },
        [taxId, tender]
    )

    return tender
}

export const useTenders = () => {

    const [tenders, setTenders ] = useState<Tender[]>([])

    useEffect( 
        () => {

            const getTenders = async () => {
                const tx = await fetchTenders();
                setTenders(tx)
            }
            getTenders()
        },
        []
    )

    return tenders
}

export const useBids = (tender: Tender) => {
    const [bids, setBids ] = useState<Bid[]>([])
    useEffect(
        () => {
            const getBids = async () => {
                const tx = await fetchBids(tender.taxId!)
                setBids(tx)
            }
            getBids()
        },
        [tender.taxId]
    )
    return bids
}

export const useChosenBid = (tender?: Tender) => {
    
    const [ chosenBid, setChosenBid ] = useState<string | boolean>(false)

    useEffect(
        () => {
            const getChosenBid = async () => {
                if (! tender?.taxId) {
                    return false
                }
                const bid = await fetchChosenBid(tender.taxId)
                if (bid !== chosenBid) {
                    setChosenBid(bid)
                }
            }
            getChosenBid()
        },
        [chosenBid, tender?.taxId]
    )

    return chosenBid
}

type CreateTenderProps = {
    tender: Tender
    wallet: JWKInterface
}
export const createTender = async ({tender, wallet}: CreateTenderProps) => {
    
    const quantity = "Ar" === tender.coin
        ? arweave.ar.arToWinston(tender.amount)
        : tender.amount
    const target = process.env.REACT_APP_WALLET
    const tx = await arweave.createTransaction(
        {
            data: JSON.stringify(tender),
            target,
            quantity
        },
        wallet
    )

    tx.addTag(TAG_APP_NAME, APP_NAME)
    tx.addTag(TAG_DATA_TYPE, DATA_TYPE_TENDER)

    await arweave.transactions.sign(tx, wallet)

    const result = await arweave.transactions.post(tx)
    const success = result.status === 200

    alert(success
        ?   "Your tender was published"    
        :   ( result.data.error.msg || "Error while publishing the tender")
    )

    return success

}

type CreateBidProps = {
    bid: Bid
    wallet: JWKInterface
}
export const createBid = async ({bid, wallet}: CreateBidProps) => {
    
    const tx = await arweave.createTransaction(
        {
            data: JSON.stringify(bid),
        },
        wallet
    )

    tx.addTag(TAG_APP_NAME, APP_NAME)
    tx.addTag(TAG_TENDER_ID, bid.tenderId)

    await arweave.transactions.sign(tx, wallet)

    const result = await arweave.transactions.post(tx)
    const success = result.status === 200
    
    alert(success
        ?   "Your answer was published"    
        :   ( result.data.error.msg || "Error while publishing the answer")
    )

    return success    

}

type ChooseBidProps = {
    tender: Tender,
    bid: Bid
    wallet: JWKInterface
}
export const chooseBid = async ({bid, tender, wallet}: ChooseBidProps) => {
    const tx = await arweave.createTransaction(
        {
            data: JSON.stringify({
                bidId: bid.taxId
            }),
            quantity: `${0.9 * parseFloat(tender.amount)}`,
            target: bid.owner
        },
        wallet
    )

    tx.addTag(TAG_APP_NAME, APP_NAME)
    tx.addTag(TAG_BID_CHOOSED, tender.taxId!)

    await arweave.transactions.sign(tx, wallet)

    const result = await arweave.transactions.post(tx)
    const success = result.status === 200

    alert(success
        ?   "Bid was successfully choosen"    
        :   ( result.data.error.msg || "Error while choosing this bid")
    )

    return success    
}

export const fetchChosenBid = async (tenderId: string) => {
    const bids = await fetchTransactions(TAG_BID_CHOOSED, tenderId)
    return bids[0]?.bidId
}