import React, { useState } from "react";
import { userRegister } from "../../services/userService";
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Validate form fields
    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!phone) newErrors.phone = "Phone number required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (!role) newErrors.role = "role is require";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess("");
        } else {
            const userRegisterResponse = await userRegister(name, email, phone, password, role);
            localStorage.setItem('user_id', userRegisterResponse.data.id)
            //const userId = localStorage.getItem('Id')
            console.log("Registered:", { name, email, phone, password, role });
            setSuccess("Registration successful!");
            console.log(role)
            if (role == "admin") {
                navigate("/")
            }
            if (role == "institute") {
                navigate("/Profile/ProfileCreate")
            }
            setErrors({});
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setRole("");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Name</label>
                        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}
                            style={styles.input} />
                        {errors.name && <span style={styles.error}>{errors.name}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            style={styles.input} />
                        {errors.email && <span style={styles.error}>{errors.email}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Phone</label>
                        <input type="number" placeholder="phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
                            style={styles.input} />
                        {errors.phone && <span style={styles.error}>{errors.phone}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            style={styles.input} />
                        {errors.password && <span style={styles.error}>{errors.password}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Role</label>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <label>
                                <input type="radio" name="role" value="user" checked={role === "user"} onChange={(e) => setRole(e.target.value)} />{" "} Use</label>

                            <label>
                                <input type="radio" name="role" value="institute" checked={role === "institute"} onChange={(e) => setRole(e.target.value)} />{" "} Institute</label>

                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === "admin"}
                                    onChange={(e) => setRole(e.target.value)}
                                />{" "}
                                Admin
                            </label>
                        </div>
                        {errors.role && <span style={styles.error}>{errors.role}</span>}
                    </div>

                    <button type="submit" style={styles.button}>
                        Register
                    </button>

                    {success && <p style={styles.success}>{success}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    page: {
        background: " #614b97",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
    },
    container: {
        width: "400px",
        maxWidth: "90%",
        padding: "30px",
        background: "#765cb7ff",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(106, 27, 154, 0.4)",
        color: "#fff",
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    title: {
        color: "wright",
        marginBottom: "25px",
        fontSize: "1.8rem",
        letterSpacing: "1px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
    },
    label: {
        marginBottom: "6px",
        color: "#d1c4e9",
        fontWeight: "500",
        fontSize: "0.95rem",
    },
    input: {
        padding: "12px 14px",
        borderRadius: "8px",
        border: "1px solid #7b1fa2",
        backgroundColor: "#f8f8f8",
        color: "#333",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.3s ease",
    },
    button: {
        padding: "12px",
        backgroundColor: "#614b97",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "600",
        letterSpacing: "0.5px",
        transition: "all 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#8e24aa",
    },
    error: {
        color: "#ff5252",
        fontSize: "0.85rem",
        marginTop: "4px",
    },
    registerLink: {
        marginTop: "10px",
        color: "#ffffffff",
        textDecoration: "none",
        fontWeight: "500",
        cursor: "pointer",
        transition: "color 0.3s ease",
    },
    "@media (max-width: 500px)": {
        container: {
            width: "90%",
            padding: "20px",
        },
        title: {
            fontSize: "1.5rem",
        },
        input: {
            padding: "10px 12px",
            fontSize: "0.95rem",
        },
        button: {
            padding: "10px",
            fontSize: "0.95rem",
        },
    },
};

export default RegisterForm;
