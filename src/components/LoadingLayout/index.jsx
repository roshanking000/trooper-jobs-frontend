import './style.css'
import IntermediateProgress from '/imgs/common/intermediate.svg'

const LoadingLayout = () => {
    return (
        <div className="fixed bg-mandatory top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            {/* <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div> */}
            <img src={IntermediateProgress} className='w-[40px] h-[40px] animate-spin'></img>
            <h2 className="text-center text-primary text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-primary">This may take a few seconds</p>
        </div>
    )
}

export default LoadingLayout
