"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/lib/api";
import { AppUser, Vendor } from "@/types/types";

export function useProfileData() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [appUser, setAppUser] = useState<Partial<AppUser> | null>(null);
  const [vendor, setVendor] = useState<Partial<Vendor> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!authUser || !token) {
      setAppUser(null);
      setVendor(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Clean and concise: authApi automatically handles base URL and Bearer token!
      const { data } = await authApi.get("/me");
      const dbUser = data.user;

      // 1. Map standard user fields to appUser state
   // 1. Map standard user fields to appUser state
      setAppUser({
        id: dbUser._id || dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        phoneNumber: dbUser.phoneNumber,
        profileImage: dbUser.profileImage,
        dateOfBirth: dbUser.dateOfBirth,
        gender: dbUser.gender,
        address: dbUser.address,
      } as Partial<AppUser>);

      // 2. Map vendor/cook fields if the user is a cook/vendor
      if (dbUser.role === "cook") {
        setVendor({
          businessName: dbUser.businessName,
          logo: dbUser.logo,
          description: dbUser.description,
          subscription: dbUser.subscription,
        });
      } else {
        setVendor(null);
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setAppUser(null);
      setVendor(null);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (authLoading) return;
    fetchData();
  }, [authLoading, fetchData]);

  return { appUser, vendor, loading, reload: fetchData };
}