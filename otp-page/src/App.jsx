import React, { useRef, useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar"

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const handelchange = (index, value) => {
    if (value.length == 4 && !isNaN(value)) {
      let pin = value.split("");
      setOtp(pin);
    }
    if (value !== "" && (isNaN(value) || value.length > 1)) return;
    const pin = [...otp];
    pin[index] = value;
    setOtp(pin);

    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
    if (pin.every((digit) => digit !== "")) {
      console.log(`Entered OTP is : ${pin.join("")}`);
    }
  };

  const handelKeyDown = (e, i) => {
    if (e.key == "Backspace" && !otp[i] && i > 0) {
      inputRef.current[i - 1].focus();
    }
  };
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Enter OTP</h1>
        <div>
          {otp.map((ele, i) => (
            <input
              type="text"
              value={ele}
              key={i}
              onChange={(e) => handelchange(i, e.target.value)}
              ref={(ele) => (inputRef.current[i] = ele)}
              className="box-style"
              onKeyDown={(e) => {
                handelKeyDown(e, i);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Otp;