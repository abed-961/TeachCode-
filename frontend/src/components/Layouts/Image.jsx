import { Box } from "@mui/material";

export default function Image({ src }) {
    return (
        <img
            src={src}
            alt="Blurred Shape"
            className="svg"
            width={200}
            height={200}
            draggable="false"
        />
    );
}
