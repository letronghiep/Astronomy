"use client";
import React from "react";
import MainLayout from "~/components/admin/MainLayout";
import EventForm from "~/components/admin/form/EventForm";

function AddEventPage() {
  return (
    <MainLayout>
      <EventForm />
    </MainLayout>
  );
}

export default AddEventPage;
