import { useContext, useState } from "react";
import Input from "../common/Input";
import userService from '../../services/user'
import { NotificationContext } from "../../context/NotificationContext";

// Review Components
const Review = ({label, value}) => {
    return (
        <div className = "p-4 border rounded-lg ">
            <div className = "text-xs text-gray-500">{label}</div>
            <div className = "mt-1 font-medium truncate">{value || <span className = "text-gray-400">-</span>}</div>
        </div>
    )
}

const UserSignUp = ({onSwitch, onClose}) => {
    const [steps, setSteps] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [notification, dispatch] = useContext(NotificationContext)

    const [form, setForm] = useState({
        //Personal Info
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        
        //Address
        address: { 
            country: "",
            city: "",
            state: "",
            zip: "",
            street: ""
        },

        //Account
        username: "",
        password: "",
        repeatPassword: "",
        terms: false
    })


    //Arrays of Validation Function
    const validators = [
        //Personal
        (f) => {
            const err = {}
            if (!f.firstName.trim()) err.firstName = "First Name is required";
            if (!f.lastName.trim()) err.lastName = "Last Name is required";
            if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(f.email)) err.email = "Enter a Valid Email";
            if (!/^\+?[0-9]{10,15}$/.test(f.phoneNumber)) err.phoneNumber = "Enter a Valid Phone Number";
            return err
        },

        //Address
        (f) => {
            const err = {}
            if (!f.address.country.trim()) err.country = "Country is required";
            if (!f.address.city.trim()) err.city = "City is required";
            if (!f.address.state.trim()) err.state = "State is required";
            if (!f.address.street.trim()) err.street = "Street is required";
            return err
        },

        //Account
        (f) => {
            const err = {}
            if (!f.username.trim()) err.username = "Username is required";
            if (f.password.length < 6) err.password = "Password length should be greater than 6"
            if (f.repeatPassword !== f.password) err.repeatPassword = "Passwords do not match"
            
            return err
        },

        //Review
        (f) => {
            const err = {}
            if (f.terms === false) err.terms = "Please Accept the Terms and Conditions"
            return err
        }
    ]

    const [errors, setErrors] = useState({})
    const stepTiles = ['Personal', 'Address', 'Account', 'Review & Submit']


    //Function to Update Fields when user makes changes
    const updateFields = (key, value) => {
        setForm((p) => {
            if (["country", "city", "state", "zip", "street"].includes(key)) {
                return {
                    ...p,
                    address: {
                        ...p.address,
                        [key]: value
                    }
                }
            }

            return {...p, [key]: value}
        })
        setErrors((e) => ({...e, [key]: undefined}))
    }


    //Function to validate the current field 
    const validateCurrentStep = () => {
        if (steps >= validators.length - 1) return {}
        const errs = validators[steps](form)
        setErrors(errs)
        return errs
    }

    //Function to go to next step
    const next = () => {
        const errs = validateCurrentStep()
        if (Object.keys(errs).length === 0) {
            const nextStep = Math.min(steps + 1, stepTiles.length - 1)
            setSteps(nextStep)
            setErrors({})
        }
    }

    //Function to go back one step
    const back = () => {
        setSteps((s) => Math.max(s-1, 0))
    }

    //Form Submission Function
    const handleSubmit = async(e) => {
        e.preventDefault()
        const allErrs = Object.assign({}, ...validators.map(v => v(form)))
        setErrors(allErrs)
        if (Object.keys(allErrs).length > 0) {
            const firstInvalidStep = validators.findIndex(v => Object.keys(v(form)).length > 0)
            setSteps(firstInvalidStep >= 0 ? firstInvalidStep : 0)
            return
        }

        setIsSubmitting(true)
        try{
            await userService.signUp(form)
            setForm({
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                address: {
                    country: "",
                    city: "",
                    state: "",
                    zip: "",
                    street: ""
                },
                username: "",
                password: "",
                repeatPassword: "",
                terms: false
            })
            setErrors({})
            setSteps(0)
            dispatch({
                type: "SET_NOTIFICATION",
                payload: {text: "User Sign Up Successful", type: "success"}
            })

            setTimeout(() => {
                dispatch({type: "CLEAR_NOTIFICATION"})
            }, 2000)
            if (onClose) onClose()
        }
        catch (error) {
            console.log(error)
            dispatch({
                type: 'SET_NOTIFICATION',
                payload: {text: 'User Sign Up Failed', type: "error"}
            })

            setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'})
            }, 2000)
        }
        

        finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div>
            {/* Heading */}
            <div className = "flex items-center justify-between mb-6">
                <h2 className = "font-semibold text-2xl">Sign Up</h2>
                <div className = "text-sm text-gray-500">Step: {steps + 1} / {stepTiles.length}</div>
            </div>

            {/* Progress */}
            <div className = "mb-6">
                <div className = "w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className = "h-2 bg-blue-500 rounded-full transition-all duration-300" style = {{width: `${((steps + 1) / stepTiles.length) * 100}%`}} />
                </div>

                <div className = "flex mt-3 gap-2 text-xs text-gray-600">
                    {stepTiles.map((t, i) => (
                        <div key={t} className = {`flex-1 text-center ${i === steps ? "font-medium" : ""}`}>{t}</div>
                    ))}
                </div>
            </div>

            {/* Form */}
            <form onSubmit = {handleSubmit}>
                {/* Step Panels */}
                <div className = "space-y-6">
                    <section style = {{display: `${steps === 0 ? "block" : "none"}`}}>
                        <h3 className = "text-lg font-medium mb-4">Personal Information:</h3>
                        <div className = "grid grid-cols-3 gap-4">
                            <Input 
                                label = "First Name"
                                value = {form.firstName}
                                onChange = {(v) => updateFields("firstName", v)}
                                error = {errors.firstName}
                                name = "firstName"
                            />
                            <Input 
                                label = "Middle Name"
                                value = {form.middleName}
                                onChange = {(v) => updateFields("middleName", v)}
                                error = {errors.middleName}
                                name = "middleName"
                            />
                            <Input 
                                label = "Last Name"
                                value = {form.lastName}
                                onChange = {(v) => updateFields("lastName", v)}
                                error = {errors.lastName}
                                name = "lastName"
                            />
                        </div>
                        <div className = "mt-4">
                            <Input 
                                label = "Email"
                                value = {form.email}
                                onChange = {(v) => updateFields("email", v)}
                                error = {errors.email}
                                name = "email"
                                type = "email"
                            />
                            <Input 
                                label = "Phone Number"
                                value = {form.phoneNumber}
                                onChange = {(v) => updateFields("phoneNumber", v)}
                                error = {errors.phoneNumber}
                                name = "phoneNumber"
                                type = "tel"
                            />
                        </div>
                        
                    </section>

                
                    <section style = {{display: `${steps === 1 ? "block" : "none"}`}}>
                        <h3 className = "text-lg font-medium mb-4">Address:</h3>
                        <div className = "space-y-4">
                            <div className = "grid grid-cols-2 gap-4">
                                <Input 
                                    label = "Country"
                                    value = {form.address.country}
                                    onChange = {(v) => updateFields("country", v)}
                                    error = {errors.country}
                                    name = "country"
                                />
                                <Input 
                                    label = "City"
                                    value = {form.address.city}
                                    onChange = {(v) => updateFields("city", v)}
                                    error = {errors.city}
                                    name = "city"
                                />
                                <Input 
                                    label = "State"
                                    value = {form.address.state}
                                    onChange = {(v) => updateFields("state", v)}
                                    error = {errors.state}
                                    name = "state"
                                />
                                <Input 
                                    label = "ZIP"
                                    value = {form.address.zip}
                                    onChange = {(v) => updateFields("zip", v)}
                                    name = "zip"
                                    type = "number"
                                />
                            </div>
                            <div className = "mt-4">
                                <Input 
                                    label = "Street"
                                    value = {form.address.street}
                                    onChange = {(v) => updateFields("street", v)}
                                    error = {errors.street}
                                    name = "street"
                                />
                            </div>
                        </div>
                    </section>

                    <section style = {{display: `${steps === 2 ? "block" : "none"}`}}>
                        <h3 className = "text-lg font-medium mb-4">Account:</h3>
                        <div className = "space-y-4">
                            <div className = "grid grid-cols-1 gap-4">
                                <Input 
                                    label = "Username"
                                    value = {form.username}
                                    onChange = {(v) => updateFields("username", v)}
                                    error = {errors.username}
                                    name = "username"
                                />
                                <Input 
                                    label = "Password"
                                    value = {form.password}
                                    onChange = {(v) => updateFields("password", v)}
                                    error = {errors.password}
                                    name = "password"
                                    type = "password"
                                    showPasswordToggle = {true}
                                />

                                <Input 
                                    label = "Repeat Password"
                                    value = {form.repeatPassword}
                                    onChange = {(v) => updateFields("repeatPassword", v)}
                                    error = {errors.repeatPassword}
                                    name = "repeatPassword"
                                    type = "password"
                                    showPasswordToggle = {true}
                                />
                            </div>
                        </div>
                    </section>

                    <section style = {{display: `${steps === 3 ? "block" : "none"}`}}>
                        <h3 className = "text-lg font-medium mb-4">Review & Submit:</h3>
                            <div className = "grid grid-cols-1 gap-4">
                                <Review label = "Name" value = {`${form.firstName} ${form.middleName || ""} ${form.lastName}`} />
                                <Review label = "Email" value = {`${form.email}`} />
                                <Review label = "Phone Number" value = {`${form.phoneNumber}`} />
                                <Review label = "Address" value = {`${form.address.country}, ${form.address.city}, ${form.address.state}, ${form.address.zip || ""} ${form.address.street}`} />
                                <Review label = "Username" value = {`${form.username}`} />
                                
                                <div className = "flex items-center gap-4 mt-2">
                                    <input type = "checkbox" checked = {form.terms} onChange = {(e) => updateFields("terms", e.target.checked)} />
                                    <span className = "text-xs text-gray-700">I accept the Terms and Condition</span>
                                </div>
                                {errors.terms && (
                                    <span className = "text-xs text-red-600">{errors.terms}</span>
                                )}
                            </div>

                    
                    </section>
                </div>

                {/* Buttons */}
            <div className = "mt-6 flex items-center justify-between">
                <div>
                    {steps > 0 && (
                        <button type = "button" onClick = {back} className = "px-4 py-2 rounded-lg border border-gray mr-2">Back</button>
                    )}
                </div>

                <div className = "flex items-center gap-3">
                    {steps < stepTiles.length - 1 ? (
                        <button type = "button" onClick = {next} className = "px-4 py-2 rounded-lg bg-blue-600 text-white shadow">
                            Next
                        </button>
                    ) : (
                        <button disabled = {isSubmitting} type = "submit" className = "px-4 py-2 rounded-lg bg-green-600 text-white shadow disabled:opacity-60">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    )}
                </div>

            </div>
            </form>
            

            <div className = "flex flex-col justify-center items-center">
                Already Have An Account?
                <button type = "button" onClick={onSwitch} className = "hover:underline hover:cursor-pointer text-lg">Log In</button>
            </div>
            
        </div>
    )


}

export default UserSignUp