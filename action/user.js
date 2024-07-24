// "use server";

// import connectDB from "@/lib/db";
// import User from "@/models/User";
// import { redirect } from "next/navigation";
// import { hash } from "bcryptjs";
// import { signIn } from "@/auth";
// import { CredentialsSignin } from "next-auth";

// const login = async (formData) => {
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();

//   try {
//     if (!email || !password) {
//       console.log("kindly fill all the fields");
//     }
//     await signIn("credentials", {
//       redirect: false,
//       callbackUrl: "/",
//       email,
//       password,
//     });
//     redirect("/private/dashboard");
//   } catch (error) {
//     return "an error occurred while logging in the user";
//   }
// };

// const register = async (formData) => {
//   const firstName = formData.get("firstName")?.toString();
//   const lastName = formData.get("lastName")?.toString();
//   const email = formData.get("email")?.toString();
//   const password = formData.get("password")?.toString();

//   if (!firstName || !lastName || !email || !password) {
//     console.log("kindly fill all the fields");
//   }

//   //   connect to database
//   await connectDB();

//   // check for existing user
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     throw new Error("user already exist");
//   }
//   const hashedPassword = await hash(password, 12);
//   // else create a new user
//   await User.create({ firstName, lastName, email, password: hashedPassword });
//   console.log("user created successfully");
//   redirect("/auth/login");
// };

// const fetchAllUser = async () => {
//   await connectDB();
//   const users = await User.find({});
//   return users;
// };

// // application form upload to the database
// const application = async (formData) => {
//   const applicantFullName = formData.get("applicantFullName")?.toString();
//   const applicantEmail = formData.get("applicantEmail")?.toString();
//   const homeCountry = formData.get("homeCountry")?.toString();
//   const contactNumber = formData.get("contactNumber")?.toString();
//   const whatsAppNumber = formData.get("whatsAppNumber")?.toString();
//   const destinationCountry = formData.get("destinationCountry")?.toString();
//   const programCategory = formData.get("programCategory")?.toString();
//   const parentName = formData.get("parentName")?.toString();
//   const parentOccupation = formData.get("parentOccupation")?.toString();
//   const parentContact = formData.get("parentContact")?.toString();
//   const checked = formData.get("checked")?.toString();

//   // if (
//   //   !applicantFullName ||
//   //   !applicantEmail ||
//   //   !homeCountry ||
//   //   !contactNumber ||
//   //   whatsAppNumber
//   // ) {
//   //   return "kindly fill all the fields";
//   // }

//   console.log({
//     applicantFullName,
//     applicantEmail,
//     homeCountry,
//     contactNumber,
//     whatsAppNumber,
//     destinationCountry,
//     programCategory,
//     parentName,
//     parentOccupation,
//     parentContact,
//     checked,
//   });

//   // //   connect to database
//   // await connectDB();

//   // // check for existing user
//   // const existingUser = await User.findOne({ email });

//   // if (existingUser) {
//   //   throw new Error("user already exist");
//   // }
//   // const hashedPassword = await hash(password, 12);
//   // // else create a new user
//   // await User.create({ firstName, lastName, email, password: hashedPassword });
//   // console.log("user created successfully");
//   // redirect("/auth/login");
// };

// export { register, login, fetchAllUser, application };
