import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      description="Forbidden Access"
      image="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
    />
  );
}