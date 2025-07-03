import React, { useEffect, useState } from 'react';
import { supabase } from '../../CreateClient';
import { useNavigate } from 'react-router-dom';
import { Github, Mail, LogOut } from 'lucide-react';

const LoginDashboard = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (provider) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
            });
            if (error) throw error;
            console.log('Sign-in data:', data);
        } catch (error) {
            console.error(`Error signing in with ${provider}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setSession(null);
            navigate('/');
        } catch (error) {
            console.error('Error closing session:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
            } else {
                setSession(data.session);
            }
        };

        fetchSession();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md">
                {!session ? (
                    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Please sign in to continue</p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => handleAuth('github')}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 ease-in-out"
                            >
                                <Github size={20} />
                                <span>Continue with GitHub</span>
                            </button>

                            <button
                                onClick={() => handleAuth('google')}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 ease-in-out"
                            >
                                <Mail size={20} />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-400">
                            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl p-8 text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl text-white">
                                    {session.user.email?.charAt(0).toUpperCase() || '?'}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Welcome back!
                            </h3>
                            <p className="text-gray-400 mb-4">{session.user.email}</p>
                        </div>

                        <button
                            onClick={handleSignOut}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 ease-in-out"
                        >
                            <LogOut size={20} />
                            <span   >Sign Out</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginDashboard;