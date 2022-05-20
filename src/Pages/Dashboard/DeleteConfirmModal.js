import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deleteingDoctor, refetch, setDeleteingDoctor }) => {
    const { name, email } = deleteingDoctor;

    const handleDelete = () => {
        fetch(`https://pacific-badlands-31165.herokuapp.com/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} is deleted`)
                    setDeleteingDoctor(null);
                    refetch();
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete {name}</h3>

                    <div className="modal-action">
                        <button className='btn btn-xl btn-error' onClick={handleDelete}>Delete</button>
                        <label htmlFor="delete-confirm-modal" className="btn btn-xl btn-error">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;