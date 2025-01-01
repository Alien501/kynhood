import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="h-screen overflow-hidden grid grid-rows-2 relative">
            <div className="h-full">
                <img 
                    className="h-full object-cover" 
                    src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" 
                    alt="Background" 
                />
            </div>
            <div className="absolute h-full w-full left-0 top-0 z-40 bg-gradient-to-t from-zinc-800/40 to-slate-600/20"></div>
            <form onSubmit={handleSubmit} className="h-full z-50 relative bg-white flex justify-evenly rounded-3xl flex-col p-2 mb-4">
                <h1 className="text-2xl font-medium text-center">Welcome back to <br />Namma News!</h1>
                <div className="space-y-5 p-2">
                    <Input 
                        className="h-16 bg-slate-200/70 rounded-xl" 
                        placeholder="Email" 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Input 
                        className="h-16 bg-slate-200/70 rounded-xl" 
                        placeholder="Password" 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <Button 
                        className="block mx-auto h-12 rounded-full w-32"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign-in'}
                    </Button>
                </div>
                <hr />
                <Button variant={'link'} onClick={() => navigate('/sign-up')}>
                    Create Account
                </Button>
            </form>
        </div>
    );
};

export default LandingPage;