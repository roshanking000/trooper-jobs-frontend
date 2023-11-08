const RoundedDiv = ({ children, clickFunc, margin, padding, width, height, attrib, justify }) => {
  return (
    <div className={`${width == undefined ? '' : width} ${height == undefined ? '' : height} sm:relative sm:inline-flex items-center p-[2px] mt-1 text-lg font-semibold leading-6 ${margin == undefined ? '' : margin} ${attrib == undefined ? '' : attrib} text-primary rounded-full bg-grey backdrop-blur-lg hover:shadow-button-hover group hover:bg-gradient-to-r hover:from-[#F5A55B] hover:via-[#8B65F6] hover:to-[#2F40FF]`}>
      <span className={`relative w-full h-full bg-primary hover:bg-button-hover rounded-full group-hover:bg-button-hover flex flex-row ${padding == undefined ? '' : padding} ${justify == undefined ? 'justify-center' : justify} items-center gap-2`}>
        {children}
      </span>
    </div>
  )
}

export default RoundedDiv;