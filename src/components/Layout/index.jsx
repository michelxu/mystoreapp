const Layout = ({ children }) => {
  return (
    <>
    <div className='min-h-screen flex flex-col pt-40 sm:pt-28 md:pt-28 lg:pt-24 items-center bg-gray-100'>
      {children}
    </div>
    </>
  )
}

export default Layout