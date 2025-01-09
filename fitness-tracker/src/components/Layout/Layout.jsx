import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

function Layout() {
  return (
    <div className="bg-cover bg-gradient-to-br from-specialCream to-[#557C56]">
          <Header />
          <Outlet/>
          <Footer />
      </div>
  )
}

export default Layout;