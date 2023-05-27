import React, { useState, useEffect } from "react";
import { UilAngleDown, UilSpinnerAlt, UilBars } from "@iconscout/react-unicons";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "@/utils/misc";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useRouter } from "next/router";
import Link from "next/link";
import AstralLogo from "../../../public/images/logo.svg";
import { Wrapper, BoxItemContainer, Box, Nav } from "../CSS/Navbar.styles";
import SlideOver from "../Sidebar/Sidebar";
import styled from "styled-components"

interface INavbar {
  toggleWalletModal: () => void;
  toggleAccoundDetailsModal: () => void;
  deactivate: () => void;
}

const ROUTES: string[] = ["home"];

const NavLinks = ({
  routes,
  activePath,
}: {
  routes: string[];
  activePath: string;
}) => {
  return (
    <>
      {routes.map((route: string, index: number) => {
        return (
          <Link
            href={`/${route}`}
            key={route}
            className="mx-1 hidden flex-row items-center gap-2 sm:flex"
            id={route}
          >
            <span
              className={`my-2 w-full rounded-xl px-2 py-2 text-center text-[16px] font-[900] ${
                activePath.slice(1, activePath.length) === route
                  ? "text-[rgb(118,69,217)]"
                  : "text-blue-500"
              } hover:cursor-pointer hover:bg-[#e9eaeb] text-blue-500`}
            >
              {route}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export const Navbar = ({
  toggleWalletModal,
  toggleAccoundDetailsModal,
  deactivate
}: INavbar) => {
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const pending = false

  const [provider, setProvider] = useState<string | null>(null);
  const router = useRouter();
  const { account, active } = useWeb3React();
  const activePath = router.pathname;

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setIsNavbarDark(true);
    } else {
      setIsNavbarDark(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  useEffect(() => {
    if (typeof window == "undefined" || !active) return;
    const provider = localStorage.getItem("provider");
    setProvider(provider);
  }, [active]);

  return (
    <>
      <SlideOver
        open={openSideBar}
        setOpen={() => setOpenSideBar(!openSideBar)}
      />

      <Wrapper isNavbarDark={isNavbarDark}>
        <Nav>
          <Box>
            <BoxItemContainer allignment={"flex-start"}>
              <div className="mr-2 hidden h-full items-center gap-2 md2:flex">
                <div className="text-black text-lg font-bold">ESCRO DAO</div>

                <NavLinks routes={ROUTES} activePath={activePath} />
              </div>
              <div className="mr-6 flex h-full items-center gap-2 md2:hidden">
                <UilBars
                  className="h-8 w-8 text-[#c3c5c8] hover:cursor-pointer"
                  onClick={() => setOpenSideBar(!openSideBar)}
                />
              </div>
            </BoxItemContainer>

            <BoxItemContainer allignment={"flex-end"}>
              <div className="mr-5 flex  h-full items-center">
                {/* <div className="mr-5 flex  h-full items-center"> */}
                <PrimaryButton
                  className={`relative mt-[2px] ${
                    "border-b-[3px] border-[#d7d8da] bg-[#e9eaeb] hover:bg-[rgb(37,99,235)]"
                  
                  } py-[4px]`}
                  onClick={
                    !active ? toggleWalletModal : deactivate
                  }
                >
                  {/* {account ? (
                    <div className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1fc7d4] bg-white">
                      <Wallet className="h-7 w-7 text-[#1fc7d4]" />
                    </div>
                  ) : null} */}
                  <span
                    className={`${
                      account
                        ? "ml-6 mr-2 text-[#280d5f]"
                        : " text-white"
                    } hidden font-[900] xs:block`}
                  >
                    {pending
                      ? "1 Pending Tx"
                      : account
                      ? shortenAddress(account)
                      : "Connect Wallet"}
                  </span>
                  {pending ? (
                    <UilSpinnerAlt className="h-6 w-6 animate-spin text-gray-500" />
                  ) : (
                    account && (
                      <UilAngleDown className={"h-5 w-5 text-[#280d5f] "} />
                    )
                  )}
                </PrimaryButton>
              </div>
            </BoxItemContainer>
          </Box>
        </Nav>
      </Wrapper>
    </>
  );
};

export default Navbar;
