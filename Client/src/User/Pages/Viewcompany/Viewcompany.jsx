import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Viewcompany = () => {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    axios
      .get("http://127.0.0.1:8000/viewacceptedcompany/")
      .then((res) => {
        setCompanyList(res.data.companydata);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Accepted Companies</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Company Name</th>
            <th>Details</th>
            <th>Photo</th>
            <th>Proof</th>
            <th>License</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companyList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.company_name}</td>
              <td>{item.company_details}</td>
              <td>
                {item.company_photo ? (
                  <img
                    src={`http://127.0.0.1:8000${item.company_photo}`}
                    alt="company"
                    width="80"
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>
                {item.company_proof ? (
                  <a
                    href={`http://127.0.0.1:8000${item.company_proof}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Proof
                  </a>
                ) : (
                  "No Proof"
                )}
              </td>
              <td>
                {item.company_license ? (
                  <a
                    href={`http://127.0.0.1:8000${item.company_license}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View License
                  </a>
                ) : (
                  "No License"
                )}
              </td>
              <td>
                <Link to={`/user/ViewStock/${item.id}`}>View Stocks</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewcompany;