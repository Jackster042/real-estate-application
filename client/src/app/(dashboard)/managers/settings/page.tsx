"use client";

import SettingsForm from "@/components/form/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";

const ManagerSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManagerSettings] = useUpdateManagerSettingsMutation();

  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };
  const handleSubmit = async (data: typeof initialData) => {
    await updateManagerSettings({
      cognitoId: authUser?.userInfo.cognitoId!,
      ...data,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <SettingsForm
      userType="manager"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
};

export default ManagerSettings;
