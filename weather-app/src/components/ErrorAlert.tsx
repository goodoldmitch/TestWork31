export const ErrorAlert = ({ message }: { message: string }) => (
    <div className="alert alert-danger mt-3" role="alert">
      {message}
    </div>
  );