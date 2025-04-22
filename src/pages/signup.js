import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // Handle sign up logic here
        if (username && username.trim() !== '') {
            sessionStorage.setItem('userName', username.trim());
        } else {
            sessionStorage.setItem('userName', 'Guest');
        }
        localStorage.setItem('hasSeenOnboarding', 'true');
        // For now, let's navigate to a different page after submission
        navigate("/"); // Update with the target page
    };

    return (
        <div className="signup-page" 
        style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/girl-thinking.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
        }}>
            <h1 className="signup-title">Sign Up</h1>
            <div className="signup-fields">
            <div className="username">
                <label className="field-title" htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username"
                        className="signup-input" 
                    />
            </div>
            <div className="password">
                <label className="field-title" htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password"
                    className="signup-input"  
                />
            </div>
                <button className="signup-button-confirm" onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    );
} ;

export default SignUpPage;