import { auth } from "@clerk/nextjs"
import { db } from "./db"
import { userSubscriptions } from "./db/schema"
import { eq } from "drizzle-orm"


const Day_in_mins = 1000 * 60 * 60 * 24
export const checkSubscription = async () => {
  const { userId } = await auth()
  if (!userId) {
    return false
  }
  // checking if the user has a subscription from the database 
  const _userSubscriptions = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId))
  if (!_userSubscriptions[0]) {
    return false
  }
  const userSubscription = _userSubscriptions[0]
  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + Day_in_mins > Date.now()

  return !!isValid
}