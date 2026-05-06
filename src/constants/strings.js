// constants/strings.js
export const projectDetails = {
    // Project Basic Information
    name: "Nidhi Decor",
    fullName: "Nidhi Decor Financial Platform",
    description: "Multi-level marketing and financial services platform",
    tagline: "Your Gateway to Financial Freedom",
    version: "1.0.0",
    
    // Authentication & User Flow
    signup: "Signup",
    login: "Login",
    logout: "Logout",
    register: "Register",
    verifyOtp: "Verify OTP",
    resetPassword: "Reset Password",
    forgotPassword: "Forgot Password",
    changePassword: "Change Password",
    createAccount: "Create Account",
    creatingAccount: "Creating Account...",
    alreadyHaveAccount: "Already have an account?",
    loginHere: "Login here",
    join: "Join",
    singupNow:"SignUp Now",
    dontHaveAccount:"Don't have an account",
    recovery:"Recovery",
    wehaveSent:"We've sent you",
    verificationCode:"Veirification Code",
    resendCode:"Resend Code",
    code:"Code",
    verify:"Verify",
    
    //login page

    saveCredentials:"Please save your login credentials securely:",
    accountCreated:"Account Created Successfully!",



    // Form Labels & Placeholders
    enter:"Enter",
    username: "Username",
    email: "Email",
    phone: "Phone",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    referralCode: "Referral Code",
    userId:"User ID",
    
    // Actions & Verbs
    enter: "Enter",
    create: "Create",
    confirm: "Confirm",
    your: "your",
    optional: "optional",
    
    // Messages
    recommendedBy: "Recommended by",
    referredBy: "Referred by",
    checkingReferralCode: "Checking referral code...",
    verifiedUser: "Verified User",
    
    // Features
    features: {
        secureData: "Secure & Encrypted Data",
        instantActivation: "Instant Account Activation",
        earnRewards: "Earn Rewards & Bonuses",
        customerSupport: "24/7 Customer Support"
    },
    
    // API Endpoints

    
    // Error Messages
    errors: {
        required: "This field is required",
        requiredField: "{field} is required",
        invalidEmail: "Invalid email address",
        invalidPhone: "Phone number must be 10 digits",
        passwordMismatch: "Passwords do not match",
        weakPassword: "Password must be at least 6 characters",
        userExists: "User already exists",
        invalidCredentials: "Invalid credentials",
        networkError: "Network error occurred",
        invalidReferralCode: "Invalid referral code"
    },
    
    // Success Messages
    successMessages: {
        registrationSuccess: "Registration successful!",
        loginSuccess: "Login successful!",
        profileUpdated: "Profile updated successfully",
        passwordChanged: "Password changed successfully",
        withdrawalRequested: "Withdrawal request submitted"
    },
    
    // Validation Patterns
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10}$/,
        password: /^.{6,}$/,
        referralCode: /^[A-Z0-9]{8}$/
    },
    
    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending"
};

export default projectDetails;