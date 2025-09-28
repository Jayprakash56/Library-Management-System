import React, { useEffect, useState } from 'react'

import './ProfileLoanHistory.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/ReduxStore';
import type { LoanRecord } from '../../../../models/LoanRecord';
import axios from 'axios';
import { ProfileLoanRecord } from '../ProfileLoanRecord/ProfileLoanRecord';

export const ProfileLoanHistory:React.FC = () => {
  const user = useSelector((state: RootState) => state.authentication.profileUser);

  const [records, setRecords] = useState<LoanRecord[]>([]);

  const fetchRecordsForUser = async () => {
    if(user) {
      try {
        let res = await axios.post(import.meta.env.VITE_API_URL || 'http://localhost:8000/loan/query', {
          property: "patron",
          value: user._id
        });
        let r = res.data.records;
        setRecords(r);
      } catch(e) {
      }
    }
  }

  useEffect(() => {
     console.log("user:", user);
    fetchRecordsForUser();
  }, [user])

  return (
    <div className="profile-loan-history">
      <h3 className="profile-loan-header">{user?.firstName}'s Item Loan History:</h3>
      {records.map((record) => {
        return (
          <ProfileLoanRecord key={record._id} record={record} />
        )
      })}
    </div>
  )
}
