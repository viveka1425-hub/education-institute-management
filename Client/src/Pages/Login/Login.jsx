import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
//import { loginUser } from "../../services/authService";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    //const [success, setSuccess] = useState("");

    // Validation function
    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

        if (!password) newErrors.password = "Password is required";
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
            try {
                //await loginUser(email, password);
                // Here you can call your login API
                console.log("Login:", { email, password });
                //setSuccess("Login successful!");
                setErrors({});
                setEmail("");
                setPassword("");
                navigate("/Dashboard")
            } catch (error) {
                setErrors({ password: error.message });
            }


        }
    };
    const navigateToRegisterPage = () => {
        navigate("/register");
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Login</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span style={styles.error}>{errors.email}</span>}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <span style={styles.error}>{errors.password}</span>
                        )}
                    </div>

                    <button type="submit" style={styles.button}>
                        Login
                    </button>

                    <a onClick={navigateToRegisterPage} style={styles.registerLink}>
                        Don't have an account? Register
                    </a>
                </form>
            </div>
        </div>
    );
};

const styles = {
    page: {
        background: "linear-gradient(to right, #42306eff, #765cb7ff)",
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
        background: "#715ba9ff",
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
        color: "#643acdff",
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

export default LoginPage;
