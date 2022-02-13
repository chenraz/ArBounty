type WellcomeProps = {
    publicAddress: string 
}
const Wellcome = ({publicAddress}: WellcomeProps) => {
    return (
        <div className="max-w-lg text-center mx-auto mt-12 p-12">
            <h2 className="text-3xl">wellcome</h2>
            <p>{publicAddress}</p>
        </div>
    )
}

export default Wellcome