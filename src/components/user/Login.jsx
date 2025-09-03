import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '../../store/authSlice'
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const api=import.meta.env.VITE_SERVER_URL
    // console.log(api)
    const [params] = useSearchParams()
    const role = params.get('role') || "User";
    // console.log("role",role)
    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            role:role
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post(`${api}/login`, values);
                console.log('Submission successful:', response.data);
                dispatch(login(response.data.user))
                localStorage.setItem('auth',JSON.stringify(response.data.user))
                toast.success("Login success")
                navigate("/")
            } catch (error) {
                console.error('Submission failed:', error);
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className=" text-white shadow-2xl rounded-xl p-10 w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-500">{role} Login</h2>

                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
                    <input type="email" placeholder="Email" name='email' id='email' onChange={formik.handleChange} value={formik.values.email} className="p-3 rounded outline-1 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" /><br /><br />
                    <input type="password" placeholder="Password" name='password' id='password' onChange={formik.handleChange} value={formik.values.password} className="p-3 rounded outline-1 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" /><br /><br />
                    <button type="submit" disabled={formik.isSubmitting} className="bg-green-600 cursor-pointer  hover:bg-green-700 text-white py-3 rounded font-semibold transition duration-300">
                        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </button><br /><br />
                </form>
                <p className="mt-6 text-center text-gray-400"> Don't have an account?{" "}
                    <Link to={`/register?role=${role}`} className="text-green-400 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login