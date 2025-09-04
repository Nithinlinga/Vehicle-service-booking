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
            role:role.toLowerCase()
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
        },
        validateOnBlur:false,
        validateOnChange:false,
        validate: values=>{
            const errors={}
            if(!values.email){
                errors.email="Email required"
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email = 'Invalid email address';
            }
            if(!values.username){
                errors.username="Username required"
            }
            else if (['admin', 'null', 'god'].includes(values.username)) {
                errors.username = 'Nice try';
            }
            else if(!/^[a-z]+$/.test(values.username)){
                errors.username="Must contain only lowercase letters"
                
            }
            else if(!/^.{8,}$/.test(values.username)){
                errors.username="Must be at least 8 characters long"
            }
            else if(!/^.{0,50}$/.test(values.username)){
                errors.username="Cannot be more than 50 characters"

            }
            return errors;
        }
    })
    return (
        <div className="flex dark:to-slate-900 flex-col items-center justify-center min-h-screen ">
            <div className=" text-white shadow-2xl rounded-xl p-10 w-3/4">
                <h2 className="text-2xl  font-bold mb-6 text-center bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">Sign Up</h2>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 space-y-5 space-x-5">
                    <div className="grid">

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="p-3 rounded outline-1 text-black
                        placeholder-gray-500 focus:outline-none focus:ring-2
                        focus:ring-cyan-600 dark:outline-cyan-600 dark:text-white"  />
                        {formik.errors.email && <span className=" text-red-600">{formik.errors.email}</span>}
                        </div>
                        <div className="grid">

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="p-3 rounded outline-1 text-black placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:outline-cyan-600 dark:text-white" />
                        {formik.errors.username && <span className=" text-red-600">{formik.errors.username}</span>}
                        </div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-600 dark:outline-cyan-600 dark:text-white" />
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-600 dark:outline-cyan-600 dark:text-white" />
                    

                    {/* {isMechanic && <select
                        className="p-3 rounded outline-1 text-black 
                        placeholder-gray-500 focus:outline-none 
                        focus:ring-2 focus:ring-cyan-600"
                        name="expertise" id="expertise">
                        <option value="Engine-Expert">Engine Expert</option>
                        <option value="Brake-Expert">Brake-Expert</option>
                        <option value="ABS-Expert">ABS Expert</option>
                    </select> } */}
                    <br />
                    <div className="w-full flex justify-center col-span-2">
                    <button type="submit" disabled={formik.isSubmitting} className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
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