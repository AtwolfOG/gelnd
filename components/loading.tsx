import { ScaleLoader } from "react-spinners";

export function Loader({ width, height }: { width: number; height: number }) {
  return (
    <ScaleLoader
      height={height}
      width={width}
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
