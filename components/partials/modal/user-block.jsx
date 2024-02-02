"use client";
import React, { useState } from "react";

function UserBlock({ setIsBlocked, isBlocked }) {
  const [openModal, setOpenModal] = useState(false);
  const [temporaryIsBlocked, setTemporaryIsBlocked] = useState(isBlocked);

  const BLOCKED = [
    {
      id: 0,
      name: "Blocked",
      value: true,
    },
    {
      id: 1,
      name: "Un Blocked",
      value: false,
    },
  ];

  const onConfirm = () => {
    setIsBlocked(temporaryIsBlocked);
    setOpenModal(false);
  };

  const handleShowModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setTemporaryIsBlocked(isBlocked); // Reset về giá trị ban đầu khi bấm Cancel
    setOpenModal(false);
  };

  const handleBlockedSelect = (block) => {
    setTemporaryIsBlocked(block);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Choose Roles"
        value={isBlocked ? "Blocked" : "Un Blocked"}
        readOnly
        onClick={handleShowModal}
      />
      {openModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-neutral-800/70 z-[9999] flex justify-center items-center">
          <div className="p-3 w-4/5 border rounded-md md:w-[400px] bg-white">
            <div className="relative">
              <h2 className="pb-1 border-bottom font-bold">Blocked</h2>
              {BLOCKED.map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    checked={temporaryIsBlocked === item.value}
                    onChange={() => handleBlockedSelect(item.value)}
                  />
                  {item.name}
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

export default UserBlock;
