"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi"; // Importa el ícono de hamburguesa
import Image from "next/image";
import { MenuItem, Menu, ProductItem, HoveredLink } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

type Props = {
    idUser: string,
  };

export function NavbarSession({ idUser }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className=" top-2 " menuOpen={menuOpen} toggleMenu={toggleMenu} idUser={idUser} />
    </div>
  );
}
function Navbar({ className, menuOpen, toggleMenu, idUser }: { className?: string; menuOpen: boolean; toggleMenu: () => void; idUser: string }) {
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}>
      <Menu setActive={() => {}} menuOpen={menuOpen}>
        <div className="flex flex-col justify-start items-center md:flex-row md:items-center md:space-x-20">
          <div className="flex items-center space-x-4">
            {/* Agrega la lógica para mostrar el ícono de hamburguesa */}
            <div className="block md:hidden">
              <button onClick={toggleMenu}>
                <HiMenu className="h-6 w-6 text-white" />
              </button>
            </div>
            <Link href='/'>
                <Image src={'/ggs.png'} alt="Logo" className="h-8 w-20" width={20} height={8}/>
            </Link>
          </div>
          {/* Aquí se mantiene la lógica para mostrar los elementos del menú */}
          <div className={`md:flex flex-col md:flex-row ${menuOpen ? 'block'  : 'hidden'} md:space-x-20 mt-4 md:mt-0`}>
            <Link href={`/s/${idUser}/avances`}>Advance</Link>
            <Link href={`/s/${idUser}/clases/chat`}>Courses</Link>
            <Link href={`/s/${idUser}`}>Profile</Link>
          </div>
        </div>
      </Menu>
    </div>
  );
}
