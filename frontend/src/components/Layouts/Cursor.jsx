import { Box } from "@mui/material";
import useMousePosition from "../../../utils/useMousePosition";
import { useEffect, useState } from "react";

export default function Cursor() {
    const mouseMove = useMousePosition();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMouse({ x: mouseMove.x, y: mouseMove.y });
    }, [mouseMove]);
    return (
        <Box
            sx={{
                position: "fixed",
                top: mouse.y,
                left: mouse.x,
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background:
                    "radial-gradient(circle at center, rgba(164, 165, 231, 0.41) 0%, rgba(127, 133, 194, 0.5) 40%, rgba(165,180,252,0.05) 70%, transparent 100%)",
                backdropFilter: "blur(60px)", // stronger background blur
                opacity: 0.6, // softer transparency
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                transition: "transform 0.01s ease-out",
                mixBlendMode: "screen", // blends naturally with background
                zIndex: -1, // stays behind content
                filter: "blur(30px)", // blur the glow itself
                boxShadow: "0 0 120px 40px rgba(129,140,248,0.15)", // soft outer glow
            }}
            className="custom-cursor"
        ></Box>
    );
}
