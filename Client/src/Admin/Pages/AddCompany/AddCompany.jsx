import React, { useEffect } from 'react'
import Styles from './AddCompany.module.css'
import { useState } from 'react';
import axios from 'axios';


const AddCompany = () => {
    const [company, setCompany] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState([]);
    const [proof, setProof] = useState([]);
    const [details, setDetails] = useState("");
    const [license, setLicense] = useState("");
    const [status, setStatus] = useState([]);
    const [companys, setCompanys] = useState("");
    useEffect(() => { loadCompanys() }, []);

    const loadCompanys = () => {
        axios.get('http://127.0.0.1:8000/company/')
            .then(res => {

                setCompanys(res.data.companydata)
            })
            .catch(console.error);
    }
    useEffect(() => {
        loadCompanys()
    }, []);

    const handleSubmit = () => {
        const Fdata = new FormData();
        Fdata.append("name", name);
        Fdata.append("photo", photo);
        Fdata.append("proof", proof);
        Fdata.append("details", details);
        Fdata.append("status", status);
        Fdata.append("license", license);
        console.log(Fdata);

        
            axios.post('http://127.0.0.1:8000/company/', Fdata)
                .then(res => {
                    console.log(res.data);

                    setName('');
                    setDetails('');
                    setPhoto('');
                    setProof('');
                    setLicense('');
                    setStatus('');
                    loadCompanys();
                    setCompany('');
                })
                .catch(console.error);
        }
    
    return (

        <div className={Styles.maincontainer}>

            <div className={Styles.boxes}>
                <div className={Styles.head}>
                    <h2><b>WELCOME </b></h2>
                </div>
                <div className={Styles.head1}>
                    <p> Add your company </p>
                </div>

                <div className={Styles.inp1}>
                    <input type="text" placeholder=" Name" onChange={(e) => setName(e.target.value)} className={Styles.inp} value={name} />{ }
                    <input type="file" placeholder="Photo" onChange={(e) => setPhoto(e.target.files[0])} className={Styles.inp} />
                    <input type="file" placeholder="Proof" onChange={(e) => setProof(e.target.files[0])} className={Styles.inp} />
                    <input type="text" placeholder="Status" onChange={(e) => setStatus(e.target.value)} className={Styles.inp} value={status} />
                    <input type="text" placeholder="License" onChange={(e) => setLicense(e.target.value)} className={Styles.inp} value={license} />
                    <input type="text" placeholder="Details" onChange={(e) => setDetails(e.target.value)} className={Styles.inp} value={details} />
                </div>
                <button className={Styles.inp2} onClick={handleSubmit}>Submit</button>
            </div>
        </div>



    )
}

export default AddCompany 
