export const getSocialNetworkButtonText = (
  relationship: SocialRelationship
): string => {
  if (relationship.isFollowing && relationship.isFollowed) {
    return "Friends";
  } else if (relationship.isFollowing && !relationship.isFollowed) {
    return "Follow back";
  } else if (!relationship.isFollowing && relationship.isFollowed) {
    return "Following";
  } else {
    return "Follow";
  }
};
