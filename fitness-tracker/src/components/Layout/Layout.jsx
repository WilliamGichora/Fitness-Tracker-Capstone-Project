import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

//General Layout of the website pages. The outlet is where the body of the different pages is displayed in
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