"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../../components/admin/MainLayout";
import UserForm from "~/components/admin/form/UserForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAdminNav from "~/hooks/useAdminNav";
import { register_user } from "~/services/auth";

function AddUserPage() {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState({});
  const [isBlocked, setIsBlocked] = useState(false);

  const setNavActive = useAdminNav((state) => state.setNavActive);
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);
  const onSubmit = async (formData) => {
    try {
      const finalData = {
        roles: selectedRoles,
        isBlocked: isBlocked,
        ...formData,
      };
      const result = await register_user(finalData);
      if (result) {
        toast.success("Successfully");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Users");
        }, 3000);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Something went wrong");
      toast.error(error.message);
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      setLoader(false);
    }
  };
  return (
    <MainLayout>
      <UserForm
        onSubmit={onSubmit}
        title="Add User"
        roles={selectedRoles}
        setRoles={setSelectedRoles}
        isBlocked={isBlocked}
        setIsBlocked={setIsBlocked}
      />
    </MainLayout>
  );
}

export default AddUserPage;
