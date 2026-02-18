export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_END_POINTS = {

  // Auth
  login: `${BASE_URL}auth/login`,
  logout: `${BASE_URL}auth/logout`,  

  // News & Features
  "super-admin": {
    getCompanies: `${BASE_URL}super-admin/companies`,
    getCompanyDetails: (companyId) =>
      `${BASE_URL}super-admin/news?companyId=${companyId}`,
    newsCreate: `${BASE_URL}super-admin/news`,
    updateNews: (newsId) =>
      `${BASE_URL}super-admin/news/${newsId}`,
    deleteNews: (newsId) =>
      `${BASE_URL}super-admin/news/${newsId}`,
    getAllNews: `${BASE_URL}super-admin/news/getAll`,
  },
  "admin": {
    getCompanies: `${BASE_URL}admin/companies`,
    getCompanyDetails: (companyId) =>
      `${BASE_URL}admin/news?companyId=${companyId}`,
    newsCreate: `${BASE_URL}admin/news`,
    updateNews: (newsId) =>
      `${BASE_URL}admin/news/${newsId}`,
    deleteNews: (newsId) =>
      `${BASE_URL}admin/news/${newsId}`,
    getAllNews: `${BASE_URL}admin/news/getAll`,
  },
  "health-coaches": {
    getCompanies: `${BASE_URL}health-coaches/companies`,
    getCompanyDetails: (companyId) =>
      `${BASE_URL}health-coaches/news?companyId=${companyId}`,
    newsCreate: `${BASE_URL}health-coaches/news`,
    updateNews: (newsId) =>
      `${BASE_URL}health-coaches/news/${newsId}`,
    deleteNews: (newsId) =>
      `${BASE_URL}health-coaches/news/${newsId}`,
    getAllNews: `${BASE_URL}health-coaches/news/getAll`,
  },
};

export const API_ENDPOINTS_FOR_CONSENTS = {
    "super-admin": {
    createConsent: `${BASE_URL}super-admin/consents`,
    getAllCompanies: `${BASE_URL}super-admin/consents/companies`,
    getAllConsent: `${BASE_URL}super-admin/consents`,
    updateConsent: (consentId) =>
      `${BASE_URL}super-admin/consents/${consentId}`,
    deleteConsent: (consentId) =>
      `${BASE_URL}super-admin/consents/${consentId}`,
  },
  "admin": {
    createConsent: `${BASE_URL}admin/consents`,
    getAllCompanies: `${BASE_URL}admin/consents/companies`,
    getAllConsent: `${BASE_URL}admin/consents`,
    updateConsent: (consentId) =>
      `${BASE_URL}admin/consents/${consentId}`,
    deleteConsent: (consentId) =>
      `${BASE_URL}admin/consents/${consentId}`,
  },
  "health-coaches": {
    createConsent: `${BASE_URL}health-coaches/consents`,
    getAllCompanies: `${BASE_URL}health-coaches/consents/companies`,
    getAllConsent: `${BASE_URL}health-coaches/consents`,
    updateConsent: (consentId) =>
      `${BASE_URL}health-coaches/consents/${consentId}`,
    deleteConsent: (consentId) =>
      `${BASE_URL}health-coaches/consents/${consentId}`,
  },
}

export const API_ENDPOINTS_FOR_COMPANY = {
  "super-admin": {
    // getAllCompanies: Already exists and will be used
    // getOneCompany: Already exists and will be used
    createCompanyStepOne: `${BASE_URL}super-admin/companies/step1`,
    createCompanyStepTwo: (companyId) => `${BASE_URL}super-admin/companies/${companyId}/step2`,
    createCompanyStepThree: (companyId) => `${BASE_URL}super-admin/companies/${companyId}/step3`,
    updateCompany: (companyId) => `${BASE_URL}super-admin/companies/${companyId}`,
    deleteCompany: (companyId) => `${BASE_URL}super-admin/companies/${companyId}`,
  },

  "admin": {
    createCompanyStepOne: `${BASE_URL}admin/companies/step1`, 
    createCompanyStepTwo: (companyId) => `${BASE_URL}admin/companies/${companyId}/step2`,
    createCompanyStepThree: (companyId) => `${BASE_URL}admin/companies/${companyId}/step3`,
    updateCompany: (companyId) => `${BASE_URL}admin/companies/${companyId}`,
    deleteCompany: (companyId) => `${BASE_URL}admin/companies/${companyId}`,
  },

  "health-coaches": {
    createCompanyStepOne: `${BASE_URL}health-coaches/companies/step1`,
    createCompanyStepTwo: (companyId) => `${BASE_URL}health-coaches/companies/${companyId}/step2`,
    createCompanyStepThree: (companyId) => `${BASE_URL}health-coaches/companies/${companyId}/step3`,
    updateCompany: (companyId) => `${BASE_URL}health-coaches/companies/${companyId}`,
    deleteCompany: (companyId) => `${BASE_URL}health-coaches/companies/${companyId}`,
  },
};

export const API_ENDPOINTS_FOR_USERMANAGEMENT = {
  "super-admin": {
    // getAllCompanies: Already exists and will be used
    getAllUsers: `${BASE_URL}super-admin/users`,
    createUser: `${BASE_URL}super-admin/users`,
    updateUser: (userId) => `${BASE_URL}super-admin/users/${userId}`,
    deleteUser: (userId) => `${BASE_URL}super-admin/users/${userId}`,
  },
  "admin": {
    getAllUsers: `${BASE_URL}admin/users`,
    createUser: `${BASE_URL}admin/users`,
    updateUser: (userId) => `${BASE_URL}admin/users/${userId}`,
    deleteUser: (userId) => `${BASE_URL}admin/users/${userId}`,
  },
}

export const API_ENDPOINTS_FOR_PARTICIPANT = {
  "super-admin": {
    getParticipantFormData: `${BASE_URL}super-admin/participants/form-data`,
    getAllParticipants: `${BASE_URL}super-admin/participants`,
    getParticipantDetails: (participantId) =>
      `${BASE_URL}super-admin/participants/${participantId}`,
    deleteParticipant: (participantId) =>
      `${BASE_URL}super-admin/participants/${participantId}`, 
    createParticipant : `${BASE_URL}super-admin/participants`,
    createParticipantStepTwo : (participantId) => `${BASE_URL}participants/${participantId}`,
    createParticipantStepThree : (participantId) => `${BASE_URL}participants/${participantId}`,
    createParticipantStepFour : (participantId) => `${BASE_URL}super-admin/participants/${participantId}/work-status`,
  },
  "admin": {
    getParticipantFormData: `${BASE_URL}admin/participants/form-data`,
    getAllParticipants: `${BASE_URL}admin/participants`,
    getParticipantDetails: (participantId) =>
      `${BASE_URL}admin/participants/${participantId}`,
    createParticipant : `${BASE_URL}admin/participants`,
    createParticipantStepTwo : (participantId) => `${BASE_URL}admin/participants/${participantId}`,
    createParticipantStepThree : (participantId) => `${BASE_URL}admin/participants/${participantId}`,
    createParticipantStepFour : (participantId) => `${BASE_URL}admin/participants/${participantId}/work-status`,
  },
}


export const API_ENDPOINTS_FOR_DASHBOARDSTATS = {
  getDashboardStats: `${BASE_URL}dashboard/stats`,
  getDetailedStats: `${BASE_URL}dashboard/stats/detailed`,
};

