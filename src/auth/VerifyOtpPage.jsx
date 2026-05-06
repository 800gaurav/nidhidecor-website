import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import Button from "../component/wrapper/Button";

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { fetchData } = useAxios();   
    const location = useLocation();
    const navigate = useNavigate();
    // const email = location.state?.email;
    const email = location.state?.userdata;

console.log(email)
    const [registerData, setData] = useState(null);

    const handleVerify = async (e) => {
        
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        console.log({
            email
        })

        try {
            setLoading(true);
            const res = await fetchData({
                url: "/api/v1/user/auth/verify-otp",
                method: "POST",
                data: { email, otp }
            });

            console.log(res)
            const data = res.data.user

         

            setData(data);

            if (res.success) {
                const payload = {
                    referrerCode: data.referralCode || null,
                    name: data.name,
                    phone: `${data.phone}`,
                    email: data.email,
                    txnpass: data?.txnpass,
                    userId: data?.userId

                };
                toast.success('Registration successful!');
                navigate("/login", {
                    state: {
                        userdata: payload,
                        fromSignup: true,
                    }
                }
                );
                setLoading(false)
            }


        } catch (err) {
            toast.error(err.message || "Invalid OTP, try again");
        } finally {
            setLoading(false);
        }
    };

    return (<AuthWrapper
        title={'Verify otp'}
        onBackButtonClick={() => {
            navigate(-1)
        }}
    >
        <p className="text-gray-600 text-center mb-6">
            We’ve sent a 6-digit OTP to <span className="font-semibold">{email}</span>
        </p>

        <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full  text-center text-xl tracking-widest px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
        />

        <Button
            title={loading ? "Verifying..." : "Verify & Continue"}
            type="button"
            disabled={loading}
            onClick={handleVerify}
             style={{ marginTop: '1rem' }}
        />

    </AuthWrapper>
    );
};

export default VerifyOtpPage;
