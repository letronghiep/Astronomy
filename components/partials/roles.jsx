"use client";
import React, { useState } from "react";

function PickRoles({ setSelectedRoles, selectedRoles }) {
  const [openModal, setOpenModal] = useState(false);
  const [temporaryRoles, setTemporaryRoles] = useState(selectedRoles);
  const initialRoles = {
    User: 2002,
    Partner: 2001,
    Admin: 2000,
  };
  const onConfirm = () => {
    setSelectedRoles({ ...temporaryRoles });
    setOpenModal(false);
  };
  const handleShowModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setTemporaryRoles(selectedRoles); // Reset về giá trị ban đầu khi bấm Cancel

    setOpenModal(false);
  };
  const handleRoleSelect = (role) => {
    setTemporaryRoles((prevRoles) => {
      const updatedRoles = { ...prevRoles };

      if (updatedRoles[role]) {
        // Nếu đã được chọn, bỏ chọn
        delete updatedRoles[role];
      } else {
        // Nếu chưa được chọn, thêm vào
        updatedRoles[role] = initialRoles[role];
      }

      return updatedRoles;
    });
  };
  return (
    <>
      <input
        type="text"
        placeholder="Choose Roles"
        value={selectedRoles && Object.keys(selectedRoles).join(", ")}
        readOnly
        onClick={handleShowModal}
      />
      {openModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-neutral-800/70 z-[9999] flex justify-center items-center">
          <div className="p-3 w-4/5 border rounded-md md:w-[400px] bg-white">
            <div className="relative">
              <h2 className="pb-1 border-bottom font-bold">Choose role</h2>
              {Object.keys(initialRoles).map((role) => (
                <label key={role}>
                  <input
                    type="checkbox"
                    checked={temporaryRoles[role] === initialRoles[role]}
                    onChange={() => handleRoleSelect(role)}
                  />
                  {role}
                </label>
              ))}

              <div className="flex items-center justify-around mt-2">
                <button
                  className="bg-blue-600 text-white px-8 py-1 rounded hover:opacity-70"
                  onClick={onConfirm}
                >
                  OK
                </button>
                <button
                  className="bg-red-600 text-white px-8 py-1 rounded hover:opacity-70"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PickRoles;
