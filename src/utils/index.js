import { imgBaseUrl } from "./axiosInstance"

export const imageUrl = (url) => `${imgBaseUrl}${url}`
console.log("imageUrl", imageUrl)

 export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  export function calculateAge(dateOfBirth) {
    console.log(dateOfBirth)
  if (!dateOfBirth) return 0;

  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // If birthday hasn't occurred this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
console.log(age)
  return age;
}
