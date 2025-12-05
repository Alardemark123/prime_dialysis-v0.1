"use client";

import React, { useEffect, useState } from "react";
// Assuming you have an icon for the floating button and the close button
import {
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import ChemotherapyIcon from "/public/assets/kaagapayprogram/Chemotherapy-Treatment.svg";
import LaboratoryIcon from "/public/assets/kaagapayprogram/Laboratory-Fee.svg";
import MedicationIcon from "/public/assets/kaagapayprogram/Maintenance-Medication.svg";
import ImplantIcon from "/public/assets/kaagapayprogram/Medical-Implant.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const KaagapayContent = ({ setIsModalOpen }) => {
  const router = useRouter();
  const assistanceItems = [
    {
      icon: ChemotherapyIcon,
      title: "Chemotherapy Treatment and Targeted Therapy",
    },
    {
      icon: MedicationIcon,
      title: "Maintenance Medication",
    },
    {
      icon: LaboratoryIcon,
      title: "Medical Laboratory Fee and Procedure",
    },
    {
      icon: ImplantIcon,
      title: "Medical Implant and Assistive Devices",
    },
  ];

  // Sub-component for the four boxes
  const MedicalAssistanceCard = ({ icon: iconPath, title }) => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-2 flex items-center shadow-md">
      <Image
        src={iconPath}
        alt={title}
        width={24}
        height={24}
        className="text-[#d62028] text-2xl md:text-3xl mr-1 md:mr-2 flex-shrink-0"
      />
      <span className="text-gray-700 font-semibold text-xs md:text-sm leading-tight">
        {title}
      </span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 w-full overflow-hidden">
      <div className=" text-center relative">
        <Image
          src="/assets/kaagapayprogram/KAAGAPAY-PROGRAM.png"
          alt="Logo"
          width={500}
          height={500}
          className="object-contain w-[250px] sm:w-[300px] xl:w-[340px] mx-auto mb-4"
          priority
        />

        <p
          className={`text-base md:text-2xl font-extrabold mt-4 mb-4 text-[#1c84c6] tracking-wider uppercase`}
        >
          MEDICAL ASSISTANCE PROGRAM
        </p>

        <div className="px-2">
          <p className="text-[#1c84c6] text-sm md:text-lg font-bold">
            “Hindi mo kailangan mag-isa na{" "}
            <span className="text-[#d62028]">LABAN</span>. May tulong na handog
            ang Detoxicare para sa iyo. Sa{" "}
            <span className="text-[#d62028]">Kaagapay</span> Medical Assistance
            Program, may <span className="text-[#d62028]">GAMUTAN</span> at may{" "}
            <span className="text-[#d62028]">PAG-ASA</span>.”
          </p>
        </div>

        <div className="flex justify-center my-4">
          <hr className="w-full border-t-2 border-[#d62028]" />
        </div>
      </div>

      <div className="md:px-8 pt-0">
        <p className="text-center text-sm md:text-lg font-bold text-gray-800 mb-3">
          PATIENT CAN NOW RECEIVE MEDICAL ASSISTANCE FOR:
        </p>

        <div className="grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-2">
          {assistanceItems.map((item, index) => (
            <MedicalAssistanceCard
              key={index}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <a
            href="https://www.detoxicare.com.ph/access-for-all/kaagapay-assistance-program"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
              router.push("https://www.detoxicare.com.ph/access-for-all/kaagapay-assistance-program");
            }}
            className={`bg-[#D7282F] hover:bg-red-700 text-white text-lg font-bold py-1 px-8 rounded-lg shadow-lg uppercase transition duration-300`}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

const KaagapayPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Show modal after 1 second
    const showTimer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  
  useEffect(() => {
    controls.start({
      rotate: [0, -6, 6, -6, 6, 0], // shake
      transition: {
        duration: 1, // speed of shake
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2, // pause between shakes
      },
    });
  }, [controls]);

  return (
    <>
      {!isModalOpen &&  <motion.div
      onClick={toggleModal}
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 cursor-pointer"
      animate={controls}
      initial={{ y: 0, rotate: 0 }}
    >
        <div
          className="
            bg-white
            hover:bg-white/90
            backdrop-blur-xl 
            border border-gray-200 
            shadow-xl 
            rounded-2xl 
            px-3 
            py-2 
            flex 
            items-center 
            justify-center
          "
        >
          <Image
            src="/assets/kaagapayprogram/KAAGAPAY-PROGRAM.png"
            alt="Open Medical Assistance Program"
            width={100}
            height={100}
            className="w-[80px] md:w-[100px] h-auto object-contain"
            priority
          />
        </div>
      </motion.div>
      }
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden"
            >
              <Image
                src="/assets/kaagapayprogram/pattern-bg.png"
                alt="Background pattern"
                width={500}
                height={500}
                className="absolute w-full h-full object-cover"
                priority
              />

              <div className="relative z-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 p-1 rounded-full bg-white text-gray-500 hover:text-gray-900 border border-gray-300 z-10"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-xl md:text-2xl" />
                </button>

                <KaagapayContent setIsModalOpen={setIsModalOpen}  />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default KaagapayPopup;
