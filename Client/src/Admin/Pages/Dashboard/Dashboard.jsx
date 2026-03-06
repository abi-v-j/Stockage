import React, { useState } from 'react'
import Styles from './Dashboard.module.css'

const Dashboard = () => {
  const [stats] = useState([
    { label: 'Total Users', value: '2,543' },
    { label: 'Active Companies', value: '428' },
    { label: 'Total Transactions', value: '12,847' },
    { label: 'Revenue', value: '$58.2K' }
  ])

  const [transactions] = useState([
    { id: 1, company: 'TechCorp Inc', type: 'Stock Trade', amount: '$5,200', date: '2024-01-28', status: 'Completed' },
    { id: 2, company: 'InnovateLabs', type: 'Registration', amount: '$1,500', date: '2024-01-27', status: 'Pending' },
    { id: 3, company: 'DataSystems', type: 'Stock Trade', amount: '$8,900', date: '2024-01-26', status: 'Completed' },
    { id: 4, company: 'CloudWorks', type: 'Fee Payment', amount: '$2,100', date: '2024-01-25', status: 'Completed' },
    { id: 5, company: 'SecureNet', type: 'Stock Trade', amount: '$6,750', date: '2024-01-24', status: 'Failed' }
  ])

  return (
    <div className={Styles.mainContainer}>

      {/* Topbar */}
      

      {/* Stats Cards */}
      <div className={Styles.statsCards}>
        {stats.map((stat, index) => (
          <div key={index} className={Styles.card}>
            <h2>{stat.label}</h2>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className={Styles.tableContainer}>
        <h2 className={Styles.tableTitle}>Recent Transactions</h2>

        <table className={Styles.transactionTable}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.company}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.date}</td>
                <td className={Styles[t.status]}>
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard
