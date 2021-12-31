import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Reset e-mail sent!');
        } catch (error) {
            toast.error('Reset e-mail could not be sent.');
        }
    };

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="E-mail"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <Link className="forgotPasswordLink" to="/sign-in">
                        Sign in
                    </Link>
                    <div className="signInBar">
                        <div className="signInText">Sent reset link</div>
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill="#fff"
                                height="32px"
                                width="32px"
                            />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ForgotPassword;
