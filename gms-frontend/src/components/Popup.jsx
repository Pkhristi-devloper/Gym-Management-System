/* eslint-disable react/prop-types */
import CloseIcon from '@mui/icons-material/Close';
const Popup = ({content,handleClose,header}) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-[#000]/25 flex items-center justify-center">
      <div className="bg-white p-5 text-black w-[90%] max-w-[700px] h-[80vh] rounded-lg flex flex-col gap-[20px]">
      <div className="w-full h-fit justify-between flex ">
        <span className='text-3xl font-semibold'>{header}</span>
        <span onClick={()=>handleClose()}><CloseIcon className='w-[200px] h-[200px] cursor-pointer'/></span>
      </div>
      {content}
      </div>

    </div>
  )
}

export default Popup