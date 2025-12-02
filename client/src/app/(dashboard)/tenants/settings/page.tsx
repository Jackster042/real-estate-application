"use client";

import SettingsForm from "@/components/form/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenantSettings] = useUpdateTenantSettingsMutation();

  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };
  const handleSubmit = async (data: typeof initialData) => {
    await updateTenantSettings({
      cognitoId: authUser?.userInfo.cognitoId!,
      ...data,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <SettingsForm
      userType="tenant"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
};

export default TenantSettings;
