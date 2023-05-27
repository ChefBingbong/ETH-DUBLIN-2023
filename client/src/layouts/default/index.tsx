import React, { useState, useCallback } from "react";
import Navbar from "@/componetnts/Navbar/Navbar";
import WalletConnect from "@/componetnts/WalletConnectModal/WalletConnectModal";
import useWallet from "@/hooks/useWallet";
import { useGlobalState } from "@/context/useGlobalStat";
// import AccountDetailsModal from "@/components/AccountDetailsModal/AccountDetailsModal";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const {disconnect} = useWallet()
  const { openWalletModal, toggleWalletModal } = useGlobalState()

  const [showAccount, setShowAccount] = useState<boolean>(false);
  const toggleAccoundDetailsModal = (): void => setShowAccount(!showAccount);

  return (
    <div className="flex h-screen flex-col items-center text-white  lg:h-auto lg:min-h-screen">
      <Navbar
        toggleWalletModal={toggleWalletModal}
        toggleAccoundDetailsModal={toggleAccoundDetailsModal}
        deactivate={disconnect}
      />
      <WalletConnect
        toggleWalletModal={toggleWalletModal}
        openWalletModal={openWalletModal}
      />
      {/* <AccountDetailsModal
        toggleAccoundDetailsModal={toggleAccoundDetailsModal}
        showAccount={showAccount}
      /> */}
      <div
        id="layout"
        className={`bg-black-900 coingrid-scrollbar relative w-full flex-1 items-center overflow-x-hidden overflow-y-scroll rounded-t-[40px]  pb-2 pt-6 sm:p-8   md:rounded-[40px] md:p-10 lg:mb-6 lg:overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
