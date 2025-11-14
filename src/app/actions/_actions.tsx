// 'use server'

// import { redirect } from "next/navigation"
// import getUserListingsAdmin from "./getUserEmail"

// export async function getUserEmailData(data: any) {
//     // const emailData = data

//     const { email } = Object.fromEntries(data)

//     if(!email) {
//         console.log('No email data found.')
//     }

//     const userData = await getUserListingsAdmin(data)

//     console.log('userData', userData)

//     return userData
// }

// export const searchUserListings = async (formData: FormData) => {
//     "use server"

//     const searchQuery = formData.get("searchQuery"?.toString())

//     if (searchQuery) {
//       redirect("/profile/userListings/search?query=" + searchQuery)
//     }
//   };
