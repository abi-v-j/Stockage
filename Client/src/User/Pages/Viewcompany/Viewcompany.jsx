import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import styles from "./Viewcompany.module.css";

const Viewcompany = () => {
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/viewacceptedcompany/");
      setCompanyList(res.data.companydata);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loader}></div>
        <p>Loading companies...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Accepted Companies</h2>
        <p>Explore verified companies and their stock details</p>
      </div>

      <div className={styles.grid}>
        {companyList.map((item) => (
          <div key={item.id} className={styles.card}>
            
            {/* Image */}
            <div className={styles.imageWrap}>
              {item.company_photo ? (
                <img
                  src={`http://127.0.0.1:8000/${item.company_photo}`}
                  alt="company"
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>

            {/* Content */}
            <div className={styles.content}>
              <h3 className={styles.name}>{item.company_name}</h3>
              <p className={styles.details}>
                {item.company_details?.slice(0, 80)}...
              </p>

              {/* Links */}
              <div className={styles.links}>
                {item.company_proof && (
                  <a
                    href={`http://127.0.0.1:8000${item.company_proof}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Proof
                  </a>
                )}

                {item.company_license && (
                  <a
                    href={`http://127.0.0.1:8000${item.company_license}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    License
                  </a>
                )}
              </div>

              {/* Button */}
              <Link
                to={`/User/ViewStock/${item.id}`}
                className={styles.btn}
              >
                View Stocks
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewcompany;