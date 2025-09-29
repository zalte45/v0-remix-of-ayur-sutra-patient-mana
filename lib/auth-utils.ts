/**
 * Utility functions for authentication and user management
 */

export interface UserData {
  email: string
  username: string
  fullName: string
  userType: "patient" | "doctor"
}

/**
 * Extracts username from email address
 * @param email - The email address
 * @returns The username part before the @ symbol
 */
export function extractUsernameFromEmail(email: string): string {
  if (!email || !email.includes("@")) {
    return "User"
  }

  const username = email.split("@")[0]

  // Clean up common patterns in usernames
  return username
    .replace(/[._-]/g, " ") // Replace dots, underscores, hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
    .trim()
}

/**
 * Formats display name for user
 * @param userData - User data object
 * @returns Formatted display name
 */
export function getDisplayName(userData: UserData): string {
  if (userData.fullName) {
    return userData.fullName
  }

  return userData.username || extractUsernameFromEmail(userData.email)
}

/**
 * Gets user initials for avatar
 * @param userData - User data object
 * @returns User initials (max 2 characters)
 */
export function getUserInitials(userData: UserData): string {
  const displayName = getDisplayName(userData)

  const words = displayName.split(" ").filter((word) => word.length > 0)

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }

  return "U"
}

/**
 * Simulates user authentication and returns user data
 * @param email - User email
 * @param userType - Type of user (patient or doctor)
 * @returns User data object
 */
export function simulateUserLogin(email: string, userType: "patient" | "doctor"): UserData {
  const username = extractUsernameFromEmail(email)

  // In a real app, this would come from your database
  const mockUserData: Record<string, Partial<UserData>> = {
    "priya.sharma@email.com": { fullName: "Priya Sharma" },
    "dr.rajesh@ayursutra.com": { fullName: "Dr. Rajesh Kumar" },
    "amit.patel@gmail.com": { fullName: "Amit Patel" },
    "sunita.reddy@yahoo.com": { fullName: "Sunita Reddy" },
  }

  const userData: UserData = {
    email,
    username,
    fullName: mockUserData[email]?.fullName || username,
    userType,
  }

  return userData
}
