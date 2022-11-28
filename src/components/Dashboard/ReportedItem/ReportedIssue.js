import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ReportedIssue = () => {
    const reportedIssue = useLoaderData()
    console.log(reportedIssue)
    return (
        <div className="w-full m-10">
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Laptop Name</th>
                            <th>Issue</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedIssue.map(report => (
                                <tr key={report._id}>
                                    <td>{report.laptopName}</td>
                                    <td>{report.issue}</td>
                                    <td>{report.sellerName}</td>
                                    <td>{report.sellerEmail}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReportedIssue;