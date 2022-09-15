import React from 'react'
import LeftMenu from '../LeftMenu'
import RightContent from '../RightContent'
// import "./index.less"
// import Footer from '../Footer'
export default function Layout() {
    return (
        <div className="Layout_body">
            <LeftMenu />
            <RightContent />

            {/* <Footer /> */}
        </div>
    )
}
