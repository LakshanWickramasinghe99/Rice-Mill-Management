import "../Style/NavBar.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()
    return (
        <div className="flex justify-content-space-between bg plr-10 ptb-20 ">
            <div className='pl nav-links'><Link className="link" to="/home">Home</Link></div>
            <div className='pl nav-links'><Link className="link" to="/product">Product</Link></div>
            <div className='pl nav-links'><Link className="link" to="/reports">Reports</Link></div>
            <div className='pl nav-links'><Link className="link" to="/sales">Sales</Link></div>
            <div className='pl nav-links'><Link className="link" to="/addproduct">Addproduct</Link></div>
            <div className='pl nav-links'><Link className="link" to="/updateproduct">Updateproduct</Link></div>
            <div className='pl nav-links'><Link className="link" to="/deleteproduct">Deleteproduct</Link></div>
          


        </div>
    );
}

export default NavBar;
