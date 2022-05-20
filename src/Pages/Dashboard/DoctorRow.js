import React from 'react';


const DoctorRow = ({ doctor, index, setDeleteingDoctor }) => {
    const { img, name, specialty } = doctor;


    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="w-16 rounded">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{specialty}</td>
            <td>
                {/* open modal button  */}
                <label onClick={() => setDeleteingDoctor(doctor)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Delete</label>
            </td>
        </tr>
    );
};

export default DoctorRow;