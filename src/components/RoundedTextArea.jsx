const RoundedTextArea = ({ children, clickFunc, margin, padding, width, height, attrib, justify, placeholder, parentAttrib, onChangeTextArea, textAreaValue }) => {
  return (
    <div className={`${width == undefined ? '' : width} ${height == undefined ? '' : height} ${padding == undefined ? '' : padding} ${parentAttrib == undefined ? '' : parentAttrib} flex flex-row items-center mt-1 text-lg font-semibold leading-6 ${margin == undefined ? '' : margin} text-primary rounded-full border border-primary`}>
      <textarea className={`w-full h-full grow-0 ${attrib == undefined ? '' : attrib} border-0 focus:shadow-transparent focus:ring-0`} placeholder={placeholder} value={textAreaValue} onChange={onChangeTextArea}></textarea>
    </div>
  )
}

export default RoundedTextArea;