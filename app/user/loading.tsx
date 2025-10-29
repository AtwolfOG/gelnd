import { ScaleLoader } from "react-spinners";

export default function Loading() {
  return (
    <ScaleLoader
      height={35}
      width={4}
      color="#000000"
      cssOverride={{
        position: "absolute",
        top: "50%",
        right: "50%",
        zIndex: 2,
      }}
    />
  );
}
