"use client";
import { useState } from "react";
import SidePanel from "../sidecomp/SidePanel";
import CartDrawer from "../sidecomp/Cartdrawer";
import ProfileDrawer from "../sidecomp/ProfileDrawer";

export default function SomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <SidePanel
        onCartClick={() => setCartOpen(true)}
      />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}