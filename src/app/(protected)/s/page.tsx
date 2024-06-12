import React from 'react';
import { Metadata } from 'next';
import { Proyects } from './_components/profile/proyects';
import { BackgroundBeams } from '@/components/ui/background-gradient-animation';
import { AnimatedTooltipPreview } from './_components/profile/avatar-circle';
import { Portafolio } from './_components/profile/portfolio';
import { currentUser } from '@/lib/auth';
import { LogoutButton } from '@/components/auth/logout';
import UploadPDF from './_components/profile/upload_pdf';
import { ModalPupUp } from './_components/profile/modal-pup-up';

export const generateMetadata = (): Metadata => {
  return {
    title: `Profile`
  }
} 

export default async function Perfil() {
    const user = await currentUser();

  return (
    <div className="relative min-h-[2000px] md:min-h-[1000px] z-0">
      <BackgroundBeams />
      <section className='z-10 flex flex-grow m-10 mt-16 absolute inset-0 flex-col justify-center items-center'>
        <div className="flex flex-col md:flex-row m-14 max-h-96 w-full">

          <div className="flex-2 mb-4 md:mb-0 md:mr-4">
            <div className='p-1 md:justify-start md:text-left justify-center text-center'>
              <div className="relative inline-flex h-10 w-52 overflow-hidden rounded-full p-1">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Fecha: 1/05/2024
                </span>
              </div>
            </div>
            <div className='bg-gray-0 h-full w-full border-0 hover:border-[4px] transition-all duration-150 border-white rounded-3xl'>
              <div className='p-6 relative justify-center align-middle text-center w-full h-full grid place-items-center'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div>
                    <AnimatedTooltipPreview />
                  </div>
                  <div className='grid text-white p-6 justify-center md:border-l-2 border-gray-700'>
                    <h1 className='font-bold text-3xl py-'>{user?.name}</h1>
                    <p className='md:py-0 py-2'>Ingeniero en Tecnologías Computacionales</p>
                    <p className='md:py-0 py-2'>Tecnológico de Monterrey</p>
                    <LogoutButton>Bye</LogoutButton>
                  </div>
                </div>
                
                <ModalPupUp></ModalPupUp>
                
                <UploadPDF />
              </div>
            </div>
          </div>

          <div className="flex-1 md:ml-4 md:max-h-none max-h-96 md:mt-0 mt-10">
            <h1 className='text-white text-3xl p-1'>Portafolio de Proyectos {user?.name}</h1>
            <div className='bg-gray-0 h-full w-full border-0 hover:border-[4px] transition-all duration-150 border-white rounded-3xl'>
              <div className='w-full h-full max-h-max overflow-hidden hover:overflow-y-auto'>
                <Portafolio />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full mt-[780px] md:mt-0 ">
          <h1 className='text-white text-3xl p-1'>Cursos Terminados y Certificaciones</h1>
          <div className='bg-gray-0 h-full w-full border-0 hover:border-[4px] transition-all duration-150 border-white rounded-3xl max-h-96'>
            <div className='w-full h-full max-h-max overflow-hidden hover:overflow-y-auto'>
              <Proyects />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
