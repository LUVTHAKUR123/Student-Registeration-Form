import { useForm } from "react-hook-form";
// import ErrorText from "../components/ErrorText";

function UserForm() {
    // const [formData, setFormData] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        revalidateMode: "onChange",
    });

    //handle function
    const onSubmit = (data) => {
        console.log("data", data);
        localStorage.setItem("userData", JSON.stringify(data));
        // setFormData(data);
    };
    // console.log(errors?.email?.message);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>User Form</h1>
                <label>Name :</label>
                <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                />
                <br />
                {/* <ErrorText error={errors.name} /> */}
                {errors?.name?.message && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
                <label>Email :</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "invalid email address",
                        },
                    })}
                />
                {errors?.email?.message && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                )}

                {/* <ErrorText error={errors.email} /> */}
                <br />
                <label>Password :</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "password is required",
                        pattern: {
                            value: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                            message:
                                "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                        },
                    })}
                />
                {errors?.password?.message && (
                    <span className="text-red" style={{ color: "red" }}>
                        {errors?.password.message}
                    </span>
                )}

                {/* <ErrorText error={errors.password} /> */}
                <br />

                <br />
                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
            <div></div>
        </div>
    );
}

export default UserForm;
