import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../Style/Productdetails.css';
import { useReactToPrint } from "react-to-print";

function Productdetails(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const response = await axios.get("http://localhost:5000/products");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const ComponentsRef = useRef(); 
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Product details report",
    onafterprint:()=>alert("Report successfully download!")
  })

  return (
    <div className="product-details">
        <div ref={ComponentsRef}></div>
      <h1 className="product-details-heading">Product Details</h1>
      {isLoading && <p className="loading-message">Loading products...</p>} 
      {error && <p className="error-message">{error}</p>} 
      <table>
        <thead className="product-table-header">
          <tr>
            <th className="product-table-header-cell">ID</th>
            <th className="product-table-header-cell">Image</th>
            <th className="product-table-header-cell">Title</th>
            <th className="product-table-header-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((productItem, i) => (
              <tr key={productItem._id} className="product-table-row">
                <td className="product-table-cell">{productItem._id}</td>
                <td className="product-table-cell"><img src={productItem.image} alt={productItem.title} /></td>
                <td className="product-table-cell">{productItem.title}</td>
                <td className="product-table-cell">{productItem.description}</td>
              </tr>
            ))}
          {data.length === 0 && !isLoading && !error && ( 
            <tr>
              <td colSpan="4" className="no-products-message">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Productdetails;
