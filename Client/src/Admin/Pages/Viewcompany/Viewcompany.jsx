import React, { useEffect, useState } from 'react'
import Styles from './Viewcompany.module.css'
import axios from 'axios'

const Viewcompany = () => {

  const [viewcompany, setViewcompany] = useState("");
  const [editViewcompanyId, setEditViewcompanyId] = useState(0);
  const [viewcompanys, setViewcompanys] = useState([]);

  useEffect(() => {
    loadViewcompanys()
  }, []);

  const loadViewcompanys = () => {
    axios.get('http://127.0.0.1:8000/company/')
      .then(res => setViewcompanys(res.data.companydata))
      .catch(console.error);
  }

  const handleSubmit = () => {
    const Fdata = {
      company_name: viewcompany
    }

    if (editViewcompanyId === 0) {
      axios.post('http://127.0.0.1:8000/company/', Fdata)
        .then(() => {
          setViewcompany('');
          loadViewcompanys();
        })
        .catch(console.error);
    } else {
      axios.put(`http://127.0.0.1:8000/editcompany/${editViewcompanyId}`, Fdata)
        .then(() => {
          setViewcompany('');
          setEditViewcompanyId(0);
          loadViewcompanys();
        })
        .catch(console.error);
    }
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/deletecompany/${id}/`)
      .then(() => loadViewcompanys())
      .catch(console.error);
  }

  const getEditData = (item) => {
    setEditViewcompanyId(item.id);
    setViewcompany(item.company_name);
  }

  return (
    <>
      <div className={Styles.maincontainer}>

        <div className={Styles.card}>
          <div className={Styles.title}>Company Manager</div>

          <div className={Styles.formrow}>
            <input
              type="text"
              placeholder="Enter company name..."
              className={Styles.inp}
              value={viewcompany}
              onChange={(e) => setViewcompany(e.target.value)}
            />

            <button className={Styles.addbtn} onClick={handleSubmit}>
              {editViewcompanyId === 0 ? "Add Company" : "Update Company"}
            </button>
          </div>
        </div>

        {/* ===== DIV TABLE ===== */}

        <div className={Styles.tablecontainer}>

          <div className={Styles.headerRow}>
            <div>SI NO</div>
            <div>Company Name</div>
            <div>Actions</div>
          </div>

          {viewcompanys.map((r, index) => (
            <div key={r.id} className={Styles.dataRow}>

              <div>{index + 1}</div>

              <div className={Styles.companyName}>
                {r.company_name}
              </div>

              <div className={Styles.actionCell}>
                <button
                  className={Styles.editBtn}
                  onClick={() => getEditData(r)}
                >
                  Edit
                </button>

                <button
                  className={Styles.deleteBtn}
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Viewcompany
