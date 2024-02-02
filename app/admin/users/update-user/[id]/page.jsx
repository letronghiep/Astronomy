"use client";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import MainLayout from "~/components/admin/MainLayout";
import UserForm from "~/components/admin/form/UserForm";
import {
  blocked_a_user,
  get_user_by_id,
  un_blocked_a_user,
} from "~/services/auth";
import useAdminNav from "~/hooks/useAdminNav";

function UpdateUserPage({ params }) {
  const [userDetail, setUserDetail] = useState();
  const [isPending, startTransition] = useTransition();
  const [selectedRoles, setSelectedRoles] = useState({});
  const setNavActive = useAdminNav((state) => state.setNavActive);
  const router = useRouter();
  const [isBlocked, setIsBlocked] = useState(false);
  useEffect(() => {
    async function getUserById() {
      const data = await get_user_by_id(params.id);
      startTransition(() => {
        setUserDetail(data);
        setSelectedRoles(data?.selectedRoles);
        setIsBlocked(data?.isBlocked);
      });
    }
    getUserById();
  }, [params.id]);
  const handleSubmitForm = async (formData) => {
    const updateForm = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      roles: selectedRoles,
      isBlocked: isBlocked,
    };
    if (isBlocked === true) {
      const res = await blocked_a_user(params.id);
      if (res) {
        toast.success("Update Successfully");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Users");
        }, 4000);
      } else {
        toast.error("Something went wrong!!!");
      }
    } else {
      const res = await un_blocked_a_user(params.id);
      if (res) {
        toast.success("Update Successfully");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Users");
        }, 4000);
      } else {
        toast.error("Something went wrong!!!");
      }
    }
  };
  return (
    <MainLayout>
      {isPending ? (
        <Spinner size="sm" />
      ) : (
        <UserForm
          onSubmit={handleSubmitForm}
          title="Update User"
          roles={selectedRoles}
          setRoles={setSelectedRoles}
          isBlocked={isBlocked}
          setIsBlocked={setIsBlocked}
          data={userDetail}
        />
      )}
    </MainLayout>
  );
}

export default UpdateUserPage;
