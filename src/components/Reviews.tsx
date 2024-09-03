import { SingleGameWithReviews } from "@/types/game";
import { EmbeddedReview } from "@/types/review";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { Can } from "./Can";
import { ReviewDialog } from "./ReviewDialog";

export function Reviews({ game }: { game: SingleGameWithReviews }) {
  const reviews: EmbeddedReview[] = game.reviews;

  const customStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#780206",
    inactiveFillColor: "#d3d3d3"
  };

  return (
    <div className="w-full">
      <Can
        permission="ORDER:ADD_GAME"
        permissionType="actions"
        yes={() => <ReviewDialog game={game}></ReviewDialog>}
        no={() => <p>Sign in to add review</p>}
      />

      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reviews</h1>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">There are no reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.reviewID}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Rating
                      style={{ maxWidth: 250 }}
                      readOnly
                      value={review.starRating}
                      itemStyles={customStyles}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{review.starRating} out of 5</span>
                </div>
                <p className="text-gray-700">{review.reviewDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
