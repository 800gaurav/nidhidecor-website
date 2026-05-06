const apiRoutes = {
    buyPlan: (planId) => `/api/v1/user/auth/buy-plan/${planId}`,
    submitDeposite: '/api/v1/user/auth/topup-add',
    getKyc: `/api/v1/user/auth/get-kyc`,
    updateKyc: `/api/v1/user/auth/my-kyc`,
    singlePlan: (planId) => `api/v1/user/auth/my-Investment/${planId}`,
    allInvestedPlans: `/api/v1/user/auth/get-buy-request`,
    myDownLine: (userId) => `/api/v1/user/auth/my-downline/${userId}`,
    paymentInfo: `/api/v1/admin/auth/get-payment-info`,
    getPlanDetailsWithCoins: (planId) => `api/v1/admin/auth/get-plan-distribution/${planId}`,
    requestHistory: `/api/v1/user/withdraw/withdraw/request/history`,
    depositetHistory: `/api/v1/user/auth/topup-get`,
    withdrawRequest :`/api/v1/user/withdraw/withdraw/request`,
    getPlan : `/api/v1/admin/product/get-all`,
    buyproduct : (productId) => `/api/v1/admin/product/buy/${productId}`,
    purchasedproduct : `/api/v1/admin/product/history`,
}
export default apiRoutes