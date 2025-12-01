"use client";

import SettingsForm from "@/components/form/SettingsForm";
import { useGetAuthUserQuery } from "@/state/api";

const TenantSettings = () => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  // call update tenant function form query

  if (authLoading) return <div>Loading...</div>;
  return <SettingsForm />;
};

export default TenantSettings;
