export const getSocialNetworkButtonText = (
  relationship: SocialRelationship
): string => {
  if (relationship === null) {
    return "Its You";
  } else if (relationship.isFollowing && relationship.isFollowed) {
    return "Friends";
  } else if (relationship.isFollowing && !relationship.isFollowed) {
    return "Follow back";
  } else if (!relationship.isFollowing && relationship.isFollowed) {
    return "Following";
  } else if (!relationship.isFollowing && !relationship.isFollowed) {
    return "Follow";
  } else {
    console.error("Should never land here");
    return "Follow";
  }
};
