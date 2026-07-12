"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/Useuserrole";
import { useProfileData } from "@/hooks/useProfileData";
import RoleToggle from "@/components/profilePage/RoleToggle";
import ProfileEditForm from "@/components/profilePage/ProfileEditForm";
import CustomerProfileView from "@/components/profilePage/CustomerProfileView";
import VendorProfileView from "@/components/profilePage/VendorProfileView";
import ProfileSkeleton from "@/components/profilePage/ProfileSkeleton";

export default function ProfilePage() {
  const { user } = useAuth();
  const { role: savedRole, loading: roleLoading } = useUserRole();
  const { appUser, vendor, loading: dataLoading, reload } = useProfileData();

  const [onboardingRole, setOnboardingRole] = useState<"customer" | "vendor" | null>(null);
  const [mode, setMode] = useState<"display" | "edit">("display");

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf3ea] px-6">
        <p className="text-sm text-[#a68a72]">Please log in to view your profile.</p>
      </div>
    );
  }

  if (roleLoading || dataLoading) {
    return <ProfileSkeleton />;
  }

  // Brand-new user — no role saved yet. The toggle only ever shows here,
  // and it's gone for good the moment they pick one.
  if (!savedRole) {
    if (!onboardingRole) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#faf3ea] px-6 py-16">
          <h1
            className="mb-6 text-xl font-bold text-[#3a2418]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How will you use Chef at Home?
          </h1>
          <RoleToggle onChange={setOnboardingRole} />
        </div>
      );
    }

    return (
      <div className="bg-[#faf3ea]">
        <ProfileEditForm
          role={onboardingRole}
          appUser={null}
          vendor={null}
          onSaved={reload}
        />
      </div>
    );
  }

  // Returning user — role is fixed, no toggle anywhere in this flow.
  if (mode === "edit") {
    return (
      <div className="bg-[#faf3ea]">
        <ProfileEditForm
          role={savedRole}
          appUser={appUser}
          vendor={vendor}
          onSaved={() => {
            reload();
            setMode("display");
          }}
          onCancel={() => setMode("display")}
        />
      </div>
    );
  }

  return savedRole === "vendor" ? (
    <VendorProfileView vendor={vendor ?? {}} onEdit={() => setMode("edit")} />
  ) : (
    <CustomerProfileView appUser={appUser ?? {}} onEdit={() => setMode("edit")} />
  );
}