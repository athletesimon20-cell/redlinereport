import { author } from "./author";
import { gearReviewTypes } from "./gearReviews";
import { bikeReview } from "./bikeReview";
import { bodyObjectTypes } from "./portableTextObjects";
import { siteStory } from "./siteStory";

export const schemaTypes = [author, ...gearReviewTypes, bikeReview, ...bodyObjectTypes, siteStory];
