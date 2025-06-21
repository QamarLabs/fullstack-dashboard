import { useState } from "react";
import { CommonModal } from "./CommonModal";
import { CommonButton } from "./Buttons";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { EmailInput, PasswordInput } from "./Inputs";
import axios from "axios";
import { axiosResponseBody } from "./apiAgent";

type LoginModalProps = {
    openModal: boolean;
    setOpenModal: (val: boolean) => void;
    setUser: (val: {email: string, profileImg: string} | undefined) => void;
}
export function LoginModal({ openModal, setOpenModal, setUser }: LoginModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Add your authentication logic here
            console.log('Logging in with:', { email, password });
            // Simulate API call
            const response = await axios.post<{ username: string, password: string }>(`/login`, { email: email, password: password }).then(axiosResponseBody)
            const userObject = { email: response.email, profileImg: response.profileImg }
            setUser(userObject);
            // On successful login:
            setOpenModal(false);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CommonModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            title="Login to your account"
            size="md"
        >
            <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <EmailInput
                    value={email}
                    setValue={(val: string) => setEmail(val)}
                />

                <PasswordInput
                    value={password}
                    setValue={(val: string) => setPassword(val)}
                />

                <div className='flex justify-end space-x-3 pt-4'>
                    <CommonButton onClick={() => setOpenModal(false)} className="info-button" type="button">
                        <AiOutlineClose className='mr-2' />
                        Cancel
                    </CommonButton>
                    <CommonButton isLoading={isLoading} className='primary-button' type="submit">
                        <AiOutlineCheck className='mr-2' />
                        Sign in
                    </CommonButton>
                </div>
            </form>

        </CommonModal>
    );
}


type RegisterModalProps = {
    openModal: boolean;
    setOpenModal: (val: boolean) => void;
    setUser: (val: {email: string, profileImg: string} | undefined) => void;
}
export function RegisterModal({ openModal, setOpenModal, setUser }: RegisterModalProps) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        profileImg: ''
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Handle registration logic here
        console.log('Form submitted:', formData);
        const response = await axios.post<{ username: string, password: string, profileImg: string }>(`/register`, { ...formData }).then(axiosResponseBody)
        const userObject = { email: response.email, profileImg: response.profileImg }
        setUser(userObject);
        // Close modal after submission
        setSubmitting(false);
        setFormData({
            email: '',
            password: '',
            profileImg: ''
        });
        setOpenModal(false);
    };
    return (
        <CommonModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            title="Register"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <div className="mt-2 space-y-4">
                    {/* Email Field */}
                    <EmailInput
                        value={formData.email}
                        setValue={(val: string) => {
                            setFormData(prev => ({
                                ...prev,
                                email: val
                            }));
                        }}
                    />

                    {/* Password Field */}
                    <PasswordInput
                        value={formData.password}
                        setValue={(val: string) => {
                            setFormData(prev => ({
                                ...prev,
                                password: val
                            }));
                        }}
                    />

                    {/* Profile Image Upload */}
                    <div>
                        <label htmlFor="profileImg" className="block text-sm font-medium text-gray-700">
                            Profile Image (Optional)
                        </label>
                        <input
                            type="text"
                            id="profileImg"
                            name="profileImg"
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    profileImg: e.target.value
                                }));
                            }}
                            accept="image/*"
                            value={formData.profileImg}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <CommonButton onClick={() => setOpenModal(false)} className="info-button" type="button">
                            <AiOutlineClose className='mr-2' />
                            Cancel
                        </CommonButton>
                        <CommonButton isLoading={submitting} className='primary-button' type="submit">
                            <AiOutlineCheck className='mr-2' />
                            Register
                        </CommonButton>
                    </div>
                </div>
            </form>
        </CommonModal>
    );
}