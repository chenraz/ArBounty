type Tender  = {
    taxId?: string
    owner: string
    subject: string
    amount: string
    coin: "Ar" | "Winston" 
    details?: string
    dueDate: string
}

type Bid = {
    tenderId: string
    taxId?: string
    owner: string
    answer: string
}

export { 
    type Tender,
    type Bid
}