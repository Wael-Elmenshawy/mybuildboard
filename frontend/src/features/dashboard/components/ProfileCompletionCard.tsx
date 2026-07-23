interface ProfileCompletionCardProps {
  completion: number;
}

const ProfileCompletionCard = ({
  completion,
}: ProfileCompletionCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Profile Completion
        </h2>

        <span className="text-lg font-bold text-blue-600">
          {completion}%
        </span>
      </div>

      <div className="mt-6 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${completion}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Complete your profile to increase your visibility
        and make your portfolio more attractive.
      </p>
    </div>
  );
};

export default ProfileCompletionCard;
