import React from 'react';

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div>
          <label className="block text-gray-700">Username</label>
          <input type="username" placeholder="enter your username" className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" placeholder="enter your email" className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input type="password" placeholder="enter your password" className="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <button className="w-full bg-[#f9a01b] text-white p-2 rounded mt-4">Sign up</button>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-[#f9a01b]">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
