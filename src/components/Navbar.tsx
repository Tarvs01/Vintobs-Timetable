import React, {useContext} from 'react'
import { AppContext } from './AppProvider'

function Navbar() {
  const context = useContext(AppContext);
  return (
    <nav>
      <div className="logo-cont">
        <img src="../images/logo.png" alt="logo" />
        <p className="uni-name">The Federal <br />
          University of <br />
          Technology, Akure.
        </p>

      </div>

      <ul className='nav-links'>
        <li onClick={() => {context?.setCurrentPage(1)}} id={`${context?.currentPage == 1 ? "active-nav-link" : "inactive-nav-link"}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.3885 0.715708C11.5956 -0.233336 12.947 -0.239151 13.1645 0.707567L13.1738 0.751763L13.1936 0.835502C13.3087 1.32646 13.5657 1.77272 13.9325 2.1187C14.2994 2.46468 14.76 2.6951 15.2568 2.78128C16.2477 2.95457 16.2477 4.37697 15.2568 4.5491C14.7571 4.63589 14.2942 4.86844 13.9263 5.21754C13.5583 5.56664 13.3018 6.0167 13.1889 6.51116L13.1645 6.62281C12.9482 7.57069 11.5956 7.56488 11.3885 6.61467L11.3664 6.5193C11.2578 6.02345 11.004 5.57117 10.6374 5.22009C10.2708 4.86901 9.80793 4.63502 9.30784 4.54794C8.31926 4.37581 8.31926 2.95457 9.30784 2.7836C9.80649 2.69696 10.2682 2.46425 10.6345 2.11496C11.0007 1.76567 11.2551 1.31552 11.3653 0.821545L11.3804 0.751763L11.3885 0.715708ZM1.13746 0.0644035C0.98814 0.0642506 0.840255 0.093529 0.70226 0.150565C0.564264 0.2076 0.438862 0.291275 0.333225 0.396805C0.227587 0.502335 0.143784 0.627651 0.086607 0.765588C0.0294301 0.903525 5.17661e-07 1.05138 5.95877e-07 1.2007V6.02966C5.95877e-07 6.6577 0.509414 7.16595 1.13746 7.16595H5.96758C6.59562 7.16595 7.10388 6.6577 7.10388 6.02966V1.2007C7.10403 1.05138 7.07475 0.903495 7.01771 0.7655C6.96068 0.627504 6.877 0.502102 6.77147 0.396464C6.66594 0.290826 6.54063 0.207024 6.40269 0.149847C6.26475 0.09267 6.1169 0.0632404 5.96758 0.0632404H1.13746V0.0644035ZM5.95877e-07 10.0317C5.95877e-07 9.40365 0.509414 8.8954 1.13746 8.8954H5.96758C6.59562 8.8954 7.10388 9.40365 7.10388 10.0317V14.8618C7.10388 15.4899 6.59562 15.9993 5.96758 15.9993H1.13746C0.988042 15.9994 0.840062 15.9701 0.701991 15.913C0.563919 15.8559 0.438466 15.7721 0.332813 15.6665C0.22716 15.5608 0.143381 15.4354 0.0862727 15.2973C0.0291644 15.1592 -0.000152416 15.0112 5.95877e-07 14.8618V10.0317ZM8.83332 10.0317C8.83332 9.40365 9.34157 8.8954 9.96962 8.8954H14.7997C15.4278 8.8954 15.9372 9.40365 15.9372 10.0317V14.8618C15.9372 15.4899 15.4278 15.9993 14.7997 15.9993H9.97078C9.82146 15.9993 9.6736 15.9698 9.53567 15.9127C9.39773 15.8555 9.27242 15.7717 9.16689 15.6661C9.06136 15.5604 8.97768 15.435 8.92065 15.297C8.86361 15.159 8.83433 15.0111 8.83449 14.8618V10.0329L8.83332 10.0317Z" />
          </svg>
          <span>Generate New</span>
        </li>
        <li onClick={() => {context?.setCurrentPage(2)}} id={`${context?.currentPage == 2 ? "active-nav-link" : "inactive-nav-link"}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.6 8H10.8V10.256L12.752 11.384L12.152 12.424L9.6 10.952V8ZM1.6 0H12.8C13.2243 0 13.6313 0.168571 13.9314 0.468629C14.2314 0.768687 14.4 1.17565 14.4 1.6V6.48C15.392 7.488 16 8.872 16 10.4C16 11.8852 15.41 13.3096 14.3598 14.3598C13.3096 15.41 11.8852 16 10.4 16C8.872 16 7.488 15.392 6.48 14.4H1.6C1.17565 14.4 0.768687 14.2314 0.468629 13.9314C0.168571 13.6313 0 13.2243 0 12.8V1.6C0 1.17565 0.168571 0.768687 0.468629 0.468629C0.768687 0.168571 1.17565 0 1.6 0ZM1.6 10.4V12.8H5.336C4.992 12.072 4.8 11.256 4.8 10.4H1.6ZM1.6 4.8H6.4V2.4H1.6V4.8ZM12.8 4.8V2.4H8V4.8H12.8ZM1.6 8.8H5.032C5.304 7.88 5.808 7.056 6.48 6.4H1.6V8.8ZM10.4 6.52C9.37096 6.52 8.38407 6.92878 7.65643 7.65643C6.92878 8.38407 6.52 9.37096 6.52 10.4C6.52 12.544 8.256 14.28 10.4 14.28C10.9095 14.28 11.4141 14.1796 11.8848 13.9847C12.3556 13.7897 12.7833 13.5039 13.1436 13.1436C13.5039 12.7833 13.7897 12.3556 13.9847 11.8848C14.1796 11.4141 14.28 10.9095 14.28 10.4C14.28 8.256 12.544 6.52 10.4 6.52Z" />
          </svg>
          <span>All Timetables</span>
        </li>
        <li onClick={() => {context?.setCurrentPage(3)}} id={`${context?.currentPage == 3 ? "active-nav-link" : "inactive-nav-link"}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.80018 5.05242V11.7887C8.80018 12.4587 8.54733 13.1012 8.09725 13.575C7.64717 14.0487 7.03674 14.3149 6.40023 14.3149H4.66428C4.47556 14.8769 4.10413 15.3507 3.61566 15.6523C3.12718 15.954 2.55311 16.0642 1.99491 15.9634C1.43671 15.8626 0.930333 15.5574 0.565278 15.1016C0.200223 14.6459 0 14.0689 0 13.4728C0 12.8767 0.200223 12.2998 0.565278 11.844C0.930333 11.3882 1.43671 11.083 1.99491 10.9822C2.55311 10.8815 3.12718 10.9916 3.61566 11.2933C4.10413 11.595 4.47556 12.0687 4.66428 12.6308H6.40023C6.6124 12.6308 6.81588 12.5421 6.96591 12.3842C7.11593 12.2262 7.20021 12.0121 7.20021 11.7887V5.05242C7.20021 4.38245 7.45306 3.73993 7.90314 3.26619C8.35322 2.79245 8.96365 2.5263 9.60016 2.5263H12.0001V0.000183105L16 3.36834L12.0001 6.7365V4.21038H9.60016C9.38799 4.21038 9.18451 4.2991 9.03448 4.45701C8.88446 4.61492 8.80018 4.8291 8.80018 5.05242ZM2.40033 14.3149C2.6125 14.3149 2.81598 14.2262 2.966 14.0682C3.11603 13.9103 3.20031 13.6961 3.20031 13.4728C3.20031 13.2495 3.11603 13.0353 2.966 12.8774C2.81598 12.7195 2.6125 12.6308 2.40033 12.6308C2.18816 12.6308 1.98469 12.7195 1.83466 12.8774C1.68463 13.0353 1.60035 13.2495 1.60035 13.4728C1.60035 13.6961 1.68463 13.9103 1.83466 14.0682C1.98469 14.2262 2.18816 14.3149 2.40033 14.3149Z" />
          </svg>
          <span>Quick Tour</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar