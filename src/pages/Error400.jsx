import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      description="Bad Request"
      image="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
    />
  );
}