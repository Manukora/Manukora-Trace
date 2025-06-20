import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

export const MgoCounter = ({ mgo_rating = 0, mgo_level = 0 }: {mgo_rating?: number, mgo_level?: number}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const startValue = 0.5 * mgo_level;

  useEffect(() => {
    const checkForModal = () => {
      // Check if the email form modal is present in the DOM
      const modal = document.querySelector('.fixed.inset-0.bg-black\\/50.backdrop-blur-sm');
      const emailForm = document.querySelector('[data-builder-component="33a66c32ccc64bcb8ec1cf4daf73948d"]');
      
      if (!modal && !emailForm && !hasStarted) {
        setIsVisible(true);
        setHasStarted(true);
      }
    };

    // Check immediately
    checkForModal();

    // Set up an interval to check periodically
    const interval = setInterval(checkForModal, 100);

    // Clean up interval
    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <div 
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#000000",
        display: "inline-block",
        minWidth: "8rem",
        textAlign: "center",
      }}
    >
      {isVisible ? (
        <CountUp
          start={startValue}
          end={mgo_rating}
          duration={10}
          separator=","
          decimals={0}
          delay={0}
          useEasing={true}
        />
      ) : (
        <span>{startValue.toLocaleString()}</span>
      )}
    </div>
  );
};

export default MgoCounter;
