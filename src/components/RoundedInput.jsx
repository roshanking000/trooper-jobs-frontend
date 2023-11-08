const RoundedInput = ({ children, clickFunc, margin, padding, width, height, attrib, justify, icon, placeholder, onChangeInput, inputValue, type }) => {
  return (
    <div className={`${width == undefined ? '' : width} ${height == undefined ? '' : height} ${padding == undefined ? '' : padding} flex flex-row items-center mt-1 text-lg font-semibold leading-6 ${margin == undefined ? '' : margin} text-primary rounded-full border border-primary`}>
      {icon != undefined && (<span><img src={icon} className="grow mr-3"></img></span>)}
      <input className={`w-full h-full grow-0 ${attrib == undefined ? '' : attrib}`} placeholder={placeholder} onChange={onChangeInput} value={inputValue} type={type == undefined ? 'text' : type}></input>
      {children}
    </div>
  )
}

export default RoundedInput;