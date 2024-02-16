"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "~/components/admin/MainLayout";
import MailTemplateForm from "~/components/admin/form/mail-template-form";
import Loading from "~/components/loading";
import useAdminNav from "~/hooks/useAdminNav";
import useSelectedCategory from "~/hooks/useSelectedCategory";
import { create_email_template } from "~/services/mails";

function AddMailTemplate() {
  const [imageUrl, setImageUrl] = useState([]);
  const [html, setHtml] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCategory } = useSelectedCategory();
  const { setNavActive } = useAdminNav();
  const router = useRouter();
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const finalData = {
        createdBy: selectedCategory,
        content: html,
        ...formData,
      };
      const res = await create_email_template(finalData);
      if (res) {
        toast.success("Created successfully");
        setTimeout(() => {
          router.push("/admin");
          setNavActive("Emails");
        }, 4000);
      } else {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <MainLayout>
      <MailTemplateForm
        onSubmit={onSubmit}
        title="New Message"
        setHtml={setHtml}
        setImageUrl={setImageUrl}
      />
    </MainLayout>
  );
}

export default AddMailTemplate;
