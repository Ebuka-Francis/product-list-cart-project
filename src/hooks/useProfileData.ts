"use client";

import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { AppUser, Vendor    } from "@/types/types";

export function useProfileData() {
  const { user, loading: authLoading } = useAuth();
  const [appUser, setAppUser] = useState<Partial<AppUser> | null>(null);
  const [vendor, setVendor] = useState<Partial<Vendor> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) {
      setAppUser(null);
      setVendor(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const userSnap = await getDoc(doc(db, "users", user.uid));
    setAppUser(userSnap.exists() ? (userSnap.data() as Partial<AppUser>) : null);

    const vendorSnap = await getDoc(doc(db, "vendors", user.uid));
    setVendor(vendorSnap.exists() ? (vendorSnap.data() as Partial<Vendor>) : null);

    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    fetchData();
  }, [authLoading, fetchData]);

  return { appUser, vendor, loading, reload: fetchData };
}