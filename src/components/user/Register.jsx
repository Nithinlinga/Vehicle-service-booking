import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const api = import.meta.env.VITE_SERVER_URL
    // console.log(api)
    const [params] = useSearchParams()
    const role = params.get('role') || "User";
    // const isMechanic=role==="Mechanic";

    const formik = useFormik({
        initialValues:{
            email:'',
            username:'',
            password:'',
            confirmPassword:'',
            role:role
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post(`${api}/register`, values);
                console.log('Submission successful:', response.data);
                toast.success("Success")
                navigate("/")
            } catch (error) {
                console.error('Submission failed:', error);
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className=" text-white shadow-2xl rounded-xl p-10 w-3/4">
                <h2 className="text-2xl text-green-500 font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 space-y-5 space-x-5">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="p-3 rounded outline-1 text-black
                        placeholder-gray-500 focus:outline-none focus:ring-2
                        focus:ring-green-500" />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="p-3 rounded outline-1 text-black placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-green-500" />
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-green-500" />
                    

                    {/* {isMechanic && <select
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-green-500"
                        name="expertise" id="expertise">
                        <option value="Engine-Expert">Engine Expert</option>
                        <option value="Brake-Expert">Brake-Expert</option>
                        <option value="ABS-Expert">ABS Expert</option>
                    </select> } */}
                    <br />
                    <div className="w-full flex justify-center col-span-2">
                    <button type="submit" disabled={formik.isSubmitting} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold transition duration-300">
                        Sign Up
                    </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-400">Already have an account?{" "}
                    <Link to={`/login?role=${role}`} className="text-green-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;