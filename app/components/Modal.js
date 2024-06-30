import React from 'react';
import Image from "next/image";
import crossImage from '../assets/cross.svg';

const Modal = ({
    setOpenModal,
    deleteAll,
    signOut,
    openModalValue
}) => {

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <div  className={`fixed inset-0 z-10 h-screen w-screen backdrop-blur-xl flex justify-center items-center transition-opacity duration-300 ease-in-out ${
            openModalValue ? 'opacity-100' : 'opacity-0'
          }`}>
        <div className='flex bg-neutral-700 flex-col p-5 rounded-xl w-[50vh] gap-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Settings</h1>
                <Image src={crossImage} width={25} alt="close" className='cursor-pointer'
                    onClick={closeModal} />
            </div>
            <button className=' rounded-full bg-red-700 py-2 text-xl' onClick={() => { deleteAll(), closeModal() }}>Delete All Todos</button>
            <button className='rounded-full border py-2 text-xl' onClick={async () => { await signOut(), closeModal() }}>Sign Out</button>
        </div>
        </div >
    )
}

export default Modal
